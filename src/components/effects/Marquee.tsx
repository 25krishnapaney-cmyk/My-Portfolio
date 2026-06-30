'use client';

import { motion } from 'framer-motion';

const words = [
  "Agentic AI",
  "•",
  "Full-Stack Development",
  "•",
  "Problem Solver",
  "•",
  "Content Creator",
  "•",
  "Machine Learning",
  "•",
  "UI/UX Enthusiast",
  "•",
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden py-10 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] flex relative z-10">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
      >
        {/* We duplicate the words array to create a seamless infinite loop */}
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span 
            key={index} 
            className={`text-4xl md:text-6xl font-bold uppercase tracking-wider ${word === '•' ? 'text-[var(--text-tertiary)]' : 'text-transparent bg-clip-text'}`}
            style={word !== '•' ? { 
              backgroundImage: 'linear-gradient(90deg, var(--text-primary), var(--text-tertiary))',
              fontFamily: 'var(--font-clash)'
            } : { fontFamily: 'var(--font-clash)' }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
