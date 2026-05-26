import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import Footer from '../components/Footer'
import { industries, accelerators } from '../data/solutions'

export default function Solutions() {
  usePageEffects()

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ Solutions"
        title={`Industries we<br/><span class="gradient-text-red">know inside-out.</span>`}
        subtitle="Vertical expertise compounds. Eight years of focus across fintech, healthcare, retail and the public sector — translated into faster decisions and fewer surprises."
        gradient="radial-gradient(circle at 50% 30%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(circle at 80% 90%, rgba(239,68,68,0.20), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* INDUSTRIES */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Industries</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">Where we go deep.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <div key={ind.num} className={`reveal${i % 3 !== 0 ? ` delay-${(i % 3) * 100}` : ''} tilt card-glow p-0 overflow-hidden`}>
              <div className="tilt-inner">
                <div className="theme-dark h-40 relative overflow-hidden" style={{ background: ind.gradient }}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">{ind.num} / {ind.tag}</div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-[22px] font-medium text-white">{ind.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{ind.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCELERATORS */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 02 — Pre-built offerings</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[820px] leading-[1.05]">
            Accelerators. <span className="gradient-text-cyan">Not boxed software.</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-[14.5px] text-slate-400 leading-relaxed">
            A library of opinionated starting points — proven across deployments, shipped open and bent to fit your stack. Days saved, not weeks.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {accelerators.map((acc, i) => (
            <div key={acc.title} className={`reveal${i % 2 !== 0 ? ` delay-${i % 2 * 100}` : ''} card-glow p-10`}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--cyan)] mb-4">/ Accelerator</div>
              <h3 className="font-display text-[26px] font-medium text-white">{acc.title}</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-400">{acc.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11.5px]">
                {acc.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionCTA
        title={`Operating in another industry? <span class="gradient-text-red">We've probably seen it.</span>`}
        primaryLabel="Talk to an architect"
        primaryTo="/contact"
        secondaryLabel="See proof"
        secondaryTo="/case-studies"
      />

      <Footer />
    </main>
  )
}
