import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import portfolio from "@/portfolio.config";
import { appearanceInitScript } from "@/lib/appearance";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const { appearance } = portfolio;

export const metadata: Metadata = {
  title: portfolio.site.title,
  description: portfolio.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-bs-theme={appearance.defaultTheme}
      data-font={appearance.defaultFont}
      data-text-size={appearance.defaultTextSize}
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the visitor's saved theme and text format before the first paint */}
        <script dangerouslySetInnerHTML={{ __html: appearanceInitScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
