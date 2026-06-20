import type { Metadata, Viewport } from 'next';
import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SiteChrome from '@/components/layout/SiteChrome';
import LoadingScreen from '@/components/layout/LoadingScreen';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.title,
  authors: [{ name: site.fullName }],
  keywords: [
    'palette de liquidation',
    'palette liquidation France',
    'achat palette',
    'palette revente',
    'liquidation stock',
    'palette destockage',
    'PLF',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: site.url,
    siteName: site.title,
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
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: site.title,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/images/backgrounds/fond.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '281 Rue Blanche SELVA',
    postalCode: '66000',
    addressLocality: 'Perpignan',
    addressCountry: 'FR',
  },
  areaServed: 'FR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LoadingScreen />
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <div className="layout-shell">
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
