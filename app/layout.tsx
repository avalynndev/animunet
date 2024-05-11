import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Animunet`,
  description:
    "Welcome to Animunet, your ultimate anime destination! Stream your favorite anime titles in sync with friends and explore a vast library of series and movies.",
  keywords: [
    "anime",
    "streaming",
    "download",
    "anime streaming",
    "free anime",
    "english anime",
    "free download",
    "anime list",
    "english sub",
    "kiss-anime",
    "english dub",
    "watch anime online",
  ],
  authors: [
    {
      name: "avalynndev",
      url: "https://avalynn.vercel.app/",
    },
  ],
  revision: "1.0",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "google-site-verification": "ls1OUoOoLjxYsmKMPQ1ML9P99TWDsm7d5hfnGQjW7Tw",
    "X-Frame-Options": "SAMEORIGIN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
