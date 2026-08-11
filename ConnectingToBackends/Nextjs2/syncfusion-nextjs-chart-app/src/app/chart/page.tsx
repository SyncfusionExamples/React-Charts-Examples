'use client';

import dynamic from 'next/dynamic';

const SalesChart = dynamic(() => import('../../components/SalesChart'), {
  ssr: false,
  loading: () => (
    <p className="loading-text">
      Loading chart component...
    </p>
  )
});

export default function ChartPage() {
  return (
    <section className="card">
      <h1>Monthly Sales Chart</h1>

      <p>
        This page displays a Syncfusion React Column Chart. The chart data is
        fetched from the Next.js backend API route.
      </p>

      <div className="api-box">
        API Endpoint: /api/sales
      </div>

      <SalesChart />
    </section>
  );
}