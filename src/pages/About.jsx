import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import SectionCTA from '../components/SectionCTA'
import Footer from '../components/Footer'
import { principles, timeline, team } from '../data/about'
import { aboutStats } from '../data/stats'

export default function About() {
  usePageEffects()

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ About AGZUS"
        title={`We are a team of<br/><span class="gradient-text-red">engineers, designers</span><br/>and operators.`}
        subtitle="AGZUS Technology Solutions was founded on a simple thesis: the next decade of software will be won by the teams who can move from sketch to production without losing their soul. We help ambitious organisations do exactly that."
        gradient="radial-gradient(circle at 20% 20%, rgba(239,68,68,0.18), transparent 50%), radial-gradient(circle at 90% 80%, rgba(34,211,238,0.16), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* PRINCIPLES */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Principles</div>
            <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[820px] leading-[1.05]">
              The principles that <span className="gradient-text-cyan">guide our craft.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <div key={p.tag} className={`reveal delay-${(i + 1) * 100} tilt card-glow p-10`}>
              <div className="tilt-inner">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{p.tag}</div>
                <h3 className="font-display text-[26px] font-medium text-white mt-6 leading-tight">{p.title}</h3>
                <p className="mt-5 text-[14px] leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 02 — Journey</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[720px]">
            From two engineers to a <span className="gradient-text-red">global practice.</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <div key={t.year} className="reveal grid md:grid-cols-2 gap-6 md:gap-16 items-start relative">
                {t.side === 'left' ? (
                  <>
                    <div className="md:text-right md:pr-12">
                      <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: t.color }}>{t.year}</div>
                      <h4 className="font-display text-[24px] font-medium text-white mt-2">{t.title}</h4>
                      <p className="mt-2 text-[13.5px] text-slate-400 leading-relaxed">{t.desc}</p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-2 w-3 h-3 rounded-full ring-4 ring-[var(--bg-deep)]" style={{ background: t.color }} />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-2 w-3 h-3 rounded-full ring-4 ring-[var(--bg-deep)]" style={{ background: t.color }} />
                    <div className="md:pl-12">
                      <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: t.color }}>{t.year}</div>
                      <h4 className="font-display text-[24px] font-medium text-white mt-2">{t.title}</h4>
                      <p className="mt-2 text-[13.5px] text-slate-400 leading-relaxed">{t.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 03 — Leadership</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">
            Operators who have <span className="gradient-text-red">been on your side of the table.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <div key={m.name} className={`reveal delay-${(i + 1) * 100} tilt card-glow p-6`}>
              <div className="tilt-inner">
                <div className="aspect-square rounded-2xl mb-5" style={{ background: m.gradient }} />
                <div className="font-display text-[18px] font-medium text-white">{m.name}</div>
                <div className="text-[12px] text-slate-400 mt-1">{m.role}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mt-3">{m.prev}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="relative card overflow-hidden rounded-[40px] px-8 md:px-16 py-16 md:py-20">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
          <div className="relative reveal grid grid-cols-2 md:grid-cols-4 gap-10">
            {aboutStats.map(s => (
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

      <SectionCTA
        title={`Want to know more? <span class="gradient-text-red">Let's talk.</span>`}
        primaryLabel="Get in touch"
        primaryTo="/contact"
        secondaryLabel="Join the team"
        secondaryTo="/careers"
      />

      <Footer />
    </main>
  )
}
