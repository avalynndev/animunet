import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
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
    <div
      className={
        theme === "dark"
          ? "scrollbar scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent h-screen overflow-y-scroll dark text-foreground bg-background"
          : "scrollbar scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent h-screen overflow-y-scroll light text-foreground bg-background"
      }
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <NextUIProvider>
        <Component {...pageProps} />

        <Analytics />
        <SpeedInsights />
      </NextUIProvider>
      <Footer />
    </div>
  );
}
