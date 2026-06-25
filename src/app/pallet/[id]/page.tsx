import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { getPalettes, getPaletteById, getAvailablePalettes, seedPalettes } from '@/data/palettes';
import { site } from '@/lib/site';
import PaletteDetailView from '@/components/palettes/PaletteDetailView';
import s from '@/components/palettes/PaletteDetailView.module.css';

interface PaletteDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return seedPalettes.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PaletteDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const palettes = await getPalettes();
  const palette = getPaletteById(palettes, id);

  if (!palette) {
    return {
      title: 'Pallet not found',
      description: "The pallet you're looking for doesn't exist or is no longer available.",
    };
  }

  return {
    title: palette.title,
    description: palette.description,
  };
}

export default async function PaletteDetailPage({ params }: PaletteDetailPageProps) {
  const { id } = await params;
  const palettes = await getPalettes();
  const palette = getPaletteById(palettes, id);

  if (!palette) {
    return (
      <div className={s['palette-not-found']}>
        <div className="container">
          <Package size={64} aria-hidden="true" />
          <h2>Pallet not found</h2>
          <p>The pallet you&apos;re looking for doesn&apos;t exist or is no longer available.</p>
          <Link href="/pallets" className={s['btn-back']}>
            <ArrowLeft size={18} aria-hidden="true" />
            Back to pallets
          </Link>
        </div>
      </div>
    );
  }

  const related = getAvailablePalettes(palettes)
    .filter((p) => p.id !== palette.id && p.category === palette.category)
    .slice(0, 3);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: palette.title,
    description: palette.description,
    image: palette.images.map((img) => `${site.url}${img}`),
    sku: `PPL-${palette.id}`,
    brand: { '@type': 'Brand', name: site.fullName },
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      url: `${site.url}/pallet/${palette.id}`,
      priceCurrency: 'USD',
      price: palette.price,
      availability: palette.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/UsedCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <PaletteDetailView palette={palette} related={related} />
    </>
  );
}
