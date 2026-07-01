'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/ui/BrandIcons';
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
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/25krishnapaney@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Portfolio Message from ${form.name}`,
          _template: 'box'
        }),
      });

      if (response.ok) {
        setFormState('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      // Fallback: open mailto link if API service is blocked
      window.location.href = `mailto:25krishnapaney@gmail.com?subject=New Portfolio Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          label="Contact"
          title="Let&apos;s Connect"
        />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Contact Info */}
          <ScrollReveal className="w-full md:w-2/5" reveal3dType="unfold" direction="left">
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

          {/* Contact Form */}
          <ScrollReveal className="w-full md:w-3/5" delay={0.1} reveal3dType="tilt" direction="right">
            <form onSubmit={handleSubmit} className="glass-card h-full flex flex-col" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Send a Message
              </h3>

              <div className="space-y-4 flex-1">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name
                  </label>
                  <div className="w-full rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/30"
                    style={{
                    background: 'var(--bg-glass-subtle)',
                    border: '1px solid var(--border-glass)',
                    }}>
                    <input
                      id="name"
                      name="contact-name"
                      type="text"
                      autoComplete="off"
                      data-1p-ignore
                      data-lpignore="true"
                      data-form-type="other"
                      suppressHydrationWarning
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 text-sm outline-none bg-transparent"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email
                  </label>
                  <div className="w-full rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/30"
                    style={{
                    background: 'var(--bg-glass-subtle)',
                    border: '1px solid var(--border-glass)',
                    }}>
                    <input
                      id="email"
                      name="contact-email"
                      type="email"
                      autoComplete="off"
                      data-1p-ignore
                      data-lpignore="true"
                      data-form-type="other"
                      suppressHydrationWarning
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="YourEmail@example.com"
                      required
                      className="w-full px-4 py-3 text-sm outline-none bg-transparent"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Message
                  </label>
                  <div className="w-full rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/30"
                    style={{
                    background: 'var(--bg-glass-subtle)',
                    border: '1px solid var(--border-glass)',
                    }}>
                    <textarea
                      id="message"
                      suppressHydrationWarning
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or just say hello..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 text-sm outline-none resize-none bg-transparent"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={formState !== 'idle'}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-70"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {formState === 'idle' && (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                )}
                {formState === 'sent' && (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                )}
                {formState === 'error' && (
                  <>
                    <Mail size={16} />
                    Opening Email Client...
                  </>
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
