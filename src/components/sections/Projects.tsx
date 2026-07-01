'use client';

import { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

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
            <div className="flex flex-col group">
              {/* Video Player & Glass Overlay Container */}
              <div className="relative w-full rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl aspect-video bg-neutral-950 flex items-center justify-center">
                
                {/* Background Glow Effect */}
                <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

                {/* Playing Video */}
                <video
                  src="/working.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
                />

                {/* Overlay positioned at the TOP of the video */}
                <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 text-center pointer-events-none z-10">
                  <div className="glass px-6 py-4 sm:px-8 sm:py-6 rounded-3xl border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-500 max-w-xl mx-auto pointer-events-auto">
                    
                    {/* Animated Icons */}
                    <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl mb-2 select-none">
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0s' }}>🚧</span>
                    </div>

                    {/* Coming Soon Title */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                      Coming Soon...
                    </h3>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow-inner">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Cooking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
