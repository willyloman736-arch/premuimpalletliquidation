'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  TrendingUp,
  Star,
  ArrowRight,
  Package,
  DollarSign,
  Users,
  Award,
  ChevronDown,
  Zap,
  ShieldCheck,
  Truck,
  ClipboardCheck,
  RotateCcw,
  Search,
  CreditCard,
  BadgeCheck,
} from 'lucide-react';
import type { Palette } from '@/types/palette';
import { categories } from '@/data/palettes';
import { useInView } from '@/lib/useInView';
import PaletteCard from '@/components/palettes/PaletteCard';
import Carousel from '@/components/ui/Carousel';
import CountUp from '@/components/ui/CountUp';
import s from './Home.module.css';

const trustItems = [
  { icon: ShieldCheck, title: 'Secure checkout', sub: 'SSL-encrypted payments' },
  { icon: Truck, title: 'Ships in 48h', sub: 'Nationwide, tracked' },
  { icon: ClipboardCheck, title: 'Verified manifests', sub: 'Know what you buy' },
  { icon: RotateCcw, title: 'Buyer protection', sub: '7-day resolution window' },
];

const paymentBadges = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'ACH'];

const howItWorks = [
  {
    icon: Search,
    title: 'Browse manifests',
    sub: 'Filter by category, brand and grade. Every pallet lists what is inside before you buy.',
  },
  {
    icon: CreditCard,
    title: 'Buy securely',
    sub: 'Checkout with card, ACH or Apple Pay. SSL-encrypted, buyer-protected, no surprises.',
  },
  {
    icon: Truck,
    title: 'Ships in 48h',
    sub: 'We pack and dispatch within 48 hours, delivered nationwide with tracking.',
  },
];

const backgroundImages = [
  '/images/backgrounds/fond.jpg',
  '/images/backgrounds/fond2.jpg',
  '/images/backgrounds/fond3.jpg',
  '/images/backgrounds/fond4.jpg',
];

const videos = [
  {
    title: 'Nike & Adidas: iconic style, unbeatable margins',
    description:
      'Legendary silhouettes pairing on-trend design with all-day comfort. Perfect for sneaker resellers chasing exclusive pieces at liquidation pricing.',
    poster: '/images/posters/nike.jpg',
    src: '/videos/nike-demo.mp4',
  },
  {
    title: 'Watches: wrist-ready resale at liquidation prices',
    description:
      'Sharp, in-demand timepieces blending style with everyday precision — ideal for resellers and collectors hunting standout pieces at a discount.',
    poster: '/images/posters/montre.jpg',
    src: '/videos/montre.mp4',
  },
  {
    title: "Women's apparel: top brands at wholesale",
    description:
      'On-trend womenswear for every season from the biggest names, packed at wholesale pricing — a perfect way to expand inventory affordably.',
    poster: '/images/posters/vetement.jpg',
    src: '/videos/vetement.mp4',
  },
  {
    title: 'Soccer cleats & footwear: gear that moves',
    description:
      'Cleats and performance footwear favored by amateur and pro players alike — ideal for clubs, academies and resellers stocking quality gear.',
    poster: '/images/posters/crampon.jpg',
    src: '/videos/crampon.mp4',
  },
];

const stats = [
  { icon: Package, number: '500+', label: 'Pallets Sold' },
  { icon: Users, number: '100+', label: 'Active Resellers' },
  { icon: DollarSign, number: '$750K+', label: 'Profits Generated' },
  { icon: Award, number: '99%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    name: 'Marcus T.',
    business: 'Amazon FBA Seller',
    text: "PPL tripled my store's revenue in six months. The margins are real.",
    rating: 5,
    profit: '+300%',
  },
  {
    name: 'Ashley R.',
    business: 'eBay Reseller',
    text: 'Quality pallets, flawless service. I reorder every single month.',
    rating: 5,
    profit: '+250%',
  },
  {
    name: 'Jordan P.',
    business: 'Retail Store Owner',
    text: 'PPL let me diversify my shelves with trending product, fast.',
    rating: 5,
    profit: '+180%',
  },
];

