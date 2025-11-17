import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function HeroSpline() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* ethereal gradient veil to blend with brand */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/40 mix-blend-screen" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-lg md:text-xl tracking-wide text-white/80">Once upon a time…</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-serifAntique text-white drop-shadow-[0_10px_35px_rgba(255,255,255,0.35)]">
            Wanderlove
          </h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            A dreamlike passage through memory, shadow, and returning light.
          </p>
        </motion.div>
      </div>

      {/* subtle floating motes */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70 blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -30, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            style={{ left: `${(i * 83) % 100}%`, top: `${(i * 37) % 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
