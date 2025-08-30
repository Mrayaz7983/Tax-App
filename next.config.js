const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname), // Root folder ko @ ke alias me map kare
    };
    return config;
  },
};

module.exports = nextConfig;
