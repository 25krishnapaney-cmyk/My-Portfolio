'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';


const roles = [
  'AI Builder',
  'Problem Solver',
  'Tech Enthusiast',
  'Future Entrepreneur',
  'Gamer',
  'Content Creator',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 sm:pt-48 lg:pt-[360px] pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="container relative z-10 mt-8 sm:mt-12 md:mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="order-2 lg:order-1">


            {/* Headline */}
            <motion.h1
              className="mb-4"
              style={{
                fontSize: 'var(--font-hero)',
                fontFamily: 'var(--font-clash)',
                fontWeight: 1000,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text">Krishna</span>
            </motion.h1>

            {/* Subtitle with role rotation */}
            <motion.div
              className="mb-6 flex flex-wrap items-center gap-x-2 sm:gap-x-3 text-lg sm:text-xl md:text-2xl font-medium"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span>CS Engineering Student</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="gradient-text font-semibold"
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg mb-8 sm:mb-10 max-w-xl leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Curiosity fuels everything I do. I'm a Computer Science Engineering student passionate about Agentic AI,
              full-stack development, and building intelligent digital experiences that solve real-world problems.
              Beyond engineering, I enjoy gaming, creating tech-focused content, and streaming my journey—sharing
              what I learn while constantly exploring, building, and pushing myself to grow.
            </motion.p>
          </div>

          {/* Right - Avatar */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Glow behind avatar */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.3)',
                }}
              />

              {/* 3D Glass Card Wrapper */}
              <GlassCard
                className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-3xl overflow-hidden cursor-pointer mx-auto"
                padding="p-1"
                hover={true}
                glow={true}
                tiltDegree={15}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden relative">
                  <Image
                    src="/foto.png"
                    alt="Krishna - Computer Science Student & AI Builder"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </GlassCard>

            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
