import { getPalettes } from '@/data/palettes';
import { site } from '@/lib/site';
import type { Palette } from '@/types/palette';

// Static feed regenerated at build time.
export const dynamic = 'force-static';

/**
 * Google Shopping product feed (RSS 2.0).
 *
 * Titles and descriptions are deliberately GENERICIZED (no brand names) to keep
 * the feed clear of counterfeit/trademark flags, while the website keeps brand
 * names for SEO. Condition is reported as "used" (as-is liquidation lots).
 */
const unitFor = (p: Palette) => (p.category === 'Footwear' ? 'Pairs' : 'Units');

const genericTitle = (p: Palette) =>
  `${p.category} Wholesale Liquidation Pallet — ${p.quantity} ${unitFor(p)}, ${p.condition}`;

const genericDescription = (p: Palette) =>
  `Wholesale ${p.category.toLowerCase()} liquidation pallet — ${p.quantity} assorted items, ` +
  `${p.condition}, sold as-is. Manifested lot, ships nationwide from the USA.`;

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET() {
  const palettes = await getPalettes();

  const items = palettes
    .map((p) => {
      const link = `${site.url}/pallet/${p.id}`;
      const image = `${site.url}${p.images[0]}`;
      return `    <item>
      <g:id>PPL-${p.id}</g:id>
      <title>${esc(genericTitle(p))}</title>
      <description>${esc(genericDescription(p))}</description>
      <link>${esc(link)}</link>
      <g:image_link>${esc(image)}</g:image_link>
      <g:availability>${p.available ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${p.price.toFixed(2)} USD</g:price>
      <g:condition>used</g:condition>
      <g:brand>${esc(site.fullName)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${esc(p.category)}</g:product_type>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(site.fullName)} — Product Feed</title>
    <link>${site.url}</link>
    <description>Wholesale liquidation pallets, shipped nationwide from the USA.</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
