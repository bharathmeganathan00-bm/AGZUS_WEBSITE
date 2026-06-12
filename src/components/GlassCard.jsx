import { useCardModal } from './CardModal'

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function GlassCard({ data, delay = '' }) {
  const { openModal } = useCardModal()

  const handleClick = e => {
    e.preventDefault()
    openModal({
      image: data.img,
      title: data.title,
      description: data.excerpt,
      tags: data.tags,
      href: data.href,
      client: data.authorName,
      industry: data.category,
      year: data.year,
      overview: data.overview,
      whatWeDid: data.whatWeDid,
      techStack: data.techStack,
    })
  }

  return (
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal ${delay} glass-card group`}
      onClick={handleClick}
    >
      <div className="glass-card-media">
        <img
          src={data.img}
          alt={data.title}
          loading="lazy"
          onError={e => { e.target.onerror = null; e.target.src = data.imgFallback }}
        />
        <div className="glass-card-tags">
          {data.tags.map(t => <span key={t} className="glass-tag">{t}</span>)}
        </div>
        <div className="glass-card-action">
          <span className="glass-card-action-btn">
            <ExternalIcon /> Visit site
          </span>
        </div>
      </div>
      <div className="glass-card-body">
        <h3 className="glass-card-title">{data.title}</h3>
        <p className="glass-card-excerpt">{data.excerpt}</p>
        <div className="glass-card-meta">
          <div className="glass-card-author">
            <div className="glass-card-avatar" style={data.avatarStyle}>{data.avatar}</div>
            <div>
              <div className="glass-card-author-name">{data.authorName}</div>
              <div className="glass-card-author-date">{data.authorSub}</div>
            </div>
          </div>
          <div className="glass-card-read">
            <ClockIcon />
            <span>Live</span>
          </div>
        </div>
      </div>
    </a>
  )
}
