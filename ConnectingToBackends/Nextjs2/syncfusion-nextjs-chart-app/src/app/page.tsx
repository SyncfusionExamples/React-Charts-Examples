import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="card">
      <h1>
        Building a Next.js Application with Syncfusion React Chart and Routing
      </h1>

      <p>
        This sample demonstrates how to create a Next.js application using the
        Syncfusion React Chart component, Next.js App Router, a backend API route,
        and simple page navigation.
      </p>

      <h2>What this sample includes</h2>

      <ul>
        <li>Next.js project created using Visual Studio Code</li>
        <li>Syncfusion React Chart component</li>
        <li>Simple backend API route using route.ts</li>
        <li>Static sales data returned from the backend</li>
        <li>Navigation between Home page and Chart page</li>
        <li>Column chart with tooltip, legend, and data labels</li>
      </ul>

      <h2>Application URLs</h2>

      <div className="api-box">
        Home Page: http://localhost:3000
      </div>

      <div className="api-box">
        Chart Page: http://localhost:3000/chart
      </div>

      <div className="api-box">
        Backend API: http://localhost:3000/api/sales
      </div>

      <Link href="/chart" className="button-link">
        View Sales Chart
      </Link>
    </section>
  );
}