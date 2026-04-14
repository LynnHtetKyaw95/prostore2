import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a80wpkb3fo.ufs.sh",
        port: "",
      },
    ],
  },
};

export default nextConfig;
