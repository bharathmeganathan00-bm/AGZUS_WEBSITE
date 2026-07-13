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
              <div className="font-display text-white text-[15px] font-medium">AG<span className="text-[var(--red)]">Z</span>US</div>
              <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">Technology Solutions</div>
            </div>
          </div>
          <p className="mt-6 text-[13.5px] text-slate-400 max-w-[360px] leading-relaxed">
            Engineering the foundation of a modern, intelligent enterprise. Designed in Bengaluru, shipped to the world.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            <a href="https://www.linkedin.com/company/agzus-technology-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61591345203493" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/agzus_technology_solutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://wa.me/918015334468" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
               className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/[0.06] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
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
