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
  metadataBase: new URL("https://egyptcreative.com"),
  title: {
    default: "Egypt Creative — One Agency. Everything Your Brand Needs.",
    template: "%s | Egypt Creative"
  },
  description:
    "Egypt Creative is a premier creative & full-service marketing agency based in Cairo. Brand strategy, cinematic video production, performance marketing, and bespoke web platforms.",
  keywords: [
    "Egypt Creative",
    "Creative Agency Egypt",
    "Marketing Agency Cairo",
    "Branding Cairo",
    "Performance Marketing Egypt",
    "Media Production Cairo",
    "إيجيبت كرييتف",
    "وكالة تسويق ودعاية مصر"
  ],
  authors: [{ name: "Egypt Creative Team" }],
  creator: "Egypt Creative",
  openGraph: {
    title: "Egypt Creative — One Agency. Everything Your Brand Needs.",
    description:
      "Premier creative & full-service marketing agency based in Cairo. Strategy, branding, cinematic video production, and bespoke web platforms.",
    url: "https://egyptcreative.com",
    siteName: "Egypt Creative",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Egypt Creative — Creative & Full-Service Marketing Agency"
      }
    ],
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Creative — One Agency. Everything Your Brand Needs.",
    description:
      "Premier creative & full-service marketing agency based in Cairo. Strategy, branding, cinematic video production, and bespoke web platforms.",
    images: ["/logo.png"],
    creator: "@egyptcreative"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
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
