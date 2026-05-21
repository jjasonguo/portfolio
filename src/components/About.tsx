import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import torchImg from '../assets/torch.png';

const skills = [
  { category: 'Languages', items: ['Java', 'Python', 'R', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL', 'OCaml', 'C++', 'C', 'Dart'] },
  { category: 'Frameworks & Libraries', items: ['React', 'React Native', 'Node.js', 'Express', 'NestJS', 'Flask', 'PyTorch', 'TensorFlow', 'Flutter'] },
  { category: 'Databases & Tools', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL', 'Git', 'Postman', 'Unix'] },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

// Light circle around the flame tip
const TORCH_RADIUS = 220;
const GLOW_RADIUS = 380;

// Rendered size of torch.png (360×360 source → 72×72px)
const TORCH_PX = 72;
// Flame center is ~20% from top of the square image
const FLAME_OFFSET_Y = Math.round(TORCH_PX * 0.2);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (overlayRef.current) {
      overlayRef.current.style.background =
        `radial-gradient(circle at ${x}px ${y}px, transparent ${TORCH_RADIUS}px, rgba(0,0,0,0.78) ${GLOW_RADIUS}px, rgba(0,0,0,0.97) ${GLOW_RADIUS + 80}px)`;
    }

    if (torchRef.current) {
      // Flame center sits at cursor position
      torchRef.current.style.transform =
        `translate(${x - TORCH_PX / 2}px, ${y - FLAME_OFFSET_Y}px)`;
      torchRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.style.background = 'rgba(0,0,0,0.97)';
    }
    if (torchRef.current) {
      torchRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <section
      id="about"
      className="py-32 px-8 relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'none' }}
    >
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

      {/* Darkness overlay — torch cutout follows cursor */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.97)' }}
      />

      {/* Torch cursor — outer div positioned via ref, inner motion.div pulses glow */}
      <div
        ref={torchRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ opacity: 0, zIndex: 10, width: TORCH_PX, height: TORCH_PX }}
      >
        <motion.div
          animate={{
            filter: [
              'drop-shadow(0 0 6px rgba(255,155,0,0.85)) drop-shadow(0 0 18px rgba(255,95,0,0.55)) drop-shadow(0 0 36px rgba(255,70,0,0.28))',
              'drop-shadow(0 0 11px rgba(255,185,0,1.0)) drop-shadow(0 0 28px rgba(255,130,0,0.80)) drop-shadow(0 0 54px rgba(255,80,0,0.50))',
              'drop-shadow(0 0 4px rgba(255,130,0,0.70)) drop-shadow(0 0 13px rgba(255,75,0,0.45)) drop-shadow(0 0 26px rgba(255,55,0,0.20))',
              'drop-shadow(0 0 8px rgba(255,165,0,0.92)) drop-shadow(0 0 22px rgba(255,105,0,0.65)) drop-shadow(0 0 44px rgba(255,75,0,0.38))',
              'drop-shadow(0 0 6px rgba(255,155,0,0.85)) drop-shadow(0 0 18px rgba(255,95,0,0.55)) drop-shadow(0 0 36px rgba(255,70,0,0.28))',
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
        >
          <img
            src={torchImg}
            alt=""
            width={TORCH_PX}
            height={TORCH_PX}
            style={{ imageRendering: 'pixelated', display: 'block' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
