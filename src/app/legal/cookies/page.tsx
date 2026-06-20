import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Premium Pallet Liquidations uses cookies and local storage, and how you can manage your preferences.',
};

export default function CookiesPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Cookie Policy</h1>
        <p className={s.updated}>Last updated: 2026</p>

        <h2>1. What Is a Cookie?</h2>
        <p>
          A cookie is a small text file stored on your device (computer, tablet, smartphone) when you
          visit a website. It lets the site remember your preferences and improve your browsing
          experience.
        </p>

        <h2>2. Why We Use Cookies</h2>
        <p>Premium Pallet Liquidations uses cookies to:</p>
        <ul>
          <li>Keep the site running properly</li>
          <li>Remember your shopping cart</li>
          <li>Improve your user experience</li>
          <li>Analyze how the site is used</li>
        </ul>

        <h2>3. Types of Cookies We Use</h2>

        <h3>3.1 Strictly Necessary Cookies</h3>
        <p>
          These cookies are essential for the site to function. <strong>They do not require your
          consent.</strong>
        </p>
        <div className={s['cookie-table']}>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ppl_cart</td>
                <td>Stores the contents of your cart</td>
                <td>Session + 7 days</td>
              </tr>
              <tr>
                <td>session_id</td>
                <td>Identifies your session</td>
                <td>Session</td>
              </tr>
              <tr>
                <td>csrf_token</td>
                <td>Protects against CSRF attacks</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.2 Performance &amp; Analytics Cookies</h3>
        <p>
          These cookies help us understand how you use the site.{' '}
          <strong>Your consent is required.</strong>
        </p>
        <div className={s['cookie-table']}>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics</td>
                <td>Traffic and visitor behavior analysis</td>
                <td>24 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.3 Functionality Cookies</h3>
        <p>
          These cookies improve functionality and personalization.{' '}
          <strong>Your consent is required.</strong>
        </p>
        <div className={s['cookie-table']}>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>user_preferences</td>
                <td>Remembers your preferences (e.g., display options)</td>
                <td>12 months</td>
              </tr>
              <tr>
                <td>viewed_products</td>
                <td>Remembers recently viewed pallets</td>
                <td>30 days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Third-Party Cookies</h2>
        <p>Some cookies may be set by third-party services:</p>
        <ul>
          <li>
            <strong>EmailJS:</strong> sending order confirmation emails
          </li>
          <li>
            <strong>Stripe:</strong> processing card payments (when enabled)
          </li>
          <li>
            <strong>Hosting / CDN:</strong> site security and performance
          </li>
        </ul>

        <h2>5. Local Storage</h2>
        <p>In addition to cookies, we use your browser&apos;s local storage to:</p>
        <ul>
          <li>
            <strong>ppl_cart:</strong> save your cart between sessions
          </li>
          <li>
            <strong>user_settings:</strong> remember display preferences
          </li>
        </ul>
        <p>
          This data stays on your device and is not sent to our servers except during checkout.
        </p>

        <h2>6. Managing Your Preferences</h2>
        <p>You can configure your browser to block, limit or delete cookies:</p>
        <ul>
          <li>
            <strong>Chrome:</strong> Settings → Privacy and security → Cookies
          </li>
          <li>
            <strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies
          </li>
          <li>
            <strong>Safari:</strong> Settings → Privacy → Cookies
          </li>
          <li>
            <strong>Edge:</strong> Settings → Cookies and site permissions
          </li>
        </ul>

        <h2>7. Disabling Cookies</h2>
        <p>If you disable cookies, some features may be affected, including:</p>
        <ul>
          <li>Loss of your cart contents</li>
          <li>Inability to remember your preferences</li>
          <li>A degraded browsing experience</li>
        </ul>
        <p>
          <strong>Strictly necessary cookies cannot be disabled</strong> as they are essential to the
          site.
        </p>

        <h2>8. Your Rights</h2>
        <ul>
          <li>Request information about the cookies we use</li>
          <li>Withdraw your consent at any time</li>
          <li>Opt out of certain cookies</li>
          <li>Request deletion of data collected via cookies</li>
        </ul>

        <h2>9. Useful Links</h2>
        <ul>
          <li>
            <a href="https://www.usa.gov/privacy" target="_blank" rel="noopener noreferrer">
              USA.gov — Privacy and security online
            </a>
          </li>
          <li>
            <Link href="/legal/privacy">Our Privacy Policy</Link>
          </li>
        </ul>

        <h2>10. Contact</h2>
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
