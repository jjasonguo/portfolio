import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { useTorch } from '../hooks/useTorch';
import TorchOverlay from './TorchOverlay';

const projects = [
  {
    title: 'Duck Duck Debug',
    description:
      'AI debugging assistant that helps developers identify, explain, and fix bugs through conversational interaction — rubber duck debugging, but smarter.',
    tags: ['TypeScript', 'React', 'OpenAI API', 'Node.js'],
    href: '#',
  },
  {
    title: 'CornellGo',
    description:
      'University-wide student-facing mobile app for exploring and engaging with campus life.',
    tags: ['Flutter', 'Nest.js', 'PostgreSQL'],
    href: '#',
  },
  {
    title: 'Munch!',
    description:
      'Mobile food tracking app with nutritional analysis, meal logging, and personalized insights to help users build healthier eating habits.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    href: '#',
  },
  {
    title: 'Derivatives Trading Algorithm',
    description:
      'An algorithmic trading strategy that won $1,000 in a competition!',
    tags: ['Python', 'Options Market Making'],
    href: '#',
  },
  {
    title: 'ResuMax',
    description:
      'AI-powered job application agent that automates resume tailoring, cover letter generation, and application workflows using large language models.',
    tags: ['Python', 'LLMs', 'AI Agents', 'FastAPI'],
    href: '#',
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function Projects() {
  const { isDark } = useTheme();
  const { sectionRef, overlayRef, torchRef, handleMouseMove, handleMouseLeave } = useTorch(isDark);

  return (
    <section
      id="projects"
      className="py-32 px-8 relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDark ? 'none' : undefined }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
          className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...spring, delay: 0.08 }}
          className={`mb-16 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          Some things I've built:
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
              className={`block p-6 rounded-2xl border transition-colors duration-200 cursor-pointer ${
                isDark
                  ? 'bg-white/[0.02] border-white/10 hover:border-white/30'
                  : 'bg-black/[0.02] border-black/10 hover:border-black/30'
              }`}
            >
              <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h3>
              <p className={`text-sm mb-5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-mono text-xs px-2 py-1 rounded-md border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-zinc-400'
                        : 'bg-black/[0.04] border-black/10 text-zinc-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {isDark && <TorchOverlay overlayRef={overlayRef} torchRef={torchRef} />}
    </section>
  );
}
