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
  metadataBase: new URL("https://www.trustivasetu.com"),
  title: "Trustiva Setu — Healthcare Financing Infrastructure",
  description: "India's fastest healthcare financing platform. No Cost EMI, 8–10 min approval, same day disbursal. Loan facilitation by Aarthsetu Technologies Private Limited. Not a bank or NBFC.",
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
    title: "Trustiva Setu — Healthcare Financing Infrastructure",
    description: "No Cost EMI for healthcare. 8–10 min approval. Same day disbursal. Pan India network of clinics and lenders.",
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
    title: "Trustiva Setu — Healthcare Financing Infrastructure",
    description: "No Cost EMI for healthcare. Loan facilitation platform by Aarthsetu Technologies.",
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
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trustiva Setu",
  url: "https://www.trustivasetu.com",
  logo: "https://www.trustivasetu.com/logo.png",
  description:
    "Healthcare financing infrastructure platform connecting patients, clinics and lenders across India.",
};
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-(--font-inter) bg-[#07111f] text-white">
       <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
        {children}
        <CookieConsent />

      </body>
    </html>
  );
}
