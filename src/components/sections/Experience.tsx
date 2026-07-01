'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, Trophy, Users, Heart } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { experiences } from '@/data/experience';
import type { ExperienceType } from '@/types';

const typeIcons: Record<ExperienceType, React.ReactNode> = {
  Internship: <Briefcase size={18} />,
  Freelance: <Code2 size={18} />,
  Hackathon: <Trophy size={18} />,
  Leadership: <Users size={18} />,
  Volunteer: <Heart size={18} />,
};

const typeColors: Record<ExperienceType, string> = {
  Internship: '#3b82f6',
  Freelance: '#8b5cf6',
  Hackathon: '#06b6d4',
  Leadership: '#f59e0b',
  Volunteer: '#ec4899',
};

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          label="Experience"
          title="My Journey So Far"
          subtitle="Internships, freelancing, hackathons, and leadership roles that shaped my skills."
        />

        <div className="flex flex-col items-center w-full gap-12">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="max-w-3xl" reveal3dType={i % 2 === 0 ? 'unfold' : 'tilt'} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="glass-card p-5 sm:p-8 flex flex-col items-center text-center w-full">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <span
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1"
                    style={{
                      background: `${typeColors[exp.type]}15`,
                      color: typeColors[exp.type],
                    }}
                  >
                    {typeIcons[exp.type]}
                  </span>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium glass-subtle mt-1"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="text-base mb-6 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                  {exp.description}
                </p>
                <ul className="space-y-2 mb-6 text-left max-w-xl">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm md:text-base flex items-start gap-3" style={{ color: 'var(--text-tertiary)' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: typeColors[exp.type] }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {exp.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 border border-white/15 text-[var(--text-primary)] shadow-sm hover:border-white/30 hover:bg-white/15 transition-all duration-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
