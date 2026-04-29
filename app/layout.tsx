import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter
} from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Trustiva Setu",
  description: "Healthcare Finance Infrastructure Platform",
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

        <Script id="google-translate-init" strategy="afterInteractive">
  {`
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,ur,or,as,sa',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    }
  `}
</Script>

<Script
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  strategy="afterInteractive"
/>

        {children}

      </body>
    </html>
  );
}
