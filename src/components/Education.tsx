import { education } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/** Renders only when education entries exist in data/portfolio.ts (the resume lists none). */
export function Education() {
  if (education.length === 0) return null

  return (
    <section id="education" aria-labelledby="education-title" className="section-y bg-sand">
      <div className="container-x">
        <SectionHeading id="education-title" index="07" eyebrow="Education" title="Education" />
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <Reveal as="li" key={e.school}>
              <div className="h-full rounded-[var(--radius-card)] bg-paper p-7 ring-1 ring-ink/8 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold">{e.school}</h3>
                  {e.year && <span className="shrink-0 font-mono text-sm text-muted">{e.year}</span>}
                </div>
                <p className="mt-2 text-lg">{e.degree}</p>
                {e.specialization && <p className="text-orange-deep">{e.specialization}</p>}
                {e.notes && (
                  <ul className="mt-4 space-y-1 text-muted">
                    {e.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
