import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Without this every per-page `alternates.canonical` stays relative, and a
  // relative canonical is the same as no canonical at all.
  metadataBase: new URL(SITE_URL),
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
      {/* No stylesheet and no boot class here on purpose. globals.css is the
          HOME PAGE's stylesheet - it styles the hero, the crown, the fluid sky
          and the shot plate, and it claims generic names like .hero and .h2
          that the inner pages define differently. Each route imports the sheet
          it was designed against instead, so the pages cannot restyle each
          other. nav-boot goes with it: it holds the nav closed for the crown
          intro, which only the home page plays. */}
      <body>{children}</body>
    </html>
  );
}
