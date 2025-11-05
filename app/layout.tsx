import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kirito - Full-Stack Software Engineer Portfolio",
    template: "%s | Kirito",
  },
  description: "Professional software engineering portfolio of Kirito, featuring full-stack development projects, technical expertise, and development metrics. Built with Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Kirito",
    "portfolio",
    "developer portfolio",
    "software engineer",
    "full-stack developer",
    "next.js",
    "framer motion",
    "github",
    "web developer",
    "react",
    "typescript",
    "tailwindcss",
  ],
  authors: [{ name: "Kirito" }],
  creator: "DevFolio Pro",
  publisher: "DevFolio Pro",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Kirito - Professional Software Engineering Portfolio",
    description: "Professional software engineering portfolio of Kirito, featuring full-stack development projects, technical expertise, and development metrics.",
    type: "website",
    locale: "en_US",
    siteName: "Kirito Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirito - Professional Software Engineering Portfolio",
    description: "Professional software engineering portfolio of Kirito, featuring full-stack development projects, technical expertise, and development metrics.",
    creator: "@kirito",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

