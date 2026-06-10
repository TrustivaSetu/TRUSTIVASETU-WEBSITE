import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Inter
} from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07111f",
};

export const metadata: Metadata = {
  title: "Trustiva Setu — Healthcare Financing Infrastructure",
  description: "India's fastest healthcare financing platform. No Cost EMI, 8–10 min approval, same day disbursal. Loan facilitation by Aarthsetu Technologies Private Limited. Not a bank or NBFC.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Trustiva Setu — Healthcare Financing Infrastructure",
    description: "No Cost EMI for healthcare. 8–10 min approval. Same day disbursal. Pan India network of clinics and lenders.",
    url: "https://www.trustivasetu.com",
    siteName: "Trustiva Setu",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trustiva Setu — Healthcare Financing Infrastructure",
    description: "No Cost EMI for healthcare. Loan facilitation platform by Aarthsetu Technologies.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trustiva Setu",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-(--font-inter) bg-[#07111f] text-white">

        {children}
        <CookieConsent />

      </body>
    </html>
  );
}
