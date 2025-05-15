import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Document Processing App",
  description: "A free web-based document processing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              DocProcess
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/process" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Process
              </Link>
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Features
              </a>
              <div className="ml-2">
                <DarkModeToggle />
              </div>
            </nav>
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
