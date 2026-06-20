'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  ArrowLeft,
  Smartphone,
  Building2,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MessageModal, { type MessageVariant } from '@/components/ui/MessageModal';
import type { CartItem } from '@/types/palette';
import { readCart, writeCart } from '@/lib/cart';
import { emailjsConfig, stripeConfig, ENABLED_PAYMENT_METHODS } from '@/lib/config';
import s from './CheckoutView.module.css';

const stripePublishableKey = stripeConfig.publishableKey;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

function getCreatePaymentIntentUrl(): string {
  const base = (stripeConfig.backendUrl || '').trim();
  if (base) {
    return `${base.replace(/\/$/, '')}/create-payment-intent`;
  }
  return '/api/create-payment-intent';
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  delay: string;
  fee: number;
  popular: boolean;
}

type StripeConfirmFn = () => Promise<{
  error?: { message?: string };
  paymentIntent?: { status?: string };
}>;

/** Assigne une fonction de confirmation Stripe sur la ref (utilisée au submit du formulaire parent). */
function StripePaymentBridge({
  confirmRef,
}: {
  confirmRef: React.MutableRefObject<StripeConfirmFn | null>;
}) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe || !elements) {
      confirmRef.current = null;
      return;
    }
    confirmRef.current = async () =>
      stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
        },
      });
    return () => {
      confirmRef.current = null;
    };
  }, [stripe, elements, confirmRef]);

  return null;
}

const allPaymentMethods: PaymentMethod[] = [
  {
    id: 'carte',
    name: 'Carte bancaire',
    icon: CreditCard,
    description: 'Paiement sécurisé par carte',
    delay: 'Immédiat',
    fee: 0,
    popular: true,
  },
  {
    id: 'virement',
    name: 'Virement Bancaire',
    icon: Building2,
    description: 'Paiement sécurisé par virement',
    delay: '2-3 jours ouvrés',
    fee: 0,
    popular: false,
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'Paiement rapide et sécurisé',
    delay: 'Instantané',
    fee: 0,
    popular: false,
  },
];

// Filtrer les méthodes selon la configuration
const paymentMethods = allPaymentMethods.filter((method) =>
  ENABLED_PAYMENT_METHODS.includes(method.id),
);

// Liste des pays
const countries = [
  'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola', 'Antigua-et-Barbuda', 'Arabie saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan',
  'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Bélarus', 'Belgique', 'Belize', 'Bénin', 'Bhoutan', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso', 'Burundi',
  'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Corée du Nord', 'Corée du Sud', 'Costa Rica', "Côte d'Ivoire", 'Croatie', 'Cuba',
  'Danemark', 'Djibouti', 'Dominique',
  'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'Eswatini', 'États-Unis', 'Éthiopie',
  'Fidji', 'Finlande', 'France',
  'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Grèce', 'Grenade', 'Guatemala', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana',
  'Haïti', 'Honduras', 'Hongrie',
  'Îles Marshall', 'Îles Salomon', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Irlande', 'Islande', 'Israël', 'Italie',
  'Jamaïque', 'Japon', 'Jordanie',
  'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït',
  'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Libéria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg',
  'Macédoine du Nord', 'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Micronésie', 'Moldavie', 'Monaco', 'Mongolie', 'Monténégro', 'Mozambique', 'Myanmar',
  'Namibie', 'Nauru', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Norvège', 'Nouvelle-Zélande',
  'Oman', 'Ouganda', 'Ouzbékistan',
  'Pakistan', 'Palaos', 'Panama', 'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Portugal',
  'Qatar',
  'République centrafricaine', 'République démocratique du Congo', 'République dominicaine', 'République tchèque', 'Roumanie', 'Royaume-Uni', 'Russie', 'Rwanda',
  'Saint-Christophe-et-Niévès', 'Sainte-Lucie', 'Saint-Marin', 'Saint-Vincent-et-les-Grenadines', 'Salvador', 'Samoa', 'São Tomé-et-Príncipe', 'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud', 'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Syrie',
  'Tadjikistan', 'Tanzanie', 'Tchad', 'Thaïlande', 'Timor oriental', 'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Turquie', 'Tuvalu',
  'Ukraine', 'Uruguay',
  'Vanuatu', 'Vatican', 'Venezuela', 'Viêt Nam',
  'Yémen',
  'Zambie', 'Zimbabwe',
];

