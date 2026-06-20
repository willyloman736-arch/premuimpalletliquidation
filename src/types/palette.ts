/** A liquidation pallet product. Mirrors the original Supabase `palettes` table. */
export interface Palette {
  id: number;
  title: string;
  description: string;
  price: number;
  original_price: number;
  /** Grade A+, Grade A, Grade A-B, Grade B, Grade C */
  condition: string;
  /** Number of items contained in the pallet. */
  quantity: number;
  weight?: string;
  dimensions?: string;
  available: boolean;
  featured: boolean;
  limitedTime?: boolean;
  /** Électronique, Textile, Maison, Jouets, Sport, Beauté */
  category: string;
  origin?: string;
  rating: number;
  /** Bullet list describing the pallet contents. */
  content?: string[];
  /** Image URLs (local /images/... or remote Cloudinary/Supabase). */
  images: string[];
  /** Estimated resale profit, e.g. "+250%". */
  estimatedProfit: string;
}

/** A line item stored in localStorage under `plf_cart`. */
export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalValue: number;
  image?: string;
  category: string;
  quantity: number;
}
