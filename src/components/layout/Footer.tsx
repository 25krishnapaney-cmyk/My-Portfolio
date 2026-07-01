'use client';

import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/BrandIcons';

const socialIcons = [
  { icon: GithubIcon, href: 'https://github.com/25krishnapaney-cmyk', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/krishna-pandey-x40020725', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/nadylostfilters?igsh=dTcxcXdxamxucW0z', label: 'Instagram' },
  { icon: () => <Mail size={18} />, href: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJZZQghnZvqNqmgrwrptRSbsXDJprCzgZjjRvqnXSzVcFGzHfNvdlQQLFPPvpHsjCzqvwhL', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative py-8 md:py-12 border-t" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Logo + Quote */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="text-2xl font-bold tracking-tight inline-block mb-2"
              style={{ fontFamily: 'var(--font-clash)' }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">Krishna</span>
              <span style={{ color: 'var(--text-primary)' }}>.</span>
            </motion.a>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>&rdquo;
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center transition-colors hover:border-purple-500/40 hover:bg-white/5"
                style={{ color: 'var(--text-primary)' }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-6 md:mt-8 pt-6 text-center text-sm flex flex-wrap items-center justify-center gap-1"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--text-tertiary)',
          }}
        >
          <span>© {new Date().getFullYear()} Krishna. Built with</span>
          <Heart size={14} className="text-red-400 inline" fill="currentColor" />
          <span>and lots of Tech</span>
        </div>
      </div>
    </footer>
  );
}
