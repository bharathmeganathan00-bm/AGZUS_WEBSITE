import { Link } from 'react-router-dom'
import { contactInfo } from '../data/contact'

export default function Footer() {
  return (
    <footer className="footer mt-32 w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-2 md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-1.5 flex items-center justify-center">
              <img src="/logo.png" alt="AGZUS" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display text-white text-[15px] font-medium">AGZUS</div>
              <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">Technology Solutions</div>
            </div>
          </div>
          <p className="mt-6 text-[13.5px] text-slate-400 max-w-[360px] leading-relaxed">
            Engineering the foundation of a modern, intelligent enterprise. Designed in Bengaluru, shipped to the world.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-4">Company</div>
          <ul className="space-y-2.5 text-[13.5px] text-slate-300">
            <li><Link className="hover:text-white transition" to="/about">About</Link></li>
            <li><Link className="hover:text-white transition" to="/careers">Careers</Link></li>
            <li><Link className="hover:text-white transition" to="/blog">Blog</Link></li>
            <li><Link className="hover:text-white transition" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-4">Practice</div>
          <ul className="space-y-2.5 text-[13.5px] text-slate-300">
            <li><Link className="hover:text-white transition" to="/services">Services</Link></li>
            <li><Link className="hover:text-white transition" to="/solutions">Solutions</Link></li>
            <li><Link className="hover:text-white transition" to="/case-studies">Case studies</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-4">Reach us</div>
          <ul className="space-y-2.5 text-[13.5px] text-slate-300">
            <li><a href={`mailto:${contactInfo.email}`} className="hover:text-white transition">{contactInfo.email}</a></li>
            <li><a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-white transition">{contactInfo.phone}</a></li>
            <li>{contactInfo.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 pb-24 md:pb-6 flex items-center justify-between flex-wrap gap-3 text-[12px] text-slate-500">
          <div>© 2026 AGZUS Technology Solutions. All rights reserved.</div>
          <div className="font-mono uppercase tracking-[0.2em]">v2026.05</div>
        </div>
      </div>
    </footer>
  )
}
