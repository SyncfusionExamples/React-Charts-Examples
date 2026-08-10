import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const API_BASE_URL = 'http://localhost:5000/api/chart-sales';

export const salesDataManager = new DataManager({
  url: API_BASE_URL,
  adaptor: new UrlAdaptor()
});