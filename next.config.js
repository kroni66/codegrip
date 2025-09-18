/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nicepng.com',
      },
      {
        protocol: 'https',
        hostname: 'wpmunk.com',
      },
    ],
  },
}

module.exports = nextConfig
