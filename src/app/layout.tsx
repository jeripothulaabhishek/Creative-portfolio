import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const baseUrl = "https://abhishekportfolio.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ABHISHEK — Visual Creative · Graphic Designer · UI/UX Architect",
    template: "%s | ABHISHEK Visual Creative",
  },
  description:
    "Personal portfolio and digital experience studio of Abhishek. Specializing in brand identity systems, UI/UX design architecture, 3D art direction, high-converting social campaigns & Next.js creative development.",
  keywords: [
    "Abhishek Visual Creative",
    "Abhishek Graphic Designer",
    "Abhishek Portfolio",
    "Brand Identity Designer",
    "3D Art Director",
    "TEDx Design Lead",
    "UI UX Architect Hyderabad",
    "Creative Technologist",
    "Next.js Frontend Developer",
  ],
  authors: [{ name: "Abhishek Jeripothula" }],
  creator: "Abhishek Jeripothula",
  publisher: "Abhishek Jeripothula",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/my-image.png", sizes: "32x32", type: "image/png" },
      { url: "/my-image.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/my-image.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "ABHISHEK — Visual Creative, Graphic Designer & Creative Technologist",
    description:
      "I turn ideas into experiences. Art-directed portfolio showcasing brand architecture, UI/UX interfaces, 3D visual archives, and production web applications.",
    url: baseUrl,
    siteName: "Abhishek Portfolio",
    images: [
      {
        url: "/tedx-ace-2026/tedx-1.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Visual Creative Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABHISHEK — Visual Creative & UI/UX Architect",
    description:
      "I turn ideas into experiences. Art-directed portfolio showcasing brand identity systems, UI/UX architecture & Next.js applications.",
    images: ["/tedx-ace-2026/tedx-1.png"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      "name": "Abhishek Jeripothula",
      "jobTitle": "Visual Creative, Graphic Designer & Creative Technologist",
      "url": baseUrl,
      "sameAs": [
        "https://www.linkedin.com/in/jeripothulaabhishek",
        "https://www.behance.net/gallery/255509065/TEDx-ACE-Engineering-College-2026-Event-Branding",
        "https://github.com/jeripothulaabhishek",
      ],
      "knowsAbout": [
        "Brand Identity Architecture",
        "UI/UX Design",
        "Graphic Design",
        "Next.js",
        "React 19",
        "Three.js",
        "Motion Graphics",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Abhishek — Visual Creative Portfolio",
      "publisher": { "@id": `${baseUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F7F7F3] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#FFB800] selection:text-[#111111]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
