'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, TrendingUp, Star, Eye, ShoppingCart, ArrowRight } from 'lucide-react';
import type { Palette } from '@/types/palette';
import { addPaletteToCart } from '@/lib/cart';
import s from './PaletteCard.module.css';

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
  showRating = false,
  layout = 'grid',
  index = 0,
  priority = false,
}: PaletteCardProps) {
  const discount = Math.round((1 - palette.price / palette.original_price) * 100);

  return (
    <article
      className={`${s['palette-card']} ${layout === 'list' ? s.list : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={s['palette-image']}>
        <Image
          src={palette.images[0]}
          alt={`Palette ${palette.title} — ${palette.quantity} articles, ${palette.condition}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
          priority={priority}
        />
        <div className={s['palette-badges']}>
          {palette.featured && <span className={`${s.badge} ${s.featured}`}>⭐ Vedette</span>}
          <span className={`${s.badge} ${s.grade}`}>{palette.condition}</span>
          {palette.limitedTime && <span className={`${s.badge} ${s.limited}`}>⏰ Limité</span>}
        </div>
        <div className={s['palette-overlay']}>
          <Link href={`/palette/${palette.id}`} className={s['btn-overlay']}>
            <Eye size={18} aria-hidden="true" />
            Voir détails
          </Link>
        </div>
      </div>

      <div className={s['palette-content']}>
        <h3>{palette.title}</h3>
        <p>{palette.description}</p>

        <div className={s['palette-info']}>
          <div className={s['info-item']}>
            <Package size={16} aria-hidden="true" />
            <span>{palette.quantity} articles</span>
          </div>
          <div className={s['info-item']}>
            <TrendingUp size={16} aria-hidden="true" />
            <span>{palette.estimatedProfit}</span>
          </div>
          {showRating && (
            <div className={s['info-item']}>
              <Star size={16} aria-hidden="true" />
              <span>{palette.rating}/5</span>
            </div>
          )}
        </div>

        <div className={s['palette-price']}>
          <span className={s['price-current']}>{palette.price}€</span>
          <span className={s['price-original']}>{palette.original_price}€</span>
          <span className={s['price-discount']}>-{discount}%</span>
        </div>

        <div className={s['palette-actions']}>
          <button className={s['btn-add-cart']} onClick={() => addPaletteToCart(palette)}>
            <ShoppingCart size={18} aria-hidden="true" />
            Ajouter au panier
          </button>
          <Link
            href={`/palette/${palette.id}`}
            className={s['btn-details']}
            aria-label={`Voir les détails de ${palette.title}`}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
