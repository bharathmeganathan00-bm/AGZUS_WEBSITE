import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageEffects } from '../hooks/usePageEffects'
import { useHeroTubes } from '../hooks/useHeroTubes'
import Footer from '../components/Footer'
import GlassCard from '../components/GlassCard'
import MagneticButton from '../components/MagneticButton'
import { clients } from '../data/clients'
import { capabilities } from '../data/services'
import { serviceIllustrations } from '../data/serviceIllustrations'
import { homeStats } from '../data/stats'
import { caseStudies } from '../data/caseStudies'

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const doubled = [...clients, ...clients]

export default function Home() {
  const canvasRef = useRef(null)
  useHeroTubes(canvasRef)
  usePageEffects({ scrollText: true })

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      {/* HERO */}
      <section className="theme-dark relative w-full max-w-[1400px] mx-auto rounded-[48px] overflow-hidden h-auto md:h-[640px] min-h-[500px] flex flex-col border border-white/[0.06] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
        <div className="hero-tubes-wrap">
          <canvas ref={canvasRef} className="hero-tubes-canvas" />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(100deg, rgba(5,9,23,0.82) 0%, rgba(5,9,23,0.62) 35%, rgba(5,9,23,0.35) 55%, rgba(5,9,23,0.05) 80%, rgba(5,9,23,0) 100%)' }} />
        </div>

        <div className="anim-fade-up delay-100 relative z-20 px-5 sm:px-8 md:px-16 pt-8 sm:pt-10 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] pulse-dot" />
          <span>AGZUS / ats.systems / v2026.05</span>
          <span className="hidden md:inline mx-2 text-slate-700">•</span>
          <span className="hidden md:inline">Engineering tomorrow's enterprise, today.</span>
        </div>

        <div className="anim-fade-up delay-200 relative z-20 flex-1 px-5 sm:px-8 md:px-16 pt-6 sm:pt-8 md:pt-10 pb-10 flex flex-col items-start">
          <h1 className="font-display text-[44px] md:text-[64px] font-medium tracking-tight leading-[1.02] text-white max-w-[700px]">
            Foundation of the<br />
            <span className="gradient-text-red">new digital epoch.</span>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-[600px] text-[14px] md:text-[15px] leading-relaxed text-slate-400">
            AGZUS Technology Solutions designs products, powers ecosystems and engineers
            the foundation of a modern, intelligent enterprise — for builders, operators
            and communities alike.
          </p>
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-1.5">
                Start a project <ChevronRight />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/services" className="btn-ghost">Explore services</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee mt-10 w-full max-w-[1400px] marquee-mask overflow-hidden">
        <div className="marquee-track flex gap-4 w-max">
          {doubled.map((c, i) => (
            <div key={i} className="group relative h-24 w-48 shrink-0 flex items-center justify-center rounded-full bg-white/[0.6] backdrop-blur-md border border-black/[0.06] shadow-sm hover:border-black/20 transition-all overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500`} />
              <div className="relative z-10 flex items-center gap-2 group-hover:text-white transition-all duration-300">
                <span className="font-display text-[18px] font-semibold">{c.symbol}</span>
                <span className="text-[13px] font-semibold tracking-tight">{c.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL TEXT */}
      <section className="scroll-stage" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginTop: '6rem' }}>
        <div className="scroll-eyebrow">Scroll to see more</div>
        <div className="scroll-stage-inner">
          <div className="scroll-text">
            foundation of the <span className="accent">new digital epoch</span>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Capabilities</div>
            <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">
              A full-stack engineering practice for <span className="gradient-text-red">ambitious teams.</span>
            </h2>
          </div>
          <MagneticButton>
            <Link to="/services" className="hidden md:inline-flex btn-ghost">
              All services <ChevronRight />
            </Link>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.num}
              to="/services"
              className={`reveal delay-${(i % 3 + 1) * 100} tilt card-glow p-8 block group`}
              style={{ overflow: 'hidden' }}
            >
              {serviceIllustrations[cap.num] && (
                <img
                  src={serviceIllustrations[cap.num]}
                  alt=""
                  className="service-card-bg"
                  loading="lazy"
                  aria-hidden="true"
                  onError={e => { e.target.style.display = 'none' }}
                />
              )}
              <div className="tilt-inner service-card-content">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-[var(--red)] bg-white/[0.03]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" dangerouslySetInnerHTML={{ __html: cap.icon }} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{cap.num}</span>
                </div>
                <h3 className="font-display text-[22px] font-medium text-white mb-3">{cap.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate-400">{cap.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="relative card overflow-hidden rounded-[40px] px-5 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
          <div className="relative reveal max-w-[680px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ 02 — By the numbers</div>
            <h2 className="font-display text-[36px] md:text-[48px] font-medium tracking-tight text-white mt-3 leading-[1.1]">
              Built for scale. <span className="gradient-text-cyan">Measured in outcomes.</span>
            </h2>
          </div>
          <div className="relative reveal delay-200 grid grid-cols-2 md:grid-cols-4 gap-10 mt-14">
            {homeStats.map(s => (
              <div key={s.label}>
                <div className="stat-num">
                  <span
                    data-counter={s.counter}
                    data-decimals={s.decimals || undefined}
                    data-suffix={s.suffix}
                  >
                    0{s.suffix}
                  </span>
                </div>
                <div className="mt-4 text-[12.5px] text-slate-400 uppercase tracking-[0.16em] font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="reveal lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 03 — Distributed</div>
            <h2 className="font-display text-[40px] md:text-[52px] font-medium tracking-tight text-white mt-3 leading-[1.05]">
              A network engineered for <span className="gradient-text-red">global reach.</span>
            </h2>
            <p className="mt-6 text-[14.5px] leading-relaxed text-slate-400 max-w-[480px]">
              24 / 7 / 365 delivery across hubs in Bengaluru, Dubai, London and Austin. Our distributed
              engineering practice routes every brief to the right pod — without the handoff tax.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-slate-300">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />Edge deployments across 32 regions</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />Follow-the-sun support &amp; on-call</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />Multi-cloud, multi-region by default</li>
            </ul>
          </div>

          <div className="reveal delay-200 lg:col-span-7 relative aspect-square max-w-[640px] mx-auto w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
              <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />
              <div className="absolute inset-[18%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-[30%] rounded-full border border-white/[0.10]" />
              <div className="absolute inset-[2%] spin-slow" style={{ borderRadius: '50%' }}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="196" fill="none" stroke="rgba(239,68,68,0.25)" strokeWidth="1" strokeDasharray="2 8"/>
                </svg>
              </div>
              <div className="absolute inset-[12%] spin-slow-rev" style={{ borderRadius: '50%' }}>
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="196" fill="none" stroke="rgba(34,211,238,0.22)" strokeWidth="1" strokeDasharray="1 6"/>
                </svg>
              </div>
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full data-flow">
                <line x1="80" y1="120" x2="200" y2="200" stroke="rgba(239,68,68,0.4)" strokeWidth="0.8"/>
                <line x1="320" y1="100" x2="200" y2="200" stroke="rgba(239,68,68,0.4)" strokeWidth="0.8"/>
                <line x1="320" y1="280" x2="200" y2="200" stroke="rgba(34,211,238,0.5)" strokeWidth="0.8"/>
                <line x1="100" y1="300" x2="200" y2="200" stroke="rgba(34,211,238,0.5)" strokeWidth="0.8"/>
                <line x1="60" y1="220" x2="200" y2="200" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8"/>
                <line x1="350" y1="180" x2="200" y2="200" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8"/>
              </svg>
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
                <g fill="#ef4444"><circle cx="80" cy="120" r="4"/><circle cx="320" cy="100" r="4"/><circle cx="60" cy="220" r="3"/></g>
                <g fill="#22d3ee"><circle cx="320" cy="280" r="4"/><circle cx="100" cy="300" r="3"/><circle cx="350" cy="180" r="3"/></g>
                <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#94a3b8">
                  <text x="58" y="108">BLR</text>
                  <text x="298" y="88">LON</text>
                  <text x="298" y="304">DXB</text>
                  <text x="78" y="320">AUS</text>
                </g>
              </svg>
              <div className="relative z-10 w-32 h-32 rounded-full bg-[var(--bg-card)] border border-[var(--red)]/40 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.35)]">
                <img src="/logo.png" alt="ATS" className="w-24 h-24 object-contain p-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 04 — Selected work</div>
            <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">
              Shipping production systems for <span className="gradient-text-cyan">teams that matter.</span>
            </h2>
          </div>
          <MagneticButton>
            <Link to="/case-studies" className="hidden md:inline-flex btn-ghost">
              All case studies <ChevronRight />
            </Link>
          </MagneticButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.slice(0, 3).map((cs, i) => (
            <GlassCard key={cs.href} data={cs} delay={`delay-${i * 100}`} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal relative rounded-[40px] overflow-hidden border border-white/[0.06] bg-[var(--bg-card)] p-6 sm:p-10 md:p-16 text-center">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          <div className="relative">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ Let's build something</div>
            <h2 className="font-display text-[44px] md:text-[64px] font-medium tracking-tight text-white mt-4 leading-[1.05]">
              Ready to engineer<br /><span className="gradient-text-red">your next decade?</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-[14px] sm:text-[14.5px] text-slate-400 max-w-[520px] mx-auto">
              Tell us what you're building. We'll get back within one business day with a plan.
            </p>
            <div className="mt-7 sm:mt-9 flex items-center justify-center gap-3 flex-wrap">
              <MagneticButton>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-1.5">
                  Start a project <ChevronRight />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/careers" className="btn-ghost">Or, join the team</Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
