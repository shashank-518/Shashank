import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  index: string
  title: ReactNode
  description?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, index, title, description, dark, align = 'left', id }: Props) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 max-w-3xl lg:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
      <p
        className={`mb-4 inline-flex items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase ${
          dark ? 'text-white/60' : 'text-muted'
        }`}
      >
        <span className={dark ? 'text-orange' : 'text-orange-deep'}>{index}</span>
        <span aria-hidden className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-ink/20'}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{description}</p>
      )}
    </Reveal>
  )
}
