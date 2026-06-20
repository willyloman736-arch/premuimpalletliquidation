import { getPalettes, getAvailablePalettes } from '@/data/palettes';
import HomeView from '@/components/home/HomeView';

export default async function HomePage() {
  const palettes = await getPalettes();
  return <HomeView featured={getAvailablePalettes(palettes)} />;
}
