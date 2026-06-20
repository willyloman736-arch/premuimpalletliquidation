'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronUp } from 'lucide-react';
import { site } from '@/lib/site';
import s from './SiteChrome.module.css';

interface Particle {
  left: string;
  delay: string;
  duration: string;
}

export default function SiteChrome() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generated after mount to avoid hydration mismatches (uses Math.random).
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${20 + Math.random() * 20}s`,
      })),
    );
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={s['whatsapp-btn']}
        aria-label="Contacter via WhatsApp"
      >
        <Image src="/images/whatsapp.png" alt="" width={50} height={50} aria-hidden="true" />
      </a>

      {showScrollTop && (
        <button className={s['scroll-top-btn']} onClick={scrollToTop} aria-label="Retour en haut">
          <ChevronUp size={20} aria-hidden="true" />
        </button>
      )}

      <div className={s['bg-particles']} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className={s.particle}
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </div>
    </>
  );
}
