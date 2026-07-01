'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { personalityTraits } from '@/data/personality';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          label="About Me"
          title="Crafting the Future with Code"
          subtitle="A passionate CS student on a mission to build intelligent systems that make a difference."
        />

        {/* Main About Card */}
        <ScrollReveal className="flex justify-center w-full" reveal3dType="flip">
          <GlassCard className="w-full max-w-4xl">
            <div className="space-y-4 sm:space-y-6 text-center" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)' }}>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Krishna</strong>, aka <strong style={{ color: 'var(--text-primary)' }}>Nady</strong>, a Computer Science Engineering student driven by curiosity and a passion for technology.
              What started with writing my first lines of code has grown into an exciting journey of exploring
              Artificial Intelligence, Agentic AI, full-stack development, and modern software engineering.
              </p>

              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Beyond development, I'm equally passionate about <strong style={{ color: 'var(--text-primary)' }}>Gaming creating 
                tech-focused content, and streaming.</strong>,
              I love sharing my learning journey, exploring the latest innovations, and connecting with people who are 
              just as excited about technology as I am. These hobbies fuel my creativity and inspire me to approach 
              challenges from different perspectives.
              </p>

              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>My mission</strong> is to bridge the gap between
                cutting-edge AI research and practical applications. I believe that technology should be beautiful,
                accessible, and transformative. Every project I build is guided by this philosophy — from AI-powered
                learning tools to elegant developer dashboards.
              </p>

              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Looking ahead</strong>, I aspire to build an AI-first
                startup that solves real-world problems at scale. I&apos;m deeply interested in LLMs, agentic AI systems,
                computer vision, and the future of human-computer interaction. When I&apos;m not coding, you&apos;ll find me
                exploring research papers, contributing to open source, or mentoring fellow students.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>

        <div style={{ height: 'clamp(2rem, 4vw, 4rem)', width: '100%' }}></div>
o
        {/* Personality Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {personalityTraits.map((trait, i) => (
            <ScrollReveal key={trait.title} delay={i * 0.08} reveal3dType={i % 2 === 0 ? 'tilt' : 'unfold'} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                className="glass-card p-5 text-center group cursor-default"
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="text-3xl mb-3 block"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  {trait.icon}
                </motion.span>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {trait.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {trait.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
