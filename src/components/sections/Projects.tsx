'use client';

import { useRef, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const attemptPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay blocked by mobile OS / Low Power Mode until user gesture
        });
      }
    };

    attemptPlay();

    const handleUserGesture = () => {
      attemptPlay();
    };

    window.addEventListener('touchstart', handleUserGesture, { passive: true });
    window.addEventListener('scroll', handleUserGesture, { passive: true });
    window.addEventListener('click', handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('scroll', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
    };
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>('.featured-project-card, .coming-soon-banner');

    gsap.fromTo(elements,
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="projects" className="section" ref={containerRef}>
      <div className="container relative z-10">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          subtitle="A showcase of innovative AI, cloud, and web applications."
        />

        {/* Featured Live Project Card (Small Square Shape as Link) */}
        <div className="w-full flex justify-center items-center mt-10 mb-12 px-4 sm:px-6">
          <a
            href="https://file-grave.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-project-card glass w-72 h-72 sm:w-80 sm:h-80 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/50 hover:scale-[1.03] transition-all duration-500 flex flex-col justify-between p-6 block cursor-pointer"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Top Row: Favicon Logo & Badge */}
            <div className="relative z-10 flex items-center justify-between gap-2 w-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center shadow-sm shrink-0 overflow-hidden p-1.5">
                <img
                  src="/favicon.ico"
                  alt="File Grave Favicon Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://file-grave.vercel.app/favicon.ico';
                  }}
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/20 border border-purple-500/30 text-purple-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>File Converter</span>
              </div>
            </div>

            {/* Middle: Title & Description */}
            <div className="relative z-10 flex flex-col justify-center text-left my-auto overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent truncate">
                File Grave
              </h3>
              <p className="text-neutral-300 text-xs leading-relaxed line-clamp-3">
                A modern, lightning-fast file conversion web app designed for seamless format transformations and effortless workflows.
              </p>
            </div>

            {/* Bottom: Action Button Visual */}
            <div className="relative z-10 w-full pt-2">
              <div
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] group-hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                <span>Launch Converter</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </a>
        </div>

        {/* Coming Soon & Under Construction Video Banner */}
        <div className="w-full flex justify-center items-center mt-8 px-4">
          <div className="w-full max-w-4xl coming-soon-banner">
            <div className="flex flex-col items-center gap-6 group">
              {/* Coming Soon Badge Above Video */}
              <div className="glass px-8 py-6 rounded-3xl border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-md text-center max-w-xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                {/* Animated Icon */}
                <div className="flex items-center justify-center text-3xl mb-2 select-none">
                  <span className="animate-bounce inline-block">🚧</span>
                </div>

                {/* Coming Soon Title */}
                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                  More Coming Soon..
                </h3>

                {/* Status Badge */}
                <div className="inline-flex items-center justify-center gap-2.5 px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow-inner mx-auto">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                  </span>
                  <span className="tracking-wide">Cooking</span>
                </div>
              </div>

              {/* Video Player Below the Badge with Radiating Ambient Glow */}
              <div className="relative w-full">
                {/* Ambient Background Glow radiating outside the video frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-pulse" />

                {/* Video Player Box */}
                <div className="relative w-full rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] aspect-video bg-neutral-950 flex items-center justify-center z-10">
                  {/* Playing Video */}
                  <video
                    ref={videoRef}
                    src="/working.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    suppressHydrationWarning
                    onClick={() => {
                      if (videoRef.current?.paused) {
                        videoRef.current.play();
                      }
                    }}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
