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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl w-full">
            {certifications.map((cert, i) => {
              if (!cert.image) return null;
              return (
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
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Verified Credential Profiles & Badges Section */}
        <div className="mt-16 w-full flex flex-col items-center">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Verified Credential Profiles
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              Public verification of cloud certifications, technical badges, and professional credentials.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
            {certifications
              .filter((cert) => !cert.image)
              .map((cert, i) => (
                <ScrollReveal key={i} delay={i * 0.1} reveal3dType="tilt" direction="up">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-6 sm:p-7 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md text-center flex flex-col items-center justify-between h-full group hover:border-purple-500/50 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 block"
                  >
                    <div>
                      {/* Ribbon / Medal Icon */}
                      <div className="relative mb-4 flex flex-col items-center">
                        {cert.title.includes('Credly') ? (
                          <>
                            <div className="flex justify-center -mb-2">
                              <div className="w-3 h-5 bg-blue-500 rounded-t-sm transform -rotate-12 translate-x-1" />
                              <div className="w-3 h-6 bg-purple-500 rounded-t-sm z-10" />
                              <div className="w-3 h-5 bg-pink-500 rounded-t-sm transform rotate-12 -translate-x-1" />
                            </div>
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-lg flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                              <div className="w-full h-full rounded-full bg-amber-950/90 border border-amber-300/40 flex items-center justify-center">
                                <Award className="w-7 h-7 text-amber-400 drop-shadow" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl">{cert.icon}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                        {cert.title}
                      </h4>

                      {/* Subtitle / Description */}
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5 max-w-xs mx-auto">
                        {cert.subtitle || `Official verification and active credential profile by ${cert.issuer}.`}
                      </p>
                    </div>

                    <div className="w-full flex flex-col items-center gap-5 pt-2">
                      {/* Pills */}
                      {cert.pills && (
                        <div className="flex flex-wrap justify-center gap-2">
                          {cert.pills.map((pill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-300 shadow-inner"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bottom Link */}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors pt-2 border-t border-white/10 w-full justify-center">
                        <span>{cert.linkText || 'Verify Credential'}</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </div>
                    </div>
                  </a>
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
