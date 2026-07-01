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

        {/* Coming Soon & Under Construction Banner */}
        <div className="max-w-3xl mx-auto mt-6 coming-soon-banner">
          <div className="glass-card p-10 sm:p-16 rounded-3xl text-center relative overflow-hidden border border-white/10 shadow-2xl group hover:border-white/20 transition-all duration-500">
            
            {/* Glow Background Effect */}
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* Under Construction Logo & Smiling Face */}
            <div className="flex items-center justify-center gap-4 text-5xl sm:text-6xl mb-6 select-none">
              <span className="animate-bounce inline-block" style={{ animationDelay: '0s' }}>🚧</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: '0.15s' }}>😊</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: '0.3s' }}>🛠️</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Coming Soon...
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
              My portfolio projects section is currently under construction! I am actively working on deploying cutting-edge AI agent workflows, cloud infrastructure tools, and interactive web applications. Check back soon!
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/5 border border-white/10 text-[var(--text-primary)] shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
              <span>Under Active Development</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

