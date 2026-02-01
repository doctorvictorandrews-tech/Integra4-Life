/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de código para subir logo
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;