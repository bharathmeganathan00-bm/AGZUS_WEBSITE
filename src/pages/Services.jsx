import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import Footer from '../components/Footer'
import { allServices, processSteps, techStack } from '../data/services'
import { serviceIllustrations } from '../data/serviceIllustrations'
import { techIcons } from '../data/techIcons'

export default function Services() {
  usePageEffects()

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ Services"
        title={`Ten disciplines.<br/><span class="gradient-text-red">One engineering practice.</span>`}
        subtitle="From greenfield products to mission-critical platforms, we bring the same rigour to every engagement — embedded teams, measurable outcomes, no handoffs."
        gradient="radial-gradient(circle at 80% 20%, rgba(239,68,68,0.22), transparent 50%), radial-gradient(circle at 10% 80%, rgba(34,211,238,0.18), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* SERVICES GRID */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Capabilities</div>
            <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">A full-stack practice, end to end.</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allServices.map((svc, i) => (
            <div key={svc.num} className={`reveal${i % 3 !== 0 ? ` delay-${(i % 3) * 100}` : ''} tilt card-glow p-8`} style={{ overflow: 'hidden' }}>
              {serviceIllustrations[svc.num] && (
                <img
                  src={serviceIllustrations[svc.num]}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" dangerouslySetInnerHTML={{ __html: svc.icon }} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{svc.num}</span>
                </div>
                <h3 className="font-display text-[22px] font-medium text-white mb-3">{svc.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate-400">{svc.desc}</p>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-slate-300">
                  {svc.bullets.map(b => <li key={b}>· {b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 02 — Process</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[720px]">
            How we work, <span className="gradient-text-cyan">end to end.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {processSteps.map((step, i) => (
            <div key={step.num} className={`reveal delay-${(i + 1) * 100} card p-7`}>
              <div className="font-display text-[64px] font-medium text-[var(--red)] leading-none">{step.num}</div>
              <div className="mt-4 font-display text-[18px] font-medium text-white">{step.title}</div>
              <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal card overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[40px] px-5 sm:px-8 md:px-16 py-10 sm:py-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ 03 — Stack</div>
          <h2 className="font-display text-[36px] md:text-[48px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[640px]">Modern tools, chosen for fit not fashion.</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[var(--cyan)]/10 border border-[var(--cyan)]/20 flex items-center justify-center text-[var(--cyan)] flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
                  </svg>
                </div>
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-slate-300 font-medium">Frontend</div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {techStack.frontend.map(t => (
                  <span key={t} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 text-[14px]">
                    {techIcons[t] && <img src={techIcons[t]} alt="" width="15" height="15" className="flex-shrink-0" loading="lazy" aria-hidden="true" onError={e => { e.target.style.display = 'none' }} />}
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center text-[var(--red)] flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-slate-300 font-medium">Backend &amp; Data</div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {techStack.backend.map(t => (
                  <span key={t} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 text-[14px]">
                    {techIcons[t] && <img src={techIcons[t]} alt="" width="15" height="15" className="flex-shrink-0" loading="lazy" aria-hidden="true" onError={e => { e.target.style.display = 'none' }} />}
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                </div>
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-slate-300 font-medium">Cloud &amp; AI</div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {techStack.cloud.map(t => (
                  <span key={t} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 text-[14px]">
                    {techIcons[t] && <img src={techIcons[t]} alt="" width="15" height="15" className="flex-shrink-0" loading="lazy" aria-hidden="true" onError={e => { e.target.style.display = 'none' }} />}
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        title={`Have a brief? <span class="gradient-text-red">Send it our way.</span>`}
        primaryLabel="Start a project"
        primaryTo="/contact"
        secondaryLabel="See our work"
        secondaryTo="/case-studies"
      />

      <Footer />
    </main>
  )
}
