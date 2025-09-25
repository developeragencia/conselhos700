import type { Metadata } from "next";
import "./globals.css";
import { HydrationProvider } from "@/components/HydrationProvider";

export const metadata: Metadata = {
  title: "Portal Esotérico - Conselhos Esotéricos",
  description: "Portal de conselhos esotéricos com consultas online e orientação espiritual",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Portal Esotérico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Portal Esotérico" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/CONSELHOS_20250521_110746_0000.png" />
        <link rel="icon" type="image/png" href="/CONSELHOS_20250521_110746_0000.png" />
      </head>
      <body className="bg-white">
        <HydrationProvider>
          {children}
        </HydrationProvider>
      </body>
    </html>
  );
}