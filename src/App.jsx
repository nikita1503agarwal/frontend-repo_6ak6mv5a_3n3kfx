import React from 'react'
import './index.css'
import './components/Fonts.css'
import SideScroller from './components/SideScroller'

export default function App() {
  return (
    <div className="bg-black min-h-screen font-serifAntique text-white">
      {/* Cinematic side-scrolling narrative */}
      <SideScroller />

      {/* CTA finale */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-center px-6">
        <div className="max-w-3xl">
          <p className="text-2xl md:text-4xl opacity-90">Enter the Studio</p>
          <a
            href="https://wanderlove.studio"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl hover:scale-[1.02] transition will-change-transform"
          >
            Enter the Studio → wanderlove.studio
          </a>
        </div>
      </section>
    </div>
  )
}
