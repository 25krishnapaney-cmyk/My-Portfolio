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
      {/* Python Logo Cursor */}
      <motion.div
        className="cursor-python"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPressed ? 0.7 : isHovering ? 1.4 : 1,
          rotate: isPressed ? -15 : isHovering ? 12 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue half (top-left) */}
          <path
            d="M54.919 0C26.737 0 28.456 11.76 28.456 11.76l.03 12.19h26.934v3.66H17.358S0 25.222 0 53.766c0 28.544 15.148 27.535 15.148 27.535h9.044V68.696s-.488-15.148 14.906-15.148h25.67s14.422.233 14.422-13.942V14.62S81.574 0 54.919 0zM40.326 8.44a4.671 4.671 0 110 9.342 4.671 4.671 0 010-9.342z"
            fill="#3776AB"
          />
          {/* Yellow half (bottom-right) */}
          <path
            d="M55.081 110c28.182 0 26.463-11.76 26.463-11.76l-.03-12.19H54.58v-3.66h38.062S110 84.778 110 56.234c0-28.544-15.148-27.535-15.148-27.535h-9.044v12.605s.488 15.148-14.906 15.148h-25.67S30.81 56.219 30.81 70.394v24.986S28.426 110 55.081 110zm14.593-8.44a4.671 4.671 0 110-9.342 4.671 4.671 0 010 9.342z"
            fill="#FFD43B"
          />
        </svg>
      </motion.div>

      {/* Trailing glow ring */}
      <motion.div
        className="cursor-trail"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPressed ? 0.5 : isHovering ? 1.6 : 1,
          opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
