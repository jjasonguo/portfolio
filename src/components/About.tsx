import { motion } from 'framer-motion';

const skills = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'R', 'Java', 'SQL'] },
  { category: 'Frameworks', items: ['React', 'Node.js', 'PyTorch', 'scikit-learn', 'FastAPI'] },
  { category: 'Areas', items: ['Machine Learning', 'Statistical Modeling', 'Full-Stack Dev', 'AI / LLMs'] },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function About() {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
          className="text-3xl font-bold text-white mb-16"
        >
          About
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={spring}
          >
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              I'm a double major in{' '}
              <span className="text-white">Computer Science</span> and{' '}
              <span className="text-white">Statistics</span> at Cornell University —
              drawn equally to the rigor of mathematical reasoning and the craft of
              building software.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              My work sits at the intersection of data and engineering. I've built
              AI-powered tools, contributed to full-stack products, and applied
              machine learning in bioinformatics research. I care about systems that
              are not just functional, but analytically sound.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...spring, delay: 0.1 }}
            className="space-y-8"
          >
            {skills.map(({ category, items }) => (
              <div key={category}>
                <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
