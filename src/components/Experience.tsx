import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'TikTok',
    detail: 'Ads Interface and Platform',
    period: 'Summer 2026',
    description: 'doomscrolling',
    upcoming: true,
  },
  {
    role: 'Fullstack Development Intern',
    company: 'Chapter One',
    detail: null,
    period: '2024 – 2025',
    description:
      'Vibecoded a CRM app from the ground up supporting 150+ business owners',
    upcoming: false,
  },
  {
    role: 'Software Engineer Intern',
    company: 'Xoul.ai',
    detail: null,
    period: '2023 – 2024',
    description:
      'Learned about RAG',
    upcoming: false,
  },
  {
    role: 'Bioinformatics Intern',
    company: 'Brigham and Women\'s Hospital',
    detail: null,
    period: '2022 – 2023',
    description:
      'ChIP-seq on lung fibroblasts',
    upcoming: false,
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
          className="text-3xl font-bold text-white mb-16"
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
              className="border-t border-white/10 py-10 grid md:grid-cols-[180px_1fr] gap-6"
            >
              <div>
                <p className="font-mono text-sm text-zinc-500">{exp.period}</p>
                {exp.upcoming && (
                  <span className="inline-block mt-2 font-mono text-xs px-2 py-0.5 border border-white/20 text-zinc-400 rounded">
                    upcoming
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-medium text-lg mb-1">{exp.role}</h3>
                <p className="font-mono text-sm text-zinc-500 mb-3">
                  {exp.company}
                  {exp.detail ? ` · ${exp.detail}` : ''}
                </p>
                <p className="text-zinc-400 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
