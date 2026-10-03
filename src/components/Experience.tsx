import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experience, type Workstream } from '../data/portfolio'
import { accentBg, accentHex, accentTextOnDark } from './ui/accent'
import { MapPin } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="on-dark section-y relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading
          dark
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={
            <>
              Building a GenAI platform <span className="text-orange">from day one.</span>
            </>
          }
        />
        {experience.map((job) => (
          <Job key={job.company} job={job} />
        ))}
      </div>
    </section>
  )
}

function Job({ job }: { job: (typeof experience)[number] }) {
  const headline = job.workstreams.find((w) => w.metric)?.metric
  return (
    <>
      <Reveal>
        <article className="relative overflow-hidden rounded-3xl bg-ink-2 p-6 ring-1 ring-white/10 sm:p-10">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgb(233_113_66/0.18),transparent_55%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper font-display text-xl font-extrabold text-ink">
                  {job.company[0]}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-bold sm:text-4xl">{job.company}</h3>
                  <p className="text-white/70">{job.role}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1 font-semibold text-[#4fd8a0]">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
                  {job.period}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-white/75">
                  <MapPin size={14} /> {job.location}
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{job.summary}</p>
            </div>

            {headline && (
              <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Headline result</p>
                <p className="mt-3 font-display text-3xl leading-tight font-extrabold text-orange sm:text-4xl">{headline.value}</p>
                <p className="mt-1 text-white/70">{headline.label}</p>
              </div>
            )}
          </div>

          <ul className="relative mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {job.tech.map((t) => (
              <li key={t} className="rounded-lg bg-white/6 px-3 py-1.5 font-mono text-xs text-white/80 ring-1 ring-white/10">
                {t}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      <Timeline items={job.workstreams} />
    </>
  )
}

function Timeline({ items }: { items: Workstream[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div className="relative mt-16 lg:mt-24">
      <p className="mb-10 text-center font-mono text-xs tracking-[0.18em] text-white/50 uppercase">Key workstreams</p>
      <ol ref={ref} className="relative">
        {/* rail */}
        <div aria-hidden className="absolute top-0 bottom-0 left-[15px] w-[2px] rounded-full bg-white/10 lg:left-1/2 lg:-translate-x-1/2">
          <motion.div
            style={{ scaleY: progress }}
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-orange via-violet to-electric"
          />
        </div>

        {items.map((w, i) => {
          const left = i % 2 === 0
          return (
            <li key={w.title} className="relative grid pb-10 pl-12 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:pl-0 lg:pb-14">
              {/* node */}
              <span
                aria-hidden
                className="absolute top-6 left-[8px] grid h-4 w-4 place-items-center rounded-full bg-ink ring-2 lg:left-1/2 lg:-translate-x-1/2"
                style={{ ['--tw-ring-color' as string]: accentHex[w.accent] }}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${accentBg[w.accent]}`} />
              </span>

              <motion.div
                initial={{ opacity: 0, x: left ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={left ? 'lg:col-start-1' : 'lg:col-start-2'}
              >
                <WorkCard w={w} index={i} />
              </motion.div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function WorkCard({ w, index }: { w: Workstream; index: number }) {
  return (
    <article className="group rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/20">
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-display text-xl font-bold">{w.title}</h4>
        <span className="font-mono text-xs text-white/35">{String(index + 1).padStart(2, '0')}</span>
      </div>
      {w.metric && (
        <p className="mt-3 inline-flex flex-wrap items-baseline gap-x-2 rounded-xl bg-orange/12 px-3 py-2">
          <span className="font-display text-lg font-extrabold text-orange">{w.metric.value}</span>
          <span className="text-sm text-white/75">{w.metric.label}</span>
        </p>
      )}
      <p className="mt-3 leading-relaxed text-white/75">{w.text}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {w.tags.map((t) => (
          <li key={t} className={`rounded-md bg-white/6 px-2 py-1 font-mono text-[11px] ${accentTextOnDark[w.accent]}`}>
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}
