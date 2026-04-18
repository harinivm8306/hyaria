import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HY-ARIA | Smart Growth Evolution",
  description: "AI-Driven Automated Aeroponic Farming System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased bg-bg-dark text-text-main min-h-screen flex flex-col`}>
        {/* Background Effects */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
          <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
