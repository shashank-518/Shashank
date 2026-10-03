import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { contact, profile, resume } from '../data/portfolio'
import { Button } from './ui/Button'
import { ArrowRight, Download, Eye, GitHub, LinkedIn, MapPin, Mic } from './ui/Icons'
import { useResume } from './ui/ResumeModal'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { open } = useResume()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -60])

  const item = (i: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease },
  })

  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden bg-paper pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      <HeroBackground />

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        {/* ---------- Left: copy ---------- */}
        <div className="relative z-10">
          <motion.div {...item(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pr-4 pl-2 text-sm font-semibold ring-1 ring-ink/10 backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-mint/15">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-mint" />
              </span>
              <span className="hidden sm:inline">Currently building ·</span>
              <span className="text-mint-deep">{profile.status}</span>
            </span>
          </motion.div>

          <motion.p {...item(1)} className="mt-8 font-display text-xl font-semibold text-muted sm:text-2xl">
            Hi, I’m <span className="text-ink">{profile.name}</span>          </motion.p>

          <motion.h1
            {...item(2)}
            className="mt-3 text-[2.75rem] leading-[0.98] font-extrabold tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
          >
            I build{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">GenAI platforms</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-0 h-[0.28em] origin-left rounded-sm bg-orange/80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.75, ease }}
              />
            </span>{' '}
            that run in{' '}
            <span className="bg-gradient-to-r from-violet to-electric bg-clip-text text-transparent">production.</span>
          </motion.h1>

          <motion.p {...item(3)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] tracking-wide text-ink/70 uppercase">
            {profile.titles.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-orange" />}
                {t}
              </span>
            ))}
          </motion.p>

          <motion.p {...item(4)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...item(5)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg" magnetic>
              View My Work
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href={resume.viewUrl} download={resume.downloadName} variant="secondary" size="lg" magnetic>
              <Download size={18} />
              Download Resume
            </Button>
            <button
              type="button"
              onClick={open}
              className="inline-flex h-13 items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-ink/80 underline decoration-ink/25 underline-offset-4 transition hover:text-ink hover:decoration-orange"
            >
              <Eye size={18} /> View Resume
            </button>
          </motion.div>

          <motion.ul {...item(6)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted">
            <li className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-orange-deep" /> {profile.location}
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-ink">
                <GitHub size={16} /> {contact.githubHandle}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-ink">
                <LinkedIn size={16} /> LinkedIn
              </a>
            </li>
          </motion.ul>
        </div>

        {/* ---------- Right: composition ---------- */}
        <motion.div style={{ y: parallax }} className="relative">
          <HeroComposition />
        </motion.div>
      </div>
    </section>
  )
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-violet/20 blur-[110px]" />
      <div className="absolute top-[30%] right-[25%] h-[360px] w-[360px] rounded-full bg-orange/20 blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-electric/12 blur-[110px]" />
      {[
        'top-[18%] left-[6%] bg-orange',
        'top-[62%] left-[44%] bg-violet',
        'top-[12%] left-[52%] bg-electric',
        'bottom-[14%] right-[8%] bg-mint',
      ].map((c, i) => (
        <span key={c} className={`absolute h-1.5 w-1.5 animate-float rounded-full opacity-70 ${c}`} style={{ animationDelay: `${i * 1.3}s` }} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

const terminalLines = [
  { k: 'channel', v: 'text | voice', c: 'text-[#7aa2ff]' },
  { k: 'intent', v: 'classified · sub-second', c: 'text-[#a993ff]' },
  { k: 'route', v: '→ low-latency model', c: 'text-orange' },
  { k: 'agent', v: 'finops · devops · generic', c: 'text-[#4fd8a0]' },
  { k: 'retrieve', v: 'multi-query · tenant-aware', c: 'text-[#7aa2ff]' },
  { k: 'approval', v: 'human-in-the-loop ✓', c: 'text-[#4fd8a0]' },
]

function Terminal() {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? terminalLines.length : 0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setShown((n) => (n >= terminalLines.length + 3 ? 0 : n + 1))
    }, 650)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="overflow-hidden rounded-2xl bg-ink text-paper shadow-[0_30px_60px_-20px_rgb(14_21_48/0.55)] ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/45">genai-platform — request flow</span>
      </div>
      <div className="min-h-[218px] px-5 py-4 font-mono text-[12.5px] leading-[1.85]" aria-label="Illustration of the platform request flow">
        <p className="text-white/50">
          <span className="text-orange">$</span> platform.handle(request)
        </p>
        {terminalLines.map((l, i) => (
          <p
            key={l.k}
            className={`flex gap-3 transition-all duration-300 ${i < shown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'}`}
          >
            <span className="w-[4.5rem] shrink-0 text-white/40">› {l.k}</span>
            <span className={l.c}>{l.v}</span>
          </p>
        ))}
        <p className="mt-1 text-white/50">
          <span className="text-orange">$</span>{' '}
          <span className="inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-pulse bg-white/70" />
        </p>
      </div>
    </div>
  )
}

function Waveform() {
  const reduce = useReducedMotion()
  return (
    <div className="flex h-8 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-violet"
          style={{ height: `${30 + ((i * 37) % 70)}%` }}
          animate={reduce ? undefined : { height: ['20%', `${30 + ((i * 37) % 70)}%`, '20%'] }}
          transition={{ duration: 1.1 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

const card = 'rounded-2xl bg-white/90 p-4 ring-1 ring-ink/8 shadow-[var(--shadow-card)] backdrop-blur'

function HeroComposition() {
  const enter = (d: number) => ({
    initial: { opacity: 0, y: 30, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, delay: 0.35 + d, ease },
  })

  return (
    <>
      {/* Desktop: floating composition */}
      <div className="relative mx-auto hidden h-[560px] w-full max-w-[560px] lg:block" aria-hidden>
        {/* orbit */}
        <div className="absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/12">
          <div className="absolute inset-0 animate-spin-slow">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-orange shadow-[0_0_0_6px_rgb(233_113_66/0.15)]" />
            <span className="absolute top-1/2 -right-1 h-2 w-2 rounded-full bg-violet" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/8" />

        <motion.div {...enter(0.1)} className="absolute top-[150px] left-[60px] w-[400px]">
          <Terminal />
        </motion.div>

        <motion.div {...enter(0)} className="absolute top-[30px] left-0">
          <div className={`${card} w-[230px] animate-float`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-lg font-extrabold text-paper">D</span>
              <div>
                <p className="font-display text-[15px] font-bold leading-tight">Digitomics</p>
                <p className="text-xs text-muted">Founding Team · AI Engineer</p>
              </div>
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mint/12 px-2.5 py-1 text-[11px] font-bold text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Apr 2026 – Present
            </p>
          </div>
        </motion.div>

        <motion.div {...enter(0.2)} className="absolute top-[10px] right-0">
          <div className={`${card} w-[220px] animate-float-slow`} style={{ animationDelay: '1s' }}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-deep">
                <Mic size={14} /> GPT Realtime
              </span>
              <span className="rounded-full bg-violet/10 px-2 py-0.5 font-mono text-[10px] text-violet-deep">LIVE</span>
            </div>
            <div className="mt-2">
              <Waveform />
            </div>
            <p className="mt-1 text-xs text-muted">Real-time voice bot</p>
          </div>
        </motion.div>

        <motion.div {...enter(0.3)} className="absolute bottom-[22px] left-[10px]">
          <div className={`${card} w-[200px] animate-float-slow`} style={{ animationDelay: '2s' }}>
            <p className="font-display text-4xl font-extrabold text-electric-deep">92%</p>
            <p className="text-xs font-semibold">context accuracy</p>
            <p className="mt-1 font-mono text-[10px] text-muted">RAG Q&A · 500+ queries</p>
          </div>
        </motion.div>

        <motion.div {...enter(0.4)} className="absolute right-[-6px] bottom-[60px]">
          <div className={`${card} w-[210px] animate-float`} style={{ animationDelay: '0.5s' }}>
            <div className="flex items-baseline justify-between">
              <p className="font-display text-3xl font-extrabold text-mint-deep">~1.2%</p>
              <span className="font-mono text-[10px] text-muted">LoRA</span>
            </div>
            <p className="text-xs font-semibold">params trained</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
              <div className="h-full w-[6%] rounded-full bg-mint" />
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-muted">~4.3M / 366M · SmolLM2</p>
          </div>
        </motion.div>

        {[
          { t: 'FastAPI', c: 'top-[172px] right-[-4px] bg-mint/15 text-mint-deep', d: '0s' },
          { t: 'Azure OpenAI', c: 'bottom-[0px] left-[240px] bg-electric/12 text-electric-deep', d: '1.5s' },
          { t: 'LangGraph', c: 'top-[92px] left-[246px] bg-violet/12 text-violet-deep', d: '0.8s' },
          { t: 'RAG', c: 'top-[300px] right-[-14px] bg-orange/15 text-orange-deep', d: '2.2s' },
        ].map((chip, i) => (
          <motion.span
            key={chip.t}
            {...enter(0.5 + i * 0.06)}
            className={`absolute rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold ring-1 ring-ink/5 backdrop-blur ${chip.c}`}
          >
            <span className="inline-block animate-float" style={{ animationDelay: chip.d }}>
              {chip.t}
            </span>
          </motion.span>
        ))}
      </div>

      {/* Mobile / tablet: stacked composition */}
      <div className="grid gap-3 lg:hidden" aria-hidden>
        <motion.div {...enter(0)}>
          <Terminal />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          <motion.div {...enter(0.1)} className={card}>
            <p className="font-display text-3xl font-extrabold text-electric-deep">92%</p>
            <p className="text-xs font-semibold">RAG context accuracy</p>
          </motion.div>
          <motion.div {...enter(0.15)} className={card}>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-deep">
              <Mic size={14} /> GPT Realtime
            </p>
            <div className="mt-1">
              <Waveform />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
