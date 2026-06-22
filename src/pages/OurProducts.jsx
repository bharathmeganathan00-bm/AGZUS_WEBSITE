import { usePageEffects } from '../hooks/usePageEffects'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Update WA_NUMBER with your actual WhatsApp number (country code + number, no +) ──
const WA_NUMBER = '919876543210'

const tamilMsg   = encodeURIComponent('வணக்கம் AGZUS Team, ATS Software டெமோ வேண்டும். தமிழ் மொழியில் முழுமையாக விளக்க முடியுமா?')
const englishMsg = encodeURIComponent('Hi AGZUS Team, I want an ATS Software demo. Please explain in English.')
const ctaMsg     = encodeURIComponent('Hi AGZUS Team, I want to know more about ATS Software.')

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const modules = [
  {
    num: '01',
    icon: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v4M16 3v4M2 11h20M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
    title: 'POS / Cashier',
    desc: 'Fast billing for walk-in customers and daily sales.',
  },
  {
    num: '02',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    title: 'Invoices',
    desc: 'Create, print, send, track payments and reminders.',
  },
  {
    num: '03',
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    title: 'Inventory',
    desc: 'Manage stock, products, prices and low stock alerts.',
  },
  {
    num: '04',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: 'Customers & Follow Ups',
    desc: 'CRM, leads, follow-ups, calls, WhatsApp and payment follow-ups.',
  },
  {
    num: '05',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    title: 'Employees',
    desc: 'Manage staff, departments, tasks, permissions and profiles.',
  },
  {
    num: '06',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    title: 'Leave Requests',
    desc: 'Track leave, approvals, leave types and balance.',
  },
  {
    num: '07',
    icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
    title: 'Payroll',
    desc: 'Salary, attendance, LOP, OT, allowances, deductions and payslips.',
  },
  {
    num: '08',
    icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    title: 'Reports',
    desc: 'Business, sales, inventory, employee and payroll reports.',
  },
  {
    num: '09',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2"/>',
    title: 'Settings',
    desc: 'Company, invoice, print, payment and system settings.',
  },
  {
    num: '10',
    icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    title: 'Admin / Tenants',
    desc: 'Manage tenants and multi-company configurations.',
  },
]

// ── Screenshot slide data ─────────────────────────────────────────────────────

const screenshotSlides = [
  {
    id: 'dashboard',
    image: '/images/products/dashboard.png',
    title: 'Dashboard',
    subtitle: 'Business Overview',
    desc: 'Get a complete view of your business — revenue, invoices, pending payments, and top customers at a glance.',
    features: ['Real-time revenue summary', 'Pending & overdue invoices', 'Top customers at a glance', 'Quick access to all modules'],
    accent: '#ef4444',
  },
  {
    id: 'pos',
    image: '/images/products/pos.png',
    title: 'POS / Cashier',
    subtitle: 'Point of Sale',
    desc: 'Fast and smooth billing for walk-in customers. Add products, apply discounts, and print receipts in seconds.',
    features: ['Quick product search & barcode', 'Discount and tax support', 'Print or WhatsApp receipt', 'Daily cashier summary'],
    accent: '#0ea5e9',
  },
  {
    id: 'invoices',
    image: '/images/products/invoices.png',
    title: 'Invoices',
    subtitle: 'Invoice Management',
    desc: 'Create, print, send, and track all your invoices. Follow up on payments via WhatsApp with one click.',
    features: ['Professional invoice templates', 'Payment status tracking', 'PDF download & WhatsApp share', 'Automatic payment reminders'],
    accent: '#ef4444',
  },
  {
    id: 'inventory',
    image: '/images/products/inventory.png',
    title: 'Inventory',
    subtitle: 'Stock Management',
    desc: 'Manage your products, stock levels, and pricing. Get low-stock alerts before you run out.',
    features: ['Real-time stock tracking', 'Low stock alerts', 'Product categories & pricing', 'Stock adjustment history'],
    accent: '#7c3aed',
  },
  {
    id: 'customers',
    image: '/images/products/customers.png',
    title: 'Customers & Follow Ups',
    subtitle: 'Customer Management',
    desc: 'Track all your customers, manage follow-ups, calls, and pending payments from one place.',
    features: ['Customer profiles & history', 'Follow-up & call reminders', 'WhatsApp quick contact', 'Outstanding balance tracking'],
    accent: '#0ea5e9',
  },
  {
    id: 'employees',
    image: '/images/products/employees.png',
    title: 'Employees',
    subtitle: 'HR Management',
    desc: 'Manage staff profiles, departments, roles, permissions, and attendance all from one screen.',
    features: ['Staff profiles & documents', 'Department & role management', 'Attendance & leave tracking', 'Access permissions per role'],
    accent: '#ef4444',
  },
  {
    id: 'payroll',
    image: '/images/products/payroll.png',
    title: 'Payroll',
    subtitle: 'Salary & Payslips',
    desc: 'Calculate and process salaries, deductions, OT, and allowances. Generate payslips instantly.',
    features: ['Automated salary calculation', 'LOP, OT & allowance support', 'Payslip PDF generation', 'Month-wise payroll history'],
    accent: '#7c3aed',
  },
  {
    id: 'reports',
    image: '/images/products/reports.png',
    title: 'Reports',
    subtitle: 'Business Analytics',
    desc: 'Get clear business analytics — sales, expenses, profit, inventory movement, and employee performance.',
    features: ['Sales & revenue reports', 'Expense & profit analysis', 'Inventory movement report', 'Employee & payroll summary'],
    accent: '#0ea5e9',
  },
  {
    id: 'settings',
    image: '/images/products/settings.png',
    title: 'Settings',
    subtitle: 'System Configuration',
    desc: 'Configure your company details, invoice templates, print settings, payment options, and more.',
    features: ['Company & branch settings', 'Invoice & print configuration', 'Payment method setup', 'User roles & permissions'],
    accent: '#ef4444',
  },
  {
    id: 'updates',
    image: '/images/products/updates.png',
    title: 'Updates',
    subtitle: 'Software Updates',
    desc: 'Stay up to date with the latest ATS Software features, improvements, and bug fixes.',
    features: ['Latest feature releases', 'Bug fix notifications', 'Version history', 'Auto-update support'],
    accent: '#0ea5e9',
  },
]

