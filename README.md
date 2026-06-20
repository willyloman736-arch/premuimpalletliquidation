# Premium Pallet Liquidations

A US wholesale **liquidation-pallet** storefront built on **Next.js 15 (App Router) +
TypeScript + Tailwind CSS v4**, with server rendering, optimized imagery, accessibility and
full SEO metadata. The design language is **"Industrial Bold"** — amber + black, condensed
display type, monospace data, squared edges and hazard-stripe accents.

> Originally migrated from a French Create-React-App SPA (paletteliquidation.fr) and then
> rebranded to **Premium Pallet Liquidations** — US-based, English, USD.

## Stack

| Concern   | Choice                                                              |
| --------- | ------------------------------------------------------------------- |
| Framework | Next.js 15 (App Router, React 19, Server Components)                |
| Language  | TypeScript (strict)                                                 |
| Styling   | Tailwind CSS v4 design tokens + CSS Modules (per component)         |
| Fonts     | Oswald (display) · Inter (body) · JetBrains Mono (data) via next/font |
| Icons     | lucide-react                                                        |
| Data      | Supabase (optional) — falls back to a bundled USD seed catalogue    |
| Email     | EmailJS (optional) — order confirmation emails                      |
| Payments  | Stripe (card, off by default) · Bank Transfer (ACH) · Apple Pay     |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

The site runs fully **out of the box** with no configuration, using the bundled catalogue in
`src/data/palettes.ts`; the commerce flow runs in demo mode.

## Configuration (all optional)

Copy `.env.example` to `.env.local` and fill in only what you need:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — live catalogue + `/admin`.
- **Admin** (`NEXT_PUBLIC_ADMIN_USERNAME`, `NEXT_PUBLIC_ADMIN_PASSWORD`) — credentials for `/admin`.
- **Cloudinary** (`NEXT_PUBLIC_CLOUDINARY_*`) — admin image uploads.
- **EmailJS** (`NEXT_PUBLIC_EMAILJS_*`) — order confirmation emails.
- **Stripe** (`NEXT_PUBLIC_STRIPE_*`) — card payments. To re-enable the card option, add `'carte'`
  to `ENABLED_PAYMENT_METHODS` in `src/lib/config.ts`.

## Routes

`/` · `/pallets` · `/pallet/[id]` · `/about` · `/contact` · `/cart` · `/checkout` ·
`/legal/terms` · `/legal/sales` · `/legal/privacy` · `/legal/cookies` · `/admin`

## Design system

Tokens live in `src/app/globals.css`:

- **Amber:** `--amber` `#f59e0b` · `--amber-bright` · `--amber-deep`
- **Ink:** `--ink` `#0a0a0a` and surfaces `--ink-800/700/600`
- **Light:** `--paper` `#fafaf9` · `--concrete`
- **Signature:** hazard stripe (`--hazard`), hard offset shadows, mono data, uppercase display headings
- Shared primitives: `.btn` / `.btn-primary` / `.btn-secondary`, `.chip`, `.eyebrow`, `.hazard-bar`

## Project structure

```
src/
  app/                     # routes (App Router) + globals.css, sitemap.ts, robots.ts, icon.svg
  components/
    layout/ palettes/ home/ contact/ cart/ checkout/ admin/ ui/
  data/palettes.ts         # USD seed catalogue + Supabase fetch
  lib/                     # site constants, config, cart, supabase, auth, hooks
  types/palette.ts
public/images, public/videos
```

## Notes

- Placeholder US contact details live in `src/lib/site.ts` (phone, address, emails) — **replace
  them with the real business info**.
- Product imagery in the seed catalogue is representative brand stock; connect Supabase to serve
  the real product photos.

## Contact (placeholder)

Premium Pallet Liquidations · 4820 Logistics Parkway, Suite 200, Atlanta, GA 30336 ·
sales@premiumpalletliquidations.com · (888) 555-0142
