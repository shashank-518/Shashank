import { about } from '../data/portfolio'
import { accentBg, accentSoft, accentSpot, accentText } from './ui/accent'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

/** Wraps known keywords in coloured highlight chips. */
function highlight(text: string) {
  const colors = ['bg-orange/15 text-orange-deep', 'bg-violet/12 text-violet-deep', 'bg-electric/10 text-electric-deep', 'bg-mint/12 text-mint-deep']
  const pattern = new RegExp(`(${about.keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(pattern).map((part, i) => {
    const idx = about.keywords.findIndex((k) => k.toLowerCase() === part.toLowerCase())
    if (idx === -1) return part
    return (
      <mark key={i} className={`rounded-md px-1.5 py-0.5 font-semibold ${colors[idx % colors.length]}`}>
        {part}
      </mark>
    )
  })
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative bg-sand">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="container-x relative">
        <SectionHeading id="about-title" index="01" eyebrow="About" title={<>Engineer first. <span className="text-orange-deep">Product</span> mindset.</>} />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-display text-2xl leading-snug font-semibold text-ink sm:text-[1.75rem]">{about.lead}</p>
            </Reveal>
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="mt-5 text-lg leading-[1.75] text-muted">{highlight(p)}</p>
              </Reveal>
            ))}

            <Reveal delay={0.25} className="mt-10">
              <h3 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">What I build</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {about.builds.map((b) => (
                  <li key={b.title} className="group flex gap-3 rounded-xl bg-paper/70 p-4 ring-1 ring-ink/8 transition hover:bg-paper hover:ring-ink/15">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm transition-transform duration-300 group-hover:rotate-45 ${accentBg[b.accent]}`} />
                    <span>
                      <span className="block font-display font-bold">{b.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted">{b.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="grid auto-rows-min gap-4 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <Reveal as="li" key={f.label} delay={0.06 * i} className={i === 0 ? 'sm:col-span-2' : ''}>
                <SpotlightCard
                  spot={accentSpot[f.accent]}
                  className="h-full rounded-[var(--radius-card)] bg-paper p-5 shadow-[var(--shadow-card)] ring-1 ring-ink/8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase ${accentSoft[f.accent]}`}>
                    {f.label}
                  </span>
                  <p className={`mt-3 font-display leading-tight font-bold ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} ${i === 0 ? accentText.ink : ''}`}>
                    {f.value}
                  </p>
                  {f.note && <p className="mt-1.5 text-sm text-muted">{f.note}</p>}
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
