/**
 * Central, environment-driven configuration. Every integration is optional:
 * the site renders and the commerce flow runs (in demo mode) without any of
 * these set. Provide the matching .env.local values to go live.
 */

export const adminConfig = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? 'admin',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'changeme',
};

export const cloudinaryConfig = {
  url: process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
  get enabled() {
    return Boolean(this.url && this.uploadPreset);
  },
};

export const emailjsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateClient: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT ?? '',
  templateAdmin: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN ?? '',
  get enabled() {
    return Boolean(this.publicKey && this.serviceId && this.templateClient);
  },
};

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  backendUrl: process.env.NEXT_PUBLIC_STRIPE_BACKEND_URL ?? '',
  get enabled() {
    return Boolean(this.publishableKey);
  },
};

/** Payment methods offered at checkout. Add 'carte' to re-enable Stripe cards. */
export const ENABLED_PAYMENT_METHODS = ['virement', 'applepay'];
