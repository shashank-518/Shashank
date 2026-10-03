import { motion } from 'motion/react'
import { skillGroups } from '../data/portfolio'
import { accentBg, accentSoft, accentSpot } from './ui/accent'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

const uniqueCount = new Set(skillGroups.flatMap((g) => g.items.map((i) => i.toLowerCase()))).size

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y relative bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="skills-title"
            index="03"
            eyebrow="Skills & Stack"
            title={
              <>
                A stack built around <span className="text-violet-deep">LLMs</span> — and everything they need to ship.
              </>
            }
          />
          <div className="mb-12 flex shrink-0 gap-6 lg:mb-16">
            <div>
              <p className="font-display text-5xl font-extrabold text-ink">{uniqueCount}</p>
              <p className="text-sm text-muted">technologies</p>
            </div>
            <div className="w-px bg-ink/12" />
            <div>
              <p className="font-display text-5xl font-extrabold text-orange-deep">{skillGroups.length}</p>
              <p className="text-sm text-muted">disciplines</p>
            </div>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <motion.li
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={g.wide ? 'sm:col-span-2' : ''}
            >
              <SpotlightCard
                spot={accentSpot[g.accent]}
                className="group h-full rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink/8 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg ${accentBg[g.accent]} transition-transform duration-300 group-hover:rotate-6`}>
                      <span className="h-3 w-3 rounded-[3px] bg-white/90" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-tight font-bold">{g.title}</h3>
                      <p className="text-xs text-muted">{g.blurb}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className={`rounded-[var(--radius-chip)] px-2.5 py-1 text-[13px] font-medium transition-colors duration-200 ${accentSoft[g.accent]}`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
