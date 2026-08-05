export interface SalesData {
  month: string;
  sales: number;
  expenses: number;
}

export interface DataManagerRequest {
  skip?: number;
  take?: number;
  sorted?: Array<{
    name: string;
    direction: string;
  }>;
  where?: any[];
  search?: Array<{
    fields: string[];
    key: string;
    operator: string;
    ignoreCase: boolean;
  }>;
  requiresCounts?: boolean;
}