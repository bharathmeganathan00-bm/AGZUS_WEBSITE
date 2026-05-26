import { Link } from 'react-router-dom'
import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import Footer from '../components/Footer'
import { whyValues, benefits, openRoles } from '../data/careers'

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

export default function Careers() {
  usePageEffects()

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ Careers"
        title={`Build the systems<br/><span class="gradient-text-red">other companies depend on.</span>`}
        subtitle="We're hiring engineers, designers and operators who care about the craft of software — and who want to ship things that matter to real people."
        gradient="radial-gradient(circle at 70% 20%, rgba(239,68,68,0.22), transparent 50%), radial-gradient(circle at 10% 80%, rgba(34,211,238,0.18), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* WHY */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Working here</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[820px] leading-[1.05]">
            Small teams. <span className="gradient-text-cyan">Big problems.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {whyValues.map((v, i) => (
            <div key={v.num} className={`reveal delay-${(i + 1) * 100} tilt card-glow p-10`}>
              <div className="tilt-inner">
                <div className="font-display text-[40px] font-medium text-[var(--red)] leading-none">{v.num}</div>
                <h3 className="font-display text-[22px] font-medium text-white mt-6">{v.title}</h3>
                <p className="mt-3 text-[13.5px] text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal card overflow-hidden rounded-[40px] px-8 md:px-16 py-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ 02 — Benefits</div>
          <h2 className="font-display text-[36px] md:text-[48px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[640px]">A workplace tuned for long careers.</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(b => (
              <div key={b.title}>
                <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[var(--red)] bg-white/[0.03]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" dangerouslySetInnerHTML={{ __html: b.icon }} />
                </div>
                <div className="mt-5 font-display text-[18px] font-medium text-white">{b.title}</div>
                <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 03 — Open roles</div>
            <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">Currently hiring.</h2>
          </div>
          <div className="hidden md:block font-mono text-[12px] text-slate-400">12 open · all locations</div>
        </div>
        <div className="space-y-2">
          {openRoles.map((role, i) => (
            <Link
              key={role.code}
              to="/contact"
              className={`reveal${i % 3 !== 0 ? ` delay-${(i % 3) * 100}` : ''} card-glow flex items-center justify-between gap-6 p-6 md:p-7 group`}
            >
              <div className="flex items-center gap-5">
                <div className="font-mono text-[11px] text-slate-500 w-16">{role.code}</div>
                <div>
                  <div className="font-display text-[18px] md:text-[20px] font-medium text-white">{role.title}</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">{role.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-300">
                Apply <ChevronRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SectionCTA
        title={`Don't see your role? <span class="gradient-text-red">Write us anyway.</span>`}
        primaryLabel="careers@agzus.tech"
        primaryTo="/contact"
      />

      <Footer />
    </main>
  )
}
