/** Brand, contact and navigation constants shared across the site. */

export const site = {
  name: 'PPL',
  fullName: 'Premium Pallet Liquidations',
  title: 'Premium Pallet Liquidations — Wholesale Liquidation Pallets',
  tagline: 'Resale-ready liquidation pallets, shipped nationwide.',
  url: 'https://www.premiumpalletliquidations.com',
  description:
    'Premium Pallet Liquidations sources truckloads of brand-name overstock and customer returns from top US retailers — resale-ready pallets with real margins, shipped fast across the USA.',
  // NOTE: placeholder US contact details — replace with the real business info.
  email: 'sales@premiumpalletliquidations.com',
  supportEmail: 'support@premiumpalletliquidations.com',
  legalEmail: 'legal@premiumpalletliquidations.com',
  phone: '(888) 555-0142',
  phoneHref: 'tel:+18885550142',
  smsHref: 'sms:+18885550142',
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
