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

const usd = (value: number) => `$${value.toLocaleString('en-US')}`;

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
        // Share cancelled or unavailable — no action.
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setMessageModal({
        open: true,
        title: 'Link copied',
        message: 'Link copied to clipboard!',
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
          <nav className={s['breadcrumb-nav']} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/pallets">Pallets</Link>
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
                  alt={`${palette.title} — image ${currentImageIndex + 1}`}
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
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`${s['nav-btn']} ${s.next}`}
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} aria-hidden="true" />
                    </button>
                  </>
                )}
                <div className={s['image-badges']}>
                  {palette.featured && <span className={`${s.badge} ${s.featured}`}>★ Featured</span>}
                  <span className={`${s.badge} ${s.grade}`}>{palette.condition}</span>
                  {palette.limitedTime && (
                    <span className={`${s.badge} ${s.limited}`}>⏱ Limited offer</span>
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
                      aria-label={`View image ${index + 1} of ${palette.title}`}
                    >
                      <Image
                        src={image}
                        alt={`${palette.title} — thumbnail ${index + 1}`}
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
                    aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={isLiked}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={s['action-btn']}
                    onClick={shareProduct}
                    aria-label="Share this pallet"
                  >
                    <Share2 size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={s['product-rating']}>
                <div className={s.stars} aria-label={`Rating ${palette.rating} out of 5`}>
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
                  <span>{palette.quantity} items included</span>
                </div>
                <div className={s['highlight-item']}>
                  <TrendingUp size={20} aria-hidden="true" />
                  <span>Est. profit: {palette.estimatedProfit}</span>
                </div>
                <div className={s['highlight-item']}>
                  <Award size={20} aria-hidden="true" />
                  <span>Condition: {palette.condition}</span>
                </div>
                <div className={s['highlight-item']}>
                  <Truck size={20} aria-hidden="true" />
                  <span>Ships in 48h</span>
                </div>
              </div>

              <div className={s['product-pricing']}>
                <div className={s['price-main']}>
                  <span className={s['current-price']}>{usd(palette.price)}</span>
                  <span className={s['original-price']}>{usd(palette.original_price)}</span>
                </div>
                <div className={s['price-savings']}>
                  <span className={s['discount-badge']}>-{discountPercentage}%</span>
                  <span className={s['savings-text']}>
                    You save {usd(palette.original_price - palette.price)}
                  </span>
                </div>
              </div>

              <div className={s['product-purchase']}>
                <div className={s['quantity-selector']}>
                  <label htmlFor="quantity">Quantity:</label>
                  <div className={s['quantity-controls']}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span id="quantity">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={s['purchase-actions']}>
                  <button type="button" className={s['btn-add-to-cart']} onClick={addToCart}>
                    <ShoppingCart size={20} aria-hidden="true" />
                    Add to Cart
                  </button>
                  <div className={s['total-price']}>
                    Total: <strong>{usd(palette.price * quantity)}</strong>
                  </div>
                </div>
              </div>

              <div className={s['trust-signals']}>
                <div className={s['trust-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Secure checkout</span>
                </div>
                <div className={s['trust-item']}>
                  <Truck size={16} aria-hidden="true" />
                  <span>Free shipping over $1,000</span>
                </div>
                <div className={s['trust-item']}>
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>Satisfaction guaranteed</span>
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
              Detailed description
            </button>
            <button
              type="button"
              className={`${s['tab-btn']} ${selectedTab === 'contents' ? s.active : ''}`}
              onClick={() => setSelectedTab('contents')}
            >
              <Package size={18} aria-hidden="true" />
              Pallet contents
            </button>
            <button
              type="button"
              className={`${s['tab-btn']} ${selectedTab === 'delivery' ? s.active : ''}`}
              onClick={() => setSelectedTab('delivery')}
            >
              <Truck size={18} aria-hidden="true" />
              Shipping &amp; Returns
            </button>
          </div>

          <div className={s['tabs-content']}>
            {selectedTab === 'description' && (
              <div className={s['tab-content']}>
                <h3>About this pallet</h3>
                <p>
                  This {palette.title.toLowerCase()} is an outstanding opportunity for resellers and
                  entrepreneurs. With an estimated profit potential of {palette.estimatedProfit}, it
                  contains {palette.quantity} carefully selected items.
                </p>
                <h4>Key features:</h4>
                <ul>
                  <li>Condition: {palette.condition} — products in excellent shape</li>
                  <li>Quantity: {palette.quantity} assorted items</li>
                  <li>Estimated profit: {palette.estimatedProfit}</li>
                  <li>Category: {palette.category}</li>
                  <li>Customer rating: {palette.rating}/5 stars</li>
                </ul>
              </div>
            )}

            {selectedTab === 'contents' && (
              <div className={s['tab-content']}>
                <h3>Pallet contents</h3>
                <div className={s['contents-grid']}>
                  <div className={s['content-item']}>
                    <Package size={24} aria-hidden="true" />
                    <div>
                      <h4>Items included</h4>
                      <p>{palette.quantity} assorted quality products</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <Star size={24} aria-hidden="true" />
                    <div>
                      <h4>Condition</h4>
                      <p>{palette.condition} — quality checked</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <TrendingUp size={24} aria-hidden="true" />
                    <div>
                      <h4>Resale potential</h4>
                      <p>Estimated profit of {palette.estimatedProfit}</p>
                    </div>
                  </div>
                  <div className={s['content-item']}>
                    <Eye size={24} aria-hidden="true" />
                    <div>
                      <h4>Transparency</h4>
                      <p>Representative photos of the pallet</p>
                    </div>
                  </div>
                </div>
                <div className={s['content-warning']}>
                  <AlertCircle size={20} aria-hidden="true" />
                  <p>
                    <strong>Important:</strong> Exact contents may vary slightly. Photos are
                    representative of the quality and type of products included.
                  </p>
                </div>
              </div>
            )}

            {selectedTab === 'delivery' && (
              <div className={s['tab-content']}>
                <h3>Shipping and Returns</h3>
                <div className={s['delivery-grid']}>
                  <div className={s['delivery-item']}>
                    <Truck size={24} aria-hidden="true" />
                    <div>
                      <h4>Fast shipping</h4>
                      <p>Ships within 48h — delivered nationwide across the USA</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <MapPin size={24} aria-hidden="true" />
                    <div>
                      <h4>Delivery area</h4>
                      <p>All 50 US states (continental US &amp; beyond)</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <Shield size={24} aria-hidden="true" />
                    <div>
                      <h4>Guarantee</h4>
                      <p>Report any issues within 7 days of delivery</p>
                    </div>
                  </div>
                  <div className={s['delivery-item']}>
                    <Clock size={24} aria-hidden="true" />
                    <div>
                      <h4>Order tracking</h4>
                      <p>Tracking number provided as soon as it ships</p>
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
            <h2>Similar pallets</h2>
            <div className={s['related-grid']}>
              {related.map((relatedPalette) => (
                <div key={relatedPalette.id} className={s['related-card']}>
                  <div className={s['related-image']}>
                    <Image
                      src={relatedPalette.images[0]}
                      alt={relatedPalette.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className={s['related-overlay']}>
                      <Link href={`/pallet/${relatedPalette.id}`} className={s['btn-view']}>
                        <Eye size={16} aria-hidden="true" />
                        View
                      </Link>
                    </div>
                  </div>
                  <div className={s['related-content']}>
                    <h4>{relatedPalette.title}</h4>
                    <div className={s['related-price']}>
                      <span className={s.price}>{usd(relatedPalette.price)}</span>
                      <span className={s.original}>{usd(relatedPalette.original_price)}</span>
                    </div>
                    <div className={s['related-info']}>
                      <span className={s.quantity}>{relatedPalette.quantity} items</span>
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
