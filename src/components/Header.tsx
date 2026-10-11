import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { portfolio } from '../data/portfolio';

const links = [
  { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' }, { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' }, { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/90 bg-white/95 backdrop-blur-xl">
      <nav className="container-shell flex h-[76px] items-center justify-between" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-[12px] font-extrabold tracking-tight text-white shadow-[0_5px_14px_rgba(59,130,246,.2)]">{portfolio.identity.initials}</span>
          <span className="text-[15px] font-bold tracking-[-0.04em] text-slate-800">{portfolio.identity.name}<span className="text-blue-500">.</span></span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.slice(0, 5).map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
          <a href="#contact" className="btn btn-primary !px-5 !py-3 text-[13px]">Contact <ArrowUpRight size={15} /></a>
        </div>
        <button
          type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(v => !v)}
        >{open ? <X size={21} /> : <Menu size={21} />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation" className="absolute inset-x-0 top-[76px] border-b border-slate-200 bg-white px-5 pb-5 pt-2 shadow-[0_18px_30px_rgba(15,23,42,.06)] lg:hidden"
            initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
          >
            <div className="mx-auto max-w-6xl">
              {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600">{link.label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
