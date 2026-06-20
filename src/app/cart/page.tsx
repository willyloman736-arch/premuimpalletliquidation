import type { Metadata } from 'next';
import CartView from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Panier',
  description:
    'Consultez votre panier PLF - Palette Liquidation France : ajustez les quantités, appliquez un code promo et finalisez votre commande de palettes de liquidation.',
};

export default function CartPage() {
  return <CartView />;
}
