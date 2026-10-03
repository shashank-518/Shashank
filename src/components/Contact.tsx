import { useState } from 'react'
import { contact, profile, resume } from '../data/portfolio'
import { Button } from './ui/Button'
import { ArrowUpRight, Check, Copy, Download, Eye, GitHub, LinkedIn, Mail, MapPin, Phone } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { useResume } from './ui/ResumeModal'

export function Contact() {
  const { open } = useResume()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  }

  const links = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail, external: false },
    { label: 'LinkedIn', value: `in/${contact.linkedinHandle}`, href: contact.linkedin, icon: LinkedIn, external: true },
    { label: 'GitHub', value: contact.githubHandle, href: contact.github, icon: GitHub, external: true },
    ...(contact.showPhone
      ? [{ label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}`, icon: Phone, external: false }]
      : []),
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -bottom-48 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 rounded-[100%] bg-orange/45 blur-[140px]" />
        <div className="absolute top-0 -right-32 h-[380px] w-[380px] rounded-full bg-violet/25 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-white/60 uppercase">
            <span className="text-orange">07</span>
            <span aria-hidden className="h-px w-8 bg-white/25" /> Contact
          </p>
          <h2 id="contact-title" className="max-w-4xl text-5xl leading-[0.98] font-extrabold tracking-[-0.035em] sm:text-7xl lg:text-[6.5rem]">
            Let’s build something <span className="text-orange">meaningful.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Working on GenAI products, agents, RAG or real-time voice? I’d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${contact.email}`} size="lg" magnetic>
            <Mail size={18} /> Get In Touch
          </Button>
          <Button href={resume.viewUrl} download={resume.downloadName} variant="light" size="lg" magnetic>
            <Download size={18} /> Download Resume
          </Button>
          <Button onClick={open} variant="outline-light" size="lg">
            <Eye size={18} /> View Resume
          </Button>
        </Reveal>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={0.05 * i} className={l.label === 'Email' ? 'sm:col-span-2' : ''}>
              <div className="group relative h-full rounded-2xl bg-white/[0.05] ring-1 ring-white/12 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:ring-white/25">
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`block h-full p-5 pr-12 ${l.label === 'Email' ? 'pb-14 sm:pb-5 sm:pr-28' : ''}`}
                  aria-label={`${l.label}: ${l.value}${l.external ? ' (opens in new tab)' : ''}`}
                >
                  <span className="flex items-center gap-2 text-sm text-white/60">
                    <l.icon size={16} /> {l.label}
                  </span>
                  <span className="mt-2 block font-display text-lg font-semibold [overflow-wrap:anywhere]">{l.value}</span>
                  <ArrowUpRight size={18} className="absolute top-5 right-5 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange" />
                </a>
                {l.label === 'Email' && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="absolute right-4 bottom-4 inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-semibold text-white/80 transition hover:bg-white/20"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/55">
          <MapPin size={15} /> Based in {profile.location}
        </p>
      </div>
    </section>
  )
}
