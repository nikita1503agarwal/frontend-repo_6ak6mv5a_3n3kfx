import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Feather, Sparkles } from 'lucide-react'

export default function Scene({ id, theme = 'light', title, line1, line2, bgFrom, bgTo, accent = '#f5f5f4' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // parallax layers
  const yBack = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const yFore = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const fade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4])

  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-900'

  return (
    <section ref={ref} id={id} className={`relative h-screen w-full overflow-hidden`}> 
      <motion.div style={{ opacity: fade }} className={`absolute inset-0 bg-gradient-to-b`} 
        animate={{ background: [
          `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
          `linear-gradient(to bottom, ${bgFrom}cc, ${bgTo})`,
          `linear-gradient(to bottom, ${bgFrom}, ${bgTo}cc)`
        ]}}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* back sky textures */}
      <motion.div style={{ y: yBack }} className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      </motion.div>

      {/* mid drifting elements */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <motion.span key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70"
            animate={{ y: [0, -60, 0], x: [0, (i%2?1:-1)*20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 8 + (i%5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            style={{ left: `${(i*37)%100}%`, top: `${(i*19)%100}%` }}
          />
        ))}
      </motion.div>

      {/* foreground symbolic elements */}
      <motion.div style={{ y: yFore }} className="absolute inset-0">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} viewport={{ once: true }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Sparkles className={`${theme==='dark'?'text-yellow-200':'text-zinc-500'} drop-shadow`} size={48} />
        </motion.div>
      </motion.div>

      {/* traveling heart */}
      <motion.div className="absolute" style={{ y: useTransform(scrollYProgress, [0,1], ['20%','-30%']), x: useTransform(scrollYProgress, [0,1], ['-40%','40%']) }}>
        <Heart className={`${theme==='dark'?'text-rose-200':'text-rose-500'} drop-shadow`} size={28} />
      </motion.div>

      {/* copy */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div className={`max-w-3xl ${textColor}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          {title && <p className="uppercase tracking-[0.3em] text-sm/relaxed opacity-70">{title}</p>}
          <h2 className={`mt-3 font-serifAntique text-4xl md:text-6xl`}>{line1}</h2>
          {line2 && <p className="mt-4 text-lg md:text-xl opacity-80">{line2}</p>}
        </motion.div>
      </div>

      {/* vines / petals accents */}
      <motion.div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40">
        <motion.div className="absolute bottom-6 left-10 text-emerald-400/70" animate={{ rotate: [0, 3, -2, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          <Feather size={22} />
        </motion.div>
        <motion.div className="absolute bottom-8 right-12 text-amber-300/70" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <Feather size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
