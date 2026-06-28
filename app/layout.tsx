import type { Metadata } from "next";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Picked by Locals - Dog-Friendly Places in Martin County, FL",
  description: "Discover the best dog-friendly beaches, restaurants, parks, and breweries in Martin County, Florida. Curated listings with hours, reviews, and dog policies.",
  keywords: "dog-friendly Martin County, dogs beaches Stuart FL, pet friendly restaurants Florida",
  openGraph: {
    title: "Picked by Locals - Dog-Friendly Places in Martin County",
    description: "Find dog-friendly spots perfect for your pup across Martin County, FL",
    url: "https://pickedbylocals.com",
    siteName: "Picked by Locals",
    images: [
      {
        url: "https://pickedbylocals.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Picked by Locals",
              description: "Curated dog-friendly places directory for Martin County, Florida",
              url: "https://pickedbylocals.com",
              logo: "https://pickedbylocals.com/logo.png",
              areaServed: {
                "@type": "City",
                name: "Stuart",
                addressCountry: "US",
                addressRegion: "FL",
              },
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
        <Header />
        <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
          {children}
        </main>
        <GoogleAnalytics gaId="G-50ZJ1GJBXW" />
      </body>
    </html>
  );
} 