export default function CheckoutView() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
  const [stripePrepareError, setStripePrepareError] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<{ orderNumber: string; total: number }>(
    { orderNumber: '', total: 0 },
  );
  const cardPaymentConfirmRef = useRef<StripeConfirmFn | null>(null);
  const [messageModal, setMessageModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant: MessageVariant;
  }>({
    open: false,
    title: 'Information',
    message: '',
    variant: 'info',
  });

  const showMessageModal = useCallback(
    (message: string, { title, variant }: { title?: string; variant?: MessageVariant } = {}) => {
      setMessageModal({
        open: true,
        message: String(message),
        title:
          title ?? (variant === 'error' ? 'Erreur' : variant === 'success' ? 'Succès' : 'Information'),
        variant: variant ?? 'info',
      });
    },
    [],
  );

  const hideMessageModal = useCallback(() => {
    setMessageModal((prev) => ({ ...prev, open: false }));
  }, []);

  // Initialiser EmailJS (uniquement s'il est configuré)
  useEffect(() => {
    if (emailjsConfig.enabled) {
      emailjs.init(emailjsConfig.publicKey);
    }
  }, []);

  // Charger le panier
  useEffect(() => {
    setCartItems(readCart());
  }, []);

  // Calculer les totaux
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 50; // Frais de 50€ si montant < 1000€
  const total = subtotal + shipping;

  useEffect(() => {
    // ========== PAIEMENT PAR CARTE ==========
    // Tout ce code Stripe est laissé en place pour réactivation facile.
    // Pour réactiver : ajoutez 'carte' dans ENABLED_PAYMENT_METHODS.

    if (selectedPayment !== 'carte') {
      setStripeClientSecret(null);
      setStripePrepareError('');
      return;
    }

    // Le code ci-dessous ne s'exécutera que si 'carte' est réactivée
    if (!stripePublishableKey || !stripePromise) {
      setStripePrepareError('Clé publique Stripe manquante (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).');
      setStripeClientSecret(null);
      return;
    }

    const url = getCreatePaymentIntentUrl();

    let cancelled = false;
    setStripePrepareError('');
    setStripeClientSecret(null);

    const amountCents = Math.round(total * 100);
    if (amountCents < 50) {
      setStripePrepareError('Le montant minimum pour un paiement carte est de 0,50 €.');
      return;
    }

    (async () => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountCents,
            currency: 'eur',
            metadata: {
              source: 'plf_checkout',
              customer_email: customerInfo.email || '',
              customer_name: `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim(),
            },
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || `Erreur serveur (${res.status})`);
        }
        if (!data.clientSecret) {
          throw new Error('Réponse Stripe invalide.');
        }
        if (!cancelled) {
          setStripeClientSecret(data.clientSecret);
        }
      } catch (err) {
        if (!cancelled) {
          setStripePrepareError(
            err instanceof Error ? err.message : 'Impossible de préparer le paiement.',
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedPayment, total, customerInfo.email, customerInfo.firstName, customerInfo.lastName]);

  // Fonction pour envoyer les emails
  const sendOrderEmails = async (orderNumber: string) => {
    // Mode démo : si EmailJS n'est pas configuré, on considère la commande
    // comme passée sans envoyer d'email.
    if (!emailjsConfig.enabled) {
      return { success: true, orderNumber, skipped: true };
    }

    const orderDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    try {
      // Préparer les données communes
      const customerFullName = `${customerInfo.firstName} ${customerInfo.lastName}`;
      const customerFullAddress = `${customerInfo.address}, ${customerInfo.zipCode} ${customerInfo.city}, ${customerInfo.country}`;
      const paymentMethodName =
        paymentMethods.find((m) => m.id === selectedPayment)?.name || selectedPayment;
      const cartItemsText = cartItems
        .map((item) => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`)
        .join('\n');

      // 1. EMAIL CLIENT
      const clientParams = {
        to_email: customerInfo.email,
        customer_name: customerFullName,
        order_number: orderNumber,
        order_total: total.toFixed(2),
        payment_method: paymentMethodName,
        customer_address: customerFullAddress,
        order_date: orderDate,
      };

      const clientResult = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateClient,
        clientParams,
      );

      // 2. EMAIL ADMIN
      let adminStatus: number | undefined;
      if (emailjsConfig.templateAdmin) {
        const adminParams = {
          customer_name: customerFullName,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          customer_full_address: customerFullAddress,
          order_number: orderNumber,
          order_total: total.toFixed(2),
          payment_method: paymentMethodName,
          cart_items: cartItemsText,
          order_date: orderDate,
        };

        const adminResult = await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateAdmin,
          adminParams,
        );
        adminStatus = adminResult.status;
      }

      return {
        success: true,
        orderNumber,
        clientStatus: clientResult.status,
        adminStatus,
      };
    } catch (error) {
      // Même en cas d'erreur email, on continue le processus
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        orderNumber,
      };
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPayment) {
      showMessageModal('Veuillez sélectionner une méthode de paiement.', {
        title: 'Moyen de paiement',
        variant: 'info',
      });
      return;
    }

    if (cartItems.length === 0) {
      showMessageModal('Votre panier est vide.', { title: 'Panier', variant: 'info' });
      return;
    }

    const orderNumber = `PLF-${Date.now()}`;
    const capturedTotal = total;

    setIsProcessing(true);

    try {
      // ========== TRAITEMENT PAIEMENT PAR CARTE ==========
      // Ce bloc ne s'exécutera que si 'carte' est dans ENABLED_PAYMENT_METHODS
      if (selectedPayment === 'carte') {
        if (stripePrepareError) {
          showMessageModal(stripePrepareError, { title: 'Paiement par carte', variant: 'error' });
          return;
        }
        if (!stripeClientSecret) {
          showMessageModal(
            'Le paiement par carte est en cours de préparation. Patientez un instant puis réessayez.',
            { title: 'Paiement par carte', variant: 'info' },
          );
          return;
        }
        if (!cardPaymentConfirmRef.current) {
          showMessageModal(
            'Le module de paiement Stripe charge encore. Réessayez dans une seconde.',
            { title: 'Paiement par carte', variant: 'info' },
          );
          return;
        }

        const stripeResult = await cardPaymentConfirmRef.current();
        if (stripeResult?.error) {
          showMessageModal(stripeResult.error.message || 'Le paiement a échoué.', {
            title: 'Paiement',
            variant: 'error',
          });
          return;
        }

        const status = stripeResult?.paymentIntent?.status;
        if (status !== 'succeeded' && status !== 'processing') {
          showMessageModal(
            'Le paiement n’a pas pu être finalisé. Vérifiez vos informations ou réessayez.',
            { title: 'Paiement', variant: 'error' },
          );
          return;
        }

        setOrderConfirmation({ orderNumber, total: capturedTotal });
        setOrderSubmitted(true);
        setCartItems([]);
        writeCart([]);
        return;
      }

      // Traitement pour les autres méthodes de paiement (virement, applepay)
      // L'email de confirmation est envoyé pour ces méthodes (si EmailJS est configuré)
      await sendOrderEmails(orderNumber);

      setOrderConfirmation({ orderNumber, total: capturedTotal });
      setOrderSubmitted(true);
      setCartItems([]);
      writeCart([]);
    } catch {
      showMessageModal('Une erreur est survenue. Veuillez réessayer ou nous contacter.', {
        title: 'Erreur',
        variant: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    router.push('/cart');
  };

  const goToPalettes = () => {
    router.push('/palettes');
  };

  const goHome = () => {
    router.push('/');
  };

  // Si commande validée, afficher la confirmation
  if (orderSubmitted) {
    return (
      <OrderConfirmation
        paymentMethod={selectedPayment}
        orderNumber={orderConfirmation.orderNumber}
        orderTotal={orderConfirmation.total}
        customerInfo={customerInfo}
        goHome={goHome}
        goToPalettes={goToPalettes}
      />
    );
  }

  // Si panier vide
  if (cartItems.length === 0) {
    return (
      <div className={s['checkout-empty']}>
        <div className="container">
          <div className={s['empty-content']}>
            <AlertCircle size={64} aria-hidden="true" />
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des palettes à votre panier avant de procéder au paiement</p>
            <button onClick={goToPalettes} className={s['btn-primary']}>
              Voir nos palettes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s['checkout-page']}>
      <MessageModal
        isOpen={messageModal.open}
        onClose={hideMessageModal}
        title={messageModal.title}
        message={messageModal.message}
        variant={messageModal.variant}
      />
      <div className="container">
        {/* Header */}
        <div className={s['checkout-header']}>
          <button onClick={goBack} className={s['back-link']}>
            <ArrowLeft size={20} aria-hidden="true" />
            Retour au panier
          </button>
          <h1>Finaliser votre commande</h1>
        </div>

        <div className={s['checkout-layout']}>
          {/* Formulaire principal */}
          <div className={s['checkout-main']}>
            <form onSubmit={handleSubmit}>
              {/* Informations client */}
              <div className={s['checkout-section']}>
                <h3>Informations de livraison</h3>
                <div className={s['form-grid']}>
                  <div className={s['form-group']}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Prénom"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Nom"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="phone">Téléphone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div className={`${s['form-group']} ${s['full-width']}`}>
                    <label htmlFor="address">Adresse *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Rue de la Paix"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="city">Ville *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Paris"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="zipCode">Code postal *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="75001"
                    />
                  </div>
                  <div className={`${s['form-group']} ${s['full-width']}`}>
                    <label htmlFor="country">Pays *</label>
                    <select
                      id="country"
                      name="country"
                      value={customerInfo.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionnez un pays</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Méthodes de paiement */}
              <div className={s['checkout-section']}>
                <h3>Mode de paiement</h3>
                {/* Les méthodes affichées ici sont filtrées selon ENABLED_PAYMENT_METHODS */}
                <div className={s['payment-methods']}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const stripeBranchActive =
                      method.id === 'carte' &&
                      selectedPayment === 'carte' &&
                      ENABLED_PAYMENT_METHODS.includes('carte') &&
                      stripeConfig.enabled;
                    return (
                      <React.Fragment key={method.id}>
                        <div
                          className={`${s['payment-method']} ${
                            selectedPayment === method.id ? s.selected : ''
                          }${
                            method.id === 'carte' && selectedPayment === 'carte'
                              ? ` ${s['payment-method--stripe-open']}`
                              : ''
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className={s['payment-header']}>
                            <div className={s['payment-info']}>
                              <Icon size={24} aria-hidden="true" />
                              <div>
                                <h4>{method.name}</h4>
                                <p>{method.description}</p>
                              </div>
                            </div>
                            {method.popular && <span className={s['popular-badge']}>Populaire</span>}
                          </div>
                          <div className={s['payment-details']}>
                            <div className={s['payment-meta']}>
                              <span>
                                <Clock size={16} aria-hidden="true" /> {method.delay}
                              </span>
                              <span>
                                <Shield size={16} aria-hidden="true" /> Sécurisé
                              </span>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            aria-label={method.name}
                          />
                        </div>
                        {stripeBranchActive && (
                          <div
                            className={s['stripe-inline-panel']}
                            onClick={(e) => e.stopPropagation()}
                            role="region"
                            aria-label="Formulaire de paiement par carte"
                          >
                            {!stripePublishableKey && (
                              <p className={s['stripe-error-banner']}>
                                Ajoutez{' '}
                                <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> dans votre fichier
                                d&rsquo;environnement, puis redémarrez le serveur de développement.
                              </p>
                            )}
                            {stripePrepareError && (
                              <p className={s['stripe-error-banner']}>{stripePrepareError}</p>
                            )}
                            {stripeClientSecret && stripePromise && (
                              <div className={s['stripe-elements-box']}>
                                <Elements
                                  key={stripeClientSecret}
                                  stripe={stripePromise}
                                  options={{
                                    clientSecret: stripeClientSecret,
                                    appearance: {
                                      theme: 'stripe',
                                      variables: {
                                        colorPrimary: '#dc2626',
                                        borderRadius: '8px',
                                      },
                                    },
                                  }}
                                >
                                  <StripePaymentBridge confirmRef={cardPaymentConfirmRef} />
                                  <PaymentElement options={{ layout: 'tabs' }} />
                                </Elements>
                              </div>
                            )}
                            {stripePublishableKey &&
                              !stripeClientSecret &&
                              !stripePrepareError && (
                                <p className={s['stripe-loading-banner']}>
                                  Préparation du paiement sécurisé…
                                </p>
                              )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className={s['btn-place-order']} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className={s.spinner}></span>
                    Traitement en cours...
                  </>
                ) : (
                  `Passer la commande - ${total.toFixed(2)}€`
                )}
              </button>
            </form>
          </div>

          {/* Résumé commande */}
          <div className={s['order-summary']}>
            <div className={s['summary-card']}>
              <h3>Récapitulatif</h3>

              <div className={s['cart-items-summary']}>
                {cartItems.map((item) => (
                  <div key={item.id} className={s['summary-item']}>
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>

              <div className={s['summary-totals']}>
                <div className={s['summary-row']}>
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className={s['summary-row']}>
                  <span>Livraison</span>
                  <span className={shipping === 0 ? s.free : ''}>
                    {shipping === 0 ? 'Gratuite' : `${shipping}€`}
                  </span>
                </div>
                <div className={s['summary-total']}>
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              <div className={s['security-badges']}>
                <div className={s['security-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Paiement sécurisé SSL</span>
                </div>
                <div className={s['security-item']}>
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>Garantie satisfait</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant de confirmation de commande
function OrderConfirmation({
  paymentMethod,
  orderNumber,
  orderTotal,
  customerInfo,
  goHome,
  goToPalettes,
}: {
  paymentMethod: string;
  orderNumber: string;
  orderTotal: number;
  customerInfo: CustomerInfo;
  goHome: () => void;
  goToPalettes: () => void;
}) {
  const isCard = paymentMethod === 'carte';

  return (
    <div className={s['order-confirmation']}>
      <div className="container">
        <div className={s['confirmation-content']}>
          <div className={s['success-icon']}>
            <CheckCircle size={64} aria-hidden="true" />
          </div>
          <h1>Commande confirmée !</h1>
          <p className={s['order-number']}>
            Numéro de commande : <strong>{orderNumber}</strong>
          </p>

          <div className={s['confirmation-details']}>
            <div className={s['customer-details']}>
              <h3>Informations de livraison</h3>
              <div className={s['delivery-card']}>
                <div className={s['customer-name']}>
                  {customerInfo.firstName} {customerInfo.lastName}
                </div>
                <div className={s['customer-address']}>
                  <p>{customerInfo.address}</p>
                  <p>
                    {customerInfo.zipCode} {customerInfo.city}, {customerInfo.country}
                  </p>
                </div>
                <div className={s['customer-contact']}>
                  <p>
                    <strong>Email:</strong> {customerInfo.email}
                  </p>
                  <p>
                    <strong>Téléphone:</strong> {customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className={s['next-steps']}>
              <h3>Prochaines étapes</h3>
              {isCard ? (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>
                      Paiement par carte sécurisé ; le libellé sur votre relevé peut mentionner
                      votre prestataire de paiement ou votre banque.
                    </span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>Nous préparons votre commande pour l&rsquo;expédition.</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>Conservez votre numéro de commande pour toute question.</span>
                  </div>
                </div>
              ) : (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>Vous recevrez un email de confirmation</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>Un agent vous contactera pour finaliser le paiement</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>Suivi de votre commande par email</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>4</span>
                    <span>Livraison sous 48h après validation du paiement</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={s['confirmation-total-line']}>
            Montant total réglé : <strong>{Number(orderTotal).toFixed(2)}€</strong>
          </p>

          <div className={s['confirmation-actions']}>
            <button onClick={goToPalettes} className={s['btn-primary']}>
              Continuer mes achats
            </button>
            <button onClick={goHome} className={s['btn-secondary']}>
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
