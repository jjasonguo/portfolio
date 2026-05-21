import { motion } from 'framer-motion';

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
  return (
    <footer id="contact" className="py-32 px-8 border-t border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 variants={item} className="text-3xl font-bold text-white mb-4">
            Contact
          </motion.h2>
          <motion.p variants={item} className="text-lg text-zinc-400 mb-10 leading-relaxed">
            Feel free to give me a job
          </motion.p>
          <motion.div variants={item}>
            <a
              href="mailto:jhg294@cornell.edu"
              aria-label="Send email to Jason Guo"
              className="inline-block px-8 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors duration-200"
            >
              jhg294@cornell.edu
            </a>
          </motion.div>
          <motion.p variants={item} className="mt-16 font-mono text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Jason Guo. Built with Claude Code &amp; a lot of tokens
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
