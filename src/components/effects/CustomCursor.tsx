'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const trailConfig = { stiffness: 300, damping: 22, mass: 0.5 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Primary Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPressed ? 0.6 : isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />

      {/* Trailing Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border border-purple-500/40 bg-purple-500/5 backdrop-blur-[1px]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHovering ? 0.7 : 0.3) : 0,
        }}
        animate={{
          scale: isPressed ? 0.8 : isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.4)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  );
}
