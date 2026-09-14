import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Mahmoud Elbokl | Senior Flutter & Mobile Engineer",
  description: "Senior Mobile Engineer specializing in Flutter, Dart, iOS, Android, Clean Architecture, and High-Performance Mobile Applications.",
  keywords: ["Flutter", "Dart", "Mobile Developer", "iOS", "Android", "Mahmoud Elbokl", "Senior Flutter Developer", "Clean Architecture"],
  authors: [{ name: "Mahmoud Elbokl" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mahmoud Elbokl | Senior Flutter & Mobile Engineer",
    description: "Senior Mobile Engineer specializing in Flutter, Dart, iOS, Android, and Clean Architecture.",
    type: "website",
    locale: "en_US",
    url: "https://mahmoudelbokl.com",
    siteName: "Mahmoud Elbokl Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
