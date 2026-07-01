'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  reveal3d?: boolean;
  reveal3dType?: 'flip' | 'tilt' | 'unfold';
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  reveal3d = true,
  reveal3dType = 'tilt',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const isTouchOrMobile = typeof window !== 'undefined' && (window.innerWidth <= 1024 || 'ontouchstart' in window);

    // Calculate initial state based on direction and 3d type
    let x = 0, y = 0, rotateX = 0, rotateY = 0;

    if (direction === 'up') y = isTouchOrMobile ? Math.min(distance, 30) : distance;
    else if (direction === 'down') y = isTouchOrMobile ? -Math.min(distance, 30) : -distance;
    else if (direction === 'left') x = isTouchOrMobile ? Math.min(distance, 30) : distance;
    else if (direction === 'right') x = isTouchOrMobile ? -Math.min(distance, 30) : -distance;

    if (reveal3d && !isTouchOrMobile) {
      if (reveal3dType === 'flip') {
        rotateX = direction === 'down' ? -45 : 45;
      } else if (reveal3dType === 'tilt') {
        rotateX = (direction === 'up' || direction === 'down') ? 25 : 0;
        rotateY = direction === 'left' ? 30 : direction === 'right' ? -30 : 12;
      } else if (reveal3dType === 'unfold') {
        rotateY = direction === 'right' ? -60 : 60;
      }
    }

    // Initial locked state
    gsap.set(el, {
      x,
      y,
      rotateX: isTouchOrMobile ? 0 : rotateX,
      rotateY: isTouchOrMobile ? 0 : rotateY,
      scale: (reveal3d && !isTouchOrMobile) ? 0.85 : 1,
      opacity: 0,
      filter: isTouchOrMobile ? 'none' : 'blur(12px)',
      transformPerspective: isTouchOrMobile ? 'none' : 1200,
      transformStyle: isTouchOrMobile ? 'flat' : 'preserve-3d'
    });

    // Scroll trigger for unlock/lock
    ScrollTrigger.create({
      trigger: el,
      start: isTouchOrMobile ? 'top 95%' : 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          filter: 'none',
          duration: isTouchOrMobile ? 0.5 : duration,
          delay: delay,
          ease: isTouchOrMobile ? 'power2.out' : 'back.out(1.5)',
        });
      },
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`w-full ${className}`.trim()}>
      {children}
    </div>
  );
}
