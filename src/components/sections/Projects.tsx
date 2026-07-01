'use client';

import { useRef, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
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
    const banner = gsap.utils.toArray<HTMLElement>('.coming-soon-banner');
    
    gsap.fromTo(banner, 
      { scale: 0.9, opacity: 0, y: 30 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
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
                  Coming Soon...
                </h3>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow-inner">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Cooking</span>
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
