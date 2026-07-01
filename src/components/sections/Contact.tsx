'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/BrandIcons';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '25krishnapaney@gmail.com',
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || '25krishnapaney@gmail.com'}`,
  },
  { icon: MapPin, label: 'Location', value: 'India', href: '#' },
];

const socialLinks = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/25krishnapaney-cmyk',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/krishna-pandey-x40020725',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/nadylostfilters?igsh=dTcxcXdxamxucW0z',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container flex flex-col items-center justify-center">
        <SectionHeading label="Contact" title="Let&apos;s Connect" />

        <div className="w-full max-w-2xl mx-auto px-4">
          <ScrollReveal reveal3dType="unfold" direction="up">
            <div className="flex flex-col h-full group">
              <div
                className="glass-card w-full flex flex-col items-center text-center justify-between relative overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20"
                style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}
              >
                <div className="w-full">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    Get in Touch
                  </h3>
                  <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Have a question, project proposal, or just want to say hi? I&apos;m always open to discussing new opportunities in AI and software engineering.
                  </p>

                  <div className="space-y-4 w-full max-w-md mx-auto mb-10 flex flex-col items-center">
                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-4 group/item p-4 sm:p-5 rounded-2xl glass-subtle w-full transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 text-left shadow-sm hover:shadow-md"
                      >
                        <span
                          className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:text-purple-400"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          <Icon size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-tertiary)' }}>
                            {label}
                          </p>
                          <p className="text-sm sm:text-base font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                            {value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="w-full pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    Follow Me
                  </h4>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map(({ icon: Icon, label, href }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center transition-colors hover:border-purple-500/40 hover:bg-purple-500/5 shadow-sm hover:shadow-md"
                        style={{ color: 'var(--text-tertiary)' }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={label}
                      >
                        <Icon size={22} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Glowing purple line along bottom edge of card */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[0.5px] opacity-75 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.8)] pointer-events-none" />
              </div>

              {/* Glowing purple line reflection below card */}
              <div className="w-4/5 mx-auto h-1.5 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[1px] shadow-[0_0_20px_rgba(168,85,247,0.8),0_0_35px_rgba(139,92,246,0.6)] mt-4 pointer-events-none opacity-80 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
