/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY
  }
}

module.exports = nextConfig
