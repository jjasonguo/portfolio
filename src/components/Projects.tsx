import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application built with React and Node.js.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    href: '#',
  },
  {
    title: 'ML Pipeline',
    description: 'End-to-end machine learning pipeline for data classification.',
    tags: ['Python', 'PyTorch', 'FastAPI'],
    href: '#',
  },
  {
    title: 'Dev Tool',
    description: 'CLI tool to automate repetitive development workflows.',
    tags: ['TypeScript', 'CLI', 'Open Source'],
    href: '#',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-3 text-center"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-center mb-14"
        >
          A selection of things I've built
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 transition-colors duration-200 cursor-pointer"
            >
              <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
