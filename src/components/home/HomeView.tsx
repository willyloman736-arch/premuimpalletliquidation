'use client';

import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import type { Palette } from '@/types/palette';
import { useInView } from '@/lib/useInView';
import PaletteCard from '@/components/palettes/PaletteCard';
import s from './Home.module.css';

const backgroundImages = [
  '/images/backgrounds/fond.jpg',
  '/images/backgrounds/fond2.jpg',
  '/images/backgrounds/fond3.jpg',
  '/images/backgrounds/fond4.jpg',
];

const videos = [
  {
    title: 'Nike : style iconique, performance imbattable',
    description:
      'Des modèles légendaires, alliant design tendance et confort ultime, pour affirmer votre personnalité à chaque pas. Parfait pour les passionnés de sneakers ou les revendeurs à la recherche de pièces exclusives à prix réduits.',
    poster: '/images/posters/nike.jpg',
    src: '/videos/nike-demo.mp4',
  },
  {
    title: 'Montres de luxe : élégance au poignet, prix imbattables',
    description:
      'Des modèles prestigieux, mêlant style intemporel et précision horlogère, directement à votre portée. Idéal pour les revendeurs ou les collectionneurs à la recherche de pièces uniques à prix réduit.',
    poster: '/images/posters/montre.jpg',
    src: '/videos/montre.mp4',
  },
  {
    title: 'Vêtements femmes : mode féminine à prix cassés',
    description:
      'Des vêtements tendance pour toutes les saisons, issus des plus grandes marques, en palettes à prix grossiste. Une opportunité parfaite pour les boutiques et e-commerçants souhaitant élargir leur stock à faible coût.',
    poster: '/images/posters/vetement.jpg',
    src: '/videos/vetement.mp4',
  },
  {
    title: 'Chaussures et crampons : performance et style sur le terrain',
    description:
      'Des modèles prisés par les joueurs amateurs comme professionnels, disponibles en palettes à prix réduit. Idéal pour les clubs, académies et revendeurs cherchant à équiper leurs joueurs avec du matériel de qualité.',
    poster: '/images/posters/crampon.jpg',
    src: '/videos/crampon.mp4',
  },
];

const stats = [
  { icon: Package, number: '500+', label: 'Palettes vendues', color: '#DC2626' },
  { icon: Users, number: '100+', label: 'Clients satisfaits', color: '#059669' },
  { icon: DollarSign, number: '€750K+', label: 'Profits générés', color: '#7C3AED' },
  { icon: Award, number: '99%', label: 'Taux de satisfaction', color: '#EA580C' },
];

const testimonials = [
  {
    name: 'Marie L.',
    business: 'Boutique en ligne',
    text: "Grâce à PLF, j'ai multiplié mon chiffre d'affaires par 3 en 6 mois !",
    rating: 5,
    profit: '+300%',
  },
  {
    name: 'Thomas K.',
    business: 'Revendeur marketplace',
    text: 'Des palettes de qualité, un service irréprochable. Je recommande !',
    rating: 5,
    profit: '+250%',
  },
  {
    name: 'Sophie M.',
    business: 'Magasin physique',
    text: "PLF m'a permis de diversifier mon stock avec des produits tendance.",
    rating: 5,
    profit: '+180%',
  },
];

