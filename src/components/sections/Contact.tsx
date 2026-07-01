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

        <div className="max-w-lg mx-auto">
          {/* Contact Info */}
          <ScrollReveal reveal3dType="unfold" direction="left">
            <div className="glass-card h-full" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Get in Touch
              </h3>

              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center transition-colors group-hover:text-purple-500"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {label}
                      </p>
                      <p className="text-sm font-medium break-all" style={{ color: 'var(--text-primary)' }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Follow Me
              </h4>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center"
                    style={{ color: 'var(--text-tertiary)' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon size={18} />
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
