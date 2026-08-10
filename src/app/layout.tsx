import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GVVB - Club de Volley-Ball à Garches et Vaucresson (92)",
    template: "%s | GVVB",
  },
  description:
    "Garches Vaucresson Volley-Ball - club affilié FFVolley en Hauts-de-Seine. Équipes compétition, loisir et jeunes M15. Inscriptions ouvertes.",
  keywords: ["volley-ball", "Garches", "Vaucresson", "92", "Hauts-de-Seine", "club sportif", "FFVolley", "loisir", "compétition", "jeunes"],
  metadataBase: new URL("https://gvvb.fr"),
  openGraph: {
    title: "GVVB - Club de Volley-Ball à Garches et Vaucresson (92)",
    description:
      "Garches Vaucresson Volley-Ball - club affilié FFVolley en Hauts-de-Seine. Équipes compétition, loisir et jeunes M15. Inscriptions ouvertes.",
    url: "https://gvvb.fr",
    siteName: "GVVB",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/logo-gvvb.png",
        width: 500,
        height: 500,
        alt: "Logo GVVB - Garches Vaucresson Volley-Ball",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Garches Vaucresson Volley-Ball",
  alternateName: "GVVB",
  url: "https://gvvb.fr",
  logo: "https://gvvb.fr/logo-gvvb.png",
  sport: "Volleyball",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Allée du Collège",
      addressLocality: "Vaucresson",
      postalCode: "92420",
      addressCountry: "FR",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "20 rue de Suresnes",
      addressLocality: "Garches",
      postalCode: "92380",
      addressCountry: "FR",
    },
  ],
  sameAs: [
    "https://www.instagram.com/volley_gvvb",
    "https://www.facebook.com/gvvb.fr",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
