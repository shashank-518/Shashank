import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { AIEngineering } from './components/AIEngineering'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { CursorGlow } from './components/ui/CursorGlow'
import { ResumeProvider } from './components/ui/ResumeModal'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ResumeProvider>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-ink px-4 py-2 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <CursorGlow />
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <AIEngineering />
          <Achievements />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ResumeProvider>
    </MotionConfig>
  )
}
