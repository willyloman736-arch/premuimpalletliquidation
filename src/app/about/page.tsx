import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Package,
  Users,
  Award,
  Target,
  Shield,
  Truck,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import s from './about.module.css';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    "Découvrez l'histoire, les valeurs et le parcours de PLF - Palette Liquidation France, votre partenaire de confiance pour l'achat de palettes de liquidation de qualité.",
};

const stats = [
  { number: '500+', label: 'Palettes vendues', icon: Package },
  { number: '100+', label: 'Clients satisfaits', icon: Users },
  { number: '3', label: "Années d'expérience", icon: Award },
  { number: '99%', label: 'Taux de satisfaction', icon: Star },
];

const values = [
  {
    icon: Shield,
    title: 'Transparence',
    description:
      'Nous vous fournissons des descriptions détaillées et des photos réelles de chaque palette.',
  },
  {
    icon: Award,
    title: 'Qualité',
    description:
      'Chaque palette est soigneusement inspectée avant la mise en vente pour garantir la meilleure qualité.',
  },
  {
    icon: Users,
    title: 'Service Client',
    description:
      'Notre équipe dédiée vous accompagne à chaque étape de votre achat et après-vente.',
  },
  {
    icon: Truck,
    title: 'Logistique',
    description:
      'Expédition rapide et sécurisée dans toute la France avec suivi en temps réel.',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'Création de PLF',
    description:
      "Lancement de Palette Liquidation France avec une vision claire : démocratiser l'achat de palettes de liquidation.",
  },
  {
    year: '2023',
    title: 'Expansion nationale',
    description:
      'Extension de nos services à toute la France avec un réseau de partenaires logistiques.',
  },
  {
    year: '2024',
    title: 'Innovation digitale',
    description:
      "Lancement de notre plateforme en ligne nouvelle génération pour une expérience d'achat optimisée.",
  },
  {
    year: '2025',
    title: 'Leadership du marché',
    description:
      'PLF devient la référence française de la vente de palettes de liquidation en ligne.',
  },
];

export default function AboutPage() {
  return (
    <div className={s['about-page']}>
      {/* Hero Section */}
      <section className={s['hero-section']}>
        <div className="container">
          <div className={s['hero-content']}>
            <div className={s['hero-text']}>
              <h1>À Propos de PLF</h1>
              <p className={s['hero-subtitle']}>
                Palette Liquidation France, votre partenaire de confiance pour l&apos;achat
                de palettes de liquidation de qualité.
              </p>
              <div className={s['hero-features']}>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>100% Français</span>
                </div>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Qualité garantie</span>
                </div>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Service premium</span>
                </div>
              </div>
            </div>
            <div className={s['hero-image']}>
              <div className={s['hero-card']}>
                <Package size={80} aria-hidden="true" />
                <h3>PLF</h3>
                <p>Votre succès, notre mission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={s['stats-section']}>
        <div className="container">
          <div className={s['stats-grid']}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={s['stat-card']}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={32} aria-hidden="true" />
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={s['story-section']}>
        <div className="container">
          <div className={s['story-content']}>
            <div className={s['story-text']}>
              <h2>Notre Histoire</h2>
              <p>
                PLF - Palette Liquidation France est née d&apos;une passion pour l&apos;entrepreneuriat
                et d&apos;une vision claire : rendre accessible à tous l&apos;achat de palettes de
                liquidation de qualité.
              </p>
              <p>
                Fondée par une équipe d&apos;experts du secteur, nous avons développé un réseau
                de partenaires fiables nous permettant de proposer les meilleures opportunités
                du marché français.
              </p>
              <div className={s['story-highlights']}>
                <div className={s.highlight}>
                  <Target size={24} aria-hidden="true" />
                  <div>
                    <h4>Notre Mission</h4>
                    <p>Démocratiser l&apos;accès aux palettes de liquidation</p>
                  </div>
                </div>
                <div className={s.highlight}>
                  <Award size={24} aria-hidden="true" />
                  <div>
                    <h4>Notre Vision</h4>
                    <p>Devenir la référence française du secteur</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s['story-image']}>
              <div className={s['image-placeholder']}>
                <Package size={120} aria-hidden="true" />
                <p>L&apos;excellence française au service de votre réussite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={s['values-section']}>
        <div className="container">
          <div className={s['section-header']}>
            <h2>Nos Valeurs</h2>
            <p>Les principes qui guident notre action au quotidien</p>
          </div>
          <div className={s['values-grid']}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={s['value-card']}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={s['value-icon']}>
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={s['timeline-section']}>
        <div className="container">
          <div className={s['section-header']}>
            <h2>Notre Parcours</h2>
            <p>Les étapes clés de notre développement</p>
          </div>
          <div className={s.timeline}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`${s['timeline-item']} ${index % 2 === 0 ? s.left : s.right}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={s['timeline-content']}>
                  <div className={s['timeline-year']}>{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={s['timeline-dot']}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={s['cta-section']}>
        <div className="container">
          <div className={s['cta-content']}>
            <h2>Prêt à commencer ?</h2>
            <p>Découvrez nos palettes de liquidation et trouvez les opportunités qui vous correspondent.</p>
            <div className={s['cta-buttons']}>
              <Link href="/palettes" className={s['btn-primary']}>
                Voir les palettes
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={s['btn-secondary']}>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
