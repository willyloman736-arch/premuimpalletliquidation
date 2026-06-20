import type { Metadata } from 'next';
import CartView from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Cart',
  description:
    'Review your Premium Pallet Liquidations cart: adjust quantities, apply a promo code and check out your liquidation pallet order.',
};

export default function CartPage() {
  return <CartView />;
}
