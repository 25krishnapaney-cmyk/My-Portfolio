'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { achievements } from '@/data/achievements';

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeading
          label="Achievements"
          title="Milestones & Recognition"
          subtitle="Awards, competitions, and accomplishments that fuel my drive to build more."
        />

        <div className="flex justify-center w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full">
            {achievements.map((achievement, i) => (
              <ScrollReveal key={i} delay={i * 0.08} reveal3dType={i % 3 === 0 ? 'flip' : i % 3 === 1 ? 'tilt' : 'unfold'} direction={i % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  className="glass-card p-6 text-center group cursor-default h-full flex flex-col justify-between"
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <motion.span
                      className="text-4xl mb-4 block"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {achievement.icon}
                    </motion.span>

                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {achievement.title}
                    </h3>

                    <p
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {achievement.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium glass-subtle"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {achievement.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {achievement.year}
                      </span>
                    </div>

                    {achievement.url && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-medium transition-colors pt-1 ${achievement.url.includes('google') || achievement.url.includes('g.dev')
                            ? 'text-cyan-400 hover:text-cyan-300'
                            : 'text-orange-400 hover:text-orange-300'
                          }`}
                      >
                        <span>
                          {achievement.url.includes('credly')
                            ? 'Verify on Credly'
                            : achievement.url.includes('google') || achievement.url.includes('g.dev')
                              ? 'Verify Google Profile'
                              : 'Verify Credential'}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

