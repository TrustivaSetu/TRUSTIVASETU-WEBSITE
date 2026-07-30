import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Inter
} from "next/font/google";
import "./globals.css";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import CookieConsent from "@/components/ui/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClarityProvider from "@/components/ClarityProvider";

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
  metadataBase: new URL("https://www.trustivasetu.com"),
  title: "Medical Loans & No Cost Healthcare EMI in India | Trustiva Setu",
  description:
  "Get instant medical loans, No Cost EMI, IVF loans, dental loans, cosmetic surgery financing and healthcare EMI across India. Fast approvals through Trustiva Setu.",
  keywords: [
  "Healthcare Finance",
  "Medical Loan",
  "Healthcare Loan",
  "Medical EMI",
  "No Cost EMI",
  "Dental Loan",
  "IVF Loan",
  "Hair Transplant Loan",
  "Cosmetic Surgery Loan",
  "Patient Financing",
  "Clinic Financing",
  "Healthcare Lending",
  "Trustiva Setu",
  "Aarthsetu Technologies",
],

authors: [
  {
    name: "Aarthsetu Technologies Private Limited",
  },
],

creator: "Aarthsetu Technologies Private Limited",

publisher: "Aarthsetu Technologies Private Limited",

alternates: {
  canonical: "https://www.trustivasetu.com",
},
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},
  openGraph: {
    title: "Medical Loans & No Cost Healthcare EMI in India | Trustiva Setu",
    description:
  "Medical loans, IVF loans, dental financing, cosmetic surgery loans and No Cost EMI across India with fast approvals.",
    url: "https://www.trustivasetu.com",
    siteName: "Trustiva Setu",
    locale: "en_IN",
    type: "website",
    images: [
  {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Trustiva Setu",
  },
],
},
  twitter: {
    card: "summary_large_image",
    title: "Medical Loans & No Cost Healthcare EMI in India | Trustiva Setu",
    description:
  "Medical loans, healthcare EMI, IVF loans and dental financing with fast approvals across India.",
    images: ["/og-image.jpg"],  
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
        <ClarityProvider />
       <OrganizationSchema />
        {children}
        <CookieConsent />
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
)}
      </body>
    </html>
  );
}
