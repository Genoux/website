import type { Metadata } from "next";
import { Alexandria } from 'next/font/google'
import { cn } from '@/lib/utils'
import "./globals.css";

const alexandria = Alexandria({
  subsets: ['latin'],
  variable: '--font-alexandria',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'max-w-page relative bg-background font-alexandria text-white antialiased dark',
          alexandria.variable
        )}
      >
         <div className="pattern-overlay z-50" />
        {children}
      </body>
    </html>
  );
}
