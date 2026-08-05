export interface SalesData {
  month: string;
  sales: number;
  expenses: number;
}

export interface SalesApiResponse {
  result: SalesData[];
  count: number;
}

const API_BASE_URL = 'http://127.0.0.1:5000';

export async function getSalesData(): Promise<SalesApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/sales`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}