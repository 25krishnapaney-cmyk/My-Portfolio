'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: string;
  tiltDegree?: number;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6 md:p-8',
  tiltDegree = 3,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const shouldTilt = hover && !isTouchDevice;

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [`${tiltDegree}deg`, `-${tiltDegree}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${tiltDegree}deg`, `${tiltDegree}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !shouldTilt) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass-card ${padding} ${className}`}
      style={shouldTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      onMouseMove={shouldTilt ? handleMouseMove : undefined}
      onMouseLeave={shouldTilt ? handleMouseLeave : undefined}
      whileHover={shouldTilt ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.06), transparent 80%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
