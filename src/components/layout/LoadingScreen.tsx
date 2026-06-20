'use client';

import { useState, useEffect } from 'react';
import { Boxes } from 'lucide-react';
import s from './LoadingScreen.module.css';

/**
 * Brief branded splash on first visit only (guarded via sessionStorage) so
 * subsequent navigation stays instant. Hidden entirely for reduced-motion.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ppl_loaded')) return;
    setVisible(true);
    sessionStorage.setItem('ppl_loaded', '1');
    const timer = setTimeout(() => setVisible(false), 1350);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={s['loading-screen']} role="status" aria-label="Loading">
      <div className={s['loading-content']}>
        <div className={s['loading-logo']}>
          <div className={s['logo-badge']}>
            <Boxes size={46} aria-hidden="true" />
          </div>
          <div className={s['loading-text']}>
            <span className={s['loading-main']}>Premium Pallet</span>
            <span className={s['loading-sub']}>Liquidations</span>
          </div>
        </div>
        <div className={s['loading-spinner']}>
          <div className={s.spinner} />
        </div>
        <p className={s['loading-message']}>Loading the latest truckloads…</p>
      </div>
    </div>
  );
}
