"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check local storage for theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className={
            theme === "dark"
              ? "scrollbar scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent h-screen overflow-y-scroll dark text-foreground bg-background"
              : "scrollbar scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent h-screen overflow-y-scroll light text-foreground bg-background"
          }
        >
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <NextUIProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </NextUIProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
