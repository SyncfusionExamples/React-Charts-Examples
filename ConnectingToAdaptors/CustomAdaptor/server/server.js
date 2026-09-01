const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Sample chart data
const rawData = [
  { month_name: 'Jan', sales_amount: 120 },
  { month_name: 'Feb', sales_amount: 150 },
  { month_name: 'Mar', sales_amount: 180 },
  { month_name: 'Apr', sales_amount: 90 },
  { month_name: 'May', sales_amount: 200 },
  { month_name: 'Jun', sales_amount: 240 }
];

// Home route
app.get('/', (req, res) => {
  res.send('Server is running successfully on port 5050');
});

// GET API route
app.get('/api/chart-data', (req, res) => {
  res.json({
    result: rawData,
    count: rawData.length
  });
});

// POST API route
app.post('/api/chart-data', (req, res) => {
  res.json({
    result: rawData,
    count: rawData.length
  });
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Chart API available at http://localhost:${PORT}/api/chart-data`);
});