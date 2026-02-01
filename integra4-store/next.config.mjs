/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // O MÁGICO: Isso força o Cloudflare a entender que tudo é Edge ou Estático
  experimental: {
    runtime: 'edge',
  },
};

export default nextConfig;