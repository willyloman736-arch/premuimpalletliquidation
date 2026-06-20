'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Building,
  HelpCircle,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from 'lucide-react';
import { site } from '@/lib/site';
import s from './ContactView.module.css';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    subtitle: 'Réponse sous 24h',
    color: '#dc2626',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: site.phone,
    href: site.phoneHref,
    subtitle: 'Lun-Ven 9h-18h',
    color: '#059669',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: site.address,
    subtitle: 'Sur rendez-vous',
    color: '#7c3aed',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: '9h - 18h',
    subtitle: 'Du lundi au vendredi',
    color: '#ea580c',
  },
];

const faqItems = [
  {
    question: 'Comment puis-je passer une commande ?',
    answer:
      'Parcourez nos palettes disponibles, sélectionnez celle qui vous intéresse et suivez le processus de commande. Nous vous accompagnons à chaque étape.',
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'Nous expédions sous 48h après confirmation de votre commande. La livraison prend généralement 2-5 jours ouvrés selon votre localisation.',
  },
  {
    question: 'Puis-je visiter vos entrepôts ?',
    answer:
      'Oui, les visites sont possibles sur rendez-vous. Contactez-nous pour planifier votre visite et voir nos palettes en personne.',
  },
  {
    question: 'Quelle est votre politique de retour ?',
    answer:
      'Nous garantissons la qualité de nos palettes. En cas de problème, contactez-nous dans les 7 jours suivant la réception pour une solution rapide.',
  },
];

const reasons = [
  {
    icon: MessageCircle,
    title: 'Questions sur nos palettes',
    description: "Besoin d'informations sur nos produits ou notre processus de sélection ?",
  },
  {
    icon: Building,
    title: 'Partenariats B2B',
    description: 'Intéressé par un partenariat ou des achats en volume ?',
  },
  {
    icon: HelpCircle,
    title: 'Support technique',
    description: "Problème avec votre commande ou besoin d'assistance ?",
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', className: 'facebook', href: site.social.facebook },
  { icon: Instagram, label: 'Instagram', className: 'instagram', href: site.social.instagram },
  { icon: Twitter, label: 'Twitter', className: 'twitter', href: site.social.twitter },
];

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulation de l'envoi
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className={s['contact-page']}>
      {/* Hero Section */}
      <section className={s['hero-section']}>
        <div className="container">
          <div className={s['hero-content']}>
            <h1>Contactez-nous</h1>
            <p>
              Notre équipe est là pour répondre à toutes vos questions et vous accompagner
              dans votre projet d&apos;achat de palettes de liquidation.
            </p>
            <div className={s['hero-stats']}>
              <div className={s.stat}>
                <span className={s['stat-number']}>24h</span>
                <span className={s['stat-label']}>Temps de réponse</span>
              </div>
              <div className={s.stat}>
                <span className={s['stat-number']}>99%</span>
                <span className={s['stat-label']}>Satisfaction client</span>
              </div>
              <div className={s.stat}>
                <span className={s['stat-number']}>7j/7</span>
                <span className={s['stat-label']}>Support disponible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className={s['contact-info-section']}>
        <div className="container">
          <div className={s['contact-grid']}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className={s['contact-card']}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={s['contact-icon']} style={{ backgroundColor: info.color }}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className={s['contact-details']}>
                    <h3>{info.title}</h3>
                    {info.href ? (
                      <p className={s['contact-value']}>
                        <a href={info.href}>{info.value}</a>
                      </p>
                    ) : (
                      <p className={s['contact-value']}>{info.value}</p>
                    )}
                    <p className={s['contact-subtitle']}>{info.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={s['main-contact-section']}>
        <div className="container">
          <div className={s['contact-layout']}>
            {/* Contact Form */}
            <div className={s['form-section']}>
              <div className={s['form-header']}>
                <h2>Envoyez-nous un message</h2>
                <p>Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={s['contact-form']}>
                  <div className={s['form-row']}>
                    <div className={s['form-group']}>
                      <label htmlFor="name">
                        <User size={18} aria-hidden="true" />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div className={s['form-group']}>
                      <label htmlFor="email">
                        <Mail size={18} aria-hidden="true" />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className={s['form-group']}>
                    <label htmlFor="company">
                      <Building size={18} aria-hidden="true" />
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise (optionnel)"
                    />
                  </div>

                  <div className={s['form-group']}>
                    <label htmlFor="subject">
                      <MessageCircle size={18} aria-hidden="true" />
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="general">Question générale</option>
                      <option value="order">Commande/Livraison</option>
                      <option value="partnership">Partenariat</option>
                      <option value="technical">Support technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className={s['form-group']}>
                    <label htmlFor="message">
                      <Send size={18} aria-hidden="true" />
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                    ></textarea>
                  </div>

                  <button type="submit" className={s['submit-btn']}>
                    <Send size={20} aria-hidden="true" />
                    Envoyer le message
                  </button>
                </form>
              ) : (
                <div className={s['success-message']}>
                  <CheckCircle size={60} aria-hidden="true" />
                  <h3>Message envoyé !</h3>
                  <p>Merci pour votre message. Nous vous répondrons dans les 24 heures.</p>
                </div>
              )}
            </div>

            {/* Why Contact Us */}
            <div className={s['reasons-section']}>
              <h3>Pourquoi nous contacter ?</h3>
              <div className={s['reasons-list']}>
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <div
                      key={index}
                      className={s['reason-item']}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className={s['reason-icon']}>
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <div className={s['reason-content']}>
                        <h4>{reason.title}</h4>
                        <p>{reason.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className={s['social-section']}>
                <h4>Suivez-nous</h4>
                <div className={s['social-links']}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`${s['social-link']} ${s[social.className]}`}
                      >
                        <Icon size={20} aria-hidden="true" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={s['faq-section']}>
        <div className="container">
          <div className={s['section-header']}>
            <h2>Questions Fréquentes</h2>
            <p>Trouvez rapidement les réponses à vos questions les plus courantes</p>
          </div>
          <div className={s['faq-grid']}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={s['faq-card']}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={s['faq-question']}>
                  <HelpCircle size={20} aria-hidden="true" />
                  <h4>{item.question}</h4>
                </div>
                <p className={s['faq-answer']}>{item.answer}</p>
              </div>
            ))}
          </div>
          <div className={s['faq-cta']}>
            <p>Vous ne trouvez pas la réponse à votre question ?</p>
            <Link href="/contact" className={s['btn-secondary']}>
              Contactez-nous directement
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={s['cta-section']}>
        <div className="container">
          <div className={s['cta-content']}>
            <h2>Prêt à découvrir nos palettes ?</h2>
            <p>Parcourez notre sélection de palettes de liquidation et trouvez les opportunités qui vous correspondent.</p>
            <Link href="/palettes" className={s['btn-primary']}>
              Voir les palettes
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
