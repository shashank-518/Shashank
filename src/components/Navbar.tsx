import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { contact, navItems, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { ArrowRight } from './ui/Icons'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape / when resizing up to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-[1240px] rounded-2xl transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          solid
            ? `${open ? 'bg-paper/97' : 'bg-paper/88'} shadow-[0_8px_30px_-12px_rgb(14_21_48/0.25)] ring-1 ring-ink/8 backdrop-blur-xl backdrop-saturate-150`
            : 'bg-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pr-2 pl-3 sm:h-16 sm:pl-4">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name} — back to top`}>
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-sm font-extrabold text-paper transition-transform duration-300 group-hover:-rotate-6">
              {profile.initials}
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange ring-2 ring-paper" />
            </span>
            <span className="hidden font-display text-[17px] font-bold tracking-tight sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative isolate block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      isActive ? 'text-paper' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${contact.email}`}
              className="group hidden h-10 items-center gap-2 rounded-full bg-orange px-5 text-sm font-semibold text-ink transition-colors hover:bg-[#f0814f] sm:inline-flex"
            >
              Let’s Talk
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full ring-1 ring-ink/12 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-4.5">
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                    open ? 'top-1.25 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                    open ? 'top-1.25 -rotate-45' : 'top-2.5'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="space-y-1 px-3 pt-1 pb-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-xl font-semibold transition-colors ${
                        active === item.id ? 'bg-ink text-paper' : 'text-ink hover:bg-sand'
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
                <li className="pt-2 sm:hidden">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-orange font-semibold text-ink"
                  >
                    Let’s Talk <ArrowRight size={16} />
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
