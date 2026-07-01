'use client';

import { useState, useRef } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects, projectCategories } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI': return '🧠';
    case 'Web Development': return '🌐';
    case 'Hackathon': return '🏆';
    case 'Research': return '🔬';
    default: return '💻';
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const containerRef = useRef<HTMLElement>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card-wrapper');
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // Set initial 3D rotation (locked state)
    gsap.set(cards, {
      rotateY: isMobile ? 0 : 60,
      scale: isMobile ? 0.95 : 0.85,
      opacity: 0,
      y: isMobile ? 30 : 0,
      filter: isMobile ? 'none' : 'blur(10px)',
      transformPerspective: isMobile ? 'none' : 1200,
    });

    // Create a ScrollTrigger for each card to "unlock" it once
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: isMobile ? 'top 95%' : 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            y: 0,
            filter: 'none',
            duration: isMobile ? 0.5 : 0.8,
            ease: isMobile ? 'power2.out' : 'back.out(1.2)',
          });
        },
      });
    });

  }, { dependencies: [filteredProjects], scope: containerRef });

  return (
    <section id="projects" className="section" ref={containerRef}>
      <div className="container relative z-10">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          subtitle="A collection of projects showcasing my skills in AI, web development, and problem-solving. Scroll to reveal them in sequence."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'text-white shadow-lg'
                  : 'glass-subtle hover:bg-[var(--bg-glass)]'
              }`}
              style={
                activeCategory === category
                  ? { background: 'var(--accent-gradient)' }
                  : { color: 'var(--text-secondary)' }
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, i) => (
            <div key={project.slug} className="project-card-wrapper h-full flex flex-col" style={{ perspective: '1200px' }}>
              <div className="glass-card h-full w-full flex flex-col justify-between p-5 sm:p-6 relative overflow-hidden group rounded-2xl hover:-translate-y-2 transition-all duration-500 text-center">
                
                {/* Glow Background Effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 to-[var(--accent-cyan)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Centered Category Icon (matching Achievements reference style) */}
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center text-2xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {getCategoryIcon(project.category)}
                  </div>
                </div>

                {/* Centered Content */}
                <div className="relative z-10 flex-grow mb-5">
                  <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-[var(--accent-purple)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm leading-relaxed transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Footer - Perfectly centered and formatted like Achievements */}
                <div className="relative z-10 w-full mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium text-[var(--text-tertiary)]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Centered GitHub & Demo Links or Coming Soon Badge */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    {!project.github && !project.demo ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-[var(--accent-cyan)] shadow-sm">
                        <Sparkles size={13} className="animate-pulse" />
                        <span>Work in Progress — Coming Soon!</span>
                      </span>
                    ) : (
                      <>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-tertiary)] hover:text-white transition-colors group/link"
                          >
                            <GithubIcon size={15} className="group-hover/link:scale-110 transition-transform" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors group/link"
                          >
                            <ExternalLink size={15} className="group-hover/link:scale-110 transition-transform" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
