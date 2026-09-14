import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading-font",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-font",
  display: "swap",
});

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
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
