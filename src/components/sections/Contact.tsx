'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/BrandIcons';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const contactInfo = [
  { icon: Mail, label: 'Email', value: '25krishnapaney@gmail.com', href: 'mailto:25krishnapaney@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'India', href: '#' },
];

const socialLinks = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/25krishnapaney-cmyk' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/krishna-pandey-x40020725' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/nadylostfilters?igsh=dTcxcXdxamxucW0z' },
];

export default function Contact() {

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          label="Contact"
          title="Let&apos;s Connect"
        />

        <div className="flex justify-center items-center w-full max-w-md mx-auto px-4">
          {/* Contact Info */}
          <ScrollReveal className="w-full" reveal3dType="unfold" direction="up">
            <div className="glass-card w-full flex flex-col items-center text-center" style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}>
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Get in Touch
              </h3>

              <div className="space-y-4 w-full mb-8 flex flex-col items-center">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-2 group p-4 rounded-2xl glass-subtle w-full transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5"
                  >
                    <span
                      className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-tertiary)' }}>
                        {label}
                      </p>
                      <p className="text-sm sm:text-base font-medium break-all" style={{ color: 'var(--text-primary)' }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Follow Me
              </h4>
              <div className="flex justify-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center transition-colors hover:border-purple-500/40 hover:bg-purple-500/5"
                    style={{ color: 'var(--text-tertiary)' }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
