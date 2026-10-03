import { contact, navItems, profile } from '../data/portfolio'
import { ArrowUp, GitHub, LinkedIn, Mail } from './ui/Icons'

export function Footer() {
  return (
    <footer className="on-dark border-t border-white/10 bg-[#0a0f24] py-10 text-white/60">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper font-display text-sm font-extrabold text-ink">{profile.initials}</span>
          <div>
            <p className="font-display font-bold text-paper">{profile.name}</p>
            <p className="text-xs">{profile.titles.join(' · ')}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {[
            { href: `mailto:${contact.email}`, label: 'Email', Icon: Mail, ext: false },
            { href: contact.github, label: 'GitHub', Icon: GitHub, ext: true },
            { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedIn, ext: true },
          ].map(({ href, label, Icon, ext }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:text-paper"
            >
              <Icon size={17} />
            </a>
          ))}
          <a href="#top" aria-label="Back to top" className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-orange text-ink transition hover:-translate-y-0.5">
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
      <p className="container-x mt-8 text-xs text-white/40">
        © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript & Tailwind CSS.
      </p>
    </footer>
  )
}