// ── ScreenImage — renders screenshot with fallback placeholder ────────────────

function ScreenImage({ src, alt }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{ background: '#07101f' }}
      >
        <div
          className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m3 9 5-5 4 4 3-3 5 5" />
            <circle cx="7.5" cy="7.5" r="1.5" fill="rgba(255,255,255,0.18)" stroke="none" />
          </svg>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-600">
          Screenshot coming soon
        </span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover object-top"
      onError={() => setErrored(true)}
      loading="lazy"
    />
  )
}

// ── ScreenshotShowcase — pinned 2-column scroll with reactive details ─────────

function ScreenshotShowcase({ slides }) {
  const container = useRef(null)
  const imgRefs   = useRef([])
  const [activeIdx, setActiveIdx] = useState(0)
  const activeRef = useRef(0)

  useGSAP(
    () => {
      if (window.innerWidth < 1024) return   // mobile/tablet uses tap-nav instead
      const els   = imgRefs.current.filter(Boolean)
      const total = els.length
      if (total === 0) return

      gsap.set(els, { force3D: true, z: 0.01 })
      gsap.set(els[0], { yPercent: 0, scale: 1, opacity: 1 })
      for (let i = 1; i < total; i++) {
        gsap.set(els[i], { yPercent: 110, scale: 1, opacity: 0 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${window.innerHeight * total}`,
          pin: true,
          scrub: 0.35,
          pinSpacing: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const raw = self.progress * (total - 1)
            const idx = Math.min(Math.floor(raw + 0.5), total - 1)
            if (idx !== activeRef.current) {
              activeRef.current = idx
              setActiveIdx(idx)
            }
          },
        },
      })

      for (let i = 0; i < total - 1; i++) {
        tl.to(els[i],     { scale: 0.88, opacity: 0.5, duration: 1, ease: 'none', force3D: true }, i)
        tl.to(els[i + 1], { yPercent: 0, opacity: 1,   duration: 1, ease: 'none', force3D: true }, i)
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh())
      if (container.current) ro.observe(container.current)

      return () => {
        ro.disconnect()
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    },
    { scope: container, dependencies: [slides.length] }
  )

  const slide = slides[activeIdx]

  return (
    <div ref={container} className="relative w-full h-screen">
      <div className="relative flex h-screen w-full items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-14 items-center h-full py-16">

          {/* Left: stacked image frames */}
          <div
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{ perspective: '1200px' }}
          >
            {slides.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                ref={(el) => { imgRefs.current[i] = el }}
              >
                <ScreenImage src={s.image} alt={s.title} />
              </div>
            ))}

            {/* Progress dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 pointer-events-none">
              {slides.map((s, i) => (
                <span
                  key={s.id}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width:      i === activeIdx ? '20px' : '6px',
                    height:     '6px',
                    background: i === activeIdx ? slide.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: reactive details panel — key forces remount → anim-fade-up replays */}
          <div key={activeIdx} className="anim-fade-up flex flex-col gap-5 lg:gap-6">
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                style={{ color: slide.accent }}
              >
                {String(activeIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} — {slide.subtitle}
              </div>
              <h3 className="font-display text-[28px] md:text-[34px] lg:text-[40px] font-medium text-white leading-[1.05]">
                {slide.title}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] text-slate-400 leading-relaxed">
                {slide.desc}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              {slide.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-3 text-[13.5px] text-slate-300">
                  <span
                    className="mt-[3px] flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: `${slide.accent}22`, color: slide.accent }}
                  >
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              <span>Scroll to explore</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── ScreenshotShowcaseMobile — tap-nav for mobile/tablet (<1024px) ───────────

function ScreenshotShowcaseMobile({ slides }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const slide = slides[activeIdx]

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto px-4 md:px-6">
      {/* Main screenshot */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)]">
        <ScreenImage src={slide.image} alt={slide.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65 bg-black/40 backdrop-blur-sm rounded px-2 py-1">
          {String(activeIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} — {slide.subtitle}
        </div>
        <div className="absolute bottom-3.5 right-3 flex items-center gap-1.5 pointer-events-none">
          {slides.map((s, i) => (
            <span
              key={s.id}
              className="block rounded-full transition-all duration-300"
              style={{
                width:      i === activeIdx ? '16px' : '5px',
                height:     '5px',
                background: i === activeIdx ? slide.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal thumbnail strip */}
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-2 pb-1 w-max">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              aria-label={s.title}
              style={{ width: '110px', aspectRatio: '16/9' }}
              className={`flex-shrink-0 relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeIdx
                  ? 'border-[var(--cyan)] shadow-[0_0_10px_rgba(14,165,233,0.4)]'
                  : 'border-white/[0.07] opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover object-top"
                onError={e => { e.target.style.opacity = '0.2' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details — key forces remount so anim-fade-up replays */}
      <div key={activeIdx} className="anim-fade-up flex flex-col gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: slide.accent }}>
          {slide.subtitle}
        </div>
        <h3 className="font-display text-[24px] sm:text-[28px] md:text-[34px] font-medium text-white leading-tight">
          {slide.title}
        </h3>
        <p className="text-[13.5px] sm:text-[14px] text-slate-400 leading-relaxed">{slide.desc}</p>
        <ul className="flex flex-col gap-2.5 mt-1">
          {slide.features.map((f, fi) => (
            <li key={fi} className="flex items-start gap-3 text-[13px] sm:text-[13.5px] text-slate-300">
              <span
                className="mt-[3px] flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: `${slide.accent}22`, color: slide.accent }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const bestFor = [
  {
    label: 'Retail Shops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=75',
    icon: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  },
  {
    label: 'Service Businesses',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=75',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
  {
    label: 'Water Purifier Companies',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=75',
    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  },
  {
    label: 'Small Offices',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=75',
    icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  },
  {
    label: 'Agencies',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=75',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {
    label: 'Distributors',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=75',
    icon: '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>',
  },
  {
    label: 'Manufacturing Units',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=75',
    icon: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>',
  },
  {
    label: 'Multi-branch Businesses',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=75',
    icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
  },
]

const benefits = [
  'Saves daily manual work',
  'Tracks customers and follow-ups',
  'Improves billing and payment control',
  'Helps manage staff and payroll',
  'Gives business reports',
  'Supports print, PDF and WhatsApp',
  'Customizable invoice settings',
  'Suitable for different business types',
]

export default function OurProducts() {
  usePageEffects()

  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  )
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8 overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="/ Our Products"
        title={`ATS Software –<br/><span class="gradient-text-red">Complete Modular ERP Solution.</span>`}
        subtitle="Manage billing, inventory, customers, employees, payroll, reports, settings, and business operations in one powerful platform."
        gradient="radial-gradient(circle at 70% 20%, rgba(239,68,68,0.25), transparent 50%), radial-gradient(circle at 20% 80%, rgba(14,165,233,0.18), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* ── Hero CTA Buttons + Badge ──────────────────────────────────────── */}
      <div className="reveal w-full max-w-[1400px] mx-auto mt-6 sm:mt-8 px-4 md:px-6 flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center">
          <a href="#tutorial-video" className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2">
            <PlayIcon /> Watch Tutorial
          </a>
          <Link to="/contact" className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-1.5">
            Request Demo <ChevronRight />
          </Link>
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-slate-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--red)]" />
          Built by AGZUS Technology Solutions
        </div>
      </div>

      {/* ── Tutorial Video Section ────────────────────────────────────────── */}
      <section id="tutorial-video" className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal mb-8 md:mb-10 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 01 — Tutorial</div>
          <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05]">
            Watch ATS Software Tutorial
          </h2>
          <p className="mt-4 max-w-[600px] mx-auto text-[13px] sm:text-[14px] md:text-[15px] text-slate-400 leading-relaxed">
            See how ATS Software helps you manage your entire business in a simple and efficient way.
          </p>
        </div>

        {/* Video card */}
        <div
          className="reveal card-glow overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[36px] aspect-video"
          style={{ background: '#000' }}
        >
          <video
            src="/videos/ats-software-tutorial.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Tamil + English Demo Message near video */}
        <div className="reveal mt-6 sm:mt-8 rounded-[16px] border border-[var(--red)]/25 bg-[var(--red)]/[0.04] p-5 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-7 items-start">
            <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center text-[var(--red)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-display text-[15px] sm:text-[17px] md:text-[18px] font-medium text-white leading-snug">
                Need a live demo? We explain everything in Tamil and English.
              </p>
              <p className="mt-2.5 text-[13px] sm:text-[14px] text-slate-400 leading-relaxed">
                உங்கள் வசதிக்காக, நாங்கள் தமிழிலும் ஆங்கிலத்திலும் டெமோ மற்றும் விளக்கத்தை வழங்குகிறோம்.
              </p>
              <p className="mt-1.5 text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                ATS Software-இன் ஒவ்வொரு அம்சத்தையும் தமிழில் தெளிவாக விளக்கித் தருவோம்.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATS Software Modules ─────────────────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal flex items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 02 — Modules</div>
            <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-medium tracking-tight text-white mt-3 max-w-[720px] leading-[1.05]">
              Everything your business needs,{' '}
              <span className="gradient-text-red">in one platform.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {modules.map((mod, i) => (
            <div
              key={mod.num}
              className={`reveal${i % 3 !== 0 ? ` delay-${(i % 3) * 100}` : ''} tilt card-glow p-5 sm:p-8`}
            >
              <div className="tilt-inner">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 flex items-center justify-center text-[var(--red)] bg-white/[0.03]">
                    <svg
                      width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="1.7"
                      dangerouslySetInnerHTML={{ __html: mod.icon }}
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{mod.num}</span>
                </div>
                <h3 className="font-display text-[18px] sm:text-[20px] font-medium text-white mb-2 sm:mb-3">{mod.title}</h3>
                <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-slate-400">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Software Screenshots — heading ───────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ 03 — Screenshots</div>
          <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[720px]">
            Software{' '}
            <span className="gradient-text-cyan">Screenshots.</span>
          </h2>
          <p className="mt-4 text-[13px] sm:text-[14px] text-slate-500 leading-relaxed max-w-[500px]">
            Explore important screens from ATS Software —{' '}
            {isNarrow ? 'tap a thumbnail to see each module in detail.' : 'scroll to see each module in detail.'}
          </p>
        </div>
      </section>

      {/* ── Screenshot Showcase — desktop GSAP / mobile tap-nav ─────────── */}
      <div className="w-full mt-6 sm:mt-8">
        {isNarrow
          ? <ScreenshotShowcaseMobile slides={screenshotSlides} />
          : <ScreenshotShowcase slides={screenshotSlides} />
        }
      </div>

      {/* ── Tamil / English demo strip ────────────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-6 sm:mt-8 px-4 md:px-6">
        <div className="reveal flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[var(--cyan)]/20 bg-[var(--cyan)]/[0.03] px-5 sm:px-6 py-5">
          <div className="text-center sm:text-left">
            <p className="text-[14px] sm:text-[15px] font-medium text-white">Interested in a live walkthrough?</p>
            <p className="mt-1 text-[12px] sm:text-[13px] text-slate-500">
              தமிழிலும் ஆங்கிலத்திலும் நேரடி டெமோ கிடைக்கும்.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${tamilMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 text-[13px]"
            >
              <WhatsAppIcon /> Tamil Demo
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${englishMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-2 text-[13px]"
            >
              <WhatsAppIcon /> English Demo
            </a>
          </div>
        </div>
      </section>

      {/* ── Demo Available in Tamil & English ────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal relative rounded-[20px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden border border-[var(--red)]/20 bg-[var(--bg-card)] p-6 sm:p-10 md:p-16 text-center">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
          <div className="relative z-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)] mb-4">/ 04 — மொழி ஆதரவு</div>
            <h2 className="font-display text-[24px] sm:text-[30px] md:text-[40px] lg:text-[52px] font-medium tracking-tight text-white leading-[1.05]">
              Demo Available in{' '}
              <span className="gradient-text-red">தமிழ் &amp; English</span>
            </h2>
            <p className="mt-5 sm:mt-6 max-w-[640px] mx-auto text-[13.5px] sm:text-[15px] md:text-[16px] text-slate-300 leading-relaxed">
              We provide a complete live demo and explanation in both தமிழ் and English, so you can understand every feature clearly before using the software.
            </p>
            <p className="mt-3 max-w-[560px] mx-auto text-[13px] sm:text-[14px] text-slate-500 leading-relaxed">
              உங்கள் வசதிக்காக, நாங்கள் தமிழ் மற்றும் English ஆகிய இரண்டு மொழிகளிலும் முழுமையான டெமோ மற்றும் விளக்கத்தை வழங்குகிறோம். ATS Software-இன் ஒவ்வொரு அம்சத்தையும் எளிமையாகவும் தெளிவாகவும் விளக்கித் தருகிறோம்.
            </p>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${tamilMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon /> Book தமிழ் Demo
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${englishMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon /> Book English Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best For ─────────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal mb-8 md:mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ 05 — Ideal For</div>
          <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[720px]">
            Best for{' '}
            <span className="gradient-text-cyan">every business type.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {bestFor.map((item, i) => (
            <div
              key={item.label}
              className={`reveal${i % 4 !== 0 ? ` delay-${Math.min((i % 4) * 100, 300)}` : ''} group relative min-h-[150px] sm:min-h-[170px] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/60 bg-gradient-to-br from-slate-50 to-sky-50/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]`}
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              {/* Background image via CSS — no CORS issues, degrades to gradient if image fails */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {/* White overlays for light glass effect */}
              <div className="absolute inset-0 bg-white/65" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/50 to-white/25" />
              {/* Content */}
              <div className="relative z-10 flex flex-col gap-8 sm:gap-10 p-5 sm:p-6">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 shadow-sm backdrop-blur-sm flex-shrink-0">
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="#0ea5e9" strokeWidth="1.7"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </div>
                <div className="font-display text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal mb-8 md:mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)]">/ 06 — Benefits</div>
          <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] lg:text-[56px] font-medium tracking-tight text-white mt-3 leading-[1.05] max-w-[720px]">
            Why businesses{' '}
            <span className="gradient-text-red">choose ATS Software.</span>
          </h2>
        </div>
        <div className="reveal flex flex-wrap gap-2.5 sm:gap-3">
          {benefits.map((b) => (
            <span
              key={b}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.05] border border-white/10 text-slate-200 text-[13px] sm:text-[14px] hover:border-[var(--red)]/40 hover:bg-[var(--red)]/[0.06] transition-colors duration-300 cursor-default"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--red)] flex-shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-14 sm:mt-20 lg:mt-32 px-4 md:px-6">
        <div className="reveal relative rounded-[20px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/[0.06] bg-[var(--bg-card)] p-6 sm:p-10 md:p-16 text-center">
          <div className="aurora" />
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
          <div className="relative z-10">
            <h2 className="font-display text-[24px] sm:text-[30px] md:text-[40px] lg:text-[52px] font-medium tracking-tight text-white leading-[1.05]">
              Ready to use ATS Software{' '}
              <span className="gradient-text-red">for your business?</span>
            </h2>
            <p className="mt-5 sm:mt-6 max-w-[540px] mx-auto text-[13.5px] sm:text-[15px] md:text-[16px] text-slate-300 leading-relaxed">
              Get a personalized demo and learn how ATS Software can be customized for your company.
            </p>
            <p className="mt-2 text-[12px] sm:text-[13px] text-slate-500 font-mono tracking-wide">
              தமிழிலும் ஆங்கிலத்திலும் முழு டெமோ கிடைக்கும்.
            </p>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              <Link to="/contact" className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-1.5">
                Request Demo <ChevronRight />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-1.5">
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${ctaMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
