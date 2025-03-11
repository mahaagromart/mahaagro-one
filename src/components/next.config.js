/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["192.168.0.101"], 
      remotePatterns: [
        {
          protocol: "http",
          hostname: "192.168.0.101",
          port: "",
          pathname: "/api/Content/categoryicon/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  