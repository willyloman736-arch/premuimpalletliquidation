/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Catalogue images from the Wholesale Ninjas product export.
      { protocol: 'https', hostname: 'wholesalenijas.com' },
      { protocol: 'https', hostname: 'www.wholesalenijas.com' },
      { protocol: 'https', hostname: 'wholesaleninjas.com' },
      { protocol: 'https', hostname: 'www.wholesaleninjas.com' },
      // Product images uploaded through the admin land on Cloudinary in the
      // original project. Allow them so a live Supabase dataset renders too.
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
