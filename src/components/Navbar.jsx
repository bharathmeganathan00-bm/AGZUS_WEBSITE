import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const navLinks = [
  { to: '/services',     label: 'Services' },
  { to: '/solutions',    label: 'Solutions' },
  { to: '/case-studies', label: 'Work' },
  { to: '/about',        label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Close on route change or Escape
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Mobile slide-up menu ── */}
      {open && (
        <>
          <div
            className="nav-mobile-backdrop md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="nav-mobile-sheet md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="nav-mobile-handle" />
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-mobile-link${pathname === to ? ' is-active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="nav-mobile-divider" />
            <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 w-full">
              Get in touch <ChevronRight />
            </Link>
          </div>
        </>
      )}

      {/* ── Floating pill ── */}
      <div className="nav-wrap">
        <nav className="nav-pill" aria-label="Main navigation">
          <Link to="/" className="nav-logo" aria-label="AGZUS home">
            <img src="/logo.png" alt="ATS" />
          </Link>

          {/* Desktop nav links */}
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link hidden md:block${pathname === to ? ' is-active' : ''}`}
            >
              {label}
            </Link>
          ))}

          {/* Desktop CTA */}
          <Link to="/contact" className="nav-cta hidden md:inline-flex">
            Get in touch <ChevronRight />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </nav>
      </div>
    </>
  )
}
