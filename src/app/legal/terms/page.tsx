import type { Metadata } from 'next';
import { site } from '@/lib/site';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of the Premium Pallet Liquidations website and services.',
};

export default function TermsPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Terms of Service</h1>
        <p className={s.updated}>Last updated: 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
          Premium Pallet Liquidations website and services (the &quot;Service&quot;). By accessing
          or using the Service, you agree to be bound by these Terms. If you do not agree, please do
          not use the Service.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          The Service is intended for business and resale customers located in the United States.
          You must be at least 18 years old and able to form a binding contract to use the Service.
        </p>

        <h2>3. Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of any account credentials and for
          all activity that occurs under your account. Notify us immediately of any unauthorized use.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service in violation of any applicable law or regulation</li>
          <li>Interfere with or disrupt the integrity or performance of the Service</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Infringe the intellectual property or other rights of any party</li>
          <li>Provide false or misleading information when placing an order</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Service — including text, images, logos and design — is owned by
          Premium Pallet Liquidations or its partners and is protected by intellectual property
          laws. You may not reproduce, distribute or exploit any content without prior written
          permission.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          The Service may contain links to third-party websites. We are not responsible for the
          content, policies or practices of those sites.
        </p>

        <h2>7. Disclaimers</h2>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties
          of any kind, whether express or implied. We do not warrant that the Service will be
          uninterrupted, secure or error-free.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Premium Pallet Liquidations shall not be liable
          for any indirect, incidental, special or consequential damages arising from your use of
          the Service. Our total liability is limited to the amount you paid for the order at issue.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Premium Pallet Liquidations from any claims,
          damages or expenses arising out of your use of the Service or violation of these Terms.
        </p>

        <h2>10. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Changes take effect when posted on this page.
          Your continued use of the Service constitutes acceptance of the updated Terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Nevada, USA, without regard to its
          conflict-of-laws principles.
        </p>

        <h2>12. Contact</h2>
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
