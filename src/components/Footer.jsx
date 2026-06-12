import { Link } from 'react-router-dom'
import { contactInfo } from '../data/contact'

export default function Footer() {
  return (
    <footer className="footer mt-32 w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-12 gap-12 md:gap-14">

        {/* BRAND */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-sm flex-shrink-0">
              <img src="/logo.png" alt="AGZUS" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display text-white text-[22px] font-semibold tracking-tight">AGZUS</div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">Technology Solutions</div>
            </div>
          </div>
          <p className="mt-8 text-[15px] text-slate-400 max-w-[400px] leading-[1.75]">
            Engineering the foundation of a modern, intelligent enterprise.
            Designed in Bengaluru, shipped to the world.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* COMPANY */}
        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-6">Company</div>
          <ul className="space-y-4 text-[15px] text-slate-300">
            <li><Link className="hover:text-white transition-colors" to="/about">About</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/careers">Careers</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/blog">Blog</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* PRACTICE */}
        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-6">Practice</div>
          <ul className="space-y-4 text-[15px] text-slate-300">
            <li><Link className="hover:text-white transition-colors" to="/services">Services</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/solutions">Solutions</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/case-studies">Case studies</Link></li>
          </ul>
        </div>

        {/* REACH US */}
        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-6">Reach us</div>
          <ul className="space-y-4 text-[15px] text-slate-300">
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                {contactInfo.phone}
              </a>
            </li>
            <li className="text-[14px] leading-relaxed text-slate-400">{contactInfo.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="footer-bottom-row max-w-[1400px] mx-auto px-6 md:px-12 pt-7 pb-24 md:pb-7 flex items-center justify-between gap-4 text-[13px] text-slate-500">
          <div>© 2026 AGZUS Technology Solutions. All rights reserved.</div>
          <div className="font-mono uppercase tracking-[0.2em]">v2026.05</div>
        </div>
      </div>
    </footer>
  )
}
