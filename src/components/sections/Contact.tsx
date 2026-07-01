'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/BrandIcons';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { contactFormSchema, formatValidationErrors } from '@/lib/validations';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Client-side Zod Schema Validation
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(formatValidationErrors(validationResult.error));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validationResult.data),
      });

      const data = await res.json();

      if (res.status === 429) {
        // Handle Rate Limit Error gracefully
        setStatus({
          type: 'error',
          message: data.error || `Too many requests! Please wait ${data.retryAfterSec || 60} seconds before trying again.`,
        });
      } else if (!res.ok) {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      } else {
        // Success
        setStatus({
          type: 'success',
          message: data.message || 'Message sent successfully! I will get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your internet connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container flex flex-col items-center justify-center">
        <SectionHeading label="Contact" title="Let&apos;s Connect" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl mx-auto px-4 items-start">
          {/* Column 1: Contact Info & Socials */}
          <ScrollReveal className="w-full lg:col-span-5" reveal3dType="unfold" direction="up">
            <div className="glass-card w-full flex flex-col items-center text-center h-full justify-between" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <div className="w-full">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Get in Touch
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Have a question, project proposal, or just want to say hi? I&apos;m always open to discussing new opportunities in AI and software engineering.
                </p>

                <div className="space-y-4 w-full mb-8 flex flex-col items-center">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 group p-4 rounded-2xl glass-subtle w-full transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 text-left"
                    >
                      <span
                        className="w-12 h-12 rounded-xl glass-subtle flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400"
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

              <div className="w-full pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  Follow Me
                </h4>
                <div className="flex justify-center gap-3">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl glass-subtle flex items-center justify-center transition-colors hover:border-purple-500/40 hover:bg-purple-500/5"
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
            </div>
          </ScrollReveal>

          {/* Column 2: Interactive Secure Contact Form */}
          <ScrollReveal className="w-full lg:col-span-7" reveal3dType="unfold" direction="up" delay={0.15}>
            <div className="glass-card w-full" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl glass-subtle text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-neutral-500 disabled:opacity-50 ${
                        errors.name ? 'border border-red-500/60 ring-2 ring-red-500/20' : 'focus:ring-purple-500/50 hover:border-purple-500/30'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl glass-subtle text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-neutral-500 disabled:opacity-50 ${
                        errors.email ? 'border border-red-500/60 ring-2 ring-red-500/20' : 'focus:ring-purple-500/50 hover:border-purple-500/30'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl glass-subtle text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-neutral-500 disabled:opacity-50 ${
                      errors.subject ? 'border border-red-500/60 ring-2 ring-red-500/20' : 'focus:ring-purple-500/50 hover:border-purple-500/30'
                    }`}
                    style={{ color: 'var(--text-primary)' }}
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1 font-medium">{errors.subject}</p>}
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, questions, or ideas..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl glass-subtle text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-neutral-500 resize-y min-h-[120px] disabled:opacity-50 ${
                      errors.message ? 'border border-red-500/60 ring-2 ring-red-500/20' : 'focus:ring-purple-500/50 hover:border-purple-500/30'
                    }`}
                    style={{ color: 'var(--text-primary)' }}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1 font-medium">{errors.message}</p>}
                </div>

                {/* Status Notifications */}
                <AnimatePresence>
                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                        status.type === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
                      ) : (
                        <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#ffffff',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
