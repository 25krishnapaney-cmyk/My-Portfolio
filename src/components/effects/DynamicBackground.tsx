'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Gamepad2, Camera, Cpu, Headphones, Mouse,
  Monitor, Code, Terminal, Smartphone, Battery,
  Rocket, Bot, Database, Server, Cloud, Laptop,
  Keyboard, Wifi, Bug, Globe, HardDrive, Mic, Speaker
} from 'lucide-react';

export default function DynamicBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Icon configuration for continuous "free fall"
  const fallingIcons = [
    { Icon: Gamepad2, size: 32, left: '10%', duration: 25, delay: 0 },
    { Icon: Camera, size: 40, left: '85%', duration: 35, delay: 5 },
    { Icon: Cpu, size: 24, left: '25%', duration: 28, delay: 2 },
    { Icon: Mouse, size: 28, left: '75%', duration: 32, delay: 8 },
    { Icon: Headphones, size: 36, left: '40%', duration: 40, delay: 1 },
    { Icon: Monitor, size: 30, left: '60%', duration: 22, delay: 12 },
    { Icon: Code, size: 24, left: '15%', duration: 30, delay: 15 },
    { Icon: Terminal, size: 34, left: '90%', duration: 38, delay: 9 },
    { Icon: Smartphone, size: 26, left: '50%', duration: 26, delay: 4 },
    { Icon: Battery, size: 20, left: '5%', duration: 34, delay: 18 },
    { Icon: Rocket, size: 38, left: '70%', duration: 45, delay: 7 },
    { Icon: Bot, size: 32, left: '35%', duration: 36, delay: 11 },

    // Additional elements for a denser background
    { Icon: Database, size: 28, left: '20%', duration: 27, delay: 3 },
    { Icon: Server, size: 34, left: '80%', duration: 33, delay: 6 },
    { Icon: Cloud, size: 40, left: '55%', duration: 42, delay: 10 },
    { Icon: Laptop, size: 30, left: '30%', duration: 30, delay: 14 },
    { Icon: Keyboard, size: 36, left: '65%', duration: 37, delay: 5 },
    { Icon: Wifi, size: 24, left: '45%', duration: 25, delay: 2 },
    { Icon: Bug, size: 22, left: '8%', duration: 29, delay: 17 },
    { Icon: Globe, size: 38, left: '95%', duration: 45, delay: 13 },
    { Icon: HardDrive, size: 26, left: '12%', duration: 31, delay: 9 },
    { Icon: Mic, size: 32, left: '88%', duration: 39, delay: 1 },
    { Icon: Speaker, size: 28, left: '48%', duration: 34, delay: 16 }
  ];

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--bg-primary)]">

      {/* Primary Accent Glow */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[120px] opacity-40 mix-blend-normal"
        style={{
          background: 'radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Secondary Accent Glow */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[100px] opacity-30 mix-blend-normal"
        style={{
          background: 'radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)',
          bottom: '-10%',
          right: '-5%',
        }}
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 80, -100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Tertiary Accent Glow */}
      <motion.div
        className="absolute w-[30vw] h-[30vw] md:w-[400px] md:h-[400px] rounded-full blur-[60px] md:blur-[90px] opacity-20 mix-blend-normal"
        style={{
          background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Free Falling Sketch Icons */}
      {fallingIcons.map((item, i) => {
        const Icon = item.Icon;
        return (
          <motion.div
            key={i}
            className="absolute opacity-[0.20] text-[var(--text-primary)]"
            style={{ left: item.left, top: '-10%' }}
            animate={{
              y: ['0vh', '120vh'],
              rotate: [0, 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Icon size={item.size} strokeWidth={1.2} />
          </motion.div>
        );
      })}

      {/* Noise Overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
