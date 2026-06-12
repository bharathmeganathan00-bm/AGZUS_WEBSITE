import { Link, useLocation } from 'react-router-dom'

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const navLinks = [
  { to: '/services',      label: 'Services' },
  { to: '/solutions',     label: 'Solutions' },
  { to: '/case-studies',  label: 'Work' },
  { to: '/about',         label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <div className="nav-wrap">
      <nav className="nav-pill">
        <Link to="/" className="nav-logo" aria-label="AGZUS home">
          <img src="/logo.png" alt="ATS" />
        </Link>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link${pathname === to ? ' is-active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/contact" className="nav-cta">
          Get in touch
          <ChevronRight />
        </Link>
      </nav>
    </div>
  )
}
