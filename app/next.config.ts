import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media2.ntslive.co.uk',
        port: '',
        pathname: '/resize/800x800/*',
      },
    ],
  },
}

export default nextConfig
