import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy',
  description:
    'Returns and refunds policy for Premium Pallet Liquidations — eligibility, how to start a return, return window, and refund timing.',
};

export default function ReturnsPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Returns &amp; Refunds Policy</h1>
        <p className={s.updated}>Last updated: 2026</p>

        <h2>1. Overview</h2>
        <p>
          Premium Pallet Liquidations sells liquidation pallets — assorted, <strong>as-is</strong>{' '}
          lots of overstock and customer returns. Because contents naturally vary and may show signs
          of handling, returns are limited and assessed case by case. This policy explains when a
          return or refund is available, what you need to do, and how long it takes.
        </p>

        <h2>2. When a return or refund is available</h2>
        <p>You may request a return or refund if any of the following applies:</p>
        <ul>
          <li>You received the wrong pallet, or a pallet was not delivered.</li>
          <li>
            The pallet materially does not match the general description provided at the time of
            purchase.
          </li>
          <li>Your shipment arrived visibly damaged in transit (see section 5).</li>
          <li>An item you ordered became unavailable after purchase (you are refunded in full).</li>
        </ul>

        <h2>3. What is not covered</h2>
        <p>
          Because pallets are sold as-is, the following are <strong>not</strong> grounds for return:
        </p>
        <ul>
          <li>Change of mind or buyer&apos;s remorse.</li>
          <li>
            Normal variation in the mix, condition, or quantity of items within an as-is lot.
          </li>
          <li>Minor defects, wear, or missing packaging on individual items.</li>
          <li>Resale outcomes or profit expectations.</li>
        </ul>

        <h2>4. How to start a return (what you must do)</h2>
        <p>
          Contact us within <strong>7 days of delivery</strong> with the information below. Do not
          ship anything back until we have reviewed your claim and sent return instructions.
        </p>
        <ul>
          <li>Your order number.</li>
          <li>A description of the issue.</li>
          <li>Clear photos of the pallet and any affected items or packaging.</li>
        </ul>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> or message us on{' '}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.whatsapp}
          </a>
          . We review every claim and work toward a fair resolution — repair, replacement, partial
          refund, or full refund as appropriate.
        </p>

        <h2>5. Damaged or lost in transit</h2>
        <p>
          Please inspect your shipment on delivery. If there is visible damage, note it with the
          carrier and contact us promptly (within 7 days) with photos so we can file a claim and
          make it right.
        </p>

        <h2>6. Refund method &amp; timing</h2>
        <p>
          Approved refunds are issued to your <strong>original payment method</strong>. Once a return
          is approved (and, where applicable, returned items are received and inspected), we process
          the refund within <strong>3 business days</strong>. Depending on your bank or card issuer,
          it then typically takes <strong>5–10 business days</strong> for the funds to appear. Original
          shipping charges are non-refundable unless the return is due to our error.
        </p>

        <h2>7. Contact</h2>
        <ul>
          <li>
            <strong>Email:</strong> {site.email}
          </li>
          <li>
            <strong>Phone / WhatsApp:</strong> {site.phone}
          </li>
          <li>
            <strong>Address:</strong> {site.address}
          </li>
        </ul>
        <p>
          This policy is part of our <Link href="/legal/sales">Terms of Sale</Link>.
        </p>
      </div>
    </div>
  );
}
