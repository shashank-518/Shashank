import { useEffect, useRef } from 'react'

/** Large soft glow trailing the cursor. Desktop + fine pointer only, off for reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches || !ref.current) return

    const el = ref.current
    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 3
    let cx = tx
    let cy = ty

    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(loop)
      else raf = 0
    }
    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => (el.style.opacity = '0')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 mix-blend-soft-light transition-opacity duration-500 max-lg:hidden"
      style={{ background: 'radial-gradient(circle, rgb(124 92 255 / 0.35), rgb(233 113 66 / 0.15) 40%, transparent 65%)' }}
    />
  )
}
