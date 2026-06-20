'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import s from './SiteChrome.module.css';

export default function SiteChrome() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <a
        href={site.phoneHref}
        className={`${s.fab} ${s['call-btn']}`}
        aria-label={`Call us at ${site.phone}`}
      >
        <Phone size={22} aria-hidden="true" />
      </a>

      {showScrollTop && (
        <button className={`${s.fab} ${s['scroll-top-btn']}`} onClick={scrollToTop} aria-label="Back to top">
          <ChevronUp size={22} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
