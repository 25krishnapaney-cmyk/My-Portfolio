'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { certifications } from '@/data/certifications';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeading
          label="Certifications"
          title="Credentials & Learning"
          subtitle="Continuous learning validated through industry-recognized certifications."
        />

        {/* Stacked Grid layout matching Achievements */}
        <div className="flex justify-center w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full">
          {certifications.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.08} reveal3dType={i % 3 === 0 ? 'flip' : i % 3 === 1 ? 'tilt' : 'unfold'} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                className="glass-card p-6 text-center group cursor-pointer h-full flex flex-col justify-between"
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)',
                }}
                onClick={() => setSelectedCert(i)}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  {cert.image ? (
                    <div className="w-full h-36 mb-4 rounded-lg overflow-hidden relative bg-black/40 flex items-center justify-center pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(0)' }}>
                      <div className="absolute inset-0 border border-white/20 rounded-lg z-20 mix-blend-overlay shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] pointer-events-none" />
                      {cert.image.endsWith('.pdf') ? (
                        <>
                          <object
                            data={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                            type="application/pdf"
                            className="h-full scale-[1.15] max-w-none"
                            style={{ width: 'calc(100% + 40px)', transformOrigin: 'center center' }}
                            tabIndex={-1}
                          />
                          <div className="absolute inset-0 z-10 bg-transparent" />
                        </>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <motion.span
                      className="text-4xl mb-4 block"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {cert.icon}
                    </motion.span>
                  )}

                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cert.title}
                  </h3>
                </div>

                <div className="space-y-3 pt-3">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium glass-subtle"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {cert.issuer}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {cert.date}
                    </span>
                  </div>

                  {cert.url && !cert.image && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center justify-center gap-1.5 text-xs font-medium transition-colors pt-1 ${
                        cert.url.includes('google') || cert.url.includes('g.dev')
                          ? 'text-cyan-400 hover:text-cyan-300'
                          : 'text-orange-400 hover:text-orange-300'
                      }`}
                    >
                      <span>
                        {cert.url.includes('credly')
                          ? 'Verify on Credly'
                          : cert.url.includes('google') || cert.url.includes('g.dev')
                          ? 'Verify Google Profile'
                          : 'Verify Credential'}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
          </div>
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {selectedCert !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                onClick={() => setSelectedCert(null)}
              />
              <motion.div
                className="relative glass-strong rounded-3xl p-5 sm:p-8 max-w-sm sm:max-w-md w-full text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full glass-subtle flex items-center justify-center cursor-pointer"
                >
                  <X size={16} style={{ color: 'var(--text-secondary)' }} />
                </button>

                {certifications[selectedCert].image ? (
                  <div className="w-full mb-6 rounded-xl overflow-hidden relative aspect-[4/3] bg-black/40 flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(0)' }}>
                    <div className="absolute inset-0 border-2 border-white/20 rounded-xl z-20 mix-blend-overlay pointer-events-none" />
                    {certifications[selectedCert].image?.endsWith('.pdf') ? (
                      <object
                        data={`${certifications[selectedCert].image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        type="application/pdf"
                        className="h-full scale-[1.12] max-w-none"
                        style={{ width: 'calc(100% + 40px)', transformOrigin: 'center center' }}
                      >
                        <p className="text-sm text-center">
                          PDF preview not available. <a href={certifications[selectedCert].image} target="_blank" rel="noreferrer" className="underline" style={{ color: 'var(--accent-cyan)' }}>Download it here</a>.
                        </p>
                      </object>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={certifications[selectedCert].image} 
                        alt={certifications[selectedCert].title} 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4"
                      style={{ background: 'var(--accent-gradient)' }}
                    >
                      <Award size={28} className="text-white" />
                    </div>

                    <span className="text-4xl mb-4 block">
                      {certifications[selectedCert].icon}
                    </span>
                  </>
                )}
                
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {certifications[selectedCert].title}
                </h3>
                <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Issued by {certifications[selectedCert].issuer}
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                  {certifications[selectedCert].date}
                </p>

                {certifications[selectedCert].url && (
                  <motion.a
                    href={certifications[selectedCert].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white"
                    style={{ background: 'var(--accent-gradient)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={14} />
                    View Credential
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
