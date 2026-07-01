'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import { skills, skillCategories } from '@/data/skills';
import type { SkillCategory } from '@/types';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('Programming');

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          label="Skills"
          title="Technologies I Work With"
          subtitle="A curated collection of tools and technologies I use to bring ideas to life."
        />

        {/* Category Tabs */}
        <ScrollReveal className="w-full flex justify-center" reveal3dType="flip">
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '0.75rem',
              width: '100%',
              marginBottom: '3rem'
            }}
          >
            {skillCategories.map((category) => (
              <motion.button
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skill Cards */}
        <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {filteredSkills.map((skill, i) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
                return (
                <motion.div
                  key={skill.name}
                  initial={isMobile ? { opacity: 0, y: 15 } : { opacity: 0, scale: 0.8, rotateY: 40 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: 'clamp(110px, 22vw, 140px)', perspective: isMobile ? 'none' : 800 }}
                >
                  <GlassCard 
                    className="p-4 text-center group cursor-pointer w-full h-full"
                    padding="p-4"
                    hover={true}
                    glow={true}
                    tiltDegree={8}
                  >
                    <motion.span
                      className="text-3xl mb-3 flex justify-center w-full"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {skill.name}
                    </span>
                  </GlassCard>
                </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
