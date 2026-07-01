'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-10 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 50, rotateX: 35, filter: 'blur(12px)', scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <span className="section-label">
        <span className="accent-dot" />
        {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p
          className="section-subtitle"
          style={{ 
            textAlign: align === 'center' ? 'center' : 'left', 
            textWrap: 'balance',
            margin: align === 'center' ? '0 auto' : undefined
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
