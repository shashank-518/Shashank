import type { Accent } from '../../data/portfolio'

/** Literal class strings per accent so Tailwind can see them. */
export const accentText: Record<Accent, string> = {
  orange: 'text-orange-deep',
  violet: 'text-violet-deep',
  electric: 'text-electric-deep',
  mint: 'text-mint-deep',
  ink: 'text-ink',
}

/** Brighter variants for use on dark backgrounds. */
export const accentTextOnDark: Record<Accent, string> = {
  orange: 'text-orange',
  violet: 'text-[#a993ff]',
  electric: 'text-[#7aa2ff]',
  mint: 'text-[#4fd8a0]',
  ink: 'text-paper',
}

export const accentBg: Record<Accent, string> = {
  orange: 'bg-orange',
  violet: 'bg-violet',
  electric: 'bg-electric',
  mint: 'bg-mint',
  ink: 'bg-ink',
}

export const accentSoft: Record<Accent, string> = {
  orange: 'bg-orange/12 text-orange-deep',
  violet: 'bg-violet/12 text-violet-deep',
  electric: 'bg-electric/10 text-electric-deep',
  mint: 'bg-mint/12 text-mint-deep',
  ink: 'bg-ink/8 text-ink',
}

export const accentRing: Record<Accent, string> = {
  orange: 'ring-orange/30',
  violet: 'ring-violet/30',
  electric: 'ring-electric/30',
  mint: 'ring-mint/30',
  ink: 'ring-ink/20',
}

/** RGBA for the card spotlight glow. */
export const accentSpot: Record<Accent, string> = {
  orange: 'rgb(233 113 66 / 0.14)',
  violet: 'rgb(124 92 255 / 0.14)',
  electric: 'rgb(47 107 255 / 0.12)',
  mint: 'rgb(31 181 122 / 0.14)',
  ink: 'rgb(14 21 48 / 0.08)',
}

export const accentHex: Record<Accent, string> = {
  orange: '#E97142',
  violet: '#7C5CFF',
  electric: '#2F6BFF',
  mint: '#1FB57A',
  ink: '#0E1530',
}
