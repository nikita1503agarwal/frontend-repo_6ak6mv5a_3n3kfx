import React from 'react'
import './index.css'
import './components/Fonts.css'
import HeroSpline from './components/HeroSpline'
import ScrollNarrative from './components/ScrollNarrative'
import BackHome from './components/BackHome'

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero with Spline cover */}
      <HeroSpline />

      {/* Scroll narrative scenes */}
      <ScrollNarrative />

      {/* Small glowing symbol to return home */}
      <BackHome />
    </div>
  )
}

export default App
