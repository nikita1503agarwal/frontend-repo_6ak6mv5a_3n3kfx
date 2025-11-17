import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Avatar from './Avatar'

/*
  SideScroller: horizontal-feel narrative driven by vertical scroll.
  - A long sticky stage gives the sensation of side-scrolling through scenes.
  - Each scene has parallax layers and reveals one or more lines of the story.
  - The avatar traverses the path with mode changes per scene.
*/

const sections = [
  { id: 's1', mode: 'walk',   theme: 'light',   bg: ['#f7f3e8', '#eaddcf'],
    text: ['Once upon a time…'] },
  { id: 's2', mode: 'walk',   theme: 'light',   bg: ['#efe7d7', '#e1d2ba'],
    text: ['You moved without thinking. Desire was a compass. Curiosity was your language. You didn’t need permission to feel.'] },
  { id: 's3', mode: 'fall',   theme: 'dark',    bg: ['#0b0b0c', '#161a24'],
    text: ['Then, someone told you what was right. And you forgot what was true.'] },
  { id: 's4', mode: 'fall',   theme: 'dark',    bg: ['#0a0a0a', '#1a1032'],
    text: ['You learned to perform pleasure, not feel it. You traded curiosity for control.'] },
  { id: 's5', mode: 'shadow', theme: 'dark',    bg: ['#0a0a0a', '#24143e'],
    text: ['They said purity was salvation. But you were born from wildness.'] },
  { id: 's6', mode: 'rise',   theme: 'violet',  bg: ['#24143e', '#3c2a73'],
    text: ['The body remembers what the mind forgets. Every ache is a prayer for connection. Every shadow an invitation home.'] },
  { id: 's7', mode: 'rise',   theme: 'violet',  bg: ['#30235c', '#4b3f8e'],
    text: ['Healing is not fixing. It’s remembering the divine.'] },
  { id: 's8', mode: 'float',  theme: 'dawn',    bg: ['#eadfd0', '#fff9ea'],
    text: ['You can keep pretending. Or step into the story waiting for you. Where desire isn’t shameful, truth isn’t cruel, and your shadow becomes your teacher.'] },
  { id: 's9', mode: 'glow',   theme: 'dawn',    bg: ['#fff3da', '#ffffff'],
    text: ['You’ve already begun. Welcome back. This is Wanderlove.'] },
]

export default function SideScroller() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Map vertical progress to horizontal translate for a long track
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-400%'])

  return (
    <div ref={ref} className="relative h-[900vh]">
      {/* sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* background gradient and parallax clouds */}
        <motion.div style={{ x }} className="absolute inset-0 flex" aria-hidden>
          {sections.map((s, i) => (
            <ScenePanel key={s.id} index={i} theme={s.theme} bg={s.bg} />
          ))}
        </motion.div>

        {/* text + avatar layer on top */}
        <motion.div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ x }} className="flex h-full">
            {sections.map((s, i) => (
              <TextPanel key={s.id} index={i} text={s.text} />
            ))}
          </motion.div>
        </motion.div>

        {/* avatar path */}
        <motion.div className="absolute inset-0 z-20 pointer-events-none">
          <motion.div style={{ x }} className="flex h-full">
            {sections.map((s, i) => (
              <div key={s.id} className="relative w-screen h-full flex items-end md:items-center justify-center">
                <Avatar mode={resolveMode(s.mode)} />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* progress bar */}
        <motion.div className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-rose-300 via-indigo-300 to-amber-300" style={{ scaleX: scrollYProgress }} />
      </div>
    </div>
  )
}

function resolveMode(mode) {
  if (mode === 'shadow') return 'walk'
  return mode
}

function ScenePanel({ index, theme, bg }) {
  const isDark = theme === 'dark' || theme === 'violet'
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${bg[0]}, ${bg[1]})` }} />
      {/* soft noise/texture */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
      {/* parallax mountains/clouds hint */}
      <div className="absolute inset-x-0 bottom-0 h-1/3">
        <div className={`absolute -bottom-10 left-0 right-0 h-48 ${isDark ? 'bg-zinc-900/40' : 'bg-white/40'} blur-2xl`} />
      </div>
    </div>
  )
}

function TextPanel({ index, text }) {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl text-center">
        {text.map((t, i) => (
          <motion.p
            key={i}
            className="font-serifAntique text-3xl md:text-5xl leading-snug text-white drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            {t}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
