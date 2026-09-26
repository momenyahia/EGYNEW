import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Egypt Creative — One Agency. Everything Your Brand Needs.",
  description: "Egypt Creative is a premier creative & full-service marketing agency. Strategy, branding, cinematic video production, performance marketing, and bespoke web platforms.",
  keywords: [
    "Egypt Creative",
    "Creative Agency Egypt",
    "Marketing Agency Cairo",
    "Branding Cairo",
    "Performance Marketing",
    "Media Production Egypt"
  ],
  openGraph: {
    title: "Egypt Creative — One Agency. Everything Your Brand Needs.",
    description: "Creative & Full-Service Marketing Agency based in Cairo.",
    type: "website",
    locale: "en_US"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://egyptcreative.com/#organization",
        "name": "Egypt Creative",
        "alternateName": "إيجيبت كرييتف",
        "url": "https://egyptcreative.com",
        "logo": "https://egyptcreative.com/logo.png",
        "slogan": "One Agency. Everything Your Brand Needs.",
        "description": "Full-service creative, branding, film production, and performance marketing agency in Cairo, Egypt.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "The Greek Campus West, Mall of Arabia",
          "addressLocality": "6th of October City",
          "addressRegion": "Giza",
          "postalCode": "12588",
          "addressCountry": "EG"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+20-100-234-5678",
          "contactType": "customer service",
          "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
          "https://www.instagram.com/egyptcreative",
          "https://www.linkedin.com/company/egypt-creative"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://egyptcreative.com/#service",
        "name": "Egypt Creative Marketing & Production",
        "parentOrganization": { "@id": "https://egyptcreative.com/#organization" },
        "url": "https://egyptcreative.com",
        "priceRange": "$$$",
        "areaServed": ["Egypt", "Saudi Arabia", "United Arab Emirates", "Middle East"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Agency Disciplines",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Strategy & Identity" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cinematic Content & Film Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Media Buying & Performance Marketing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Platforms & Digital Solutions" } }
          ]
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${ibmPlexArabic.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#080808] text-[#F4F4F1] antialiased selection:bg-[#FFD400] selection:text-black"
      >
        {children}
      </body>
    </html>
  );
}
