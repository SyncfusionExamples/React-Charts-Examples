import SalesChart from './components/SalesChart';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Syncfusion React Chart with Express.js Server</h1>
      <p>
        This chart loads monthly sales data from an Express.js backend API.
      </p>

      <SalesChart />
    </div>
  );
}

export default App;