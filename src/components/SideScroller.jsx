import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Avatar from './Avatar'

/*
  SideScroller: horizontal-feel narrative driven by vertical scroll.
  Updates:
  - Angel avatar following a gentle path (ridge line) across scenes
  - Broader sections for breathing room (1.5× viewport width each on md+, 1× on mobile)
  - Starfield / glitter particles subtly drifting in the background
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
  { id: 's5', mode: 'walk',   theme: 'dark',    bg: ['#0a0a0a', '#24143e'],
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

  // Wider track: each section is 100vw on mobile, 150vw on md+
  const totalWidthVW = 100 * sections.length // base mobile
  const xBase = useTransform(scrollYProgress, [0, 1], ['0%', `${-totalWidthVW + 100}%`])
  const x = useSpring(xBase, { stiffness: 80, damping: 30, mass: 0.4 })

  // Path Y offset for avatar: gentle sine-like curve per section
  const pathOffsets = sections.map((_, i) => (i % 2 === 0 ? 0 : -40))

  return (
    <div ref={ref} className="relative h-[1200vh]">
      {/* sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* background scenes */}
        <motion.div style={{ x }} className="absolute inset-0 flex" aria-hidden>
          {sections.map((s, i) => (
            <ScenePanel key={s.id} index={i} theme={s.theme} bg={s.bg} />
          ))}
        </motion.div>

        {/* stars / glitter overlay fixed to scenes (moves with x) */}
        <motion.div style={{ x }} className="absolute inset-0 flex" aria-hidden>
          {sections.map((s, i) => (
            <Starfield key={`stars-${s.id}`} index={i} density={s.theme === 'dark' || s.theme === 'violet' ? 70 : 35} />
          ))}
        </motion.div>

        {/* text layer */}
        <motion.div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ x }} className="flex h-full">
            {sections.map((s, i) => (
              <TextPanel key={s.id} index={i} text={s.text} theme={s.theme} />
            ))}
          </motion.div>
        </motion.div>

        {/* avatar and path */}
        <motion.div className="absolute inset-0 z-20 pointer-events-none">
          <motion.div style={{ x }} className="flex h-full items-end">
            {sections.map((s, i) => (
              <div key={s.id} className="relative w-[100vw] md:w-[150vw] h-full">
                {/* path line */}
                <div className="absolute left-0 right-0 bottom-[18%] md:bottom-[22%] h-px bg-gradient-to-r from-white/10 via-white/50 to-white/10" />
                {/* avatar position */}
                <div className="absolute left-1/2 bottom-[18%] md:bottom-[22%] -translate-x-1/2 translate-y-[-12px]">
                  <Avatar mode={s.mode} size={1.1} />
                </div>
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

function ScenePanel({ index, theme, bg }) {
  const isDark = theme === 'dark' || theme === 'violet'
  return (
    <div className="relative w-[100vw] md:w-[150vw] h-screen">
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${bg[0]}, ${bg[1]})` }} />
      {/* texture */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
      {/* parallax ground/cloud hint */}
      <div className="absolute inset-x-0 bottom-0 h-1/3">
        <div className={`absolute -bottom-10 left-0 right-0 h-48 ${isDark ? 'bg-zinc-900/40' : 'bg-white/40'} blur-2xl`} />
      </div>
    </div>
  )
}

function TextPanel({ index, text, theme }) {
  const dark = theme === 'dark' || theme === 'violet'
  return (
    <div className="relative w-[100vw] md:w-[150vw] h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl text-center">
        {text.map((t, i) => (
          <motion.p
            key={i}
            className={`font-serifAntique ${dark ? 'text-white' : 'text-zinc-900'} text-3xl md:text-6xl leading-tight md:leading-[1.15] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.12 }}
          >
            {t}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

function Starfield({ index, density = 50 }) {
  // Create a simple procedurally generated starfield via CSS gradients
  const layers = Array.from({ length: 3 }).map((_, l) => {
    const opacity = [0.35, 0.22, 0.12][l]
    const size = [1.2, 1.8, 2.6][l]
    const translate = l * 10
    return (
      <div
        key={l}
        className="absolute inset-0"
        style={{
          backgroundImage:
            `radial-gradient(circle at 20% 30%, rgba(255,255,255,${opacity}) ${size}px, transparent ${size+0.5}px),` +
            `radial-gradient(circle at 60% 70%, rgba(255,255,255,${opacity}) ${size}px, transparent ${size+0.5}px),` +
            `radial-gradient(circle at 80% 20%, rgba(255,255,255,${opacity}) ${size}px, transparent ${size+0.5}px),` +
            `radial-gradient(circle at 35% 55%, rgba(255,255,255,${opacity}) ${size}px, transparent ${size+0.5}px),` +
            `radial-gradient(circle at 10% 80%, rgba(255,255,255,${opacity}) ${size}px, transparent ${size+0.5}px)`
          ,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          transform: `translateY(${translate}px)`,
          animation: `twinkle${l}-${index} 9s linear infinite`,
        }}
      />
    )
  })

  return (
    <div className="relative w-[100vw] md:w-[150vw] h-screen overflow-hidden">
      {layers}
      {/* glitter sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)] mix-blend-screen" />
      <style>{`
        @keyframes twinkle0-${index} { 0%{opacity:.8} 50%{opacity:.4} 100%{opacity:.8} }
        @keyframes twinkle1-${index} { 0%{opacity:.7} 50%{opacity:.3} 100%{opacity:.7} }
        @keyframes twinkle2-${index} { 0%{opacity:.5} 50%{opacity:.2} 100%{opacity:.5} }
      `}</style>
    </div>
  )
}
