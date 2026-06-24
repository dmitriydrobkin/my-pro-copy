/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем генерацию статических страниц, так как мы полностью на Edge
  output: 'standalone', 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;