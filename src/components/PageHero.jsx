import { useRef } from 'react'
import { useHeroTubes } from '../hooks/useHeroTubes'

export default function PageHero({ eyebrow, title, subtitle, gradient }) {
  const canvasRef = useRef(null)
  useHeroTubes(canvasRef)

  return (
    <section className="theme-dark relative w-full max-w-[1400px] mx-auto rounded-[48px] overflow-hidden border border-white/[0.06] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
      <div className="hero-tubes-wrap">
        <canvas ref={canvasRef} className="hero-tubes-canvas" />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: gradient || 'rgba(5,9,23,0.7)' }}
        />
        <div className="aurora" />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      </div>
      <div className="relative z-10 px-5 sm:px-8 md:px-16 py-12 sm:py-24 md:py-32">
        <div className="anim-fade-up font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">
          {eyebrow}
        </div>
        <h1
          className="anim-fade-up delay-100 font-display text-[48px] md:text-[80px] font-medium tracking-tight text-white mt-4 leading-[0.98] max-w-[1000px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="anim-fade-up delay-200 mt-6 sm:mt-8 max-w-[640px] text-[14px] sm:text-[15px] md:text-[16.5px] leading-relaxed text-slate-300">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
