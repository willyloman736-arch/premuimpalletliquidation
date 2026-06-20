import type { Metadata } from 'next';
import { getPalettes, getAvailablePalettes } from '@/data/palettes';
import CatalogView from '@/components/palettes/CatalogView';

export const metadata: Metadata = {
  title: 'Shop Pallets',
  description:
    'Browse our full lineup of premium liquidation pallets — electronics, apparel, home, toys, sports and beauty at wholesale pricing, shipped nationwide across the USA.',
};

export default async function PalettesPage() {
  const palettes = getAvailablePalettes(await getPalettes());
  return <CatalogView palettes={palettes} />;
}
