'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  magneticStrength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  href,
  magneticStrength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-full font-medium text-sm
    transition-all duration-300 cursor-pointer
    overflow-hidden
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500
      text-white shadow-lg hover:shadow-xl
      hover:shadow-purple-500/20
    `,
    secondary: `
      glass border border-white/20
      text-[var(--text-primary)]
      hover:border-purple-500/30
    `,
    ghost: `
      text-[var(--text-secondary)]
      hover:text-[var(--text-primary)]
      hover:bg-[var(--bg-glass-subtle)]
    `,
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </Component>
  );
}
