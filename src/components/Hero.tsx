import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import PhysicsLetters from './PhysicsLetters';

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="absolute top-20 inset-x-0 flex justify-center z-20 pointer-events-none">
        <p className="font-mono text-zinc-500 text-sm tracking-widest uppercase">
          CS + Statistics · Cornell University
        </p>
      </div>

      <PhysicsLetters />

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 inset-x-0 flex justify-center z-20 cursor-pointer"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <p className="font-mono text-zinc-500 text-base tracking-widest uppercase">
          scroll
        </p>
      </motion.a>
    </section>
  );
}
