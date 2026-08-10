export interface MonthlySales {
  id: number;
  month: string;
  sales: number;
  expenses: number;
}

export const monthlySalesData: MonthlySales[] = [
  {
    id: 1,
    month: "Jan",
    sales: 35,
    expenses: 20
  },
  {
    id: 2,
    month: "Feb",
    sales: 28,
    expenses: 18
  },
  {
    id: 3,
    month: "Mar",
    sales: 34,
    expenses: 22
  },
  {
    id: 4,
    month: "Apr",
    sales: 32,
    expenses: 24
  },
  {
    id: 5,
    month: "May",
    sales: 40,
    expenses: 26
  },
  {
    id: 6,
    month: "Jun",
    sales: 48,
    expenses: 30
  }
];