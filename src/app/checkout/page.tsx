import type { Metadata } from 'next';
import CheckoutView from '@/components/checkout/CheckoutView';

export const metadata: Metadata = {
  title: 'Commande',
  description:
    'Finalisez votre commande PLF - Palette Liquidation France : informations de livraison, mode de paiement sécurisé et récapitulatif de votre panier de palettes.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
