import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode, type PointerEvent, type MouseEventHandler } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-ink hover:bg-[#f0814f] shadow-[0_10px_30px_-10px_rgb(233_113_66/0.7)]',
  secondary: 'bg-ink text-paper hover:bg-ink-2',
  ghost: 'bg-white/70 text-ink ring-1 ring-ink/12 hover:bg-white hover:ring-ink/25 backdrop-blur',
  light: 'bg-paper text-ink hover:bg-white',
  'outline-light': 'bg-white/5 text-paper ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/45',
}

type Common = {
  children: ReactNode
  variant?: Variant
  magnetic?: boolean
  className?: string
  size?: 'md' | 'lg'
}

type AsLink = Common & {
  href: string
  download?: string
  external?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  ariaLabel?: string
}
type AsButton = Common & { href?: undefined; onClick: MouseEventHandler<HTMLButtonElement>; ariaLabel?: string }

/** Pill button / link with an optional magnetic hover (fine pointers only). */
export function Button(props: AsLink | AsButton) {
  const { children, variant = 'primary', magnetic = false, className = '', size = 'md' } = props
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic || reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,box-shadow,color] duration-300 ${
    size === 'lg' ? 'h-13 px-7 text-[15px]' : 'h-11 px-5 text-sm'
  } ${variants[variant]} ${className}`

  if (props.href !== undefined) {
    const { href, download, external, onClick, ariaLabel } = props
    return (
      <motion.a
        ref={ref as never}
        href={href}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x, y }}
        whileTap={{ scale: 0.97 }}
        className={cls}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as never}
      type="button"
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={cls}
    >
      {children}
    </motion.button>
  )
}
