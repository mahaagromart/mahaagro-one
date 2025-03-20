/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdc5-152-52-228-70.ngrok-free.app",
      },
    ],
  },
};

module.exports = nextConfig;
