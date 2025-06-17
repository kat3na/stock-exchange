import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StockPro – Trade Smarter',
  description: 'Join the fastest-growing trading platform with real-time data and powerful tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white`}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