export default function HomeView({ featured }: { featured: Palette[] }) {
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [particles, setParticles] = useState<{ left: string; delay: string; duration: string }[]>([]);

  const [videosRef, videosIn] = useInView<HTMLElement>();
  const [statsRef, statsIn] = useInView<HTMLElement>();
  const [featuredRef, featuredIn] = useInView<HTMLElement>();
  const [testimonialsRef, testimonialsIn] = useInView<HTMLElement>();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, () => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 4}s`,
      })),
    );
  }, []);

  const scrollToVideos = () => videosRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={s.home}>
      {/* Hero ----------------------------------------------------------- */}
      <section className={s.hero} aria-label="Présentation">
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
            <h1 className={s['hero-title']}>
              <span className={s['hero-title-main']}>PLF</span>
              <span className={s['hero-title-sub']}>Palette Liquidation France</span>
            </h1>
            <p className={s['hero-description']}>
              Transformez votre business avec nos palettes de liquidation premium. Des opportunités
              uniques, des profits garantis.
            </p>
            <div className={s['hero-stats']}>
              <div className={s['hero-stat']}>
                <span className={s['stat-number']}>100+</span>
                <span className={s['stat-label']}>Clients</span>
              </div>
              <div className={s['hero-stat']}>
                <span className={s['stat-number']}>99%</span>
                <span className={s['stat-label']}>Satisfaction</span>
              </div>
              <div className={s['hero-stat']}>
                <span className={s['stat-number']}>48h</span>
                <span className={s['stat-label']}>Livraison</span>
              </div>
            </div>
            <div className={s['hero-actions']}>
              <Link href="/palettes" className={`${s['btn-hero']} ${s.primary}`}>
                <Package size={20} aria-hidden="true" />
                Découvrir nos palettes
              </Link>
              <button className={`${s['btn-hero']} ${s.secondary}`} onClick={() => setIsDemoOpen(true)}>
                <Play size={20} aria-hidden="true" />
                Voir la démo
              </button>
            </div>
          </div>
        </div>

        <button className={s['scroll-indicator']} onClick={scrollToVideos} aria-label="Faire défiler vers le bas">
          <ChevronDown size={24} aria-hidden="true" />
        </button>
      </section>

      {/* Videos --------------------------------------------------------- */}
      <section ref={videosRef} className={`${s['videos-section']} ${s.reveal} ${videosIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['section-header']}>
            <h2>Découvrez PLF en vidéo</h2>
            <p>Plongez dans l&apos;univers des palettes de liquidation</p>
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
                          className={s['video-thumbnail-img']}
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
      <section ref={statsRef} className={`${s['stats-section']} ${s.reveal} ${statsIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['stats-grid']}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={s['stat-card']}>
                  <div
                    className={s['stat-icon']}
                    style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)` }}
                  >
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <span className={s['stat-number']}>{stat.number}</span>
                  <span className={s['stat-label']}>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured ------------------------------------------------------- */}
      <section ref={featuredRef} className={`${s['featured-section']} ${s.reveal} ${featuredIn ? s.visible : ''}`}>
        <div className="container">
          <div className={s['section-header']}>
            <h2>Palettes en vedette</h2>
            <p>Nos meilleures opportunités du moment</p>
          </div>

          <div className={s['palettes-grid']}>
            {featured.map((palette, index) => (
              <PaletteCard key={palette.id} palette={palette} index={index} priority={index < 2} />
            ))}
          </div>

          <div className={s['section-footer']}>
            <Link href="/palettes" className={s['btn-view-all']}>
              Voir toutes nos palettes
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials --------------------------------------------------- */}
      <section
        ref={testimonialsRef}
        className={`${s['testimonials-section']} ${s.reveal} ${testimonialsIn ? s.visible : ''}`}
      >
        <div className="container">
          <div className={s['section-header']}>
            <h2>Ils ont réussi avec PLF</h2>
            <p>Découvrez les success stories de nos clients</p>
          </div>

          <div className={s['testimonials-grid']}>
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className={s['testimonial-card']}>
                <div className={s['testimonial-header']}>
                  <div className={s['testimonial-avatar']}>{testimonial.name.charAt(0)}</div>
                  <figcaption className={s['testimonial-info']}>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.business}</p>
                    <div className={s['testimonial-rating']} aria-label={`${testimonial.rating} sur 5`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                  </figcaption>
                  <div className={s['testimonial-profit']}>
                    <Zap size={16} aria-hidden="true" />
                    <span>{testimonial.profit}</span>
                  </div>
                </div>
                <blockquote className={s['testimonial-text']}>&ldquo;{testimonial.text}&rdquo;</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className={s['cta-section']}>
        <div className={s['cta-background']} aria-hidden="true">
          <div className={s['cta-particles']}>
            {particles.map((p, i) => (
              <span
                key={i}
                className={s.particle}
                style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
              />
            ))}
          </div>
        </div>

        <div className="container">
          <div className={s['cta-content']}>
            <h2>Prêt à transformer votre business ?</h2>
            <p>Rejoignez plus de 2500 entrepreneurs qui font confiance à PLF</p>
            <div className={s['cta-actions']}>
              <Link href="/palettes" className={`${s['btn-cta']} ${s.primary}`}>
                <Package size={20} aria-hidden="true" />
                Commencer maintenant
              </Link>
              <Link href="/contact" className={`${s['btn-cta']} ${s.secondary}`}>
                <ArrowRight size={20} aria-hidden="true" />
                Demander conseil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo modal ----------------------------------------------------- */}
      {isDemoOpen && (
        <div className={s['video-modal']} onClick={() => setIsDemoOpen(false)} role="dialog" aria-modal="true" aria-label="Vidéo de démonstration">
          <div className={s['video-modal-content']} onClick={(e) => e.stopPropagation()}>
            <button className={s['video-close']} onClick={() => setIsDemoOpen(false)} aria-label="Fermer la vidéo">
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
