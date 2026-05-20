import { motion } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5"
    >
      <span className="text-lg font-semibold tracking-tight text-white">
        jason<span className="text-indigo-400">.</span>
      </span>
      <nav className="flex gap-8">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
