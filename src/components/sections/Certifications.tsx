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

        {/* Horizontal scrollable cards */}
        <ScrollReveal reveal3dType="unfold" direction="right">
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-hide w-max max-w-full mx-auto px-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                className="glass-card p-6 w-[280px] sm:w-[320px] flex flex-col items-center text-center snap-center cursor-pointer flex-shrink-0"
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setSelectedCert(i)}
                initial={{ opacity: 0, x: 40, rotateY: 30, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 800 }}
              >
                {cert.image ? (
                  <div className="w-full h-32 sm:h-40 mb-4 rounded-lg overflow-hidden relative bg-black/40 flex items-center justify-center pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(0)' }}>
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
                  <span className="text-4xl mb-4 block">{cert.icon}</span>
                )}
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cert.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {cert.issuer}
                </p>
                <span className="text-xs mt-auto pt-2" style={{ color: 'var(--text-tertiary)' }}>
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

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
                className="relative glass-strong rounded-3xl p-8 max-w-md w-full text-center"
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
