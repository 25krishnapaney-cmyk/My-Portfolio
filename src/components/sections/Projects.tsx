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
    const rotateAmount = isMobile ? 45 : 90;

    // Set initial 3D rotation (locked state)
    gsap.set(cards, {
      rotateY: rotateAmount,
      scale: 0.8,
      opacity: 0,
      filter: 'blur(10px)',
      transformPerspective: 1200,
    });

    // Create a ScrollTrigger for each card to "unlock" it
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'back.out(1.5)',
          });
        },
        // Re-lock if scrolling up past it
        onLeaveBack: () => {
          gsap.to(card, {
            rotateY: -rotateAmount,
            scale: 0.8,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'power2.in',
          });
        }
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
            <div key={project.slug} className="project-card-wrapper" style={{ perspective: '1200px' }}>
              <div className="glass-card h-full flex flex-col p-5 sm:p-6 md:p-8 relative overflow-hidden group rounded-2xl hover:-translate-y-2 transition-transform duration-500">
                
                {/* Glow Background Effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 to-[var(--accent-cyan)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center text-2xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {getCategoryIcon(project.category)}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-white transition-colors">
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold group-hover:text-[var(--accent-purple)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm mb-6 leading-relaxed transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Footer */}
                <div className="relative z-10 mt-auto pt-6 border-t" style={{ borderColor: 'var(--border-glass)' }}>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-md border transition-colors glass-subtle" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-subtle)' }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md border glass-subtle" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-subtle)' }}>
                        +{project.technologies.length - 4}
                      </span>
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
