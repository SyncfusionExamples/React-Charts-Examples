import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Syncfusion Next.js Chart App',
  description:
    'A beginner-friendly Syncfusion React Chart sample with Next.js routing and backend API'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="logo">
              Chart App
            </Link>

            <Link href="/" className="nav-link">
              Home
            </Link>

            <Link href="/chart" className="nav-link">
              Sales Chart
            </Link>
          </div>
        </nav>

        <main className="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}