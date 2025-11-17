import React from 'react'
import { motion } from 'framer-motion'

/*
  Abstract avatar: a minimal silhouette (head + body) built with CSS.
  It subtly changes state across the journey: walk → float → fall → rise → glow.
*/
export default function Avatar({ mode = 'walk', x = 0, y = 0 }) {
  // Mode-based subtle motion
  const variants = {
    walk: { y: [0, -4, 0], rotate: [0, -1, 0, 1, 0] },
    float: { y: [0, -8, 0, -6, 0], rotate: [0, 1, 0, -1, 0] },
    fall: { y: [0, 6, 12, 6, 0], rotate: [0, 2, 0, -2, 0] },
    rise: { y: [0, -10, -16, -10, 0], rotate: [0, -1, 0, 1, 0] },
    glow: { y: [0, -6, 0], rotate: [0, 0.5, 0] },
  }

  return (
    <motion.div
      className="pointer-events-none select-none"
      style={{ x, y }}
      animate={variants[mode]}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Body */}
      <div className="relative">
        {/* Aura */}
        <div className="absolute -inset-5 rounded-full bg-rose-300/0 blur-2xl" />
        {/* Torso */}
        <div className="mx-auto h-16 w-10 rounded-[12px] bg-gradient-to-b from-zinc-200/90 to-zinc-100/70 shadow-[0_8px_30px_rgba(255,255,255,0.12)]" />
        {/* Head */}
        <div className="-mt-4 mx-auto h-8 w-8 rounded-full bg-white/90 ring-1 ring-white/40" />
        {/* Feet hint */}
        <div className="mx-auto mt-1 h-1.5 w-8 rounded-full bg-white/30" />
      </div>
    </motion.div>
  )
}
