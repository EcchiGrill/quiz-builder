import '@/styles/globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Jersey_20, Work_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/providers/ThemeProvider';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

const jersey20 = Jersey_20({
  weight: '400',
  variable: '--font-jersey-20',
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
      <body className={`${workSans.variable} ${jersey20.variable}`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
