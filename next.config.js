/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'tianruoxi.com',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'www.tianruoxi.com',
        port: '8000',
      },
    ],
  },
}

module.exports = nextConfig
