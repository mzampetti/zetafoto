/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "www.datocms-assets.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/it",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
