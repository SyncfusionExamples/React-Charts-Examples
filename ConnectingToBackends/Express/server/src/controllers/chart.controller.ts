import { Request, Response } from 'express';
import { salesData } from '../utils/data';
import { DataManagerRequest, SalesData } from '../types/interface';

const getFieldValue = (item: SalesData, field: string): string | number | undefined => {
  return item[field as keyof SalesData];
};

const normalizeValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).toLowerCase();
};

const evaluateCondition = (item: SalesData, condition: any): boolean => {
  const field: string = condition.field;
  const operator: string = condition.operator || 'equal';
  const value = condition.value;
  const ignoreCase: boolean = condition.ignoreCase !== false;

  if (!field) {
    return true;
  }

  const fieldValue = getFieldValue(item, field);

  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }

  const fieldText = ignoreCase ? normalizeValue(fieldValue) : String(fieldValue);
  const filterText = ignoreCase ? normalizeValue(value) : String(value);

  const fieldNumber = Number(fieldValue);
  const filterNumber = Number(value);

  switch (operator.toLowerCase()) {
    case 'equal':
      return fieldText === filterText;

    case 'notequal':
      return fieldText !== filterText;

    case 'contains':
      return fieldText.includes(filterText);

    case 'startswith':
      return fieldText.startsWith(filterText);

    case 'endswith':
      return fieldText.endsWith(filterText);

    case 'greaterthan':
      return fieldNumber > filterNumber;

    case 'greaterthanorequal':
      return fieldNumber >= filterNumber;

    case 'lessthan':
      return fieldNumber < filterNumber;

    case 'lessthanorequal':
      return fieldNumber <= filterNumber;

    default:
      return fieldText === filterText;
  }
};

const applyWhere = (data: SalesData[], where: any[]): SalesData[] => {
  if (!where || where.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return where.every((condition) => {
      if (condition.isComplex && Array.isArray(condition.predicates)) {
        const conditionType = (condition.condition || 'and').toLowerCase();

        if (conditionType === 'or') {
          return condition.predicates.some((predicate: any) =>
            evaluateCondition(item, predicate)
          );
        }

        return condition.predicates.every((predicate: any) =>
          evaluateCondition(item, predicate)
        );
      }

      return evaluateCondition(item, condition);
    });
  });
};

const applySearch = (data: SalesData[], search: any[]): SalesData[] => {
  if (!search || search.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return search.every((searchItem) => {
      const fields: string[] = searchItem.fields || [];
      const key: string = searchItem.key || '';
      const operator: string = searchItem.operator || 'contains';
      const ignoreCase: boolean = searchItem.ignoreCase !== false;

      if (!fields.length || !key) {
        return true;
      }

      const searchKey = ignoreCase ? key.toLowerCase() : key;

      return fields.some((field) => {
        const fieldValue = getFieldValue(item, field);

        if (fieldValue === undefined || fieldValue === null) {
          return false;
        }

        const compareValue = ignoreCase
          ? normalizeValue(fieldValue)
          : String(fieldValue);

        switch (operator.toLowerCase()) {
          case 'contains':
            return compareValue.includes(searchKey);

          case 'startswith':
            return compareValue.startsWith(searchKey);

          case 'endswith':
            return compareValue.endsWith(searchKey);

          case 'equal':
            return compareValue === searchKey;

          default:
            return compareValue.includes(searchKey);
        }
      });
    });
  });
};

const applySort = (data: SalesData[], sorted: any[]): SalesData[] => {
  if (!sorted || sorted.length === 0) {
    return data;
  }

  const result = [...data];

  sorted.forEach((sort) => {
    const field = sort.name as keyof SalesData;
    const direction =
      (sort.direction || 'ascending').toLowerCase() === 'descending' ? -1 : 1;

    result.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) {
        return -direction;
      }

      if (aValue > bValue) {
        return direction;
      }

      return 0;
    });
  });

  return result;
};

export const getChartData = (req: Request, res: Response) => {
  try {
    const dm: DataManagerRequest = req.body || {};

    let result: SalesData[] = [...salesData];

    if (dm.where && dm.where.length > 0) {
      result = applyWhere(result, dm.where);
    }

    if (dm.search && dm.search.length > 0) {
      result = applySearch(result, dm.search);
    }

    const count = result.length;

    if (dm.sorted && dm.sorted.length > 0) {
      result = applySort(result, dm.sorted);
    }

    if (typeof dm.skip === 'number' && typeof dm.take === 'number') {
      result = result.slice(dm.skip, dm.skip + dm.take);
    }

    res.status(200).json({
      result,
      count
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve chart data',
      message: error instanceof Error ? error.message : String(error),
      result: [],
      count: 0
    });
  }
};