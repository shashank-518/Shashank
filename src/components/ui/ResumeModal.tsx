import { AnimatePresence, motion } from 'motion/react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { profile, resume } from '../../data/portfolio'
import { ArrowUpRight, Close, Download } from './Icons'

const ResumeCtx = createContext<{ open: () => void }>({ open: () => {} })

export const useResume = () => useContext(ResumeCtx)

/**
 * Provides `open()` for a full-screen PDF viewer.
 * Phones/tablets that can't render inline PDFs reliably get the file in a new tab instead.
 */
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const lastFocus = useRef<HTMLElement | null>(null)

  const open = useCallback(() => {
    const small = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
    if (small) {
      window.open(resume.viewUrl, '_blank', 'noopener,noreferrer')
      return
    }
    lastFocus.current = document.activeElement as HTMLElement
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    lastFocus.current?.focus()
  }, [])

  return (
    <ResumeCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen && <Viewer onClose={close} />}</AnimatePresence>
    </ResumeCtx.Provider>
  )
}

function Viewer({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, iframe')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p id="resume-title" className="truncate font-display text-lg font-bold">
              {profile.name} — Resume
            </p>
            <p className="font-mono text-xs text-muted">PDF · 1 page</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold ring-1 ring-ink/15 transition hover:bg-white sm:inline-flex"
            >
              Open in tab <ArrowUpRight size={15} />
            </a>
            <a
              href={resume.viewUrl}
              download={resume.downloadName}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-orange px-4 text-sm font-semibold text-ink transition hover:bg-[#f0814f]"
            >
              <Download size={16} /> Download
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-ink-2"
            >
              <Close size={18} />
            </button>
          </div>
        </div>
        <iframe
          src={`${resume.viewUrl}#view=FitH&toolbar=0`}
          title={`${profile.name} resume PDF`}
          className="h-full min-h-0 w-full flex-1 bg-sand"
        />
      </motion.div>
    </motion.div>
  )
}
