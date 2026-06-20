/** Brand, contact and navigation constants shared across the site. */

export const site = {
  name: 'PLF',
  fullName: 'Palette Liquidation France',
  title: 'PLF - Palette Liquidation France',
  url: 'https://www.paletteliquidation.fr',
  description:
    "Palette Liquidation France, votre partenaire de confiance pour l'achat de palettes de liquidation de qualité.",
  email: 'paletteliquidation@outlook.com',
  /** Email used across the legal pages of the reference site. */
  legalEmail: 'liquidation.palette@gmail.com',
  phone: '+33 7 56 86 75 16',
  phoneHref: 'tel:+33756867516',
  address: '281 Rue Blanche SELVA, 66000 Perpignan, France',
  whatsapp: 'https://wa.me/message/FOGAF3A4N5F3N1',
  social: {
    facebook: 'https://www.paletteliquidation.fr/',
    instagram: 'https://www.paletteliquidation.fr/',
    twitter: 'https://www.paletteliquidation.fr/',
  },
} as const;

export const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/palettes', label: 'Nos Palettes' },
  { path: '/about', label: 'À Propos' },
  { path: '/contact', label: 'Contact' },
] as const;

export const legalLinks = [
  { path: '/legal/cgu', label: 'CGU' },
  { path: '/legal/cgv', label: 'CGV' },
  { path: '/legal/privacy', label: 'Confidentialité' },
  { path: '/legal/cookies', label: 'Cookies' },
] as const;
