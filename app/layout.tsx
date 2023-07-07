import './globals.css';

import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { ModalProvider } from '@/provider/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ziya-Store-Admin',
  description: 'ziya cloth store inventory management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
