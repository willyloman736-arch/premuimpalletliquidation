import { getPalettes, getFeaturedPalettes } from '@/data/palettes';
import HomeView from '@/components/home/HomeView';

export default async function HomePage() {
  const palettes = await getPalettes();
  return <HomeView featured={getFeaturedPalettes(palettes)} palettes={palettes} />;
}
