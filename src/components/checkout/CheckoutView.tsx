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
  MessageCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MessageModal, { type MessageVariant } from '@/components/ui/MessageModal';
import type { CartItem } from '@/types/palette';
import { readCart, writeCart } from '@/lib/cart';
import { emailjsConfig, stripeConfig, ENABLED_PAYMENT_METHODS } from '@/lib/config';
import { site } from '@/lib/site';
import s from './CheckoutView.module.css';

const money = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
  state: string;
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

/** Assigns a Stripe confirmation function to the ref (used on the parent form submit). */
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
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Secure card payment',
    delay: 'Immediate',
    fee: 0,
    popular: true,
  },
  {
    id: 'virement',
    name: 'Bank Transfer (ACH)',
    icon: Building2,
    description: 'Secure bank transfer',
    delay: '2-3 business days',
    fee: 0,
    popular: false,
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'Fast & secure',
    delay: 'Instant',
    fee: 0,
    popular: false,
  },
];

const paymentMethods = allPaymentMethods.filter((method) =>
  ENABLED_PAYMENT_METHODS.includes(method.id),
);

// US states + DC
const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
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
    state: '',
    country: 'United States',
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
        title: title ?? (variant === 'error' ? 'Error' : variant === 'success' ? 'Success' : 'Information'),
        variant: variant ?? 'info',
      });
    },
    [],
  );

  const hideMessageModal = useCallback(() => {
    setMessageModal((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    if (emailjsConfig.enabled) {
      emailjs.init(emailjsConfig.publicKey);
    }
  }, []);

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 50; // $50 flat under $1,000
  const total = subtotal + shipping;

  useEffect(() => {
    // Card payment (Stripe) — only runs when 'carte' is enabled.
    if (selectedPayment !== 'carte') {
      setStripeClientSecret(null);
      setStripePrepareError('');
      return;
    }

    if (!stripePublishableKey || !stripePromise) {
      setStripePrepareError('Missing Stripe publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).');
      setStripeClientSecret(null);
      return;
    }

    const url = getCreatePaymentIntentUrl();

    let cancelled = false;
    setStripePrepareError('');
    setStripeClientSecret(null);

    const amountCents = Math.round(total * 100);
    if (amountCents < 50) {
      setStripePrepareError('The minimum amount for a card payment is $0.50.');
      return;
    }

    (async () => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountCents,
            currency: 'usd',
            metadata: {
              source: 'ppl_checkout',
              customer_email: customerInfo.email || '',
              customer_name: `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim(),
            },
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || `Server error (${res.status})`);
        }
        if (!data.clientSecret) {
          throw new Error('Invalid Stripe response.');
        }
        if (!cancelled) {
          setStripeClientSecret(data.clientSecret);
        }
      } catch (err) {
        if (!cancelled) {
          setStripePrepareError(
            err instanceof Error ? err.message : 'Unable to prepare the payment.',
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedPayment, total, customerInfo.email, customerInfo.firstName, customerInfo.lastName]);

  /** Plain-text order summary lines, shared by the email + WhatsApp paths. */
  const buildOrderSummary = (orderNumber: string) => {
    const paymentMethodName =
      paymentMethods.find((m) => m.id === selectedPayment)?.name || selectedPayment || '—';
    return [
      `Order: ${orderNumber}`,
      `Total: ${money(total)}`,
      `Payment: ${paymentMethodName}`,
      '',
      'Items:',
      ...cartItems.map((i) => `- ${i.name} x${i.quantity}: ${money(i.price * i.quantity)}`),
      '',
      'Customer:',
      `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
      customerInfo.email,
      customerInfo.phone,
      `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}, ${customerInfo.country}`,
    ].filter((l) => l !== undefined);
  };

  const sendOrderEmails = async (orderNumber: string) => {
    // No email service configured: open a pre-filled order email to the team inbox
    // (info@…) so the order still reaches us. Runs inside the submit user-gesture.
    if (!emailjsConfig.enabled) {
      try {
        const subject = `New order ${orderNumber} — ${money(total)}`;
        const body = buildOrderSummary(orderNumber).join('\n');
        window.open(
          `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          '_blank',
        );
      } catch {
        // Ignore — confirmation still shows and the customer can reach us on WhatsApp.
      }
      return { success: true, orderNumber, skipped: true };
    }

    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    try {
      const customerFullName = `${customerInfo.firstName} ${customerInfo.lastName}`;
      const customerFullAddress = `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}, ${customerInfo.country}`;
      const paymentMethodName =
        paymentMethods.find((m) => m.id === selectedPayment)?.name || selectedPayment;
      const cartItemsText = cartItems
        .map((item) => `${item.name} x${item.quantity} - ${money(item.price * item.quantity)}`)
        .join('\n');

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

      let adminStatus: number | undefined;
      if (emailjsConfig.templateAdmin) {
        const adminParams = {
          to_email: site.email, // route the order notification to the team inbox
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

      return { success: true, orderNumber, clientStatus: clientResult.status, adminStatus };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        orderNumber,
      };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  /** Opens WhatsApp with a pre-filled quote request for the current cart. */
  const submitQuoteWhatsApp = () => {
    if (cartItems.length === 0) {
      showMessageModal('Your cart is empty.', { title: 'Cart', variant: 'info' });
      return;
    }
    const name = `${customerInfo.firstName} ${customerInfo.lastName}`.trim();
    const lines = [
      "Hi Premium Pallet Liquidations — I'd like a quote for this order:",
      '',
      ...cartItems.map((i) => `• ${i.name} x${i.quantity} — ${money(i.price * i.quantity)}`),
      '',
      `Subtotal: ${money(subtotal)}`,
      `Shipping: ${shipping === 0 ? 'Free' : money(shipping)}`,
      `Total: ${money(total)}`,
    ];
    if (name || customerInfo.email || customerInfo.phone) {
      lines.push('', '— My details —');
      if (name) lines.push(`Name: ${name}`);
      if (customerInfo.email) lines.push(`Email: ${customerInfo.email}`);
      if (customerInfo.phone) lines.push(`Phone: ${customerInfo.phone}`);
    }
    const url = `${site.whatsappHref}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPayment) {
      showMessageModal('Please select a payment method.', {
        title: 'Payment method',
        variant: 'info',
      });
      return;
    }

    if (cartItems.length === 0) {
      showMessageModal('Your cart is empty.', { title: 'Cart', variant: 'info' });
      return;
    }

    const orderNumber = `PPL-${Date.now()}`;
    const capturedTotal = total;

    setIsProcessing(true);

    try {
      if (selectedPayment === 'carte') {
        if (stripePrepareError) {
          showMessageModal(stripePrepareError, { title: 'Card payment', variant: 'error' });
          return;
        }
        if (!stripeClientSecret) {
          showMessageModal('The card payment is still being prepared. Please wait a moment and try again.', {
            title: 'Card payment',
            variant: 'info',
          });
          return;
        }
        if (!cardPaymentConfirmRef.current) {
          showMessageModal('The Stripe payment module is still loading. Try again in a second.', {
            title: 'Card payment',
            variant: 'info',
          });
          return;
        }

        const stripeResult = await cardPaymentConfirmRef.current();
        if (stripeResult?.error) {
          showMessageModal(stripeResult.error.message || 'The payment failed.', {
            title: 'Payment',
            variant: 'error',
          });
          return;
        }

        const status = stripeResult?.paymentIntent?.status;
        if (status !== 'succeeded' && status !== 'processing') {
          showMessageModal('The payment could not be completed. Check your details or try again.', {
            title: 'Payment',
            variant: 'error',
          });
          return;
        }

        // Notify the team inbox of the paid order.
        if (emailjsConfig.enabled) {
          await sendOrderEmails(orderNumber);
        }

        setOrderConfirmation({ orderNumber, total: capturedTotal });
        setOrderSubmitted(true);
        setCartItems([]);
        writeCart([]);
        return;
      }

      // Other methods (bank transfer, Apple Pay) — send confirmation email if configured.
      await sendOrderEmails(orderNumber);

      setOrderConfirmation({ orderNumber, total: capturedTotal });
      setOrderSubmitted(true);
      setCartItems([]);
      writeCart([]);
    } catch {
      showMessageModal('Something went wrong. Please try again or contact us.', {
        title: 'Error',
        variant: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => router.push('/cart');
  const goToPallets = () => router.push('/pallets');
  const goHome = () => router.push('/');

  if (orderSubmitted) {
    return (
      <OrderConfirmation
        paymentMethod={selectedPayment}
        orderNumber={orderConfirmation.orderNumber}
        orderTotal={orderConfirmation.total}
        customerInfo={customerInfo}
        goHome={goHome}
        goToPallets={goToPallets}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={s['checkout-empty']}>
        <div className="container">
          <div className={s['empty-content']}>
            <AlertCircle size={64} aria-hidden="true" />
            <h2>Your Cart Is Empty</h2>
            <p>Add pallets to your cart before checking out.</p>
            <button onClick={goToPallets} className={s['btn-primary']}>
              See Our Pallets
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
            Back to cart
          </button>
          <h1>Checkout</h1>
        </div>

        <div className={s['checkout-layout']}>
          {/* Main form */}
          <div className={s['checkout-main']}>
            <form onSubmit={handleSubmit}>
              {/* Customer info */}
              <div className={s['checkout-section']}>
                <h3>Shipping Information</h3>
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
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="firstName">First name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="First name"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="lastName">Last name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Last name"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className={`${s['form-group']} ${s['full-width']}`}>
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Atlanta"
                    />
                  </div>
                  <div className={s['form-group']}>
                    <label htmlFor="zipCode">ZIP code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="30301"
                    />
                  </div>
                  <div className={`${s['form-group']} ${s['full-width']}`}>
                    <label htmlFor="state">State *</label>
                    <select
                      id="state"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a state</option>
                      {usStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment methods */}
              <div className={s['checkout-section']}>
                <h3>Payment Method</h3>
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
                            {method.popular && <span className={s['popular-badge']}>Popular</span>}
                          </div>
                          <div className={s['payment-details']}>
                            <div className={s['payment-meta']}>
                              <span>
                                <Clock size={16} aria-hidden="true" /> {method.delay}
                              </span>
                              <span>
                                <Shield size={16} aria-hidden="true" /> Secure
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
                            aria-label="Card payment form"
                          >
                            {!stripePublishableKey && (
                              <p className={s['stripe-error-banner']}>
                                Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to your
                                environment file, then restart the dev server.
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
                                        colorPrimary: '#0d9488',
                                        borderRadius: '4px',
                                      },
                                    },
                                  }}
                                >
                                  <StripePaymentBridge confirmRef={cardPaymentConfirmRef} />
                                  <PaymentElement options={{ layout: 'tabs' }} />
                                </Elements>
                              </div>
                            )}
                            {stripePublishableKey && !stripeClientSecret && !stripePrepareError && (
                              <p className={s['stripe-loading-banner']}>Preparing secure payment…</p>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className={s['checkout-actions']}>
                <button
                  type="button"
                  className={s['btn-whatsapp']}
                  onClick={submitQuoteWhatsApp}
                  disabled={isProcessing}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Submit Quote on WhatsApp
                </button>
                <button type="submit" className={s['btn-place-order']} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <span className={s.spinner}></span>
                      Processing...
                    </>
                  ) : (
                    `Checkout — ${money(total)}`
                  )}
                </button>
              </div>
              <p className={s['actions-note']}>
                Prefer to talk first? Send your cart as a quote on WhatsApp and we&apos;ll reply
                fast — or check out now and we&apos;ll email your confirmation.
              </p>
            </form>
          </div>

          {/* Order summary */}
          <div className={s['order-summary']}>
            <div className={s['summary-card']}>
              <h3>Summary</h3>

              <div className={s['cart-items-summary']}>
                {cartItems.map((item) => (
                  <div key={item.id} className={s['summary-item']}>
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{money(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className={s['summary-totals']}>
                <div className={s['summary-row']}>
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className={s['summary-row']}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? s.free : ''}>
                    {shipping === 0 ? 'Free' : money(shipping)}
                  </span>
                </div>
                <div className={s['summary-total']}>
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <div className={s['security-badges']}>
                <div className={s['security-item']}>
                  <Shield size={16} aria-hidden="true" />
                  <span>Secure SSL checkout</span>
                </div>
                <div className={s['security-item']}>
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({
  paymentMethod,
  orderNumber,
  orderTotal,
  customerInfo,
  goHome,
  goToPallets,
}: {
  paymentMethod: string;
  orderNumber: string;
  orderTotal: number;
  customerInfo: CustomerInfo;
  goHome: () => void;
  goToPallets: () => void;
}) {
  const isCard = paymentMethod === 'carte';

  return (
    <div className={s['order-confirmation']}>
      <div className="container">
        <div className={s['confirmation-content']}>
          <div className={s['success-icon']}>
            <CheckCircle size={64} aria-hidden="true" />
          </div>
          <h1>Order Confirmed!</h1>
          <p className={s['order-number']}>
            Order number: <strong>{orderNumber}</strong>
          </p>

          <div className={s['confirmation-details']}>
            <div className={s['customer-details']}>
              <h3>Shipping Information</h3>
              <div className={s['delivery-card']}>
                <div className={s['customer-name']}>
                  {customerInfo.firstName} {customerInfo.lastName}
                </div>
                <div className={s['customer-address']}>
                  <p>{customerInfo.address}</p>
                  <p>
                    {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}
                  </p>
                  <p>{customerInfo.country}</p>
                </div>
                <div className={s['customer-contact']}>
                  <p>
                    <strong>Email:</strong> {customerInfo.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className={s['next-steps']}>
              <h3>Next Steps</h3>
              {isCard ? (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>
                      Secure card payment processed; your statement may show your payment provider or
                      bank.
                    </span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>We prepare your order for shipping.</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>Keep your order number for any questions.</span>
                  </div>
                </div>
              ) : (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>You&apos;ll receive a confirmation email</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>An agent will reach out to finalize payment</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>Order tracking by email</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>4</span>
                    <span>Ships within 48h after payment is confirmed</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={s['confirmation-total-line']}>
            Total paid: <strong>{money(Number(orderTotal))}</strong>
          </p>

          <div className={s['confirmation-actions']}>
            <button onClick={goToPallets} className={s['btn-primary']}>
              Continue shopping
            </button>
            <button onClick={goHome} className={s['btn-secondary']}>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
