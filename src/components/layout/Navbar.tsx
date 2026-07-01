'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { navItems } from '@/data/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed z-50 pointer-events-none transition-all duration-500 ${
          isScrolled ? 'top-4 right-4 md:right-8' : 'top-8 right-4 md:right-8'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-end pointer-events-auto">
          {/* Right side controls */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-2.5 md:gap-3">
            {/* Mobile Menu Button */}
            <motion.button
              className="w-11 h-11 rounded-full glass-subtle flex items-center justify-center cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X size={18} style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Menu size={18} style={{ color: 'var(--text-primary)' }} />
              )}
            </motion.button>

            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                className="w-11 h-11 rounded-full glass-subtle flex items-center justify-center cursor-pointer"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={18} style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <Moon size={18} style={{ color: 'var(--text-primary)' }} />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-xs glass-strong p-8 pt-40 pb-8 flex flex-col gap-2 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-center px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    activeSection === item.href.slice(1)
                      ? 'glass text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.a
                href="/resume.pdf"
                download
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer transition-transform"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                <FileText size={16} />
                Download Resume
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
