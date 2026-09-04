import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CDO Ads & VA Experts | Facebook Ads Management & Virtual Assistant Services',
    template: '%s | CDO Ads & VA Experts',
  },
  description: 'Expert Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products. Based in Cagayan de Oro City, Philippines. Book a free consultation today.',
  keywords: ['Facebook Ads', 'Social Media Management', 'Virtual Assistant', 'Digital Marketing', 'Cagayan de Oro', 'CDO Ads', 'VA Experts'],
  authors: [{ name: 'CDO Ads & VA Experts' }],
  creator: 'CDO Ads & VA Experts',
  publisher: 'CDO Ads & VA Experts',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cdoadsvaexperts.com',
    siteName: 'CDO Ads & VA Experts',
    title: 'CDO Ads & VA Experts | Scale Your Business with Expert Ads & VA Support',
    description: 'Expert Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products. Book a free consultation today.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CDO Ads & VA Experts - Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CDO Ads & VA Experts | Facebook Ads & VA Services',
    description: 'Expert Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0A0F1D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-navy text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}