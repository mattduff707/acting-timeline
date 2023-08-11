import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './Header';

export const metadata: Metadata = {
  title: 'Acting Timeline',
  description: 'A visual representation of a career in acting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  timeline: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full bg-slate-800">
        <Header />
        {children}
      </body>
    </html>
  );
}
