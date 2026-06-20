import type { Metadata } from 'next';
import ContactView from '@/components/contact/ContactView';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez l'équipe PLF - Palette Liquidation France pour toutes vos questions sur nos palettes de liquidation, partenariats B2B et support. Réponse sous 24h.",
};

export default function ContactPage() {
  return <ContactView />;
}
