'use client'; // Make it a Client Component

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileContextProvider } from "@/context/FileContext";
import { usePathname } from 'next/navigation'; // Import usePathname



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeaderFooter = !pathname.startsWith('/editor');

  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <FileContextProvider>
          {showHeaderFooter && <Header />}
          {children}
          {showHeaderFooter && <Footer />}
        </FileContextProvider>
      </body>
    </html>
  );
}
