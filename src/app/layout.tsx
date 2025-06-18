import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dai Phan Portfolio - Frontend Engineer & AI Specialist",
  description:
    "Experienced Frontend Engineer with 3+ years in React, Next.js, TypeScript and 1+ year in AI/ML. Specialized in building scalable web applications and AI-powered solutions.",
  keywords: [
    "Dai Phan",
    "Frontend Engineer",
    "AI Specialist",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "AI/ML Engineer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "San Francisco",
    "Frontend Development",
    "Machine Learning",
    "OpenAI API",
    "TensorFlow",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Dai Phan" }],
  creator: "Dai Phan",
  publisher: "Dai Phan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://daiphan.dev"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://daiphan.dev", // Replace with your actual domain
    siteName: "Dai Phan Portfolio",
    title: "Dai Phan - Frontend Engineer & AI Specialist",
    description:
      "Experienced Frontend Engineer with 3+ years in React, Next.js, TypeScript and 1+ year in AI/ML. Building innovative digital experiences through cutting-edge technologies.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Dai Phan - Frontend Engineer & AI Specialist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dai Phan - Frontend Engineer & AI Specialist",
    description:
      "Experienced Frontend Engineer with 3+ years in React, Next.js, TypeScript and 1+ year in AI/ML.",
    images: ["/og-image.jpg"], // Same image as Open Graph
    creator: "@daiphan", // Replace with your actual Twitter handle
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dai Phan",
              jobTitle: "Frontend Engineer & AI Specialist",
              description:
                "Experienced Frontend Engineer with 3+ years in React, Next.js, TypeScript and 1+ year in AI/ML",
              url: "https://daiphan.dev",
              sameAs: [
                "https://linkedin.com/in/daiphan",
                "https://github.com/daiphan",
                "https://twitter.com/daiphan",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                addressCountry: "US",
              },
              email: "dai.phan@example.com",
              telephone: "+1-555-123-4567",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Python",
                "AI/ML",
                "TensorFlow",
                "OpenAI API",
                "Frontend Development",
                "Web Development",
              ],
              alumniOf: {
                "@type": "Organization",
                name: "Web Development",
              },
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#0891b2" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
