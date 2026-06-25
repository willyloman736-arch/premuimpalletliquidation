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
  FileText,
  Download,
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
    id: 'invoice',
    name: 'Invoice (Net 7)',
    icon: FileText,
    description: 'Get a PDF invoice, pay by bank transfer',
    delay: 'Due in 7 days',
    fee: 0,
    popular: true,
  },
  {
    id: 'carte',
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Secure card payment',
    delay: 'Immediate',
    fee: 0,
    popular: false,
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

interface ConfirmedOrder {
  orderNumber: string;
  invoiceNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: string;
  isInvoice: boolean;
  paid: boolean;
  orderDate: string;
  dueDate: string;
}

const escHtml = (value: string) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Builds a standalone, print-ready HTML invoice document (saved as PDF via the browser). */
function buildInvoiceHtml(o: ConfirmedOrder): string {
  const fullName = escHtml(`${o.customer.firstName} ${o.customer.lastName}`.trim());
  const rows = o.items
    .map(
      (i) => `<tr>
        <td>${escHtml(i.name)}</td>
        <td class="num">${i.quantity}</td>
        <td class="num">${money(i.price)}</td>
        <td class="num">${money(i.price * i.quantity)}</td>
      </tr>`,
    )
    .join('');
  const statusLabel = o.paid ? 'PAID' : 'PAYMENT DUE';
  const statusClass = o.paid ? 'paid' : 'due';
  const totalLabel = o.paid ? 'Total Paid' : 'Total Due';
  const paymentBlock = o.paid
    ? `<p>Paid in full by card on ${escHtml(o.orderDate)}. Thank you!</p>`
    : `<p><strong>Payment due by ${escHtml(o.dueDate)} (Net 7).</strong></p>
       <p>Pay by ACH / bank transfer. Bank &amp; wire details are emailed with this invoice —
       please reference <strong>${escHtml(o.invoiceNumber)}</strong> on your payment.
       Orders ship within 48 hours of cleared payment.</p>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Invoice ${escHtml(o.invoiceNumber)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f2c2a; margin: 0; padding: 32px; }
  .sheet { max-width: 760px; margin: 0 auto; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #0d9488; padding-bottom: 18px; }
  .brand { font-size: 20px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #0d9488; }
  .muted { color: #5b6b68; font-size: 12px; line-height: 1.5; }
  .doc { text-align: right; }
  .doc h1 { margin: 0 0 6px; font-size: 30px; letter-spacing: .08em; color: #0f2c2a; }
  .status { display: inline-block; padding: 4px 12px; border-radius: 6px; font-weight: 800; font-size: 12px; letter-spacing: .06em; }
  .status.paid { background: #d1fae5; color: #047857; }
  .status.due { background: #fef3c7; color: #b45309; }
  .meta { margin-top: 10px; font-size: 12px; color: #5b6b68; }
  .meta div { margin: 2px 0; }
  .parties { margin: 24px 0; }
  .parties h3 { margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #0d9488; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
  th { text-align: left; background: #f0fdfa; color: #0f2c2a; padding: 9px 10px; border-bottom: 2px solid #0d9488; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
  td { padding: 9px 10px; border-bottom: 1px solid #e3ece9; }
  .num { text-align: right; white-space: nowrap; }
  .totals { margin-top: 14px; margin-left: auto; width: 280px; font-size: 13px; }
  .totals .row { display: flex; justify-content: space-between; padding: 5px 0; }
  .totals .grand { border-top: 2px solid #0d9488; margin-top: 6px; padding-top: 9px; font-size: 16px; font-weight: 800; }
  .pay { margin-top: 26px; background: #f0fdfa; border: 1px solid #cce9e4; border-radius: 8px; padding: 16px; font-size: 12.5px; line-height: 1.55; }
  .pay h3 { margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #0d9488; }
  .foot { margin-top: 22px; font-size: 11px; color: #8a9794; line-height: 1.6; }
  @media print { body { padding: 0; } .noprint { display: none; } }
</style></head>
<body><div class="sheet">
  <div class="top">
    <div>
      <div class="brand">${escHtml(site.fullName)}</div>
      <div class="muted">${escHtml(site.address)}<br>${escHtml(site.email)}<br>${escHtml(site.phone)}</div>
    </div>
    <div class="doc">
      <h1>INVOICE</h1>
      <span class="status ${statusClass}">${statusLabel}</span>
      <div class="meta">
        <div>Invoice: <strong>${escHtml(o.invoiceNumber)}</strong></div>
        <div>Order: ${escHtml(o.orderNumber)}</div>
        <div>Date: ${escHtml(o.orderDate)}</div>
        ${o.paid ? '' : `<div>Due: ${escHtml(o.dueDate)}</div>`}
      </div>
    </div>
  </div>

  <div class="parties">
    <h3>Bill To</h3>
    <div class="muted">
      ${fullName || '&nbsp;'}<br>
      ${escHtml(o.customer.address)}<br>
      ${escHtml(`${o.customer.city}, ${o.customer.state} ${o.customer.zipCode}`)}<br>
      ${escHtml(o.customer.country)}<br>
      ${escHtml(o.customer.email)}<br>
      ${escHtml(o.customer.phone)}
    </div>
  </div>

  <table>
    <thead><tr><th>Description</th><th class="num">Qty</th><th class="num">Unit</th><th class="num">Amount</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <div class="row"><span>Subtotal</span><span>${money(o.subtotal)}</span></div>
    <div class="row"><span>Shipping</span><span>${o.shipping === 0 ? 'Free' : money(o.shipping)}</span></div>
    <div class="row grand"><span>${totalLabel}</span><span>${money(o.total)}</span></div>
  </div>

  <div class="pay">
    <h3>Payment</h3>
    ${paymentBlock}
  </div>

  <div class="foot">
    Liquidation pallets are sold as-is; exact contents may vary. See our Terms of Sale and Returns &amp; Refunds policy at ${escHtml(site.url)}/legal/sales and ${escHtml(site.url)}/legal/returns.<br>
    Thank you for your business — questions? ${escHtml(site.email)}
  </div>

  <button class="noprint" onclick="window.print()" style="margin-top:20px;padding:10px 18px;background:#0d9488;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Print / Save as PDF</button>
</div>
<script>window.onload=function(){setTimeout(function(){window.print();},300);};</script>
</body></html>`;
}

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
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
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

  const finalizeOrder = (orderNumber: string) => {
    const now = new Date();
    const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    setConfirmedOrder({
      orderNumber,
      invoiceNumber: `INV-${orderNumber}`,
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: customerInfo,
      paymentMethod: selectedPayment,
      isInvoice: selectedPayment === 'invoice',
      paid: selectedPayment === 'carte',
      orderDate: fmt(now),
      dueDate: fmt(due),
    });
    setOrderSubmitted(true);
    setCartItems([]);
    writeCart([]);
  };

  const openInvoice = (order: ConfirmedOrder) => {
    const w = window.open('', '_blank');
    if (!w) {
      showMessageModal('Please allow pop-ups to open your invoice.', {
        title: 'Invoice',
        variant: 'info',
      });
      return;
    }
    w.document.write(buildInvoiceHtml(order));
    w.document.close();
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

        finalizeOrder(orderNumber);
        return;
      }

      // Invoice / bank transfer / Apple Pay — record the order and email confirmation if configured.
      await sendOrderEmails(orderNumber);

      finalizeOrder(orderNumber);
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

  if (orderSubmitted && confirmedOrder) {
    return (
      <OrderConfirmation
        order={confirmedOrder}
        onDownloadInvoice={() => openInvoice(confirmedOrder)}
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
                      placeholder="Carson City"
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
                      placeholder="89706"
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
  order,
  onDownloadInvoice,
  goHome,
  goToPallets,
}: {
  order: ConfirmedOrder;
  onDownloadInvoice: () => void;
  goHome: () => void;
  goToPallets: () => void;
}) {
  const { customer } = order;
  const totalLabel = order.paid ? 'Total paid' : 'Amount due';

  return (
    <div className={s['order-confirmation']}>
      <div className="container">
        <div className={s['confirmation-content']}>
          <div className={s['success-icon']}>
            <CheckCircle size={64} aria-hidden="true" />
          </div>
          <h1>{order.paid ? 'Order Confirmed!' : 'Order Received!'}</h1>
          <p className={s['order-number']}>
            Order: <strong>{order.orderNumber}</strong> &middot; Invoice:{' '}
            <strong>{order.invoiceNumber}</strong>
          </p>

          <div className={s['invoice-download']}>
            <button type="button" className={s['btn-invoice']} onClick={onDownloadInvoice}>
              <Download size={18} aria-hidden="true" />
              Download / Print Invoice (PDF)
            </button>
            <span className={`${s['inv-status']} ${order.paid ? s['inv-paid'] : s['inv-due']}`}>
              {order.paid ? 'PAID' : `Due ${order.dueDate}`}
            </span>
          </div>

          <div className={s['confirmation-details']}>
            <div className={s['customer-details']}>
              <h3>Bill To</h3>
              <div className={s['delivery-card']}>
                <div className={s['customer-name']}>
                  {customer.firstName} {customer.lastName}
                </div>
                <div className={s['customer-address']}>
                  <p>{customer.address}</p>
                  <p>
                    {customer.city}, {customer.state} {customer.zipCode}
                  </p>
                  <p>{customer.country}</p>
                </div>
                <div className={s['customer-contact']}>
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customer.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className={s['next-steps']}>
              <h3>Next Steps</h3>
              {order.paid ? (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>Your card payment was processed — keep your invoice for records.</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>We prepare your order and ship within 48 hours.</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>Tracking is emailed to {customer.email || 'your email'}.</span>
                  </div>
                </div>
              ) : (
                <div className={s['steps-list']}>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>1</span>
                    <span>Download your invoice above (PDF).</span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>2</span>
                    <span>
                      Pay by bank transfer within 7 days — reference{' '}
                      <strong>{order.invoiceNumber}</strong>. We email ACH/wire details with your
                      invoice.
                    </span>
                  </div>
                  <div className={s['step-item']}>
                    <span className={s['step-number']}>3</span>
                    <span>We confirm payment, then ship within 48 hours with tracking.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={s['inv-items']}>
            {order.items.map((item) => (
              <div key={item.id} className={s['inv-row']}>
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>{money(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className={s['inv-row']}>
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : money(order.shipping)}</span>
            </div>
            <div className={`${s['inv-row']} ${s['inv-total']}`}>
              <span>{totalLabel}</span>
              <span>{money(order.total)}</span>
            </div>
          </div>

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
