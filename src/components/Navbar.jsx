import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const navLinks = [
  { to: '/services',      label: 'Services' },
  { to: '/solutions',     label: 'Solutions' },
  { to: '/our-products',  label: 'Our Products' },
  { to: '/case-studies',  label: 'Work' },
  { to: '/about',         label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key closes menu
  useEffect(() => {
    if (!open) return
    const handle = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open])

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav-pill">
          <Link to="/" className="nav-logo" aria-label="AGZUS home">
            <img src="/logo.png" alt="ATS" />
          </Link>

          {/* Desktop links — hidden on mobile */}
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link hidden md:block${pathname === to ? ' is-active' : ''}`}
            >
              {label}
            </Link>
          ))}

          {/* Desktop CTA — hidden on mobile */}
          <Link to="/contact" className="nav-cta hidden md:inline-flex">
            Get in touch
            <ChevronRight />
          </Link>

          {/* Mobile hamburger — hidden on desktop */}
          <button
            className="nav-hamburger md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`nav-ham-line${open ? ' open' : ''}`} />
            <span className={`nav-ham-line mid${open ? ' open' : ''}`} />
            <span className={`nav-ham-line${open ? ' open' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-up sheet */}
      <div className={`nav-mobile-sheet${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="nav-mobile-handle" />
        <nav>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-mobile-link${pathname === to ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-mobile-divider" />
        <Link
          to="/contact"
          className="btn-primary"
          style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '12px', gap: '6px' }}
          onClick={() => setOpen(false)}
        >
          Get in touch <ChevronRight />
        </Link>
      </div>
    </>
  )
}
