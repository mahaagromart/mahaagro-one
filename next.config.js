//  next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "api.mahaagro.org",
//         pathname: "/Content/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "http",
        // hostname: "localhost",
        // pathname: "/Content/**",
        protocol: 'http',
        hostname: 'localhost',
        port: '5136',
        pathname: '/**',
      },
    ],
  },
};

 module.exports = nextConfig;
