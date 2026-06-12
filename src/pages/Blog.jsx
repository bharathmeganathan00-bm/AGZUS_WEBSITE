import { useState } from 'react'
import { usePageEffects } from '../hooks/usePageEffects'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'
import MagicBlogCard from '../components/MagicBlogCard'
import { featuredPost, posts, categories } from '../data/blog'

export default function Blog() {
  usePageEffects()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      <PageHero
        eyebrow="/ Insights"
        title={`Field notes from the<br/><span class="gradient-text-red">engineering bench.</span>`}
        subtitle="Writing about platforms we build, decisions we got wrong, and patterns we've seen working at scale."
        gradient="radial-gradient(circle at 30% 30%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(239,68,68,0.20), transparent 55%), rgba(5,9,23,0.7)"
      />

      {/* FEATURED POST */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-24 px-4 md:px-6">
        <a href="#" className="theme-dark reveal card-glow overflow-hidden block group min-h-[280px] md:h-[480px] relative">
          <div className="absolute inset-0">
            <div
              className="w-full h-full"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.35), transparent 55%), rgba(5,9,23,0.7)" }}
            />
            <div className="absolute inset-0 bg-grid opacity-30" />
          </div>
          <div className="relative flex flex-col justify-between gap-6 p-6 sm:p-10 md:p-14" style={{ minHeight: 'inherit' }}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300">
                / Featured · {featuredPost.category} · {featuredPost.readTime}
              </span>
            </div>
            <div>
              <h2 className="font-display text-[32px] md:text-[44px] font-medium text-white leading-[1.1] max-w-[820px]">
                {featuredPost.title}
              </h2>
              <p className="mt-5 text-[14.5px] text-slate-300 max-w-[640px]">{featuredPost.excerpt}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full" style={{ background: featuredPost.authorGradient }} />
                <div>
                  <div className="text-white text-[13px] font-medium">{featuredPost.author}</div>
                  <div className="text-slate-400 text-[11.5px]">{featuredPost.date}</div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* POST GRID */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-12 px-4 md:px-6">
        <div className="reveal flex items-center gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition ${
                activeCategory === cat
                  ? 'bg-white/[0.08] border border-white/15 text-white'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <MagicBlogCard
              key={post.title}
              post={post}
              delay={i % 3 !== 0 ? ` delay-${(i % 3) * 100}` : ''}
            />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative w-full max-w-[1400px] mx-auto mt-32 px-4 md:px-6">
        <div className="reveal relative rounded-[40px] overflow-hidden border border-white/[0.06] bg-[var(--bg-card)] p-10 md:p-16">
          <div className="aurora" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--cyan)]">/ Newsletter</div>
              <h2 className="font-display text-[36px] md:text-[44px] font-medium tracking-tight text-white mt-3 leading-[1.05]">
                Field notes, <span className="gradient-text-red">monthly.</span>
              </h2>
              <p className="mt-4 text-[14px] text-slate-400 max-w-[440px] leading-relaxed">
                Long-form essays, runbooks and the occasional architecture diagram — one email a month.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-5 py-3.5 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition"
              />
              <button className="btn-primary inline-flex items-center justify-center gap-1.5 sm:flex-shrink-0">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
