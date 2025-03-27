/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "5136",
          pathname: "/Content/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
