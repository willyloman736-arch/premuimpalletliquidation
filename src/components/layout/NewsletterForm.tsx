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
        Votre adresse email
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Votre email"
        className={s['newsletter-input']}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className={s['newsletter-btn']} aria-label="S'inscrire à la newsletter">
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      {done && (
        <span className={s['newsletter-note']} role="status">
          Merci, vous êtes inscrit !
        </span>
      )}
    </form>
  );
}
