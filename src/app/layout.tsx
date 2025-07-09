import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

import { Providers } from "@/app/providers";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

export const fontDm = DM_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "PZMK",
  description: "PZMK tech task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${fontDm.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
