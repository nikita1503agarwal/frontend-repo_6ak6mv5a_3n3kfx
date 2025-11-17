import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function BackHome() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <button onClick={handleClick} className="fixed left-5 top-5 z-50 group">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-lg hover:shadow-2xl hover:bg-white/20"
      >
        <Heart className="text-rose-300 group-hover:text-rose-200 transition" size={18} />
      </motion.span>
    </button>
  )
}
