import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const { isDark, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md border-b ${
        isDark
          ? 'bg-black/80 border-white/10'
          : 'bg-white/80 border-black/10'
      }`}
    >
      <span className={`text-base font-semibold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
        jason's portfolio :)
      </span>
      <div className="flex items-center gap-6">
        <nav className="flex gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-sm transition-colors duration-200 ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`transition-colors duration-200 ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'
          }`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </motion.header>
  );
}
