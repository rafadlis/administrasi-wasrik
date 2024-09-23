/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ hostname: "192.168.253.15" }],
  },
};

export default nextConfig;
