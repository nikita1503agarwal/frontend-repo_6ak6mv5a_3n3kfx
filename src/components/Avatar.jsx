import React from 'react'
import { motion } from 'framer-motion'

/*
  Angel avatar: minimal silhouette with halo and soft wings.
  Modes: walk → float → fall → rise → glow
*/
export default function Avatar({ mode = 'walk', x = 0, y = 0, size = 1 }) {
  const variants = {
    walk: { y: [0, -4, 0], rotate: [0, -0.5, 0, 0.5, 0] },
    float: { y: [0, -10, 0, -6, 0], rotate: [0, 0.6, 0, -0.6, 0] },
    fall: { y: [0, 8, 14, 8, 0], rotate: [0, 1.2, 0, -1.2, 0] },
    rise: { y: [0, -12, -18, -12, 0], rotate: [0, -0.6, 0, 0.6, 0] },
    glow: { y: [0, -8, 0], rotate: [0, 0.3, 0] },
  }

  return (
    <motion.div
      className="pointer-events-none select-none"
      style={{ x, y, scale: size }}
      animate={variants[mode]}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <div className="relative">
        {/* Halo */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-2 w-10 rounded-full bg-white/70 ring-2 ring-white/70 blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.6)]" />

        {/* Wings */}
        <div className="absolute -left-9 top-1/2 -translate-y-1/2 h-16 w-10 origin-right -rotate-12">
          <div className="h-full w-full rounded-l-[40px] rounded-r-[8px] bg-white/65 backdrop-blur-sm shadow-[0_10px_40px_rgba(255,255,255,0.35)]" />
        </div>
        <div className="absolute -right-9 top-1/2 -translate-y-1/2 h-16 w-10 origin-left rotate-12">
          <div className="h-full w-full rounded-r-[40px] rounded-l-[8px] bg-white/65 backdrop-blur-sm shadow-[0_10px_40px_rgba(255,255,255,0.35)]" />
        </div>

        {/* Body */}
        <div className="mx-auto h-16 w-10 rounded-[12px] bg-gradient-to-b from-white/95 to-white/70 shadow-[0_8px_30px_rgba(255,255,255,0.35)]" />
        {/* Head */}
        <div className="-mt-4 mx-auto h-8 w-8 rounded-full bg-white/95 ring-1 ring-white/60 shadow-[0_0_24px_rgba(255,255,255,0.6)]" />
        {/* Feet shadow hint */}
        <div className="mx-auto mt-1 h-1.5 w-10 rounded-full bg-white/30" />
      </div>
    </motion.div>
  )
}
