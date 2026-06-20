'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './Footer.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <form className={s['newsletter-form']} onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Your email"
        className={s['newsletter-input']}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className={s['newsletter-btn']} aria-label="Subscribe to the newsletter">
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      {done && (
        <span className={s['newsletter-note']} role="status">
          Thanks — you&apos;re subscribed!
        </span>
      )}
    </form>
  );
}
