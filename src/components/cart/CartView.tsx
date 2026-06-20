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

type PromoApplied =
  | { code: string; discount: number; type: 'percentage' | 'fixed'; error?: undefined }
  | { error: true; code?: undefined; discount?: undefined; type?: undefined };

const validCodes: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
  BIENVENUE10: { discount: 10, type: 'percentage' },
  PLF20: { discount: 20, type: 'percentage' },
  FIRST50: { discount: 50, type: 'fixed' },
};

export default function CartView() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<PromoApplied | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState<number | null>(null);

  // Charger le panier depuis localStorage
  useEffect(() => {
    setCartItems(readCart());
  }, []);

  // Sauvegarder le panier dans localStorage
  const saveCart = (items: CartItem[]) => {
    writeCart(items);
    setCartItems(items);
  };

  // Mettre à jour la quantité
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    saveCart(updatedItems);
  };

  // Supprimer un article
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    saveCart(updatedItems);
    setShowRemoveModal(null);
  };

  // Vider le panier
  const clearCart = () => {
    saveCart([]);
  };

  // Appliquer un code promo
  const applyPromoCode = () => {
    if (validCodes[promoCode]) {
      setPromoApplied({
        code: promoCode,
        ...validCodes[promoCode],
      });
    } else {
      setPromoApplied({ error: true });
    }
  };

  // Calculer les totaux
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 50; // Livraison gratuite à partir de 1000€

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
            <h2>Votre panier est vide</h2>
            <p>
              Découvrez nos palettes de liquidation et trouvez des opportunités exceptionnelles !
            </p>
            <Link href="/palettes" className={s['btn-primary']}>
              <Package size={20} aria-hidden="true" />
              Voir nos palettes
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
            <Link href="/palettes" className={s['back-link']}>
              <ArrowLeft size={20} aria-hidden="true" />
              Continuer mes achats
            </Link>
            <h1>
              Mon Panier ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} articles)
            </h1>
          </div>
          <button onClick={clearCart} className={s['clear-cart-btn']}>
            <Trash2 size={18} aria-hidden="true" />
            Vider le panier
          </button>
        </div>

        <div className={s['cart-layout']}>
          {/* Liste des articles */}
          <div className={s['cart-items']}>
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={s['cart-item']}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                      Valeur d&apos;origine : {item.originalValue}€
                    </span>
                    <span className={s.savings}>
                      Économie : {item.originalValue - item.price}€
                    </span>
                  </div>
                </div>

                <div className={s['item-actions']}>
                  <div className={s['quantity-controls']}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={s['qty-btn']}
                      disabled={item.quantity <= 1}
                      aria-label="Diminuer la quantité"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span className={s.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={s['qty-btn']}
                      aria-label="Augmenter la quantité"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>

                  <div className={s['item-price']}>
                    <span className={s['unit-price']}>{item.price}€ / unité</span>
                    <span className={s['total-price']}>
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>

                  <button
                    onClick={() => setShowRemoveModal(item.id)}
                    className={s['remove-btn']}
                    title="Supprimer cet article"
                    aria-label="Supprimer cet article"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé de commande */}
          <div className={s['order-summary']}>
            <div className={s['summary-card']}>
              <h3>Résumé de la commande</h3>

              {/* Code promo */}
              <div className={s['promo-section']}>
                <div className={s['promo-input-group']}>
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className={s['promo-input']}
                    aria-label="Code promo"
                  />
                  <button onClick={applyPromoCode} className={s['promo-btn']} aria-label="Appliquer le code promo">
                    <Tag size={16} aria-hidden="true" />
                  </button>
                </div>

                {promoApplied && (
                  <div
                    className={`${s['promo-message']} ${
                      promoApplied.error ? s.error : s.success
                    }`}
                  >
                    {promoApplied.error ? (
                      <>
                        <AlertCircle size={16} aria-hidden="true" />
                        Code promo invalide
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} aria-hidden="true" />
                        Code &quot;{promoApplied.code}&quot; appliqué !
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Détails des prix */}
              <div className={s['price-breakdown']}>
                <div className={s['price-row']}>
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>

                {discount > 0 && (
                  <div className={`${s['price-row']} ${s.discount}`}>
                    <span>Réduction</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}

                <div className={s['price-row']}>
                  <span>Livraison</span>
                  <span className={shipping === 0 ? s.free : ''}>
                    {shipping === 0 ? 'Gratuite à partir de 1000€' : `${shipping}€`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className={s['shipping-notice']}>
                    <Truck size={16} aria-hidden="true" />
                    Livraison gratuite dès 1000€ d&apos;achat
                  </div>
                )}

                <div className={s['price-total']}>
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Bouton de commande */}
              <button className={s['checkout-btn']} onClick={() => router.push('/checkout')}>
                <CreditCard size={20} aria-hidden="true" />
                Passer la commande
              </button>

              {/* Garanties */}
              <div className={s.guarantees}>
                <div className={s['guarantee-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className={s['guarantee-item']}>
                  <Truck size={16} aria-hidden="true" />
                  <span>Livraison rapide</span>
                </div>
                <div className={s['guarantee-item']}>
                  <Package size={16} aria-hidden="true" />
                  <span>Qualité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showRemoveModal !== null && (
        <div className={s['modal-overlay']} onClick={() => setShowRemoveModal(null)} role="presentation">
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s['modal-header']}>
              <h3>Supprimer cet article ?</h3>
              <button
                onClick={() => setShowRemoveModal(null)}
                className={s['modal-close']}
                aria-label="Fermer"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer cet article de votre panier ?</p>
            <div className={s['modal-actions']}>
              <button onClick={() => setShowRemoveModal(null)} className={s['btn-secondary']}>
                Annuler
              </button>
              <button onClick={() => removeItem(showRemoveModal)} className={s['btn-danger']}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
