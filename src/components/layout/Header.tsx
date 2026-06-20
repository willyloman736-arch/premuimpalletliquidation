'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Package } from 'lucide-react';
import { navItems } from '@/lib/site';
import { cartCount, onCartChange, readCart } from '@/lib/cart';
import s from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => setCount(cartCount(readCart()));
    update();
    return onCartChange(update);
  }, []);

  const navIcons: Record<string, typeof Package | undefined> = { '/palettes': Package };

  return (
    <header className={`${s.header} ${isScrolled ? s['header-scrolled'] : ''}`}>
      <div className="container">
        <div className={s['header-content']}>
          <Link href="/" className={s.logo} aria-label={`${'PLF'} — Palette Liquidation France, accueil`}>
            <div className={s['logo-icon']}>
              <Package size={32} aria-hidden="true" />
            </div>
            <div className={s['logo-text']}>
              <span className={s['logo-main']}>PLF</span>
              <span className={s['logo-sub']}>Palette Liquidation France</span>
            </div>
          </Link>

          <nav className={s['nav-desktop']} aria-label="Navigation principale">
            {navItems.map((item) => {
              const Icon = navIcons[item.path];
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${s['nav-link']} ${active ? s.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {Icon && <Icon size={18} aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={s['header-actions']}>
            <Link href="/cart" className={s['cart-btn']} aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}>
              <ShoppingCart size={20} aria-hidden="true" />
              {count > 0 && <span className={s['cart-badge']}>{count}</span>}
            </Link>
            <button
              className={s['menu-toggle']}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`${s['nav-mobile']} ${isMenuOpen ? s.open : ''}`}>
          <div className={s['nav-mobile-content']}>
            {navItems.map((item) => {
              const Icon = navIcons[item.path];
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${s['nav-mobile-link']} ${active ? s.active : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  {Icon && <Icon size={20} aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
            <div className={s['nav-mobile-divider']} />
            <Link
              href="/cart"
              className={`${s['nav-mobile-link']} ${s['cart-mobile']}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} aria-hidden="true" />
              Panier ({count})
            </Link>
          </div>
        </div>

        {isMenuOpen && <div className={s['nav-overlay']} onClick={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  );
}
