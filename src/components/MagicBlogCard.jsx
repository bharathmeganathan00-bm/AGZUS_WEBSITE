import { useRef, useId } from 'react'

const categoryIcons = {
  AI: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/>
    </svg>
  ),
  Engineering: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Design: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Operations: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Culture: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

export default function MagicBlogCard({ post, delay = '' }) {
  const cardRef = useRef(null)
  const id      = useId()
  const fid     = `magic-blog-${id.replace(/:/g, '')}`

  const onMove = e => {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--px', ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)).toFixed(3))
    card.style.setProperty('--py', ((e.clientY - r.top  - r.height / 2) / (r.height / 2)).toFixed(3))
  }

  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--px', '-10')
    card.style.setProperty('--py', '-10')
  }

  const Icon = categoryIcons[post.category] ?? categoryIcons.Engineering

  return (
    <a
      href="#"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`reveal${delay} group relative block cursor-pointer rounded-2xl border border-white/10 bg-[var(--bg-card)] overflow-hidden [container-type:size] active:scale-[0.99] transition-all duration-300`}
    >
      {/* ── magic glow layer ── */}
      <div className="absolute inset-0 [clip-path:inset(0_round_16px)] overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            background: post.gradient,
            filter: `url(#${fid}) saturate(4) brightness(1.3) contrast(1.4)`,
            translate: 'calc(var(--px,-10) * 50cqi) calc(var(--py,-10) * 50cqh)',
            scale: '3.2',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ── frosted glass border ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-2xl border-2 border-transparent"
        style={{
          backdropFilter: 'blur(0.5px) saturate(4) brightness(2.2) contrast(2)',
          WebkitBackdropFilter: 'blur(0.5px) saturate(4) brightness(2.2) contrast(2)',
          mask: 'linear-gradient(#fff 0 100%) border-box, linear-gradient(#fff 0 100%) padding-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* ── header icon band ── */}
      <div className="relative z-[3] h-36 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
          style={{ background: post.gradient }}
        >
          {Icon}
        </div>
      </div>

      {/* ── text content ── */}
      <div className="relative z-[3] px-7 pb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--red)]">
          {post.category} · {post.readTime}
        </div>
        <h3 className="font-display text-[19px] font-medium text-white mt-2.5 leading-snug">
          {post.title}
        </h3>
        <p className="mt-2.5 text-[12.5px] text-slate-400 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1 text-[11.5px] text-[var(--red)] font-medium">
          Read article
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* ── SVG blur filter ── */}
      <svg className="absolute h-0 w-0 overflow-visible opacity-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={fid} width="500%" height="500%" x="-200%" y="-200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="26" />
          </filter>
        </defs>
      </svg>
    </a>
  )
}
