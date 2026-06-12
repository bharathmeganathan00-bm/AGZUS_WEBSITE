import { useRef, useState } from 'react'
import { usePageEffects } from '../hooks/usePageEffects'
import { useHeroTubes } from '../hooks/useHeroTubes'
import MagneticButton from '../components/MagneticButton'
import Footer from '../components/Footer'
import { offices, faqs, serviceChips, contactInfo } from '../data/contact'

const TO_EMAIL     = 'info@agzus.com'
const WHATSAPP_NUM = '918668052762'

function buildWhatsAppLink(data) {
  const msg = [
    'Hi AGZUS Team! 👋',
    '',
    '*New Project Enquiry*',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Mobile:* ${data.mobile || 'Not provided'}`,
    `*Company:* ${data.company || 'Not provided'}`,
    `*Services:* ${data.services || 'Not specified'}`,
    '',
    '*Message:*',
    data.message,
  ].join('\n')
  return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`
}

export default function Contact() {
  usePageEffects()
  const canvasRef = useRef(null)
  useHeroTubes(canvasRef)

  const [activeChips, setActiveChips] = useState([])
  const [status, setStatus]           = useState('idle') // idle | sending | success | error
  const [form, setForm]               = useState({ name: '', email: '', company: '', mobile: '', message: '' })

  const toggleChip = chip =>
    setActiveChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const data = { ...form, services: activeChips.join(', ') || 'Not specified' }

    // Open WhatsApp immediately in the same click-handler tick so browsers allow it
    window.open(buildWhatsAppLink(data), '_blank', 'noopener,noreferrer')

    // Send email silently via Web3Forms
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key:  import.meta.env.VITE_WEB3FORMS_KEY,
          subject:     `New Enquiry from ${data.name}${data.company ? ` — ${data.company}` : ''}`,
          from_name:   data.name,
          // form fields (appear in the email Web3Forms sends you)
          Name:        data.name,
          Email:       data.email,
          Mobile:      data.mobile || 'Not provided',
          Company:     data.company || 'Not provided',
          Services:    data.services,
          Message:     data.message,
          // tell Web3Forms which address to forward to
          replyto:     data.email,
        }),
      })
      const result = await res.json()
      setStatus(result.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setForm({ name: '', email: '', company: '', mobile: '', message: '' })
    setActiveChips([])
  }

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      {/* HERO + FORM */}
      <section className="theme-dark relative w-full max-w-[1400px] mx-auto rounded-[48px] overflow-hidden border border-white/[0.06] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
        <div className="hero-tubes-wrap">
          <canvas ref={canvasRef} className="hero-tubes-canvas" />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 25% 25%, rgba(239,68,68,0.22), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.18), transparent 55%), rgba(5,9,23,0.7)' }} />
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 md:px-16 py-10 sm:py-16 md:py-20 grid lg:grid-cols-12 gap-8 md:gap-12">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="anim-fade-up font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ Contact</div>
            <h1 className="anim-fade-up delay-100 font-display text-[44px] md:text-[64px] font-medium tracking-tight text-white mt-4 leading-[1.0]">
              Let's build<br/><span className="gradient-text-red">something good.</span>
            </h1>
            <p className="anim-fade-up delay-200 mt-7 text-[14.5px] leading-relaxed text-slate-400 max-w-[420px]">
              Tell us what you're building. We'll get back within one business day with a plan and a price.
            </p>
            <div className="anim-fade-up delay-300 mt-10 space-y-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Email</div>
                <a href={`mailto:${contactInfo.email}`} className="text-white text-[15px] hover:text-[var(--red)] transition-colors">{contactInfo.email}</a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Careers</div>
                <a href={`mailto:${contactInfo.careersEmail}`} className="text-white text-[15px] hover:text-[var(--red)] transition-colors">{contactInfo.careersEmail}</a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2">Phone / WhatsApp</div>
                <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="text-white text-[15px] hover:text-[#25D366] transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">

            {/* SUCCESS */}
            {status === 'success' && (
              <div className="anim-fade-up card p-7 md:p-9 rounded-[28px] backdrop-blur-xl space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-medium text-white">Message sent to {TO_EMAIL}</div>
                    <div className="text-[13px] text-slate-400 mt-0.5">WhatsApp has opened in a new tab — hit Send there too.</div>
                  </div>
                </div>
                <button onClick={reset} className="block w-full text-center text-[12.5px] text-slate-500 hover:text-slate-300 transition-colors">
                  Submit another enquiry →
                </button>
              </div>
            )}

            {/* ERROR */}
            {status === 'error' && (
              <div className="anim-fade-up card p-7 md:p-9 rounded-[28px] backdrop-blur-xl space-y-4">
                <p className="text-amber-300 text-[14px]">Email couldn't be sent — please add the Web3Forms key to <code className="text-[12px] bg-white/10 px-1.5 py-0.5 rounded">.env</code> (see setup guide below).</p>
                <p className="text-slate-400 text-[13px]">WhatsApp is still open in the other tab — you can reach us there.</p>
                <button onClick={reset} className="text-[12.5px] text-slate-500 hover:text-slate-300 transition-colors">← Try again</button>
              </div>
            )}

            {/* FORM */}
            {(status === 'idle' || status === 'sending') && (
              <form className="anim-fade-up delay-200 card p-7 md:p-9 rounded-[28px] backdrop-blur-xl" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">Your name *</label>
                    <input name="name" className="field-input" placeholder="Alex Doe" required value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="field-label">Work email *</label>
                    <input type="email" name="email" className="field-input" placeholder="alex@company.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="field-label">Company</label>
                    <input name="company" className="field-input" placeholder="Aurora Inc." value={form.company} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="field-label">Mobile number</label>
                    <input type="tel" name="mobile" className="field-input" placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="field-label">What are you interested in?</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceChips.map(chip => (
                      <button key={chip} type="button" onClick={() => toggleChip(chip)} className={`chip${activeChips.includes(chip) ? ' is-active' : ''}`}>
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="field-label">Tell us about your project *</label>
                  <textarea name="message" className="field-input" placeholder="What are you building, where are you stuck, and what does success look like?" required value={form.message} onChange={handleChange} />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-[12px] text-slate-500">Sends to email + opens WhatsApp instantly.</div>
                  <MagneticButton type="submit" variant="primary" size="md" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                        </svg>
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send brief</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </>
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}

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
