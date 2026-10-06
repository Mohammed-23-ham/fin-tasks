import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "Fin Tasks | Simple Daily Task Manager",
  description:
    "Plan your day, organize priorities, and keep track of completed tasks with Fin Tasks, a simple personal task manager.",
  applicationName: "Fin Tasks",
  alternates: process.env.NEXT_PUBLIC_SITE_URL
    ? { canonical: "/" }
    : undefined,
  openGraph: {
    title: "Fin Tasks | Simple Daily Task Manager",
    description:
      "Plan your day, organize priorities, and keep track of completed tasks with Fin Tasks.",
    siteName: "Fin Tasks",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fin Tasks, a simple daily task manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fin Tasks | Simple Daily Task Manager",
    description:
      "Plan your day, organize priorities, and keep track of completed tasks with Fin Tasks.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    follow: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`h-full antialiased font-sans ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
