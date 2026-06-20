import Link from 'next/link';
import {
  Package,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Shield,
  Truck,
  Award,
  Clock,
} from 'lucide-react';
import { site, navItems, legalLinks } from '@/lib/site';
import NewsletterForm from './NewsletterForm';
import s from './Footer.module.css';

const features = [
  { icon: Shield, title: 'Paiement sécurisé', description: 'Transactions 100% sécurisées' },
  { icon: Truck, title: 'Livraison rapide', description: 'Expédition sous 48h' },
  { icon: Award, title: 'Qualité garantie', description: 'Palettes vérifiées' },
  { icon: Clock, title: 'Support 24/7', description: 'Assistance dédiée' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
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
                <div className={s['logo-icon']}>
                  <Package size={32} aria-hidden="true" />
                </div>
                <div className={s['logo-text']}>
                  <span className={s['logo-main']}>PLF</span>
                  <span className={s['logo-sub']}>Palette Liquidation France</span>
                </div>
              </div>
              <p className={s['footer-description']}>
                Votre partenaire de confiance pour l&apos;achat de palettes de liquidation.
                Découvrez des opportunités uniques de revente avec nos palettes soigneusement
                sélectionnées.
              </p>
              <div className={s['social-links']}>
                <a href={site.social.facebook} className={s['social-link']} aria-label="Facebook">
                  <Facebook size={20} aria-hidden="true" />
                </a>
                <a href={site.social.instagram} className={s['social-link']} aria-label="Instagram">
                  <Instagram size={20} aria-hidden="true" />
                </a>
                <a href={site.social.twitter} className={s['social-link']} aria-label="Twitter">
                  <Twitter size={20} aria-hidden="true" />
                </a>
              </div>
            </div>

            <nav aria-label="Navigation du pied de page">
              <h3 className={s['footer-title']}>Navigation</h3>
              <ul className={s['footer-links']}>
                {navItems.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className={s['footer-link']}>
                      <ArrowRight size={16} aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Informations légales">
              <h3 className={s['footer-title']}>Informations</h3>
              <ul className={s['footer-links']}>
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className={s['footer-link']}>
                      <ArrowRight size={16} aria-hidden="true" />
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
                <p>Recevez nos meilleures offres</p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s['footer-bottom']}>
        <div className="container">
          <div className={s['footer-bottom-content']}>
            <p>&copy; {currentYear} PLF - Palette Liquidation France. Tous droits réservés.</p>
            <div className={s['footer-badges']}>
              <span className={s.badge}>🇫🇷 Made in France</span>
              <span className={s.badge}>✅ Site sécurisé</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
