# PLF — Palette Liquidation France

A full rebuild of [paletteliquidation.fr](https://www.paletteliquidation.fr/) on a modern
stack. The reference site was a Create-React-App SPA (client-only render, no SEO). This
version is a **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4** application with
server rendering, optimized images, accessibility, and full SEO metadata — while
preserving the original design, content, navigation, and user experience 1:1.

## Stack

| Concern        | Choice                                                            |
| -------------- | ----------------------------------------------------------------- |
| Framework      | Next.js 15 (App Router, React 19, Server Components)              |
| Language       | TypeScript (strict)                                               |
| Styling        | Tailwind CSS v4 (design tokens) + CSS Modules (per-component)     |
| Icons          | lucide-react                                                      |
| Data (opt.)    | Supabase — falls back to bundled seed catalogue                   |
| Email (opt.)   | EmailJS — order confirmation emails                               |
| Payments (opt) | Stripe (card, disabled by default) · virement · Apple Pay         |
| Images         | `next/image` (AVIF/WebP) over pre-optimized brand assets          |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build and serve production:

```bash
npm run build
npm start
```

The site runs fully **out of the box** with no configuration — it uses the bundled
catalogue in `src/data/palettes.ts` and the commerce flow operates in demo mode.

## Configuration (all optional)

Copy `.env.example` to `.env.local` and fill in only what you need:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — when set, the
  catalogue and `/admin` read/write the live `palettes` table instead of the seed data.
- **Admin** (`NEXT_PUBLIC_ADMIN_USERNAME`, `NEXT_PUBLIC_ADMIN_PASSWORD`) — credentials for `/admin`.
- **Cloudinary** (`NEXT_PUBLIC_CLOUDINARY_URL`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`) — admin image uploads.
- **EmailJS** (`NEXT_PUBLIC_EMAILJS_*`) — order confirmation emails at checkout.
- **Stripe** (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_STRIPE_BACKEND_URL`) — card payments.
  To re-enable the card option, add `'carte'` to `ENABLED_PAYMENT_METHODS` in `src/lib/config.ts`.

## Project structure

```
src/
  app/                     # routes (App Router)
    page.tsx               # Home
    palettes/              # catalogue
    palette/[id]/          # product detail (statically generated from seed ids)
    about/  contact/       # marketing pages
    cart/  checkout/       # commerce flow
    legal/{cgu,cgv,privacy,cookies}/
    admin/                 # protected admin (Supabase-backed, noindex)
    layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx  icon.svg
  components/
    layout/                # Header, Footer, SiteChrome, LoadingScreen, NewsletterForm
    palettes/              # PaletteCard, CatalogView, PaletteDetailView
    home/  contact/  cart/  checkout/  admin/  ui/
  data/palettes.ts         # seed catalogue + Supabase fetch
  lib/                     # site constants, config, cart, supabase, auth, hooks
  types/palette.ts
public/
  images/                  # optimized brand assets (backgrounds, posters, products)
  videos/                  # product showcase videos
```

## Routes

`/` · `/palettes` · `/palette/[id]` · `/about` · `/contact` · `/cart` · `/checkout` ·
`/legal/cgu` · `/legal/cgv` · `/legal/privacy` · `/legal/cookies` · `/admin`

## Asset migration & optimization

Every brand asset from the source site was migrated: hero backgrounds, video posters,
product photography, the WhatsApp badge, and four product showcase videos. Source images
were re-encoded and resized (e.g. the hero `Nike.jpg` dropped from ~12.7 MB to a few
hundred KB) — the whole `public/images` folder is ~1.6 MB. Regenerate them anytime with:

```bash
npm run optimize:images   # reads _source/assets/images -> public/images (needs the _source folder)
```

> Product imagery in the seed catalogue is representative brand stock (the live product
> photos live in the original's private Supabase/Cloudinary). Connect Supabase to serve
> the real catalogue.

## Improvements over the original

- **SEO**: server-rendered HTML, per-page `metadata`, Open Graph/Twitter cards,
  JSON-LD `Store` schema, `sitemap.xml`, `robots.txt` (the original shipped an empty SPA shell).
- **Performance**: SSG/SSR, `next/image` responsive AVIF/WebP, lazy-loaded videos, ~1.6 MB images.
- **Accessibility**: semantic landmarks, skip link, labelled controls, `aria-*` on icon
  buttons, visible focus rings, full `prefers-reduced-motion` support.
- **Code quality**: TypeScript, shared `PaletteCard`/`MessageModal`, a single design-token
  layer, env-driven integrations, and a documented project structure.
- **Fixes**: the catalogue category filter (was comparing English keys to French categories)
  and the related-products price field now work correctly.

## Contact (from the source site)

PLF — Palette Liquidation France · 281 Rue Blanche SELVA, 66000 Perpignan, France ·
paletteliquidation@outlook.com · +33 7 56 86 75 16
