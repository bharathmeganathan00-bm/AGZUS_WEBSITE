import { useState } from 'react'
import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import GlassCard from '../components/GlassCard'
import Footer from '../components/Footer'
import { caseStudies, filterCategories } from '../data/caseStudies'

export default function CaseStudies() {
  usePageEffects()
  const [active, setActive] = useState('All work')

  const filtered = active === 'All work'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === active)

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ Selected Work"
        title={`Production systems<br/><span class="gradient-text-red">at real scale.</span>`}
        subtitle="A small selection of the platforms, products and infrastructure we've shipped with our partners — outcomes measured, not just outputs."
        gradient="radial-gradient(circle at 30% 30%, rgba(239,68,68,0.20), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.18), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* FILTER */}
      <div className="reveal w-full max-w-[1400px] mx-auto mt-16 px-4 md:px-6">
        <div className="flex flex-wrap gap-2">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold transition ${
                active === cat
                  ? 'bg-black/[0.08] border border-black/15 text-slate-900'
                  : 'bg-black/[0.03] border border-black/10 text-slate-600 hover:text-slate-900 hover:border-black/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs, i) => (
            <GlassCard key={cs.href} data={cs} delay={`delay-${(i % 3) * 100}`} />
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal card overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[40px] px-5 sm:px-8 md:px-16 py-10 sm:py-16 md:py-20 relative">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          <div className="relative max-w-[820px]">
            <div className="font-display text-[34px] md:text-[46px] font-medium text-slate-900 leading-[1.18] tracking-tight">
              "The AGZUS team shipped quietly, on time, and treated our codebase like it was their own. That's rare."
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }} />
              <div>
                <div className="text-slate-900 text-[14px] font-medium">Operations Lead</div>
                <div className="text-slate-500 text-[12.5px]">Long-time partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        title={`Build the next case study <span class="gradient-text-red">with us.</span>`}
        primaryLabel="Start a project"
        primaryTo="/contact"
      />

      <Footer />
    </main>
  )
}
