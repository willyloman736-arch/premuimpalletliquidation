import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Sale',
  description:
    'Terms of sale for Premium Pallet Liquidations — products, pricing, payment, shipping and returns.',
};

export default function SalesPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Terms of Sale</h1>
        <p className={s.updated}>Last updated: 2026</p>

        <h2>1. Scope</h2>
        <p>
          These Terms of Sale apply to all purchases of liquidation pallets from Premium Pallet
          Liquidations. Placing an order constitutes acceptance of these terms.
        </p>

        <h2>2. Products</h2>
        <p>
          We sell liquidation pallets sourced from major US retailers and e-commerce platforms.
          These pallets contain assorted products and are sold <strong>as-is</strong>.
        </p>
        <p>
          <strong>Important:</strong>
        </p>
        <ul>
          <li>The exact contents of a pallet may vary</li>
          <li>Products may show minor defects or signs of handling</li>
          <li>Some items may be damaged or incomplete</li>
          <li>We provide a general, non-exhaustive description of each pallet</li>
        </ul>

        <h2>3. Orders &amp; Confirmation</h2>
        <p>
          Orders are placed through our website. Each order is acknowledged by email, and a member
          of our team may contact you to finalize payment and delivery details. Pallets are sold
          while supplies last; if an item becomes unavailable, you will be notified and refunded.
        </p>

        <h2>4. Pricing</h2>
        <p>
          All prices are listed in US Dollars (USD) and are subject to change at any time. The price
          that applies is the one in effect when your order is confirmed.
        </p>

        <h2>5. Payment</h2>
        <p>We accept the following payment methods:</p>
        <ul>
          <li>
            <strong>Bank transfer (ACH):</strong> processed within 2–3 business days
          </li>
          <li>
            <strong>Apple Pay:</strong> instant processing
          </li>
          <li>
            <strong>Credit card (via Stripe):</strong> when enabled, processed immediately
          </li>
        </ul>
        <p>Payment must be received in full before an order ships.</p>

        <h2>6. Shipping</h2>
        <h3>6.1 Coverage</h3>
        <p>We ship nationwide across the United States.</p>
        <h3>6.2 Shipping Costs</h3>
        <ul>
          <li>Free shipping on orders over $1,000</li>
          <li>$50 flat shipping on orders under $1,000</li>
        </ul>
        <h3>6.3 Timing</h3>
        <p>
          Orders ship within 48 business hours after payment is confirmed. Transit typically takes
          2–5 business days depending on destination.
        </p>
        <h3>6.4 Receiving Your Order</h3>
        <p>
          Please inspect your shipment on delivery and report any visible damage to the carrier and
          to us promptly.
        </p>

        <h2>7. Returns &amp; Refunds</h2>
        <p>
          Because of the nature of liquidation pallets (assorted, as-is lots), returns are limited.
          If there is a significant issue with your order, contact us within <strong>7 days</strong>{' '}
          of delivery and we will review your claim and work toward a fair resolution.
        </p>

        <h2>8. Limited Warranty</h2>
        <p>
          We warrant that pallets match the general description provided. We are not responsible for
          pre-existing defects in individual liquidation items.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          Our liability for any order is limited to the amount paid for that order. We are not liable
          for indirect or consequential damages, the resale of products by the customer, or the use
          of products by an end customer.
        </p>

        <h2>10. Force Majeure</h2>
        <p>
          We are not liable for delays or failures caused by events beyond our reasonable control,
          including weather, strikes, carrier disruptions or acts of government.
        </p>

        <h2>11. Privacy</h2>
        <p>
          Personal data is handled in accordance with our{' '}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>

        <h2>12. Governing Law &amp; Disputes</h2>
        <p>
          These Terms of Sale are governed by the laws of the State of Georgia, USA. Any dispute will
          be subject to the exclusive jurisdiction of the state and federal courts located in
          Georgia.
        </p>

        <h2>13. Contact</h2>
        <ul>
          <li>
            <strong>Email:</strong> {site.legalEmail}
          </li>
          <li>
            <strong>Phone:</strong> {site.phone}
          </li>
          <li>
            <strong>Address:</strong> {site.address}
          </li>
        </ul>
      </div>
    </div>
  );
}
