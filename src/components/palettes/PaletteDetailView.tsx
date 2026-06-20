'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  MapPin,
  Clock,
  Award,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle,
  Package,
} from 'lucide-react';
import type { Palette } from '@/types/palette';
import { addPaletteToCart } from '@/lib/cart';
import MessageModal, { type MessageVariant } from '@/components/ui/MessageModal';
import s from './PaletteDetailView.module.css';

type TabId = 'description' | 'contents' | 'delivery';

interface PaletteDetailViewProps {
  palette: Palette;
  related: Palette[];
}

export default function PaletteDetailView({ palette, related }: PaletteDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<TabId>('description');
  const [isLiked, setIsLiked] = useState(false);
  const [messageModal, setMessageModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant: MessageVariant;
  }>({
    open: false,
    title: 'Information',
    message: '',
    variant: 'success',
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === palette.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? palette.images.length - 1 : prev - 1));
  };

  const addToCart = () => {
    addPaletteToCart(palette, quantity);
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: palette.title,
          text: palette.description,
          url: window.location.href,
        });
      } catch {
        // Partage annulé ou indisponible — aucune action.
      }
    } else {
      // Fallback - copier l'URL
      navigator.clipboard.writeText(window.location.href);
      setMessageModal({
        open: true,
        title: 'Lien copié',
        message: 'Lien copié dans le presse-papiers !',
        variant: 'success',
      });
    }
  };

  const discountPercentage = Math.round((1 - palette.price / palette.original_price) * 100);

  return (
    <div className={s['palette-details']}>
      {/* Breadcrumb */}
      <section className={s.breadcrumb}>
        <div className="container">
          <nav className={s['breadcrumb-nav']} aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/palettes">Nos palettes</Link>
            <span>/</span>
            <span>{palette.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className={s['product-section']}>
        <div className="container">
          <div className={s['product-layout']}>
            {/* Image Gallery */}
            <div className={s['product-gallery']}>
              <div className={s['main-image']}>
                <Image
                  src={palette.images[currentImageIndex]}
                  alt={`Palette ${palette.title} — visuel ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {palette.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${s['nav-btn']} ${s.prev}`}
                      onClick={prevImage}
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`${s['nav-btn']} ${s.next}`}
                      onClick={nextImage}
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={24} aria-hidden="true" />
                    </button>
                  </>
                )}
                <div className={s['image-badges']}>
                  {palette.featured && (
                    <span className={`${s.badge} ${s.featured}`}>⭐ Vedette</span>
                  )}
                  <span className={`${s.badge} ${s.grade}`}>{palette.condition}</span>
                  {palette.limitedTime && (
                    <span className={`${s.badge} ${s.limited}`}>⏰ Offre limitée</span>
                  )}
                </div>
              </div>

              {palette.images.length > 1 && (
                <div className={s['image-thumbnails']}>
                  {palette.images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={`${s.thumbnail} ${index === currentImageIndex ? s.active : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Voir l'image ${index + 1} de ${palette.title}`}
                    >
                      <Image
                        src={image}
                        alt={`Palette ${palette.title} — miniature ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={s['product-info']}>
              <div className={s['product-header']}>
                <h1>{palette.title}</h1>
                <div className={s['product-actions-header']}>
                  <button
                    type="button"
                    className={`${s['action-btn']} ${isLiked ? s.liked : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    aria-pressed={isLiked}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={s['action-btn']}
                    onClick={shareProduct}
                    aria-label="Partager cette palette"
                  >
                    <Share2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={s['product-rating']}>
                <div className={s.stars} aria-label={`Note ${palette.rating} sur 5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(palette.rating) ? 'currentColor' : 'none'}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className={s['rating-value']}>({palette.rating}/5)</span>
              </div>

              <p className={s['product-description']}>{palette.description}</p>

              <div className={s['product-highlights']}>
                <div className={s['highlight-item']}>
                  <Package size={20} aria-hidden="true" />
                  <span>{palette.quantity} articles inclus</span>
                </div>
                <div className={s['highlight-item']}>
                  <TrendingUp size={20} aria-hidden="true" />
                  <span>Profit estimé: {palette.estimatedProfit}</span>
                </div>
                <div className={s['highlight-item']}>
                  <Award size={20} aria-hidden="true" />
                  <span>Condition: {palette.condition}</span>
                </div>
                <div className={s['highlight-item']}>
                  <Truck size={20} aria-hidden="true" />
                  <span>Livraison sous 48h</span>
                </div>
              </div>

              <div className={s['product-pricing']}>
                <div className={s['price-main']}>
                  <span className={s['current-price']}>{palette.price}€</span>
                  <span className={s['original-price']}>{palette.original_price}€</span>
                </div>
                <div className={s['price-savings']}>
                  <span className={s['discount-badge']}>-{discountPercentage}%</span>
                  <span className={s['savings-text']}>
                    Vous économisez {palette.original_price - palette.price}€
                  </span>
                </div>
              </div>

              <div className={s['product-purchase']}>
                <div className={s['quantity-selector']}>
                  <label htmlFor="quantity">Quantité:</label>
                  <div className={s['quantity-controls']}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Diminuer la quantité"
                    >
                      -
                    </button>
                    <span id="quantity">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={s['purchase-actions']}>
                  <button type="button" className={s['btn-add-to-cart']} onClick={addToCart}>
                    <ShoppingCart size={20} aria-hidden="true" />
                    Ajouter au panier
                  </button>
                  <div className={s['total-price']}>
                    Total: <strong>{palette.price * quantity}€</strong>
                  </div>
                </div>
              </div>

              <div className={s['trust-signals']}>
                <div className={s['trust-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className={s['trust-item']}>
                  <Truck size={16} aria-hidden="true" />
                  <span>Livraison gratuite dès 1000€</span>
                </div>
                <div className={s['trust-item']}>
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>Garantie satisfait ou remboursé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className={s['product-tabs']}>
        <div className="container">
          <div className={s['tabs-header']}>
            <button
              type="button"
              className={`${s['tab-btn']} ${selectedTab === 'description' ? s.active : ''}`}
              onClick={() => setSelectedTab('description')}
            >
              <Info size={18} aria-hidden="true" />
              Description détaillée
            </button>
            <button
              type="button"
              className={`${s['tab-btn']} ${selectedTab === 'contents' ? s.active : ''}`}
              onClick={() => setSelectedTab('contents')}
            >
              <Package size={18} aria-hidden="true" />
              Contenu de la palette
            </button>
            <button
              type="button"
              className={`${s['tab-btn']} ${selectedTab === 'delivery' ? s.active : ''}`}
              onClick={() => setSelectedTab('delivery')}
            >
              <Truck size={18} aria-hidden="true" />
              Livraison &amp; Retours
            </button>
          </div>

          <div className={s['tabs-content']}>
            {selectedTab === 'description' && (
              <div className={s['tab-content']}>
                <h3>À propos de cette palette</h3>
                <p>
                  Cette palette {palette.title.toLowerCase()} représente une opportunité
                  exceptionnelle pour les revendeurs et entrepreneurs. Avec un potentiel de profit
                  de {palette.estimatedProfit}, elle contient {palette.quantity} articles
                  soigneusement sélectionnés.
                </p>
                <h4>Caractéristiques principales :</h4>
                <ul>
                  <li>Condition: {palette.condition} - Produits en excellent état</li>
                  <li>Quantité: {palette.quantity} articles variés</li>
                  <li>Profit estimé: {palette.estimatedProfit}</li>
                  <li>Catégorie: {palette.category}</li>
                  <li>Note client: {palette.rating}/5 étoiles</li>
                </ul>
              </div>
            )}

            {selectedTab === 'contents' && (
              <div className={s['tab-content']}>
                <h3>Contenu de la palette</h3>
                <div className={s['contents-grid']}>
                  <div className={s['content-item']}>
                    <Package size={24} aria-hidden="true" />
                    <div>
                      <h4>Articles inclus</h4>
                      <p>{palette.quantity} produits assortis de qualité</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <Star size={24} aria-hidden="true" />
                    <div>
                      <h4>Condition</h4>
                      <p>{palette.condition} - Contrôlé qualité</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <TrendingUp size={24} aria-hidden="true" />
                    <div>
                      <h4>Potentiel de revente</h4>
                      <p>Profit estimé de {palette.estimatedProfit}</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <Eye size={24} aria-hidden="true" />
                    <div>
                      <h4>Transparence</h4>
                      <p>Photos réelles de la palette</p>
                    </div>
                  </div>
                </div>
                <div className={s['content-warning']}>
                  <AlertCircle size={20} aria-hidden="true" />
                  <p>
                    <strong>Important:</strong> Le contenu exact peut varier légèrement. Les photos
                    sont représentatives de la qualité et du type de produits inclus.
                  </p>
                </div>
              </div>
            )}

            {selectedTab === 'delivery' && (
              <div className={s['tab-content']}>
                <h3>Livraison et Retours</h3>
                <div className={s['delivery-grid']}>
                  <div className={s['delivery-item']}>
                    <Truck size={24} aria-hidden="true" />
                    <div>
                      <h4>Livraison rapide</h4>
                      <p>Expédition sous 24h - Livraison en 48h partout en France</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <MapPin size={24} aria-hidden="true" />
                    <div>
                      <h4>Zone de livraison</h4>
                      <p>France métropolitaine et DOM-TOM</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <Shield size={24} aria-hidden="true" />
                    <div>
                      <h4>Garantie</h4>
                      <p>Satisfait ou remboursé sous 7 jours</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <Clock size={24} aria-hidden="true" />
                    <div>
                      <h4>Suivi de commande</h4>
                      <p>Numéro de suivi fourni dès l&apos;expédition</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Palettes */}
      {related.length > 0 && (
        <section className={s['related-section']}>
          <div className="container">
            <h2>Palettes similaires</h2>
            <div className={s['related-grid']}>
              {related.map((relatedPalette) => (
                <div key={relatedPalette.id} className={s['related-card']}>
                  <div className={s['related-image']}>
                    <Image
                      src={relatedPalette.images[0]}
                      alt={`Palette ${relatedPalette.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className={s['related-overlay']}>
                      <Link href={`/palette/${relatedPalette.id}`} className={s['btn-view']}>
                        <Eye size={16} aria-hidden="true" />
                        Voir
                      </Link>
                    </div>
                  </div>
                  <div className={s['related-content']}>
                    <h4>{relatedPalette.title}</h4>
                    <div className={s['related-price']}>
                      <span className={s.price}>{relatedPalette.price}€</span>
                      <span className={s.original}>{relatedPalette.original_price}€</span>
                    </div>
                    <div className={s['related-info']}>
                      <span className={s.quantity}>{relatedPalette.quantity} articles</span>
                      <span className={s.profit}>{relatedPalette.estimatedProfit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MessageModal
        isOpen={messageModal.open}
        onClose={() => setMessageModal((prev) => ({ ...prev, open: false }))}
        title={messageModal.title}
        message={messageModal.message}
        variant={messageModal.variant}
      />
    </div>
  );
}
