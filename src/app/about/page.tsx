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
  title: 'About',
  description:
    'Learn the story, values and journey of Premium Pallet Liquidations — your trusted US source for brand-name liquidation pallets, shipped nationwide.',
};

const stats = [
  { number: '500+', label: 'Pallets Sold', icon: Package },
  { number: '100+', label: 'Active Resellers', icon: Users },
  { number: '3', label: 'Years In Business', icon: Award },
  { number: '99%', label: 'Satisfaction Rate', icon: Star },
];

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description:
      'We provide detailed descriptions and representative photos for every pallet, so you always know what you are buying.',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Every pallet is carefully inspected and graded before it goes on sale to guarantee the best possible quality.',
  },
  {
    icon: Users,
    title: 'Customer Service',
    description:
      'Our dedicated reseller specialists support you at every step of your purchase and beyond.',
  },
  {
    icon: Truck,
    title: 'Logistics',
    description: 'Fast, secure shipping nationwide across the USA with real-time tracking.',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'PPL Launches',
    description:
      'Premium Pallet Liquidations launches with a clear vision: make liquidation pallets accessible to every US reseller.',
  },
  {
    year: '2023',
    title: 'Nationwide Expansion',
    description: 'We expand shipping to all 50 states with a network of trusted logistics partners.',
  },
  {
    year: '2024',
    title: 'New Online Platform',
    description:
      'We launch our next-generation online platform for a streamlined buying experience.',
  },
  {
    year: '2025',
    title: 'Market Leader',
    description: 'PPL becomes a go-to US source for brand-name pallet liquidation online.',
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
              <span className="eyebrow eyebrow-invert">Who we are</span>
              <h1>About Premium Pallet Liquidations</h1>
              <p className={s['hero-subtitle']}>
                Your trusted US source for brand-name liquidation pallets — resale-ready inventory
                with real margins, shipped fast across the country.
              </p>
              <div className={s['hero-features']}>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>US-based</span>
                </div>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Quality graded</span>
                </div>
                <div className={s['feature-badge']}>
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Nationwide shipping</span>
                </div>
              </div>
            </div>
            <div className={s['hero-image']}>
              <div className={s['hero-card']}>
                <Package size={80} aria-hidden="true" />
                <h3>PPL</h3>
                <p>Your success, our mission</p>
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
                <div key={index} className={s['stat-card']}>
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
              <span className="eyebrow">Our story</span>
              <h2>Built For US Resellers</h2>
              <p>
                Premium Pallet Liquidations was born from a passion for entrepreneurship and a clear
                vision: make quality liquidation pallets accessible to every reseller in America.
              </p>
              <p>
                Founded by a team of industry experts, we&apos;ve built a network of trusted US
                retail partners and carriers that lets us offer the best opportunities on the market
                — and ship them straight to your door.
              </p>
              <div className={s['story-highlights']}>
                <div className={s.highlight}>
                  <Target size={24} aria-hidden="true" />
                  <div>
                    <h4>Our Mission</h4>
                    <p>Make liquidation pallets accessible to every US reseller</p>
                  </div>
                </div>
                <div className={s.highlight}>
                  <Award size={24} aria-hidden="true" />
                  <div>
                    <h4>Our Vision</h4>
                    <p>Become America&apos;s most trusted pallet liquidation source</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s['story-image']}>
              <div className={s['image-placeholder']}>
                <Package size={120} aria-hidden="true" />
                <p>American sourcing in service of your success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={s['values-section']}>
        <div className="container">
          <div className={s['section-header']}>
            <span className="eyebrow">What we stand for</span>
            <h2>Our Values</h2>
            <p>The principles that guide everything we do.</p>
          </div>
          <div className={s['values-grid']}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={s['value-card']}>
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
            <span className="eyebrow">Our journey</span>
            <h2>Milestones</h2>
            <p>The key moments in our growth.</p>
          </div>
          <div className={s.timeline}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`${s['timeline-item']} ${index % 2 === 0 ? s.left : s.right}`}
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
        <div className={s['cta-hazard']} aria-hidden="true" />
        <div className="container">
          <div className={s['cta-content']}>
            <h2>Ready To Get Started?</h2>
            <p>Browse our liquidation pallets and find the opportunities that fit your business.</p>
            <div className={s['cta-buttons']}>
              <Link href="/pallets" className={s['btn-primary']}>
                Shop Pallets
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={s['btn-secondary']}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
