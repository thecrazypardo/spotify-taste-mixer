/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This fixes the warning from your previous message
    allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  },
  /* Your other config options here */
};

export default nextConfig;