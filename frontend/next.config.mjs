/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOSTNAME: "localhost",
    APIBASEURL: "http://localhost:3030",
    // APIBASEURL: "https://fundnest-p0xa.onrender.com",
  },
};

export default nextConfig;
