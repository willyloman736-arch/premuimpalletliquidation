import type { Metadata } from 'next';
import { getPalettes, getAvailablePalettes } from '@/data/palettes';
import CatalogView from '@/components/palettes/CatalogView';

export const metadata: Metadata = {
  title: 'Nos Palettes',
  description:
    'Découvrez notre collection complète de palettes de liquidation premium : électronique, textile, maison, jouets, sport et beauté à prix grossiste.',
};

export default async function PalettesPage() {
  const palettes = getAvailablePalettes(await getPalettes());
  return <CatalogView palettes={palettes} />;
}
