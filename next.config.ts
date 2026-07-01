import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com;
  img-src 'self' blob: data: https://verify.skilljar.com https://www.credly.com https://www.skills.google https://g.dev https://images.unsplash.com;
  font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com https://fonts.gstatic.com;
  connect-src 'self' https: wss:;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false, // Prevent X-Powered-By header for obfuscation
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
