/** Brand, contact and navigation constants shared across the site. */

export const site = {
  name: 'PPL',
  fullName: 'Premium Pallet Liquidations',
  title: 'Premium Pallet Liquidations — Wholesale Liquidation Pallets',
  tagline: 'Resale-ready liquidation pallets, shipped nationwide.',
  url: 'https://www.premiumpalletliquidations.com',
  description:
    'Premium Pallet Liquidations sources truckloads of brand-name overstock and customer returns from top US retailers — resale-ready pallets with real margins, shipped fast across the USA.',
  // Primary inbox for all orders + customer enquiries.
  email: 'info@premiumpalletliquidations.com',
  supportEmail: 'info@premiumpalletliquidations.com',
  legalEmail: 'info@premiumpalletliquidations.com',
  // Contact line (also used for WhatsApp). Update here to change everywhere.
  phone: '(775) 445-9668',
  phoneHref: 'tel:+17754459668',
  smsHref: 'sms:+17754459668',
  // WhatsApp — wa.me requires the full international number, digits only.
  whatsapp: '+1 (775) 445-9668',
  whatsappNumber: '17754459668',
  whatsappHref: 'https://wa.me/17754459668',
  address: '4820 Logistics Parkway, Suite 200, Atlanta, GA 30336',
  addressLines: ['4820 Logistics Parkway, Suite 200', 'Atlanta, GA 30336', 'United States'],
  hours: 'Mon–Fri, 9am–6pm ET',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/',
  },
} as const;

/** Canonical route paths (English, corrected "pallet" spelling). */
export const routes = {
  home: '/',
  catalog: '/pallets',
  pallet: (id: number | string) => `/pallet/${id}`,
  about: '/about',
  contact: '/contact',
  cart: '/cart',
  checkout: '/checkout',
} as const;

export const navItems = [
  { path: '/', label: 'Home' },
  { path: '/pallets', label: 'Shop Pallets' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const;

export const legalLinks = [
  { path: '/legal/terms', label: 'Terms of Service' },
  { path: '/legal/sales', label: 'Terms of Sale' },
  { path: '/legal/privacy', label: 'Privacy Policy' },
  { path: '/legal/cookies', label: 'Cookie Policy' },
] as const;
