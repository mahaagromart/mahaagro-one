// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "api.mahaaagro.org",
//           port: "80",
//           pathname: "/Content/**",
//         },
//       ],
//     },
//   };
  
//   module.exports = nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.mahaagro.org"], // ✅ Allow images from this domain
  },
};

module.exports = nextConfig;
