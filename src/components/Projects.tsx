import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { projects, type Project } from '../data/portfolio'
import { accentSoft, accentText } from './ui/accent'
import { ArrowUpRight, GitHub, Mic } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const byId = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<Project['id'], Project>

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y relative overflow-hidden bg-sand">
      <div aria-hidden className="pointer-events-none absolute top-20 -right-40 h-[480px] w-[480px] rounded-full bg-orange/15 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow="Featured Projects"
          title={
            <>
              Things I’ve <span className="text-orange-deep">built</span> and shipped.
            </>
          }
          description="Voice agents, retrieval systems and fine-tuned models — each taken end-to-end, from data and models to APIs and UI."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ProjectCard project={byId.voice} visual={<VoiceVisual />} featured />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <ProjectCard project={byId.rag} visual={<RagVisual />} />
          </Reveal>
          <Reveal className="lg:col-span-12" delay={0.05}>
            <ProjectCard project={byId.shuttle} visual={<ShuttleVisual />} horizontal />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ card */

function ProjectCard({ project: p, visual, featured, horizontal }: { project: Project; visual: ReactNode; featured?: boolean; horizontal?: boolean }) {
  return (
    <article
      aria-labelledby={`p-${p.id}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] ${
        horizontal ? 'lg:flex-row' : ''
      }`}
    >
      <Tilt className={`p-3 ${horizontal ? 'lg:w-[46%] lg:shrink-0' : ''}`}>{visual}</Tilt>

      <div className={`flex flex-1 flex-col px-6 pt-4 pb-6 sm:px-8 sm:pb-8 ${horizontal ? 'lg:py-8 lg:pl-6' : ''}`}>
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase ${accentSoft[p.accent]}`}>{p.kicker}</span>
          <span className="font-mono text-xs text-muted">{p.year}</span>
        </div>
        <h3 id={`p-${p.id}`} className={`mt-4 font-bold leading-[1.1] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          {p.name}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{p.description}</p>

        <dl className="mt-6 grid gap-5 border-t border-ink/8 pt-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Problem</dt>
            <dd className="mt-2 font-display text-[17px] leading-snug font-semibold">{p.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">My contribution</dt>
            <dd>
              <ul className="mt-2 space-y-2">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/80">
                    <span aria-hidden className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-current ${accentText[p.accent]}`} />
                    {c}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {p.metrics.length > 0 && (
          <ul className={`mt-6 grid gap-2 ${p.metrics.length > 2 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`} aria-label="Results">
            {p.metrics.map((m) => (
              <li key={m.label} className="rounded-xl bg-white px-3 py-3 ring-1 ring-ink/6">
                <p className={`font-display text-xl leading-none font-extrabold ${accentText[p.accent]}`}>{m.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-muted">{m.label}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.tech.map((t) => (
              <li key={t} className="rounded-md bg-ink/[0.05] px-2 py-1 font-mono text-[11px] text-ink/75">
                {t}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} source code on GitHub (opens in new tab)`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper transition hover:bg-ink-2"
            >
              <GitHub size={16} /> Code
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-orange px-4 text-sm font-semibold text-ink">
                Live <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/** Gentle 3D tilt for project visuals — mouse only, disabled for reduced motion. */
function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className} style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="h-full">
        {children}
      </motion.div>
    </div>
  )
}

/* --------------------------------------------------------------- visuals */

function VoiceVisual() {
  const events = [
    { day: 1, top: '18%', h: '22%', label: 'Meeting', c: 'bg-violet text-white' },
    { day: 3, top: '44%', h: '30%', label: 'Focus block', c: 'bg-electric/85 text-white' },
    { day: 2, top: '62%', h: '14%', label: 'Reminder', c: 'bg-orange text-ink' },
  ]
  return (
    <div aria-hidden className="relative h-full min-h-[300px] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#efeaff] via-[#f4efff] to-[#ffe9df] p-4 sm:min-h-[340px] sm:p-6">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-20px_rgb(14_21_48/0.35)] ring-1 ring-ink/8">
        <div className="flex items-center gap-1.5 border-b border-ink/8 bg-paper px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-center font-mono text-[10px] text-muted ring-1 ring-ink/8">
            voice-calendar-agent
          </span>
        </div>
        <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr]">
          <div className="flex flex-col items-center justify-center gap-3 border-r border-ink/8 bg-ink p-4 text-paper">
            <div className="relative grid h-16 w-16 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-violet/40 [animation-duration:2.4s]" />
              <span className="absolute inset-2 rounded-full bg-violet/40" />
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-violet">
                <Mic size={20} />
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/60">listening…</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] text-[#4fd8a0]">barge-in on</span>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-5 gap-1 font-mono text-[9px] text-muted">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                <span key={d} className="text-center">
                  {d}
                </span>
              ))}
            </div>
            <div className="relative mt-1.5 grid h-[170px] grid-cols-5 gap-1 sm:h-[200px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-md bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_19px,rgb(14_21_48/0.06)_19px,rgb(14_21_48/0.06)_20px)] bg-sand/50" />
              ))}
              {events.map((e, i) => (
                <motion.span
                  key={e.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.25, duration: 0.4 }}
                  className={`absolute overflow-hidden rounded-md px-1.5 py-1 text-[9px] leading-tight font-semibold shadow-sm ${e.c}`}
                  style={{ left: `calc(${e.day * 20}% + 2px)`, width: 'calc(20% - 6px)', top: e.top, height: e.h }}
                >
                  <span className="hidden sm:inline">{e.label}</span>
                </motion.span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 sm:hidden">
              {events.map((e) => (
                <span key={e.label} className="inline-flex items-center gap-1 text-[9px] font-semibold text-muted">
                  <span className={`h-2 w-2 rounded-sm ${e.c.split(' ')[0]}`} />
                  {e.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-3 flex flex-wrap justify-center gap-2 font-mono text-[10px]">
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-ink ring-1 ring-ink/8">Azure OpenAI Realtime · WebRTC</span>
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-ink ring-1 ring-ink/8">Meet link ← Calendar API</span>
      </div>
    </div>
  )
}

function RagVisual() {
  const r = 46
  const circ = 2 * Math.PI * r
  return (
    <div aria-hidden className="relative h-full min-h-[300px] overflow-hidden rounded-[1.25rem] bg-ink p-5 text-paper sm:min-h-[340px]">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-electric/35 blur-[80px]" />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/60">
          {['docs', 'chunks', 'vectors', 'answer'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/30">→</span>}
              <span className={`rounded px-1.5 py-0.5 ${i === 3 ? 'bg-electric text-white' : 'bg-white/8'}`}>{s}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[auto_1fr] items-center gap-5">
          <div className="relative h-[120px] w-[120px]">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke="#2F6BFF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                whileInView={{ strokeDashoffset: circ * 0.08 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-display text-3xl font-extrabold">92%</p>
                <p className="font-mono text-[9px] text-white/60">context acc.</p>
              </div>
            </div>
          </div>
          <div className="relative h-[110px]">
            {Array.from({ length: 22 }).map((_, i) => {
              const hit = i % 5 === 0
              return (
                <span
                  key={i}
                  className={`absolute rounded-full ${hit ? 'h-2.5 w-2.5 bg-[#7aa2ff] shadow-[0_0_12px_#2F6BFF]' : 'h-1.5 w-1.5 bg-white/25'}`}
                  style={{ left: `${(i * 41) % 92}%`, top: `${(i * 67) % 88}%` }}
                />
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white/6 p-3 ring-1 ring-white/10">
          <p className="font-mono text-[10px] text-[#4fd8a0]">● grounded answer · sources attached</p>
          <div className="mt-2 space-y-1.5">
            <span className="block h-1.5 w-[92%] rounded-full bg-white/20" />
            <span className="block h-1.5 w-[78%] rounded-full bg-white/15" />
            <span className="block h-1.5 w-[54%] rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShuttleVisual() {
  return (
    <div aria-hidden className="relative h-full min-h-[280px] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#e3f7ee] to-[#f3ece1] p-5 sm:p-7">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative grid h-full gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-ink/6">
          <p className="font-mono text-[10px] tracking-wider text-muted uppercase">Trainable parameters</p>
          <div className="mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
            {Array.from({ length: 100 }).map((_, i) => (
              <span key={i} className={`aspect-square rounded-[2px] ${i === 0 ? 'bg-mint' : 'bg-ink/8'}`} />
            ))}
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-mint-deep">~1.2%</p>
          <p className="text-[11px] text-muted">~4.3M of 366M — LoRA adapters only</p>
        </div>
        <div className="rounded-xl bg-ink p-4 text-paper shadow-[var(--shadow-card)]">
          <p className="font-mono text-[10px] tracking-wider text-white/55 uppercase">Training loss · 3 epochs · CPU</p>
          <div className="mt-4 flex h-[110px] items-end gap-6 px-2">
            {[
              { v: 3.0, l: 'start', c: 'bg-white/25' },
              { v: 2.2, l: 'epoch 3', c: 'bg-mint' },
            ].map((b) => (
              <div key={b.l} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-display text-sm font-bold">~{b.v.toFixed(1)}</span>
                <motion.span
                  className={`w-full rounded-t-md ${b.c}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(b.v / 3) * 80}px` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="font-mono text-[10px] text-white/55">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:col-span-2">
          {['110 Q&A examples', 'LoRA training', 'inference', 'FastAPI chat UI'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink/40">→</span>}
              <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-ink/8">{s}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
