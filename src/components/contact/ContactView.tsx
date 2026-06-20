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
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/lib/config';
import { site } from '@/lib/site';
import s from './ContactView.module.css';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    subtitle: 'Reply within 24h',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: site.whatsapp,
    href: site.whatsappHref,
    subtitle: 'Chat with us now',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: site.phone,
    href: site.phoneHref,
    subtitle: site.hours,
  },
  {
    icon: MapPin,
    title: 'Address',
    value: site.address,
    subtitle: 'By appointment',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: '9am – 6pm ET',
    subtitle: 'Monday to Friday',
  },
];

const faqItems = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse our available pallets, pick the one you want, and follow the checkout process. We support you at every step.',
  },
  {
    question: 'What are the shipping times?',
    answer:
      'We ship within 48 hours of confirming your order. Delivery typically takes 2–5 business days depending on your location.',
  },
  {
    question: 'Can I visit your warehouse?',
    answer:
      'Yes — visits are available by appointment. Contact us to schedule a time and see our pallets in person.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We stand behind the quality of our pallets. If there is an issue, contact us within 7 days of delivery and we will make it right.',
  },
];

const reasons = [
  {
    icon: MessageCircle,
    title: 'Questions about our pallets',
    description: 'Need details on our products or our grading process?',
  },
  {
    icon: Building,
    title: 'B2B partnerships',
    description: 'Interested in a partnership or volume purchasing?',
  },
  {
    icon: HelpCircle,
    title: 'Technical support',
    description: 'A problem with your order or need a hand?',
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', className: 'facebook', href: site.social.facebook },
  { icon: Instagram, label: 'Instagram', className: 'instagram', href: site.social.instagram },
  { icon: Twitter, label: 'X (Twitter)', className: 'twitter', href: site.social.twitter },
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = `Website enquiry — ${formData.subject} — ${formData.name}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.company ? `Company: ${formData.company}` : '',
      `Topic: ${formData.subject}`,
      '',
      formData.message,
    ]
      .filter(Boolean)
      .join('\n');

    if (emailjsConfig.enabled) {
      // Send the enquiry straight to the team inbox.
      emailjs
        .send(
          emailjsConfig.serviceId,
          emailjsConfig.templateAdmin || emailjsConfig.templateClient,
          {
            to_email: site.email,
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            subject,
            message: body,
          },
          { publicKey: emailjsConfig.publicKey },
        )
        .catch(() => {
          // Silent: the confirmation still shows; the customer can also use WhatsApp/email.
        });
    } else {
      // No email service configured — open a pre-filled message to info@.
      window.open(
        `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        '_blank',
      );
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', subject: 'general', message: '' });
    }, 3000);
  };

  return (
    <div className={s['contact-page']}>
      {/* Hero Section */}
      <section className={s['hero-section']}>
        <div className="container">
          <div className={s['hero-content']}>
            <span className="eyebrow eyebrow-invert">Get in touch</span>
            <h1>Contact Us</h1>
            <p>
              Our team is here to answer your questions and help you source the right liquidation
              pallets for your business.
            </p>
            <div className={s['hero-stats']}>
              <div className={s.stat}>
                <span className={s['stat-number']}>24h</span>
                <span className={s['stat-label']}>Response time</span>
              </div>
              <div className={s.stat}>
                <span className={s['stat-number']}>99%</span>
                <span className={s['stat-label']}>Customer satisfaction</span>
              </div>
              <div className={s.stat}>
                <span className={s['stat-number']}>7-Day</span>
                <span className={s['stat-label']}>Support window</span>
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
                <div key={index} className={s['contact-card']}>
                  <div className={s['contact-icon']}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className={s['contact-details']}>
                    <h3>{info.title}</h3>
                    {info.href ? (
                      <p className={s['contact-value']}>
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
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
                <h2>Send Us A Message</h2>
                <p>Fill out the form and we&apos;ll get back to you as soon as possible.</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className={s['contact-form']}>
                  <div className={s['form-row']}>
                    <div className={s['form-group']}>
                      <label htmlFor="name">
                        <User size={18} aria-hidden="true" />
                        Full name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
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
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className={s['form-group']}>
                    <label htmlFor="company">
                      <Building size={18} aria-hidden="true" />
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name (optional)"
                    />
                  </div>

                  <div className={s['form-group']}>
                    <label htmlFor="subject">
                      <MessageCircle size={18} aria-hidden="true" />
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="general">General question</option>
                      <option value="order">Order &amp; shipping</option>
                      <option value="partnership">Partnership</option>
                      <option value="technical">Technical support</option>
                      <option value="other">Other</option>
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
                      placeholder="Tell us about your needs..."
                      rows={6}
                    ></textarea>
                  </div>

                  <button type="submit" className={s['submit-btn']}>
                    <Send size={20} aria-hidden="true" />
                    Send Message
                  </button>
                </form>
              ) : (
                <div className={s['success-message']}>
                  <CheckCircle size={60} aria-hidden="true" />
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We&apos;ll reply within 24 hours.</p>
                </div>
              )}
            </div>

            {/* Why Contact Us */}
            <div className={s['reasons-section']}>
              <h3>Why Contact Us?</h3>
              <div className={s['reasons-list']}>
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <div key={index} className={s['reason-item']}>
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
                <h4>Follow Us</h4>
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
            <span className="eyebrow">Good to know</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to the questions we hear most.</p>
          </div>
          <div className={s['faq-grid']}>
            {faqItems.map((item, index) => (
              <div key={index} className={s['faq-card']}>
                <div className={s['faq-question']}>
                  <HelpCircle size={20} aria-hidden="true" />
                  <h4>{item.question}</h4>
                </div>
                <p className={s['faq-answer']}>{item.answer}</p>
              </div>
            ))}
          </div>
          <div className={s['faq-cta']}>
            <p>Can&apos;t find the answer you&apos;re looking for?</p>
            <a href={`mailto:${site.email}`} className={s['btn-secondary']}>
              Email us directly
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={s['cta-section']}>
        <div className={s['cta-hazard']} aria-hidden="true" />
        <div className="container">
          <div className={s['cta-content']}>
            <h2>Ready To Browse Our Pallets?</h2>
            <p>Explore our liquidation pallets and find the opportunities that fit your business.</p>
            <Link href="/pallets" className={s['btn-primary']}>
              Shop Pallets
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
