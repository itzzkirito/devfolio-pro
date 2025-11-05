/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    DISCORD_USER_ID: process.env.DISCORD_USER_ID || '',
  },
};

module.exports = nextConfig;

