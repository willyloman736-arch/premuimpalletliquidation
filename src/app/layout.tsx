import type { Metadata, Viewport } from 'next';
import { Oswald, Inter, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SiteChrome from '@/components/layout/SiteChrome';
import LoadingScreen from '@/components/layout/LoadingScreen';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-mono-jb',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  keywords: [
    'liquidation pallets',
    'wholesale pallets',
    'buy liquidation pallets',
    'amazon return pallets',
    'overstock pallets',
    'pallet liquidation USA',
    'resale pallets',
    'Premium Pallet Liquidations',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.fullName,
    title: site.title,
    description: site.description,
    images: [{ url: '/images/backgrounds/fond.jpg', width: 1200, height: 630, alt: site.fullName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/images/backgrounds/fond.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: site.fullName,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  image: `${site.url}/images/backgrounds/fond.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1847 East Long Street',
    addressLocality: 'Carson City',
    addressRegion: 'NV',
    postalCode: '89706',
    addressCountry: 'US',
  },
  areaServed: 'US',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LoadingScreen />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="app-shell">
          <Header />
          <main id="main-content" className="main-content">
            {children}
          </main>
          <Footer />
          <SiteChrome />
        </div>
      </body>
    </html>
  );
}
