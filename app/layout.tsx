import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Animeverse || Watch Anime Online For Free`,
  description:
    "Welcome to Animeverse – your ultimate anime destination! Stream your favorite anime titles in sync with friends and explore a vast library of series and movies. Join our vibrant community for an unforgettable anime-watching experience!",
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
      name: "Animeverse",
      url: "https://animeverse-sagas.vercel.app/",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
