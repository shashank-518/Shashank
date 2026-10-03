import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { aiCapabilities, pipeline } from '../data/portfolio'
import { accentBg, accentHex, accentTextOnDark } from './ui/accent'
import { Chat, Mic } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const guardrails = ['Tenant isolation', 'Access control', 'Platform-wide rate limiting', 'Azure AI deployment', 'Stage → Production']

export function AIEngineering() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState<'text' | 'voice'>('text')
  const [playing, setPlaying] = useState(!reduce)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (!playing || !inView) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % pipeline.length), 2600)
    return () => window.clearInterval(id)
  }, [playing, inView])

  const select = (i: number) => {
    setActive(i)
    setPlaying(false)
  }

  const node = pipeline[active]

  return (
    <section id="ai" aria-labelledby="ai-title" className="on-dark section-y relative overflow-hidden bg-[#0b0f2a] text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute top-[10%] -left-40 h-[520px] w-[520px] rounded-full bg-violet/30 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-electric/25 blur-[130px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          dark
          id="ai-title"
          index="05"
          eyebrow="AI Engineering"
          title={
            <>
              Building with <span className="bg-gradient-to-r from-[#a993ff] to-[#7aa2ff] bg-clip-text text-transparent">AI</span>.
            </>
          }
          description="How a request moves through the GenAI platform I’m architecting at Digitomics — the same workflow powers both the text chatbot and the real-time voice bot."
        />

        <div ref={wrapRef} className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* ---------- Flow ---------- */}
          <Reveal>
            <div className="rounded-3xl bg-white/[0.03] p-4 ring-1 ring-white/10 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div role="group" aria-label="Input channel" className="inline-flex rounded-full bg-white/6 p-1 ring-1 ring-white/10">
                  {(['text', 'voice'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mode === m}
                      onClick={() => setMode(m)}
                      className={`relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
                        mode === m ? 'text-ink' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {mode === m && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                      <span className="relative inline-flex items-center gap-2">
                        {m === 'text' ? <Chat size={15} /> : <Mic size={15} />}
                        {m === 'text' ? 'Text chatbot' : 'Voice bot'}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="inline-flex h-9 items-center gap-2 rounded-full px-3 font-mono text-xs text-white/70 ring-1 ring-white/15 transition hover:text-white hover:ring-white/30"
                >
                  <span aria-hidden className={`h-2 w-2 rounded-full ${playing ? 'animate-pulse bg-mint' : 'bg-white/40'}`} />
                  {playing ? 'Pause walkthrough' : 'Play walkthrough'}
                </button>
              </div>

              <ol className="relative" aria-label="Platform request flow">
                <div aria-hidden className="absolute top-5 bottom-5 left-[21px] w-[2px] bg-white/10">
                  <motion.div
                    className="w-full origin-top rounded-full bg-gradient-to-b from-orange via-violet to-electric"
                    animate={{ height: `${(active / (pipeline.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                {pipeline.map((n, i) => {
                  const isActive = i === active
                  const done = i < active
                  const title = n.id === 'input' ? (mode === 'voice' ? 'User — voice (GPT Realtime)' : 'User — text chatbot') : n.title
                  return (
                    <li key={n.id} className="relative">
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-pressed={isActive}
                        aria-controls="ai-node-detail"
                        className={`group flex w-full items-center gap-4 rounded-2xl px-1 py-2 text-left transition-colors duration-300 sm:py-2.5 ${
                          isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        <span
                          className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold ring-1 transition-all duration-300 ${
                            isActive ? `${accentBg[n.accent]} text-white ring-transparent` : done ? 'bg-[#1a2150] text-white/80 ring-white/15' : 'bg-[#121842] text-white/50 ring-white/10'
                          }`}
                          style={isActive ? { boxShadow: `0 0 0 6px ${accentHex[n.accent]}33, 0 0 28px ${accentHex[n.accent]}66` } : undefined}
                        >
                          {n.step}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-display text-[17px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
                            {title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[11px] text-white/40">{n.chips.join(' · ')}</span>
                        </span>
                        {isActive && <motion.span layoutId="ai-arrow" aria-hidden className="mr-2 hidden text-white/60 sm:block">→</motion.span>}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>

          {/* ---------- Detail ---------- */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div
              id="ai-node-detail"
              aria-live={playing ? 'off' : 'polite'}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1f55] to-[#121842] p-6 ring-1 ring-white/10 sm:p-8"
            >
              <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[70px] transition-colors duration-500" style={{ background: `${accentHex[node.accent]}55` }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${node.id}-${mode}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <p className={`font-mono text-xs tracking-[0.18em] uppercase ${accentTextOnDark[node.accent]}`}>
                    Step {node.step} / {String(pipeline.length).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{node.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-white/75">{node.detail}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {node.chips.map((c) => (
                      <li key={c} className="rounded-lg bg-white/8 px-3 py-1.5 font-mono text-xs text-white/85 ring-1 ring-white/10">
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <MiniFlow active={active} />
            </div>

            <div className="mt-4 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Across every step</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {guardrails.map((g) => (
                  <li key={g} className="rounded-full bg-mint/12 px-3 py-1 text-xs font-semibold text-[#4fd8a0]">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---------- Capabilities ---------- */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {aiCapabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={0.05 * i} className="group bg-[#0e1336] p-6 transition-colors duration-300 hover:bg-[#141a45] sm:p-7">
              <span className="font-mono text-xs text-white/35">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">{c.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Compact horizontal progress strip mirroring the flow. */
function MiniFlow({ active }: { active: number }) {
  return (
    <div aria-hidden className="relative mt-8 flex items-center gap-1.5">
      {pipeline.map((n, i) => (
        <span key={n.id} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className={`absolute inset-y-0 left-0 rounded-full ${accentBg[n.accent]}`}
            initial={false}
            animate={{ width: i <= active ? '100%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </span>
      ))}
    </div>
  )
}
