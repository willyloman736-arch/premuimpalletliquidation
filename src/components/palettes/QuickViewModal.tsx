'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Package, TrendingUp, Star, ArrowRight } from 'lucide-react';
import type { Palette } from '@/types/palette';
import { addPaletteToCart } from '@/lib/cart';
import s from './QuickViewModal.module.css';

const usd = (v: number) => `$${v.toLocaleString('en-US')}`;

interface Props {
  palette: Palette;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ palette, open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;
  const discount = Math.round((1 - palette.price / palette.original_price) * 100);

  return createPortal(
    <div className={s.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={palette.title}>
      <div className={s.dialog} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={s.close} onClick={onClose} aria-label="Close quick view">
          <X size={20} />
        </button>
        <div className={s.media}>
          <Image src={palette.images[0]} alt={palette.title} fill sizes="(max-width: 768px) 100vw, 420px" />
        </div>
        <div className={s.body}>
          <span className={s.grade}>{palette.condition}</span>
          <h3>{palette.title}</h3>
          <div className={s.rating} aria-label={`${palette.rating} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill={i < Math.floor(palette.rating) ? 'currentColor' : 'none'} aria-hidden="true" />
            ))}
            <span>{palette.rating}/5</span>
          </div>
          <p className={s.desc}>{palette.description}</p>
          <div className={s.meta}>
            <span>
              <Package size={15} aria-hidden="true" /> {palette.quantity} items
            </span>
            <span>
              <TrendingUp size={15} aria-hidden="true" /> {palette.estimatedProfit}
            </span>
          </div>
          <div className={s.price}>
            <span className={s.cur}>{usd(palette.price)}</span>
            <span className={s.orig}>{usd(palette.original_price)}</span>
            <span className={s.disc}>-{discount}%</span>
          </div>
          <div className={s.actions}>
            <button
              type="button"
              className={s.add}
              onClick={() => {
                addPaletteToCart(palette);
                onClose();
              }}
            >
              <ShoppingCart size={18} aria-hidden="true" /> Add to Cart
            </button>
            <Link href={`/pallet/${palette.id}`} className={s.details} onClick={onClose}>
              Full details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
