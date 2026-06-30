'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Resume() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);

    // Increment download counter
    const count = parseInt(localStorage.getItem('resume-downloads') || '0');
    localStorage.setItem('resume-downloads', (count + 1).toString());

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="resume" className="section">
      <div className="container">
        <SectionHeading
          label="Resume"
          title="My Resume"
          subtitle="A summary of my skills, experience, and education — all in one document."
        />

        <ScrollReveal reveal3dType="flip">
          <div className="max-w-md mx-auto">
            <motion.div
              className="glass-card p-8 text-center"
              whileHover={{ y: -4 }}
            >
              {/* Resume icon */}
              <motion.div
                className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FileText size={36} className="text-white" />
              </motion.div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Krishna — Resume 2025
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                Computer Science Engineering • AI/ML • Full Stack Development
              </p>

              {/* Download button */}
              <motion.a
                href="/resume.pdf"
                download
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer"
                style={{ background: 'var(--accent-gradient)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                {downloaded ? (
                  <>
                    <Check size={18} />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download Resume
                  </>
                )}
              </motion.a>

              <p
                className="text-xs mt-4"
                style={{ color: 'var(--text-tertiary)' }}
              >
                PDF • Last updated June 2025
              </p>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
