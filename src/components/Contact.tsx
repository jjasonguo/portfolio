import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: spring },
};

export default function Contact() {
  const { isDark } = useTheme();

  return (
    <footer
      id="contact"
      className={`py-32 px-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={item}
            className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}
          >
            Contact
          </motion.h2>
          <motion.p
            variants={item}
            className={`text-lg mb-10 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
          >
            Feel free to give me a job
          </motion.p>
          <motion.div variants={item}>
            <a
              href="mailto:jhg294@cornell.edu"
              aria-label="Send email to Jason Guo"
              className={`inline-block px-8 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isDark
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              jhg294@cornell.edu
            </a>
          </motion.div>
          <motion.p
            variants={item}
            className={`mt-16 font-mono text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}
          >
            &copy; {new Date().getFullYear()} Jason Guo.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
