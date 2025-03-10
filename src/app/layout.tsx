import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Figmir",
  description: "Figmir",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
      suppressHydrationWarning={true}
    >
      <body>{children}</body>
    </html>
  );
}
