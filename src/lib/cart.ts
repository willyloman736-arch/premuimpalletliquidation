import type { CartItem, Palette } from '@/types/palette';

const CART_KEY = 'plf_cart';
const CART_EVENT = 'cart-updated';

/** Reads the cart from localStorage (safe on the server — returns []). */
export function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || '[]') as CartItem[];
  } catch {
    return [];
  }
}

/** Persists the cart and notifies the header to refresh its badge. */
export function writeCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

/** Total number of articles across all line items. */
export function cartCount(items: CartItem[] = readCart()): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Adds a pallet (optionally several units) to the cart. */
export function addPaletteToCart(palette: Palette, quantity = 1): void {
  const cart = readCart();
  const existing = cart.find((item) => item.id === palette.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: palette.id,
      name: palette.title,
      description: palette.description,
      price: palette.price,
      originalValue: palette.original_price,
      image: palette.images[0],
      category: palette.category || 'Palette',
      quantity,
    });
  }
  writeCart(cart);
}

/** Subscribes to cart changes (storage + same-tab custom event). Returns an unsubscribe fn. */
export function onCartChange(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CART_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CART_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export { CART_KEY, CART_EVENT };
