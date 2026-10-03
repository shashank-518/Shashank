import { highlights } from '../data/portfolio'
import { accentBg, accentText } from './ui/accent'
import { Counter } from './ui/Counter'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Achievements() {
  return (
    <section aria-labelledby="highlights-title" className="section-y relative bg-paper">
      <div className="container-x">
        <SectionHeading
          id="highlights-title"
          index="06"
          eyebrow="Highlights"
          align="center"
          title={
            <>
              Results, <span className="text-mint-deep">measured</span>.
            </>
          }
          description="Numbers taken straight from the work."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.label} delay={0.06 * i}>
              <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-ink/8 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span aria-hidden className={`absolute top-0 left-0 h-1 w-full origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100 ${accentBg[h.accent]}`} />
                <Counter
                  value={h.value}
                  decimals={h.decimals}
                  prefix={h.prefix}
                  suffix={h.suffix}
                  className={`block font-display text-6xl leading-none font-extrabold tracking-tight sm:text-7xl ${accentText[h.accent]}`}
                />
                <p className="mt-4 font-display text-xl font-bold">{h.label}</p>
                <p className="mt-1 font-mono text-xs text-muted">{h.source}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
