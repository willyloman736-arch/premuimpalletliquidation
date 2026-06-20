import type { Metadata } from 'next';
import CheckoutView from '@/components/checkout/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Complete your Premium Pallet Liquidations order: shipping information, secure payment method and your cart summary.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
