import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GadgetAI Marketplace | Smart Electronics & Next-Gen Tech",
  description:
    "Explore futuristic AI gadgets, smart wearables, drones, and high-performance electronics integrated with Prisma PostgreSQL Express backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="gadgetai" className={inter.variable}>
      <body className="bg-base-100 text-base-content antialiased flex flex-col min-h-screen">
        <QueryProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
