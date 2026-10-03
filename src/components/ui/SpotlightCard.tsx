import { useRef, type CSSProperties, type ReactNode, type PointerEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  spot?: string
  as?: 'div' | 'article' | 'li'
  style?: CSSProperties
}

/** Card with a soft radial glow that follows the pointer (mouse only). */
export function SpotlightCard({ children, className = '', spot, as: Comp = 'div', style }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Comp
      ref={ref as never}
      onPointerMove={onMove}
      className={`spotlight ${className}`}
      style={{ ...(spot ? ({ '--spot': spot } as CSSProperties) : {}), ...style }}
    >
      {children}
    </Comp>
  )
}
