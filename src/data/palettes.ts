import type { Palette } from '@/types/palette';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

/** Category filters shown across the catalogue. */
export const categories = [
  'All',
  'Electronics',
  'Apparel',
  'Home',
  'Toys',
  'Sports',
  'Beauty',
] as const;

/** Condition grades used by the catalogue and admin. */
export const conditions = ['Grade A+', 'Grade A', 'Grade A-B', 'Grade B', 'Grade C'] as const;

/**
 * Bundled catalogue used when no Supabase database is configured. Imagery reuses
 * the migrated brand assets so the cards stay visually faithful. Connect a live
 * Supabase `palettes` table via NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY to override.
 */
export const seedPalettes: Palette[] = [
  {
    id: 1,
    title: 'Nike & Adidas Sneaker Pallet',
    description:
      'A loaded pallet of brand-name sneakers and athletic shoes — iconic silhouettes blending on-trend style with all-day comfort. Perfect for resellers chasing exclusive pieces at a fraction of retail.',
    price: 1290,
    original_price: 4200,
    condition: 'Grade A',
    quantity: 60,
    available: true,
    featured: true,
    limitedTime: true,
    category: 'Sports',
    origin: 'E-commerce returns — major US retailer',
    rating: 4.9,
    estimatedProfit: '+280%',
    content: ['Nike sneakers', 'Adidas trainers', 'Running shoes', 'Streetwear styles'],
    images: ['/images/products/sneakers-nike.jpg', '/images/products/crampons-football.jpg'],
  },
  {
    id: 2,
    title: 'Soccer Cleats & Footwear Pallet',
    description:
      'Cleats and performance footwear favored by amateur and pro players alike. Ideal for clubs, academies and resellers looking to stock quality gear at liquidation pricing.',
    price: 980,
    original_price: 3100,
    condition: 'Grade A-B',
    quantity: 48,
    available: true,
    featured: true,
    category: 'Sports',
    origin: 'Supplier overstock',
    rating: 4.7,
    estimatedProfit: '+240%',
    content: ['Molded cleats', 'Firm-ground cleats', 'Indoor / futsal shoes', 'Field accessories'],
    images: ['/images/products/crampons-football.jpg'],
  },
  {
    id: 3,
    title: 'Watches & Accessories Pallet',
    description:
      'Sharp-looking watches blending timeless style with everyday precision, ready to resell. A favorite of resellers and collectors hunting standout pieces at a deep discount.',
    price: 1450,
    original_price: 5200,
    condition: 'Grade A+',
    quantity: 75,
    available: true,
    featured: true,
    category: 'Electronics',
    origin: 'Jewelry store liquidation',
    rating: 4.8,
    estimatedProfit: '+300%',
    content: ['Analog watches', 'Smartwatches', 'Bands & straps', 'Gift boxes'],
    images: ['/images/products/montres-luxe.jpg'],
  },
  {
    id: 4,
    title: "Women's Apparel Multi-Brand Pallet",
    description:
      'On-trend womenswear for every season from the biggest names, packed at wholesale pricing. A perfect way for boutiques and online sellers to expand their inventory affordably.',
    price: 760,
    original_price: 2650,
    condition: 'Grade A',
    quantity: 120,
    available: true,
    featured: true,
    category: 'Apparel',
    origin: 'Fashion e-commerce returns',
    rating: 4.6,
    estimatedProfit: '+250%',
    content: ['Dresses', 'Tops & tees', 'Pants & jeans', 'Jackets & coats'],
    images: ['/images/products/vetements-femme.jpg'],
  },
  {
    id: 5,
    title: 'Consumer Electronics & Tech Pallet',
    description:
      'A tested mix of electronics and tech: accessories, audio and connected small appliances. Comfortable margins for resellers who specialize in the category.',
    price: 1690,
    original_price: 5400,
    condition: 'Grade B',
    quantity: 90,
    available: true,
    featured: false,
    category: 'Electronics',
    origin: 'Warehouse clearance',
    rating: 4.4,
    estimatedProfit: '+220%',
    content: ['Earbuds & headphones', 'Bluetooth speakers', 'Phone accessories', 'Small appliances'],
    images: ['/images/products/high-tech.jpg'],
  },
  {
    id: 6,
    title: 'Home & Décor Pallet',
    description:
      'Carefully selected home, décor and kitchenware items. Great for diversifying your stock with high-turnover everyday products shoppers always need.',
    price: 640,
    original_price: 2100,
    condition: 'Grade A-B',
    quantity: 140,
    available: true,
    featured: false,
    category: 'Home',
    origin: 'Big-box retailer overstock',
    rating: 4.5,
    estimatedProfit: '+230%',
    content: ['Décor', 'Kitchen & tableware', 'Linens', 'Storage & utensils'],
    images: ['/images/products/maison-deco.jpg'],
  },
  {
    id: 7,
    title: 'Toys & Games Pallet',
    description:
      'Brand-name toys, games and craft kits — perfect for peak-demand seasons. A reselling staple with attractive margins all year round.',
    price: 720,
    original_price: 2480,
    condition: 'Grade A',
    quantity: 160,
    available: true,
    featured: false,
    category: 'Toys',
    origin: 'Toy e-commerce returns',
    rating: 4.6,
    estimatedProfit: '+245%',
    content: ['Board games', 'Action figures', 'Arts & crafts', 'Early-learning toys'],
    images: ['/images/products/jouets-jeux.jpg'],
  },
  {
    id: 8,
    title: 'Beauty & Cosmetics Pallet',
    description:
      'A curated mix of beauty, skincare and cosmetics from recognized brands. A high-demand category, ideal for storefronts and marketplaces alike.',
    price: 880,
    original_price: 3050,
    condition: 'Grade A+',
    quantity: 200,
    available: true,
    featured: false,
    category: 'Beauty',
    origin: 'Cosmetics retailer liquidation',
    rating: 4.7,
    estimatedProfit: '+260%',
    content: ['Skincare', 'Makeup', 'Fragrance', 'Beauty tools'],
    images: ['/images/products/beaute-cosmetiques.jpg'],
  },
  {
    id: 9,
    title: "Men's Apparel Premium Pallet",
    description:
      'Multi-brand menswear and accessories, from everyday basics to premium pieces. A versatile pallet to broaden your offering with sought-after styles.',
    price: 690,
    original_price: 2300,
    condition: 'Grade A',
    quantity: 110,
    available: true,
    featured: false,
    category: 'Apparel',
    origin: 'Fashion e-commerce returns',
    rating: 4.5,
    estimatedProfit: '+235%',
    content: ['Shirts & polos', 'Pants', 'Jackets', 'Accessories'],
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
    category: String(row.category ?? 'All'),
    origin: row.origin ? String(row.origin) : undefined,
    rating: Number(row.rating ?? 4.5),
    content: Array.isArray(row.content) ? (row.content as string[]) : [],
    images:
      Array.isArray(row.images) && row.images.length
        ? (row.images as string[])
        : ['/images/products/placeholder.jpg'],
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
