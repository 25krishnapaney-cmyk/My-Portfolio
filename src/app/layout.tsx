import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CustomCursor from '@/components/effects/CustomCursor';
import DynamicBackground from '@/components/effects/DynamicBackground';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Krishna | CS Student • AI Builder • Developer',
  description:
    'Personal portfolio of Krishna — a Computer Science Engineering student passionate about AI, full-stack development, and building innovative software products.',
  keywords: [
    'Krishna',
    'Portfolio',
    'Computer Science',
    'AI',
    'Machine Learning',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Python',
  ],
  authors: [{ name: 'Krishna' }],
  openGraph: {
    title: 'Krishna | CS Student • AI Builder • Developer',
    description:
      'Personal portfolio of Krishna — a Computer Science Engineering student passionate about AI, full-stack development, and building innovative software products.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna | CS Student • AI Builder • Developer',
    description:
      'Personal portfolio of Krishna — a Computer Science Engineering student passionate about AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload Clash Display from CDN */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-clash: 'Clash Display', sans-serif; }`,
          }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <DynamicBackground />
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
