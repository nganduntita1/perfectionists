import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Perfectionists | Digital Design & Engineering Agency",
  description: "We design and engineer bespoke software, interfaces, and AI automation for ambitious brands. No templates. Zero compromise.",
  openGraph: {
    title: "Perfectionists | Digital Design & Engineering Agency",
    description: "We design and engineer bespoke software, interfaces, and AI automation for ambitious brands. No templates. Zero compromise.",
    url: "https://perfectionists.co.za",
    siteName: "The Perfectionists",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfectionists | Digital Design & Engineering Agency",
    description: "We design and engineer bespoke software, interfaces, and AI automation for ambitious brands. No templates. Zero compromise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
