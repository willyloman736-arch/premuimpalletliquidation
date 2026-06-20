import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Premium Pallet Liquidations collects, uses and protects your personal information, including your rights under the CCPA.',
};

export default function PrivacyPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className={s.updated}>Last updated: 2026</p>

        <h2>1. Who We Are</h2>
        <p>
          <strong>Premium Pallet Liquidations</strong> is responsible for the personal information
          described in this policy.
        </p>
        <p>{site.address}</p>
        <p>Email: {site.legalEmail}</p>
        <p>Phone: {site.phone}</p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Order Information</h3>
        <ul>
          <li>
            <strong>Contact details:</strong> name, email, phone number
          </li>
          <li>
            <strong>Shipping address:</strong> street, city, state, ZIP code
          </li>
          <li>
            <strong>Order details:</strong> products ordered, amount, date
          </li>
          <li>
            <strong>Payment method selected:</strong> bank transfer (ACH), Apple Pay or credit card
          </li>
        </ul>
        <h3>2.2 Browsing Data</h3>
        <ul>
          <li>IP address and device/browser type</li>
          <li>Pages visited and time on site</li>
          <li>Cart contents (stored locally in your browser)</li>
        </ul>
        <h3>2.3 Cookies</h3>
        <p>
          We use cookies to improve your experience. See our{' '}
          <Link href="/legal/cookies">Cookie Policy</Link> for details.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>
            <strong>Processing orders:</strong> validation, preparation, shipping
          </li>
          <li>
            <strong>Communication:</strong> order confirmation and delivery updates
          </li>
          <li>
            <strong>Customer service:</strong> answering questions and resolving issues
          </li>
          <li>
            <strong>Business operations:</strong> billing and accounting
          </li>
          <li>
            <strong>Improving our service:</strong> analytics and site optimization
          </li>
          <li>
            <strong>Marketing:</strong> sending offers with your consent
          </li>
        </ul>

        <h2>4. How We Share Your Information</h2>
        <p>Your information may be shared with:</p>
        <ul>
          <li>
            <strong>Payment processors</strong> (e.g., Stripe) to process transactions
          </li>
          <li>
            <strong>Email providers</strong> (e.g., EmailJS) to send confirmations
          </li>
          <li>
            <strong>Carriers</strong> to deliver your order (name, address, phone)
          </li>
          <li>
            <strong>Service providers</strong> for hosting and IT maintenance
          </li>
        </ul>
        <p>
          <strong>We do not sell</strong> your personal information to third parties.
        </p>

        <h2>5. Data Retention</h2>
        <ul>
          <li>
            <strong>Order data:</strong> up to 5 years after your last order
          </li>
          <li>
            <strong>Accounting records:</strong> as required by law
          </li>
          <li>
            <strong>Marketing:</strong> until you unsubscribe
          </li>
          <li>
            <strong>Connection logs:</strong> up to 12 months
          </li>
        </ul>

        <h2>6. Security</h2>
        <p>We use reasonable safeguards to protect your information, including:</p>
        <ul>
          <li>SSL encryption for data in transit</li>
          <li>Restricted access to personal data</li>
          <li>Secure passwords and regular backups</li>
        </ul>

        <h2>7. Your Rights — California Residents (CCPA)</h2>
        <p>
          If you are a California resident, you have the right to:
        </p>
        <ul>
          <li>
            <strong>Know / Access:</strong> request the categories and specific pieces of personal
            information we hold about you
          </li>
          <li>
            <strong>Delete:</strong> request deletion of your personal information
          </li>
          <li>
            <strong>Opt out:</strong> opt out of any sale of personal information (we do not sell it)
          </li>
          <li>
            <strong>Non-discrimination:</strong> you will not be discriminated against for
            exercising your rights
          </li>
        </ul>
        <p>
          To exercise any right, contact us at {site.legalEmail}. We may need to verify your identity
          before responding.
        </p>

        <h2>8. Children</h2>
        <p>
          Our service is intended for adults. We do not knowingly collect personal information from
          children under 13 (COPPA). If you believe a child has provided us information, contact us
          and we will delete it.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this policy to reflect legal or operational changes. We will post any
          significant changes on this page.
        </p>

        <h2>10. Contact</h2>
        <p>
          <strong>Email:</strong> {site.legalEmail}
          <br />
          <strong>Phone:</strong> {site.phone}
        </p>
      </div>
    </div>
  );
}
