import express, { Application } from 'express';
import cors from 'cors';
import chartRoutes from './routes/chart.routes';

const app: Application = express();
const PORT = 5000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Express.js Chart API is running');
});

app.use('/api/chart-sales', chartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Chart API endpoint: http://localhost:${PORT}/api/chart-sales`);
});

export default app;