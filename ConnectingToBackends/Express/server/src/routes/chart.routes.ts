import { Router } from 'express';
import { getChartData } from '../controllers/chart.controller';

const router = Router();

// Browser testing URL:
// http://localhost:5000/api/chart-sales
router.get('/', (req, res) => {
  return getChartData(req, res);
});

// Syncfusion DataManager UrlAdaptor uses POST request
router.post('/', (req, res) => {
  return getChartData(req, res);
});

export default router;