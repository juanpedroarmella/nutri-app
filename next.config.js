/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'canvas'],
  },
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '100mb',
    },
  }
}

module.exports = nextConfig
