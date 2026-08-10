import { DataManager } from '@syncfusion/ej2-data';
import { CustomAdaptor } from './adaptors/CustomAdaptor';

export const chartDataManager = new DataManager({
  url: 'http://localhost:5050/api/chart-data',
  adaptor: new CustomAdaptor()
});