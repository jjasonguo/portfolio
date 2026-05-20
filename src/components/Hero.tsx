import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-8 pt-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl text-center"
      >
        <motion.p variants={item} className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Hi, I'm
        </motion.p>
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Jason Guo
        </motion.h1>
        <motion.p
          variants={item}
          className="text-xl text-slate-400 mb-10 leading-relaxed"
        >
          Software engineer & CS student at Cornell. I build fast, elegant web
          experiences and explore machine learning.
        </motion.p>
        <motion.div variants={item} className="flex gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/25 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
