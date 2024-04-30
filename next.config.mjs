/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gogocdn.net'], // Add the domain here
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gogocdn.net",
        port: '',
        pathname: '/cover/**',
      },
      {
        protocol: "https",
        hostname: "gogocdn.net",
        port: '',
        pathname: '/images/**',
      },
    ],
  }
};

export default nextConfig;
