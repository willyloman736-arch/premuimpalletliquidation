import Link from 'next/link';
import {
  Boxes,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import { site, navItems, legalLinks } from '@/lib/site';
import NewsletterForm from './NewsletterForm';
import s from './Footer.module.css';

const features = [
  { icon: ShieldCheck, title: 'Secure Checkout', description: '100% secure transactions' },
  { icon: Truck, title: 'Fast Shipping', description: 'Ships nationwide in 48h' },
  { icon: BadgeCheck, title: 'Graded Quality', description: 'Every pallet inspected' },
  { icon: Clock, title: 'Dedicated Support', description: 'Reseller specialists on call' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.hazard} aria-hidden="true" />

      <div className={s['footer-features']}>
        <div className="container">
          <div className={s['features-grid']}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={s['feature-card']}>
                  <div className={s['feature-icon']}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className={s['feature-content']}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={s['footer-main']}>
        <div className="container">
          <div className={s['footer-grid']}>
            <div>
              <div className={s['footer-logo']}>
                <span className={s['logo-badge']}>
                  <Boxes size={26} aria-hidden="true" />
                </span>
                <span className={s['logo-text']}>
                  <span className={s['logo-main']}>Premium Pallet</span>
                  <span className={s['logo-sub']}>Liquidations</span>
                </span>
              </div>
              <p className={s['footer-description']}>
                Truckloads of brand-name overstock and customer returns from top US retailers —
                resale-ready pallets with real margins, shipped fast across the USA.
              </p>
              <div className={s['social-links']}>
                <a href={site.social.facebook} className={s['social-link']} aria-label="Facebook">
                  <Facebook size={20} aria-hidden="true" />
                </a>
                <a href={site.social.instagram} className={s['social-link']} aria-label="Instagram">
                  <Instagram size={20} aria-hidden="true" />
                </a>
                <a href={site.social.twitter} className={s['social-link']} aria-label="X (Twitter)">
                  <Twitter size={20} aria-hidden="true" />
                </a>
              </div>
            </div>

            <nav aria-label="Footer navigation">
              <h3 className={s['footer-title']}>Explore</h3>
              <ul className={s['footer-links']}>
                {navItems.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className={s['footer-link']}>
                      <ArrowRight size={15} aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h3 className={s['footer-title']}>Legal</h3>
              <ul className={s['footer-links']}>
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className={s['footer-link']}>
                      <ArrowRight size={15} aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className={s['footer-title']}>Contact</h3>
              <div className={s['contact-info']}>
                <div className={s['contact-item']}>
                  <Mail size={18} aria-hidden="true" />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
                <div className={s['contact-item']}>
                  <Phone size={18} aria-hidden="true" />
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
                <div className={s['contact-item']}>
                  <MapPin size={18} aria-hidden="true" />
                  <span>{site.address}</span>
                </div>
              </div>

              <div className={s.newsletter}>
                <h4>Newsletter</h4>
                <p>Get first access to new truckloads &amp; deals.</p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s['footer-bottom']}>
        <div className="container">
          <div className={s['footer-bottom-content']}>
            <p>&copy; {currentYear} Premium Pallet Liquidations. All rights reserved.</p>
            <div className={s['footer-badges']}>
              <span className={s.badge}>🇺🇸 Ships Nationwide</span>
              <span className={s.badge}>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
