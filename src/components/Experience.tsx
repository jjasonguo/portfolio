import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { useTorch } from '../hooks/useTorch';
import TorchOverlay from './TorchOverlay';
import tiktokLogo from '../assets/tiktoklogo.svg';
import chapterOneLogo from '../assets/chapteronelogo.jpeg';
import xoulLogo from '../assets/xoullogo.png';
import bwhLogo from '../assets/bwhlogo.webp';

const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'TikTok',
    logo: tiktokLogo,
    logoSize: 'w-25 h-25',
    detail: 'Ads Interface and Platform',
    period: 'Summer 2026',
    description: 'doomscrolling',
    upcoming: true,
  },
  {
    role: 'Fullstack Development Intern',
    company: 'Chapter One',
    logo: chapterOneLogo,
    logoSize: 'w-20 h-20',
    detail: null,
    period: '2024 – 2025',
    description: 'Vibecoded a CRM app supporting 150+ home service business owners',
    upcoming: false,
  },
  {
    role: 'Software Engineer Intern',
    company: 'Xoul.ai',
    logo: xoulLogo,
    detail: null,
    period: '2023 – 2024',
    description: 'Learned about RAG',
    upcoming: false,
  },
  {
    role: 'Bioinformatics Intern',
    company: 'Brigham and Women\'s Hospital',
    logo: bwhLogo,
    detail: null,
    period: '2022 – 2023',
    description: 'ChIP-seq on lung fibroblasts',
    upcoming: false,
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function Experience() {
  const { isDark } = useTheme();
  const { sectionRef, overlayRef, torchRef, handleMouseMove, handleMouseLeave } = useTorch(isDark);

  return (
    <section
      id="experience"
      className="py-32 px-8 relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDark ? 'none' : undefined }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
          className={`text-3xl font-bold mb-16 ${isDark ? 'text-white' : 'text-black'}`}
        >
          Experience
        </motion.h2>
        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ...spring, delay: i * 0.08 }}
              className={`border-t py-10 grid md:grid-cols-[auto_72px_1fr] gap-x-0 gap-y-6 items-center ${isDark ? 'border-white/10' : 'border-black/10'}`}
            >
              <div className="pr-6">
                <p className="font-mono text-sm text-zinc-500">{exp.period}</p>
                {exp.upcoming && (
                  <span className={`inline-block mt-2 font-mono text-xs px-2 py-0.5 border rounded ${
                    isDark ? 'border-white/20 text-zinc-400' : 'border-black/20 text-zinc-500'
                  }`}>
                    upcoming
                  </span>
                )}
              </div>
              <img
                src={exp.logo}
                alt={exp.company}
                className={`${exp.logoSize ?? 'w-16 h-16'} rounded-lg object-cover`}
              />
              <div className="pl-6">
                <h3 className={`font-medium text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{exp.role}</h3>
                <p className="font-mono text-sm text-zinc-500 mb-3">
                  {exp.company}{exp.detail ? ` · ${exp.detail}` : ''}
                </p>
                <p className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
          <div className={`border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />
        </div>
      </div>

      {isDark && <TorchOverlay overlayRef={overlayRef} torchRef={torchRef} />}
    </section>
  );
}
