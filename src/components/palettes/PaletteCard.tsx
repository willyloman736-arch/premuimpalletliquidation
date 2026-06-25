'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Layers, Eye, ShoppingCart, ArrowRight } from 'lucide-react';
import type { Palette } from '@/types/palette';
import { addPaletteToCart } from '@/lib/cart';
import QuickViewModal from './QuickViewModal';
import s from './PaletteCard.module.css';

const usd = (value: number) => `$${value.toLocaleString('en-US')}`;

interface PaletteCardProps {
  palette: Palette;
  /** Show the star rating line (catalogue) — hidden on the home "featured" grid. */
  showRating?: boolean;
  /** 'grid' (default) or 'list' layout. */
  layout?: 'grid' | 'list';
  /** Index used for a subtle staggered entrance. */
  index?: number;
  priority?: boolean;
}

export default function PaletteCard({
  palette,
  layout = 'grid',
  index = 0,
  priority = false,
}: PaletteCardProps) {
  const discount = Math.round((1 - palette.price / palette.original_price) * 100);
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <article
      className={`${s['palette-card']} ${layout === 'list' ? s.list : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={s['palette-image']}>
        <Image
          src={palette.images[0]}
          alt={`${palette.title} — ${palette.quantity} items, ${palette.condition}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          priority={priority}
        />
        <div className={s['palette-badges']}>
          {palette.featured && <span className={`${s.badge} ${s.featured}`}>★ Featured</span>}
          <span className={`${s.badge} ${s.grade}`}>{palette.condition}</span>
          {palette.limitedTime && <span className={`${s.badge} ${s.limited}`}>⏱ Limited</span>}
        </div>
        <div className={s['palette-overlay']}>
          <button type="button" className={s['btn-overlay']} onClick={() => setQuickOpen(true)}>
            <Eye size={17} aria-hidden="true" />
            Quick View
          </button>
          <Link href={`/pallet/${palette.id}`} className={s['btn-overlay-ghost']}>
            Full details
          </Link>
        </div>
      </div>

      <div className={s['palette-content']}>
        <span className={s['palette-category']}>{palette.category}</span>
        <h3>{palette.title}</h3>
        <p>{palette.description}</p>

        <div className={s['palette-info']}>
          <div className={s['info-item']}>
            <Package size={15} aria-hidden="true" />
            <span>{palette.quantity} items</span>
          </div>
          <div className={s['info-item']}>
            <Layers size={15} aria-hidden="true" />
            <span>{palette.condition}</span>
          </div>
        </div>

        <div className={s['palette-price']}>
          <span className={s['price-current']}>{usd(palette.price)}</span>
          <span className={s['price-original']}>{usd(palette.original_price)}</span>
          <span className={s['price-discount']}>-{discount}%</span>
        </div>

        <div className={s['palette-actions']}>
          <button className={s['btn-add-cart']} onClick={() => addPaletteToCart(palette)}>
            <ShoppingCart size={17} aria-hidden="true" />
            Add to Cart
          </button>
          <Link
            href={`/pallet/${palette.id}`}
            className={s['btn-details']}
            aria-label={`View details for ${palette.title}`}
          >
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <QuickViewModal palette={palette} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </article>
  );
}
