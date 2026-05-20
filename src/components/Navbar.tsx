import { motion } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <span className="text-base font-semibold tracking-tight text-white">
        jason.
      </span>
      <nav className="flex gap-8">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
