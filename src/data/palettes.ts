import type { Palette } from '@/types/palette';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

/** Category filters shown across the catalogue. */
export const categories = [
  'Tous',
  'Électronique',
  'Textile',
  'Maison',
  'Jouets',
  'Sport',
  'Beauté',
] as const;

/** Condition grades used by the catalogue and admin. */
export const conditions = ['Grade A+', 'Grade A', 'Grade A-B', 'Grade B', 'Grade C'] as const;

/**
 * Bundled catalogue used when no Supabase database is configured. The imagery
 * reuses the genuine brand assets migrated from the reference site so the
 * cards stay visually faithful. Swap in a live Supabase `palettes` table by
 * setting NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export const seedPalettes: Palette[] = [
  {
    id: 1,
    title: 'Palette Sneakers Nike & Adidas',
    description:
      "Lot de baskets et sneakers des plus grandes marques, modèles iconiques mêlant style tendance et confort. Parfait pour les revendeurs à la recherche de pièces exclusives à prix réduits.",
    price: 1290,
    original_price: 4200,
    condition: 'Grade A',
    quantity: 60,
    available: true,
    featured: true,
    limitedTime: true,
    category: 'Sport',
    origin: 'Retour e-commerce — grande enseigne',
    rating: 4.9,
    estimatedProfit: '+280%',
    content: ['Baskets Nike', 'Sneakers Adidas', 'Chaussures running', 'Modèles streetwear'],
    images: ['/images/products/sneakers-nike.jpg', '/images/products/crampons-football.jpg'],
  },
  {
    id: 2,
    title: 'Palette Chaussures & Crampons Football',
    description:
      "Crampons et chaussures de football prisés par les joueurs amateurs comme professionnels. Idéal pour les clubs, académies et revendeurs cherchant du matériel de qualité.",
    price: 980,
    original_price: 3100,
    condition: 'Grade A-B',
    quantity: 48,
    available: true,
    featured: true,
    category: 'Sport',
    origin: 'Surstock fournisseur',
    rating: 4.7,
    estimatedProfit: '+240%',
    content: ['Crampons moulés', 'Crampons vissés', 'Chaussures de futsal', 'Accessoires terrain'],
    images: ['/images/products/crampons-football.jpg'],
  },
  {
    id: 3,
    title: 'Palette Montres & Accessoires',
    description:
      "Montres élégantes mêlant style intemporel et précision horlogère, directement à votre portée. Idéal pour les revendeurs et collectionneurs en quête de pièces à prix réduit.",
    price: 1450,
    original_price: 5200,
    condition: 'Grade A+',
    quantity: 75,
    available: true,
    featured: true,
    category: 'Électronique',
    origin: 'Liquidation bijouterie',
    rating: 4.8,
    estimatedProfit: '+300%',
    content: ['Montres analogiques', 'Montres connectées', 'Bracelets', 'Coffrets cadeaux'],
    images: ['/images/products/montres-luxe.jpg'],
  },
  {
    id: 4,
    title: 'Palette Vêtements Femme Multimarques',
    description:
      "Vêtements tendance pour toutes les saisons, issus des plus grandes marques, en palette à prix grossiste. Une opportunité parfaite pour boutiques et e-commerçants.",
    price: 760,
    original_price: 2650,
    condition: 'Grade A',
    quantity: 120,
    available: true,
    featured: true,
    category: 'Textile',
    origin: 'Retour e-commerce mode',
    rating: 4.6,
    estimatedProfit: '+250%',
    content: ['Robes', 'Hauts & t-shirts', 'Pantalons & jeans', 'Vestes & manteaux'],
    images: ['/images/products/vetements-femme.jpg'],
  },
  {
    id: 5,
    title: 'Palette High-Tech & Électronique',
    description:
      "Lot de produits électroniques et high-tech testés : accessoires, audio et petit électroménager connecté. Une marge confortable pour les revendeurs spécialisés.",
    price: 1690,
    original_price: 5400,
    condition: 'Grade B',
    quantity: 90,
    available: true,
    featured: false,
    category: 'Électronique',
    origin: 'Déstockage entrepôt',
    rating: 4.4,
    estimatedProfit: '+220%',
    content: ['Écouteurs & casques', 'Enceintes Bluetooth', 'Accessoires smartphone', 'Petit électroménager'],
    images: ['/images/products/high-tech.jpg'],
  },
  {
    id: 6,
    title: 'Palette Maison & Décoration',
    description:
      "Articles de maison, décoration et art de la table soigneusement sélectionnés. Idéal pour diversifier votre stock avec des produits du quotidien à forte rotation.",
    price: 640,
    original_price: 2100,
    condition: 'Grade A-B',
    quantity: 140,
    available: true,
    featured: false,
    category: 'Maison',
    origin: 'Surstock grande surface',
    rating: 4.5,
    estimatedProfit: '+230%',
    content: ['Décoration', 'Art de la table', 'Linge de maison', 'Rangement & ustensiles'],
    images: ['/images/products/maison-deco.jpg'],
  },
  {
    id: 7,
    title: 'Palette Jouets & Jeux',
    description:
      "Jouets, jeux et loisirs créatifs des grandes marques, parfaits pour les périodes de forte demande. Un classique de la revente avec une marge attractive toute l'année.",
    price: 720,
    original_price: 2480,
    condition: 'Grade A',
    quantity: 160,
    available: true,
    featured: false,
    category: 'Jouets',
    origin: 'Retour e-commerce jouets',
    rating: 4.6,
    estimatedProfit: '+245%',
    content: ['Jeux de société', 'Figurines', 'Loisirs créatifs', "Jeux d'éveil"],
    images: ['/images/products/jouets-jeux.jpg'],
  },
  {
    id: 8,
    title: 'Palette Beauté & Cosmétiques',
    description:
      "Sélection de produits de beauté, soins et cosmétiques de marques reconnues. Un secteur à forte demande, idéal pour boutiques physiques et marketplaces.",
    price: 880,
    original_price: 3050,
    condition: 'Grade A+',
    quantity: 200,
    available: true,
    featured: false,
    category: 'Beauté',
    origin: 'Liquidation parfumerie',
    rating: 4.7,
    estimatedProfit: '+260%',
    content: ['Soins visage', 'Maquillage', 'Parfums', 'Accessoires beauté'],
    images: ['/images/products/beaute-cosmetiques.jpg'],
  },
  {
    id: 9,
    title: 'Palette Mode Homme Premium',
    description:
      "Vêtements et accessoires homme multimarques, du basique au premium. Une palette polyvalente pour élargir votre offre avec des pièces recherchées.",
    price: 690,
    original_price: 2300,
    condition: 'Grade A',
    quantity: 110,
    available: true,
    featured: false,
    category: 'Textile',
    origin: 'Retour e-commerce mode',
    rating: 4.5,
    estimatedProfit: '+235%',
    content: ['Chemises & polos', 'Pantalons', 'Vestes', 'Accessoires'],
    images: ['/images/products/mode-homme.jpg'],
  },
];

/** Normalise a row coming from Supabase into the local Palette shape. */
function normalize(row: Record<string, unknown>): Palette {
  return {
    id: Number(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    price: Number(row.price ?? 0),
    original_price: Number(row.original_price ?? 0),
    condition: String(row.condition ?? 'Grade A'),
    quantity: Number(row.quantity ?? 0),
    weight: row.weight ? String(row.weight) : undefined,
    dimensions: row.dimensions ? String(row.dimensions) : undefined,
    available: row.available !== false,
    featured: Boolean(row.featured),
    limitedTime: Boolean(row.limitedTime ?? row.limited_time),
    category: String(row.category ?? 'Tous'),
    origin: row.origin ? String(row.origin) : undefined,
    rating: Number(row.rating ?? 4.5),
    content: Array.isArray(row.content) ? (row.content as string[]) : [],
    images: Array.isArray(row.images) && row.images.length ? (row.images as string[]) : ['/images/products/placeholder.jpg'],
    estimatedProfit: String(row.estimatedProfit ?? row.estimated_profit ?? ''),
  };
}

/**
 * Returns the catalogue. Uses Supabase when configured, otherwise the bundled
 * seed data. Safe to call from Server Components.
 */
export async function getPalettes(): Promise<Palette[]> {
  if (!isSupabaseConfigured()) return seedPalettes;
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!.from('palettes').select('*');
    if (error || !data || data.length === 0) return seedPalettes;
    return data.map(normalize);
  } catch {
    return seedPalettes;
  }
}

export const getFeaturedPalettes = (list: Palette[]): Palette[] => list.filter((p) => p.featured);

export const getAvailablePalettes = (list: Palette[]): Palette[] => list.filter((p) => p.available);

export const getPaletteById = (list: Palette[], id: number | string): Palette | undefined =>
  list.find((p) => p.id === Number(id));
