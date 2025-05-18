import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["oracledb"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
