import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quiz Builder',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${workSans.variable}`}>{children}</body>
    </html>
  );
}
