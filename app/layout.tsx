import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "The EM Creative Studio — Brands that earn their crown",
  description:
    "SEO, web design and brand systems for companies that refuse to blend in. A boutique creative studio in Los Angeles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&family=Manrope:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="/scripts/lottie.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
