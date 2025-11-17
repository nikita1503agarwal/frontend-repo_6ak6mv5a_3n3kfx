import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Scene from './Scene'

export default function ScrollNarrative() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })

  return (
    <div className="relative">
      {/* progress line like a soul thread */}
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 origin-left h-[2px] bg-gradient-to-r from-rose-300 via-indigo-300 to-amber-300 z-50" />

      <Scene id="innocence" theme="light" title="Innocence" line1="Once upon a time…" line2="A garden of ivory light." bgFrom="#fffff0" bgTo="#f5e6cc" />

      <Scene id="forgetting" theme="dark" title="Forgetting" line1="The drift into shadow" line2="Names fade. Footsteps echo." bgFrom="#0b0b0c" bgTo="#121826" />

      <Scene id="shadow" theme="dark" title="Shadow" line1="Shapes of control" line2="Guilt breathes. Marble cracks." bgFrom="#0a0a0a" bgTo="#1b1036" />

      <Scene id="awakening" theme="dark" title="Awakening" line1="A warm wind" line2="Feathers and light." bgFrom="#1b1036" bgTo="#3a2d73" />

      <Scene id="rebirth" theme="light" title="Rebirth" line1="Welcome back." line2="This is Wanderlove." bgFrom="#f9efd7" bgTo="#fff7e6" />

      {/* CTA footer */}
      <footer className="relative h-[80vh] bg-gradient-to-b from-amber-100 via-rose-50 to-white flex items-center justify-center text-center">
        <div>
          <h3 className="font-serifAntique text-4xl md:text-6xl text-zinc-900">Enter the Studio</h3>
          <p className="mt-3 text-zinc-600">A living poem of becoming</p>
          <a href="https://wanderlove.studio" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 hover:scale-[1.02] hover:bg-zinc-800 transition">
            Enter the Studio → wanderlove.studio
          </a>
        </div>
      </footer>
    </div>
  )
}
