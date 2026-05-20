import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-zinc-500 text-sm tracking-widest uppercase mb-6"
        >
          CS + Statistics · Cornell University
        </motion.p>
        <motion.h1
          variants={item}
          className="text-6xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Jason Guo
        </motion.h1>
        <motion.p
          variants={item}
          className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          I build software at the intersection of data and human experience —
          from AI-powered applications to full-stack systems grounded in
          statistical thinking.
        </motion.p>
        <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-white text-sm font-medium transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
