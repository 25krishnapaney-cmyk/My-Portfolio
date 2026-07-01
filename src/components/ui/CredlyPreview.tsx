'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CredlyPreview() {
  const credlyUrl = 'https://www.credly.com/users/krishna-pandey.7bc9b9f9';

  const previewBadges = [
    { name: 'Google Cloud Ready', icon: '☁️', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
    { name: 'AI & Machine Learning', icon: '🤖', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
    { name: 'Python Engineering', icon: '🐍', color: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30' },
    { name: 'Problem Solving Champion', icon: '🏆', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30' },
  ];

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto my-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden group border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:shadow-[0_0_50px_rgba(249,115,22,0.2)] transition-all duration-500">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent block">
                Official Credly Showcase
              </span>
              <span className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Public Profile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active & Verifiable
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-7 space-y-3 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Krishna Pandey&apos;s Digital Credentials
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Explore my authentic, industry-recognized digital badges and technical certifications issued by leading organizations and platforms on Credly.
            </p>

            <div className="pt-2">
              <motion.a
                href={credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 border border-orange-400/30 transition-all cursor-pointer group/btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Verify Badges on Credly</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </div>

          {/* Badge Preview Pills */}
          <div className="md:col-span-5 bg-black/30 rounded-2xl p-4 border border-white/10 backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-white/50 border-b border-white/10 pb-2">
              <span>Verified Badge Highlights</span>
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Live Preview</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {previewBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl bg-gradient-to-r ${badge.color} border ${badge.border} backdrop-blur-md`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-xs font-medium text-white/90 leading-tight block">{badge.name}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-1">
              <a
                href={credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                View all achievements and metadata ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
