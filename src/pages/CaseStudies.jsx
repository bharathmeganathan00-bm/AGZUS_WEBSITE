import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { usePageEffects } from '../hooks/usePageEffects'
import Footer from '../components/Footer'
import { caseStudies, filterCategories } from '../data/caseStudies'

// ── Icons ─────────────────────────────────────────────────────────────────────

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
)

const ChevLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
)

const ChevRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, isSelected, onView }) {
  const [imgErr,    setImgErr]    = useState(false)
  const [hovered,   setHovered]   = useState(false)
  const cardRef = useRef(null)

  const onMouseMove = useCallback(e => {
    const card = cardRef.current
    if (!card) return
    const r  = card.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width  - 0.5   // -0.5 → 0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5
    card.style.transform = `perspective(900px) rotateX(${ny * -6}deg) rotateY(${nx * 6}deg) translateY(-6px) scale(1.01)`
    card.style.transition = 'transform 0.1s ease'
    card.style.setProperty('--gx', `${(e.clientX - r.left) / r.width  * 100}%`)
    card.style.setProperty('--gy', `${(e.clientY - r.top)  / r.height * 100}%`)
  }, [])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
    card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.3s ease'
    setHovered(false)
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={() => onView(project)}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{ '--gx': '50%', '--gy': '50%', willChange: 'transform', transformStyle: 'preserve-3d' }}
      className={`group relative bg-white rounded-2xl overflow-hidden border cursor-pointer flex flex-col active:scale-[0.98] ${
        isSelected
          ? 'border-[var(--red)] shadow-[0_14px_44px_-12px_rgba(239,68,68,0.32)]'
          : 'border-black/[0.08] shadow-[0_2px_14px_-4px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Mouse-tracked radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 180px at var(--gx) var(--gy), rgba(239,68,68,0.11), transparent 70%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Shine sweep on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] rounded-2xl overflow-hidden"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <div
          style={{
            position: 'absolute', top: '-60%', left: '-60%',
            width: '40%', height: '220%',
            background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.18), transparent)',
            transform: 'rotate(25deg)',
            animation: hovered ? 'work-card-shine 0.7s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          }}
        />
      </div>

      {/* Screenshot */}
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: '16/10' }}>
        <img
          src={imgErr ? project.imgFallback : project.img}
          alt={project.title}
          loading="lazy"
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Hover overlay — "View Details" pill */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: 'rgba(0,0,0,0.38)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="flex items-center gap-2 bg-white text-[var(--red)] text-[12.5px] font-semibold px-4 py-2 rounded-full shadow-lg transition-transform duration-300"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
          >
            View Details <ArrowUpRight />
          </div>
        </div>

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[var(--red)] text-white text-[9px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full shadow">
              Viewing
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-[var(--red)]/[0.07] text-[var(--red)] text-[10.5px] font-semibold">
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display text-[17px] font-semibold text-[var(--t-1)] leading-snug mb-1.5">
          {project.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[12.5px] text-[var(--t-3)] leading-relaxed mb-4 flex-1 line-clamp-2">
          {project.excerpt}
        </p>

        {/* View indicator */}
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--red)] transition-all duration-200"
          style={{ gap: hovered ? '10px' : '6px' }}
        >
          View project <ArrowUpRight />
        </div>
      </div>
    </div>
  )
}

// ── Project Details Panel ─────────────────────────────────────────────────────

function ProjectDetails({ project }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div className="bg-white rounded-[20px] md:rounded-[28px] border border-black/[0.07] shadow-[0_4px_28px_-8px_rgba(0,0,0,0.10)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT — Screenshot + thumbnail strip */}
        <div className="bg-slate-50/80 border-b md:border-b-0 md:border-r border-black/[0.06] p-6 md:p-8 flex flex-col gap-4">

          {/* Main image */}
          <div
            className="relative rounded-2xl overflow-hidden border border-black/[0.07] shadow-sm bg-white"
            style={{ aspectRatio: '16/10' }}
          >
            <img
              src={imgErr ? project.imgFallback : project.img}
              alt={project.title}
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail strip + arrows */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border border-black/[0.12] bg-white flex items-center justify-center text-[var(--t-3)] hover:border-[var(--red)] hover:text-[var(--red)] transition-colors flex-shrink-0">
              <ChevLeft />
            </button>

            <div className="flex gap-2 flex-1 min-w-0">
              <div
                className="relative rounded-lg overflow-hidden border-2 border-[var(--red)] shadow-sm flex-shrink-0 cursor-pointer"
                style={{ width: 82, height: 54 }}
              >
                <img
                  src={imgErr ? project.imgFallback : project.img}
                  alt=""
                  onError={() => setImgErr(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button className="w-8 h-8 rounded-full border border-black/[0.12] bg-white flex items-center justify-center text-[var(--t-3)] hover:border-[var(--red)] hover:text-[var(--red)] transition-colors flex-shrink-0">
              <ChevRight />
            </button>
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="p-6 md:p-8 flex flex-col gap-5 md:overflow-y-auto md:max-h-[660px]">

          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-[var(--red)]/[0.07] border border-[var(--red)]/20 text-[var(--red)] text-[11px] font-semibold tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title + description */}
          <div>
            <h2 className="font-display text-[24px] md:text-[28px] font-semibold text-[var(--t-1)] leading-tight tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2.5 text-[14px] text-[var(--t-3)] leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--red)] text-white text-[13px] font-semibold hover:bg-red-600 transition-colors shadow-sm"
            >
              Visit live site <ArrowUpRight />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.12] text-[var(--t-2)] text-[13px] font-semibold hover:border-[var(--red)]/40 hover:text-[var(--red)] transition-colors"
            >
              View case study
            </Link>
          </div>

          {/* Client / Industry / Year */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-black/[0.06]">
            {[
              { label: 'Client',   value: project.authorName },
              { label: 'Industry', value: project.category },
              { label: 'Year',     value: project.year },
            ].map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--t-4)] mb-1">
                  {label}
                </div>
                <div className="text-[13px] font-semibold text-[var(--t-1)] leading-snug truncate">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Project Overview */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--t-4)] mb-2">
              Project Overview
            </div>
            <p className="text-[13.5px] text-[var(--t-3)] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* What We Did */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--t-4)] mb-3">
              What We Did
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {project.whatWeDid.map(item => (
                <div key={item} className="flex items-center gap-2 text-[12.5px] text-[var(--t-2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--t-4)] mb-2.5">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-black/[0.04] border border-black/[0.07] text-[12px] font-mono text-[var(--t-2)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CaseStudies() {
  usePageEffects()

  const [activeFilter, setActiveFilter]     = useState('All work')
  const [selected,     setSelected]         = useState(caseStudies[1]) // Spagglobal default
  const detailsRef = useRef(null)

  const filtered = activeFilter === 'All work'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === activeFilter)

  const handleView = project => {
    setSelected(project)
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto mt-6 px-4 md:px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)] mb-3">
          / Our Portfolio
        </div>
        <h1 className="font-display text-[40px] md:text-[60px] font-medium tracking-tight text-[var(--t-1)] leading-[1.04]">
          All Work Projects
        </h1>
        <p className="mt-4 text-[15px] text-[var(--t-3)] max-w-[560px] leading-relaxed">
          Explore a selection of websites, platforms and digital products we've designed and developed.
        </p>
      </section>

      {/* ── FILTER BUTTONS ───────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1400px] mx-auto mt-10 px-4 md:px-6">
        <div className="flex flex-wrap gap-2">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-white border-2 border-[var(--red)] text-[var(--red)]'
                  : 'bg-white/70 border border-black/[0.10] text-[var(--t-3)] hover:border-black/20 hover:text-[var(--t-1)]'
              }`}
            >
              {cat === 'All work' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── PROJECT GRID ─────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto mt-8 px-4 md:px-6">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[var(--t-3)] text-[14px]">
            No projects in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(cs => (
              <ProjectCard
                key={cs.href}
                project={cs}
                isSelected={selected?.href === cs.href}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── CURRENT PROJECT DETAILS ──────────────────────────────────────────── */}
      <section
        ref={detailsRef}
        id="project-details"
        className="w-full max-w-[1400px] mx-auto mt-10 md:mt-16 px-4 md:px-6 scroll-mt-6"
      >
        {/* Section label + selected title */}
        <div className="mb-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)] mb-1">
            / Current Project Details
          </div>
          <h2 className="font-display text-[26px] md:text-[34px] font-semibold text-[var(--t-1)] leading-tight">
            {selected?.title ?? 'Select a project above'}
          </h2>
        </div>

        {selected && <ProjectDetails project={selected} />}
      </section>

      <Footer />
    </main>
  )
}
