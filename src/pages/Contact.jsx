import { useRef } from 'react'
import { useState } from 'react'
import { usePageEffects } from '../hooks/usePageEffects'
import { useHeroTubes } from '../hooks/useHeroTubes'
import Footer from '../components/Footer'
import { offices, faqs, serviceChips, budgetOptions } from '../data/contact'

export default function Contact() {
  usePageEffects()
  const canvasRef = useRef(null)
  useHeroTubes(canvasRef)
  const [activeChips, setActiveChips] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const toggleChip = chip => {
    setActiveChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      {/* HERO + FORM */}
      <section className="theme-dark relative w-full max-w-[1400px] mx-auto rounded-[48px] overflow-hidden border border-white/[0.06] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
        <div className="hero-tubes-wrap">
          <canvas ref={canvasRef} className="hero-tubes-canvas" />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 25% 25%, rgba(239,68,68,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.18), transparent 55%), rgba(5,9,23,0.7)' }}
          />
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        </div>

        <div className="relative z-10 px-6 md:px-16 py-16 md:py-20 grid lg:grid-cols-12 gap-12">
          {/* left: intro */}
          <div className="lg:col-span-5">
            <div className="anim-fade-up font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ Contact</div>
            <h1 className="anim-fade-up delay-100 font-display text-[44px] md:text-[64px] font-medium tracking-tight text-white mt-4 leading-[1.0]">
              Let's build<br/>
              <span className="gradient-text-red">something good.</span>
            </h1>
            <p className="anim-fade-up delay-200 mt-7 text-[14.5px] leading-relaxed text-slate-400 max-w-[420px]">
              Tell us what you're building. We'll get back within one business day with a plan and a price.
            </p>
            <div className="anim-fade-up delay-300 mt-10 space-y-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Email</div>
                <div className="text-white text-[15px]">hello@agzus.tech</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Careers</div>
                <div className="text-white text-[15px]">careers@agzus.tech</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Phone</div>
                <div className="text-white text-[15px]">+91 — — — — — —</div>
              </div>
            </div>
          </div>

          {/* right: form */}
          <div className="lg:col-span-7">
            <form
              className="anim-fade-up delay-200 card p-7 md:p-9 rounded-[28px] backdrop-blur-xl"
              onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Your name</label>
                  <input className="field-input" placeholder="Alex Doe" />
                </div>
                <div>
                  <label className="field-label">Work email</label>
                  <input type="email" className="field-input" placeholder="alex@company.com" />
                </div>
                <div>
                  <label className="field-label">Company</label>
                  <input className="field-input" placeholder="Aurora Inc." />
                </div>
                <div>
                  <label className="field-label">Budget range</label>
                  <select className="field-input">
                    {budgetOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="field-label">What are you interested in?</label>
                <div className="flex flex-wrap gap-2">
                  {serviceChips.map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={`chip${activeChips.includes(chip) ? ' is-active' : ''}`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="field-label">Tell us about your project</label>
                <textarea
                  className="field-input"
                  placeholder="What are you building, where are you stuck, and what does success look like?"
                />
              </div>

              <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-[12px] text-slate-500">We'll reply within one business day.</div>
                <button className="btn-primary inline-flex items-center gap-1.5" type="submit">
                  Send brief
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>

              {submitted && (
                <div className="mt-6 px-5 py-4 rounded-2xl border border-[var(--red)]/30 bg-[var(--red)]/10 text-[13.5px] text-white">
                  ✦ Thanks — your brief is on its way. We'll be in touch.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Offices</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[820px] leading-[1.05]">
            Find us in <span className="gradient-text-cyan">four hubs.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {offices.map((office, i) => (
            <div key={office.city} className={`reveal${i > 0 ? ` delay-${i * 100}` : ''} tilt card-glow p-8`}>
              <div className="tilt-inner">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--red)]">{office.tag}</div>
                <div className="font-display text-[22px] font-medium text-white mt-3">{office.city}</div>
                <div className="mt-4 text-[13px] text-slate-400 leading-relaxed">
                  {office.address.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < office.address.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="mt-5 font-mono text-[11px] text-slate-500">{office.hours}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 02 — FAQ</div>
          <h2 className="font-display text-[40px] md:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[820px] leading-[1.05]">Common questions.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-1 max-w-[1100px]">
          {faqs.map((faq, i) => (
            <details key={faq.q} className={`reveal${i % 2 !== 0 ? ' delay-100' : ''} group border-b border-white/[0.06] py-6`}>
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="font-display text-[18px] font-medium text-white">{faq.q}</span>
                <span className="text-slate-500 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-[13.5px] text-slate-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
