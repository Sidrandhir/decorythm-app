// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        // Add your Supabase hostname here.
        // You can find it in your Supabase project URL.
        // Example: if your URL is https://xyz.supabase.co, the hostname is xyz.supabase.co
        protocol: 'https',
        hostname: 'yfdfmldhmssujuqsbnzb.supabase.co', // IMPORTANT: Replace with your actual Supabase project hostname
        port: '',
        pathname: '/storage/v1/object/public/generations/**',
      },
    ],
  },
};

export default nextConfig;