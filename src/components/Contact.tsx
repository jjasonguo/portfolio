import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-8 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Let's connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 mb-8"
        >
          I'm open to internships, research collaborations, and interesting projects.
        </motion.p>
        <motion.a
          href="mailto:jhg294@cornell.edu"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200"
        >
          jhg294@cornell.edu
        </motion.a>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 text-xs text-slate-600"
        >
          &copy; {new Date().getFullYear()} Jason Guo. Built with React &amp; Framer Motion.
        </motion.div>
      </div>
    </footer>
  );
}
