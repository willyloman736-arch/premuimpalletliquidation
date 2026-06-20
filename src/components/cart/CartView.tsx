'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Package,
  CreditCard,
  Truck,
  Shield,
  Tag,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import type { CartItem } from '@/types/palette';
import { readCart, writeCart } from '@/lib/cart';
import s from './CartView.module.css';

const money = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type PromoApplied =
  | { code: string; discount: number; type: 'percentage' | 'fixed'; error?: undefined }
  | { error: true; code?: undefined; discount?: undefined; type?: undefined };

const validCodes: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
  WELCOME10: { discount: 10, type: 'percentage' },
  PPL20: { discount: 20, type: 'percentage' },
  FIRST50: { discount: 50, type: 'fixed' },
};

export default function CartView() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<PromoApplied | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState<number | null>(null);

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  const saveCart = (items: CartItem[]) => {
    writeCart(items);
    setCartItems(items);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    saveCart(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    saveCart(updatedItems);
    setShowRemoveModal(null);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const applyPromoCode = () => {
    if (validCodes[promoCode]) {
      setPromoApplied({ code: promoCode, ...validCodes[promoCode] });
    } else {
      setPromoApplied({ error: true });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 50; // Free shipping over $1,000

  let discount = 0;
  if (promoApplied && !promoApplied.error) {
    discount =
      promoApplied.type === 'percentage'
        ? (subtotal * promoApplied.discount) / 100
        : promoApplied.discount;
  }

  const total = Math.max(0, subtotal + shipping - discount);

  if (cartItems.length === 0) {
    return (
      <div className={s['cart-page']}>
        <div className="container">
          <div className={s['empty-cart']}>
            <div className={s['empty-cart-icon']}>
              <ShoppingCart size={80} aria-hidden="true" />
            </div>
            <h2>Your Cart Is Empty</h2>
            <p>Browse our liquidation pallets and find your next opportunity!</p>
            <Link href="/pallets" className={s['btn-primary']}>
              <Package size={20} aria-hidden="true" />
              See Our Pallets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s['cart-page']}>
      <div className="container">
        {/* Header */}
        <div className={s['cart-header']}>
          <div className={s['header-left']}>
            <Link href="/pallets" className={s['back-link']}>
              <ArrowLeft size={20} aria-hidden="true" />
              Continue shopping
            </Link>
            <h1>My Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</h1>
          </div>
          <button onClick={clearCart} className={s['clear-cart-btn']}>
            <Trash2 size={18} aria-hidden="true" />
            Clear cart
          </button>
        </div>

        <div className={s['cart-layout']}>
          {/* Items */}
          <div className={s['cart-items']}>
            {cartItems.map((item) => (
              <div key={item.id} className={s['cart-item']}>
                <div className={s['item-image']}>
                  <div className={s['image-placeholder']}>
                    <Package size={40} aria-hidden="true" />
                  </div>
                  <div className={s['item-badge']}>{item.category}</div>
                </div>

                <div className={s['item-details']}>
                  <h3>{item.name}</h3>
                  <p className={s['item-description']}>{item.description}</p>
                  <div className={s['item-value']}>
                    <span className={s['original-value']}>
                      Original value: {money(item.originalValue)}
                    </span>
                    <span className={s.savings}>You save: {money(item.originalValue - item.price)}</span>
                  </div>
                </div>

                <div className={s['item-actions']}>
                  <div className={s['quantity-controls']}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={s['qty-btn']}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span className={s.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={s['qty-btn']}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>

                  <div className={s['item-price']}>
                    <span className={s['unit-price']}>{money(item.price)} / unit</span>
                    <span className={s['total-price']}>{money(item.price * item.quantity)}</span>
                  </div>

                  <button
                    onClick={() => setShowRemoveModal(item.id)}
                    className={s['remove-btn']}
                    title="Remove this item"
                    aria-label="Remove this item"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={s['order-summary']}>
            <div className={s['summary-card']}>
              <h3>Order Summary</h3>

              <div className={s['promo-section']}>
                <div className={s['promo-input-group']}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className={s['promo-input']}
                    aria-label="Promo code"
                  />
                  <button onClick={applyPromoCode} className={s['promo-btn']} aria-label="Apply promo code">
                    <Tag size={16} aria-hidden="true" />
                  </button>
                </div>

                {promoApplied && (
                  <div
                    className={`${s['promo-message']} ${promoApplied.error ? s.error : s.success}`}
                  >
                    {promoApplied.error ? (
                      <>
                        <AlertCircle size={16} aria-hidden="true" />
                        Invalid promo code
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} aria-hidden="true" />
                        Code &quot;{promoApplied.code}&quot; applied!
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className={s['price-breakdown']}>
                <div className={s['price-row']}>
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className={`${s['price-row']} ${s.discount}`}>
                    <span>Discount</span>
                    <span>-{money(discount)}</span>
                  </div>
                )}

                <div className={s['price-row']}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? s.free : ''}>
                    {shipping === 0 ? 'Free over $1,000' : money(shipping)}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className={s['shipping-notice']}>
                    <Truck size={16} aria-hidden="true" />
                    Free shipping over $1,000
                  </div>
                )}

                <div className={s['price-total']}>
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <button className={s['checkout-btn']} onClick={() => router.push('/checkout')}>
                <CreditCard size={20} aria-hidden="true" />
                Checkout
              </button>

              <div className={s.guarantees}>
                <div className={s['guarantee-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Secure checkout</span>
                </div>
                <div className={s['guarantee-item']}>
                  <Truck size={16} aria-hidden="true" />
                  <span>Fast shipping</span>
                </div>
                <div className={s['guarantee-item']}>
                  <Package size={16} aria-hidden="true" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove confirmation modal */}
      {showRemoveModal !== null && (
        <div className={s['modal-overlay']} onClick={() => setShowRemoveModal(null)} role="presentation">
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s['modal-header']}>
              <h3>Remove This Item?</h3>
              <button
                onClick={() => setShowRemoveModal(null)}
                className={s['modal-close']}
                aria-label="Close"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className={s['modal-actions']}>
              <button onClick={() => setShowRemoveModal(null)} className={s['btn-secondary']}>
                Cancel
              </button>
              <button onClick={() => removeItem(showRemoveModal)} className={s['btn-danger']}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
