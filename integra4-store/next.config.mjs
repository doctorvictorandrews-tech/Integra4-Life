/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Necessário para o plano gratuito do Cloudflare
  },
};

export default nextConfig;