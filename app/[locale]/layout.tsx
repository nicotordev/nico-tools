import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Fira_Code, Space_Grotesk } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

// Base URL for metadata
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.15 0 0)' },
    { media: '(prefers-color-scheme: light)', color: 'oklch(0.98 0 0)' },
  ],
};

export const metadata: Metadata = {
  title: 'Nico-Tools | Developer & Design Utilities',
  description:
    'A comprehensive suite of web-based utilities for developers and designers with tools for image optimization, encoding/decoding, code formatting, and more.',
  keywords: [
    'developer tools',
    'design utilities',
    'web tools',
    'image optimization',
    'code formatter',
    'JSON tools',
    'color converter',
    'text tools',
  ],
  creator: 'Nico-Tools Team',
  publisher: 'Spiritory',
  authors: [{ name: 'Nico-Tools Team' }],
  // Add metadataBase for resolving relative URLs in OG and Twitter images
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    title: 'Nico-Tools | Developer & Design Utilities',
    description:
      'A comprehensive suite of web-based utilities for developers and designers',
    siteName: 'Nico-Tools',
    url: 'https://nico-tools.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nico-Tools - Developer & Design Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nico-Tools | Developer & Design Utilities',
    description:
      'A comprehensive suite of web-based utilities for developers and designers',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${firaCode.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
