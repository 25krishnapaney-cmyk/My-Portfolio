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
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-all duration-700 transform group-hover:scale-105"
                />

                {/* Overlay with "Coming Soon" written directly on top */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-neutral-950/30 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center transition-all duration-500">
                  <div className="glass-subtle px-6 py-5 sm:px-10 sm:py-8 rounded-3xl border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-500 max-w-2xl mx-auto">
                    
                    {/* Animated Icons */}
                    <div className="flex items-center justify-center gap-3 text-2xl sm:text-4xl mb-3 select-none">
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0s' }}>🚧</span>
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0.15s' }}>⚡</span>
                      <span className="animate-bounce inline-block" style={{ animationDelay: '0.3s' }}>✨</span>
                    </div>

                    {/* Coming Soon Title */}
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                      Coming Soon...
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-neutral-200 max-w-lg mx-auto mb-5 drop-shadow">
                      My portfolio projects section is currently under construction! I am actively working on deploying cutting-edge AI agent workflows, cloud infrastructure tools, and interactive web applications. Check back soon!
                    </p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow-inner">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Under Active Development</span>
                    </div>
                  </div>
                </div>

                {/* Signature Glowing Purple Line along bottom edge of card */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[0.5px] opacity-75 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.8)] pointer-events-none" />
              </div>

              {/* Signature Glowing Purple Line Reflection below card */}
              <div className="w-4/5 mx-auto h-1.5 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[1px] shadow-[0_0_20px_rgba(168,85,247,0.8),0_0_35px_rgba(139,92,246,0.6)] mt-4 pointer-events-none opacity-80 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
