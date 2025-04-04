/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mahaagro.org", // ✅ no slash
        pathname: "/Content/**",     // ✅ matches your image path
      },
    ],
  },
};

export default nextConfig; // ✅ Use `module.exports` if not using `"type": "module"`
