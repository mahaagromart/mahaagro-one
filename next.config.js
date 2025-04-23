<<<<<<< HEAD
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


=======
//  next.config.js
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
<<<<<<< HEAD
//         protocol: "http",
//         hostname: "localhost",
=======
//         protocol: "https",
//         hostname: "api.mahaagro.org",
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
//         pathname: "/Content/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
<<<<<<< HEAD
=======



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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
