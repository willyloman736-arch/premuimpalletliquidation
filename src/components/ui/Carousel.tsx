'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import s from './Carousel.module.css';

interface CarouselProps {
  children: ReactNode;
  ariaLabel?: string;
}

export default function Carousel({ children, ariaLabel = 'Carousel' }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollByPage = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={s.carousel} role="group" aria-roledescription="carousel" aria-label={ariaLabel}>
      <button
        type="button"
        className={`${s.arrow} ${s.prev}`}
        onClick={() => scrollByPage(-1)}
        disabled={!canPrev}
        aria-label="Previous"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <div className={s.track} ref={trackRef}>
        {children}
      </div>

      <button
        type="button"
        className={`${s.arrow} ${s.next}`}
        onClick={() => scrollByPage(1)}
        disabled={!canNext}
        aria-label="Next"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className={s.progress} aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.1, progress || 0.1)})` }} />
      </div>
    </div>
  );
}
