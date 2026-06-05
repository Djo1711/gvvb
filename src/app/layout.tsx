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
    default: "GVVB - Garches Vaucresson Volley-Ball",
    template: "%s | GVVB",
  },
  description:
    "Club de volley-ball de Garches et Vaucresson (92). Loisir, compétition et formations jeunes en Hauts-de-Seine.",
  keywords: ["volley-ball", "Garches", "Vaucresson", "92", "club", "sport"],
  openGraph: {
    title: "GVVB - Garches Vaucresson Volley-Ball",
    description:
      "Club de volley-ball de Garches et Vaucresson (92). Rejoignez-nous !",
    url: "https://gvvb.fr",
    siteName: "GVVB",
    locale: "fr_FR",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
