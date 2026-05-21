import { motion } from 'framer-motion';

const skills = [
  { category: 'Languages', items: ['Java', 'Python', 'R', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL', 'OCaml', 'C++', 'C', 'Dart'] },
  { category: 'Frameworks & Libraries', items: ['React', 'React Native', 'Node.js', 'Express', 'NestJS', 'Flask', 'PyTorch', 'TensorFlow', 'Flutter'] },
  { category: 'Databases & Tools', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL', 'Git', 'Postman', 'Unix'] },
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
              Hi I'm Jason. I'm currently a double major in{' '}
              <span className="text-white font-bold">Computer Science</span> and{' '}
              <span className="text-white font-bold">Statistics</span> at Cornell University. I love math,
              problem solving, building things, and breaking things,
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              I am interested in everything from machine learning and AI to full-stack web development. 
              On campus, I am involved in{' '}
              <span className="text-white font-bold">Cornell DTI</span> where I ship products facing the cornell community and{' '}
              <span className="text-white font-bold">Cornell Quant Fund</span> where I apply math and programming knowledge to financial markets.
              This summer, I will be interning at{' '}
              <span className="text-white font-bold">TikTok</span> on the Ads Interface and Platform Team in San Jose!
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
