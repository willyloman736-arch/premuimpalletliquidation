import type { Metadata } from 'next';
import ContactView from '@/components/contact/ContactView';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact the Premium Pallet Liquidations team with questions about our liquidation pallets, B2B partnerships and support. We reply within 24 hours.',
};

export default function ContactPage() {
  return <ContactView />;
}
