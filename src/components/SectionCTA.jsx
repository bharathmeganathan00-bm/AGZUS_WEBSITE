import { Link } from 'react-router-dom'

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

export default function SectionCTA({ title, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
      <div className="reveal relative rounded-[40px] overflow-hidden border border-white/[0.06] bg-[var(--bg-card)] p-10 md:p-16 text-center">
        <div className="aurora" />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="relative">
          <h2
            className="font-display text-[36px] md:text-[52px] font-medium tracking-tight text-white leading-[1.05]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
            <Link to={primaryTo} className="btn-primary inline-flex items-center gap-1.5">
              {primaryLabel}
              <ChevronRight />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="btn-ghost">{secondaryLabel}</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
