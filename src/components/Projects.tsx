import { motion } from 'framer-motion';

const projects = [
  {
    title: 'ResuMax',
    description:
      'AI-powered job application agent that automates resume tailoring, cover letter generation, and application workflows using large language models.',
    tags: ['Python', 'LLMs', 'AI Agents', 'FastAPI'],
    href: '#',
  },
  {
    title: 'Duck Duck Debug',
    description:
      'AI debugging assistant that helps developers identify, explain, and fix bugs through conversational interaction — rubber duck debugging, but smarter.',
    tags: ['TypeScript', 'React', 'OpenAI API', 'Node.js'],
    href: '#',
  },
  {
    title: 'Munch!',
    description:
      'Mobile food tracking app with nutritional analysis, meal logging, and personalized insights to help users build healthier eating habits.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    href: '#',
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
          className="text-3xl font-bold text-white mb-3"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...spring, delay: 0.08 }}
          className="text-zinc-400 mb-16"
        >
          A selection of things I've built
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ...spring, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="block p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-colors duration-200 cursor-pointer"
            >
              <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-400"
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