export default function HomeView({ featured }: { featured: Palette[] }) {
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const [videosRef, videosIn] = useInView<HTMLElement>();
  const [statsRef, statsIn] = useInView<HTMLElement>();
  const [featuredRef, featuredIn] = useInView<HTMLElement>();
  const [testimonialsRef, testimonialsIn] = useInView<HTMLElement>();
  const [howRef, howIn] = useInView<HTMLElement>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToVideos = () => videosRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={s.home}>
      {/* Hero ----------------------------------------------------------- */}
      <section className={s.hero} aria-label="Introduction">
        <div className={s['hero-background']} aria-hidden="true">
          <div className={s['hero-image-container']}>
            {backgroundImages.map((image, index) => (
              <div
                key={image}
                className={`${s['hero-bg-image']} ${index === currentBgImage ? s.active : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className={s['hero-overlay']} />
          </div>
        </div>

        <div className={s['hero-content']}>
          <div className="container">
            <span className={`eyebrow eyebrow-invert ${s['hero-eyebrow']}`}>
              Premium Pallet Liquidations · USA
            </span>
            <h1 className={s['hero-title']}>
              <span className={s['hero-title-main']}>
                Wholesale <em>Liquidation</em> Pallets
              </span>
              <span className={s['hero-title-sub']}>Real Brands · Real Margins · Shipped Fast</span>
            </h1>
            <p className={s['hero-description']}>
              We source truckloads of brand-name overstock and customer returns from top US
              retailers — and pass resale-ready pallets straight to you.
            </p>
            <div className={s['hero-stats']}>
              <div className={s['hero-stat']}>
                <span className={s.num}>500+</span>
                <span className={s.label}>Pallets Sold</span>
              </div>
              <div className={s['hero-stat']}>
                <span className={s.num}>99%</span>
                <span className={s.label}>Satisfaction</span>
              </div>
              <div className={s['hero-stat']}>
                <span className={s.num}>48H</span>
                <span className={s.label}>Ships</span>
              </div>
            </div>
            <div className={s['hero-actions']}>
              <Link href="/pallets" className={`${s['btn-hero']} ${s.primary}`}>
                <Package size={20} aria-hidden="true" />
                Shop Pallets
              </Link>
              <button className={`${s['btn-hero']} ${s.secondary}`} onClick={() => setIsDemoOpen(true)}>
                <Play size={20} aria-hidden="true" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        <button className={s['scroll-indicator']} onClick={scrollToVideos} aria-label="Scroll down">
          <ChevronDown size={24} aria-hidden="true" />
        </button>
        <div className={s['hero-hazard']} aria-hidden="true" />
      </section>

      {/* Trust strip ---------------------------------------------------- */}
      <section className={s['trust-strip']} aria-label="Why buy from us">
        <div className="container">
          <div className={s['trust-grid']}>
            {trustItems.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className={s['trust-item']}>
                  <Icon size={22} aria-hidden="true" />
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s['payment-row']}>
            <span className={s['payment-label']}>
              <CreditCard size={15} aria-hidden="true" /> We accept
            </span>
            {paymentBadges.map((p) => (
              <span key={p} className={s['payment-badge']}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works --------------------------------------------------- */}
      <section ref={howRef} className={`${s['how-section']} ${s.reveal} ${howIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['section-header']}>
            <span className={`eyebrow ${s['section-eyebrow']}`}>Simple &amp; transparent</span>
            <h2>How It Works</h2>
            <p>From browsing manifests to delivery — three steps, no guesswork.</p>
          </div>
          <div className={s['how-grid']}>
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className={s['how-card']}>
                  <span className={s['how-num']}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={s['how-icon']}>
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Videos --------------------------------------------------------- */}
      <section ref={videosRef} className={`${s['videos-section']} ${s.reveal} ${videosIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['section-header']}>
            <span className={`eyebrow ${s['section-eyebrow']}`}>See It In Action</span>
            <h2>Inside The Truckloads</h2>
            <p>A look at the brand-name product flowing through our warehouse.</p>
          </div>

          <div className={s['videos-grid']}>
            {videos.map((video, index) => {
              const isPlaying = playingVideo === index;
              return (
                <div
                  key={video.src}
                  className={`${s['video-card']} ${isPlaying ? s.playing : ''}`}
                  onClick={() => setPlayingVideo(isPlaying ? null : index)}
                >
                  <div className={s['video-container']}>
                    {isPlaying ? (
                      <video
                        className={s['video-el']}
                        src={video.src}
                        poster={video.poster}
                        controls
                        autoPlay
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                      >
                        <track kind="captions" />
                      </video>
                    ) : (
                      <>
                        <Image
                          src={video.poster}
                          alt={video.title}
                          fill
                          className={s['video-thumb']}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className={s['video-overlay']}>
                          <div className={s['play-button']}>
                            <Play size={24} aria-hidden="true" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={s['video-content']}>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats ---------------------------------------------------------- */}
      <section
        ref={statsRef}
        className={`${s['stats-section']} ${s['section-dark']} ${s.reveal} ${statsIn ? s.visible : ''}`}
      >
        <div className={s['stats-inner']}>
          <div className="container">
            <div className={s['stats-grid']}>
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={s['stat-card']}>
                    <div className={s['stat-icon']}>
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <span className={s['stat-num']}>
                      <CountUp value={stat.number} />
                    </span>
                    <span className={s['stat-label']}>{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured ------------------------------------------------------- */}
      <section ref={featuredRef} className={`${s['featured-section']} ${s.reveal} ${featuredIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['section-header']}>
            <span className={`eyebrow ${s['section-eyebrow']}`}>This Week&apos;s Best Margins</span>
            <h2>Featured Pallets</h2>
            <p>Swipe through hand-picked truckloads with the strongest resale potential right now.</p>
            <nav className={s['category-nav']} aria-label="Shop by category">
              {categories
                .filter((c) => c !== 'All')
                .map((c) => (
                  <Link key={c} href="/pallets" className={s['category-chip']}>
                    {c}
                  </Link>
                ))}
            </nav>
          </div>

          <Carousel ariaLabel="Featured pallets">
            {featured.map((palette, index) => (
              <PaletteCard key={palette.id} palette={palette} index={index} priority={index < 2} />
            ))}
          </Carousel>

          <div className={s['section-footer']}>
            <Link href="/pallets" className={s['btn-view-all']}>
              Shop All Pallets
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials --------------------------------------------------- */}
      <section
        ref={testimonialsRef}
        className={`${s['testimonials-section']} ${s['section-dark']} ${s.reveal} ${testimonialsIn ? s.visible : ''}`}
      >
        <div className="container">
          <div className={s['section-header']}>
            <span className={`eyebrow eyebrow-invert ${s['section-eyebrow']}`}>Reseller Results</span>
            <h2>Built With PPL</h2>
            <p>Real US resellers scaling their business with our pallets.</p>
          </div>

          <div className={s['rating-summary']}>
            <span className={s['rating-score']}>4.8</span>
            <div className={s['rating-meta']}>
              <div className={s['rating-stars']} aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p>
                Rated <strong>4.8 / 5</strong> by <strong>500+</strong> verified resellers
              </p>
            </div>
            <span className={s['rating-badge']}>
              <BadgeCheck size={16} aria-hidden="true" /> Verified reviews
            </span>
          </div>

          <div className={s['testimonials-grid']}>
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className={s['testimonial-card']}>
                <div className={s['testimonial-header']}>
                  <div className={s['testimonial-avatar']}>{testimonial.name.charAt(0)}</div>
                  <figcaption className={s['testimonial-info']}>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.business}</p>
                    <div className={s['testimonial-rating']} aria-label={`${testimonial.rating} out of 5`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                  </figcaption>
                  <div className={s['testimonial-profit']}>
                    <Zap size={15} aria-hidden="true" />
                    <span>{testimonial.profit}</span>
                  </div>
                </div>
                <blockquote className={s['testimonial-text']}>&ldquo;{testimonial.text}&rdquo;</blockquote>
                <div className={s['testimonial-verified']}>
                  <BadgeCheck size={13} aria-hidden="true" /> Verified buyer
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className={s['cta-section']}>
        <div className={s['cta-hazard']} aria-hidden="true" />
        <div className="container">
          <div className={s['cta-inner']}>
            <h2>Ready To Scale Your Resale Business?</h2>
            <p>Join 2,500+ US resellers who source their inventory from Premium Pallet Liquidations.</p>
            <div className={s['cta-actions']}>
              <Link href="/pallets" className={`${s['btn-cta']} ${s.primary}`}>
                <Package size={20} aria-hidden="true" />
                Start Shopping
              </Link>
              <Link href="/contact" className={`${s['btn-cta']} ${s.secondary}`}>
                <ArrowRight size={20} aria-hidden="true" />
                Talk To Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo modal ----------------------------------------------------- */}
      {isDemoOpen && (
        <div
          className={s['video-modal']}
          onClick={() => setIsDemoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
        >
          <div className={s['video-modal-content']} onClick={(e) => e.stopPropagation()}>
            <button className={s['video-close']} onClick={() => setIsDemoOpen(false)} aria-label="Close video">
              ×
            </button>
            <video src="/videos/nike-demo.mp4" poster="/images/posters/nike.jpg" controls autoPlay playsInline>
              <track kind="captions" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
