
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mahaagro.org",
        pathname: "/Content/**",
      },
    ],
  },
};

module.exports = nextConfig;






