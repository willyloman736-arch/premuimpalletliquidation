'use client';

import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import s from './LoadingScreen.module.css';

/**
 * Brief branded splash on first visit only (guarded via sessionStorage) so
 * subsequent navigation stays instant. Hidden entirely for reduced-motion.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('plf_loaded')) return;
    setVisible(true);
    sessionStorage.setItem('plf_loaded', '1');
    const timer = setTimeout(() => setVisible(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={s['loading-screen']} role="status" aria-label="Chargement">
      <div className={s['loading-content']}>
        <div className={s['loading-logo']}>
          <div className={s['logo-icon']}>
            <Package size={40} aria-hidden="true" />
          </div>
          <div className={s['loading-text']}>
            <span className={s['loading-main']}>PLF</span>
            <span className={s['loading-sub']}>Palette Liquidation France</span>
          </div>
        </div>
        <div className={s['loading-spinner']}>
          <div className={s.spinner} />
        </div>
        <p className={s['loading-message']}>Chargement des meilleures offres...</p>
      </div>
    </div>
  );
}
