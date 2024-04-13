import "@/styles/globals.css";
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
          ? "dark text-foreground bg-background"
          : "light text-foreground bg-background"
      }
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <Footer />
    </div>
  );
}
