import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images:{
    domains: [
      "Main.hivetech.space",

    ],
    dangerouslyAllowSVG:true,
    remotePatterns:[  
      {
        protocol:'https',
        hostname:'*'
      }
    ]
  }
  



};

export default nextConfig;
