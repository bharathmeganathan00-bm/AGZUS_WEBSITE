import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CardModalContext = createContext(null)

export function useCardModal() {
  return useContext(CardModalContext)
}

export function CardModalProvider({ children }) {
  const [state, setState] = useState({ open: false, data: null })

  const openModal = useCallback(data => {
    setState({ open: true, data })
    document.body.classList.add('card-modal-open')
  }, [])

  const closeModal = useCallback(() => {
    setState(s => ({ ...s, open: false }))
    document.body.classList.remove('card-modal-open')
  }, [])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <CardModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CardModal isOpen={state.open} data={state.data} onClose={closeModal} />
    </CardModalContext.Provider>
  )
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3"/>
  </svg>
)

function CardModal({ isOpen, data, onClose }) {
  if (!data) return null

  const isExternal = data.href && /^https?:\/\//.test(data.href)

  return (
    <div className={`card-modal${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="card-modal-backdrop" onClick={onClose} />
      <div className="card-modal-sheet" role="dialog" aria-modal="true">
        <button className="card-modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Left: project screenshot */}
        {data.image && (
          <div className="card-modal-media">
            <img src={data.image} alt={data.title || ''} />
          </div>
        )}

        {/* Right: scrollable detail panel */}
        <div className="card-modal-body">

          {/* Header: label + tags + title + description */}
          <div className="card-modal-eyebrow">Featured Project</div>

          {data.tags?.length > 0 && (
            <div className="card-modal-tags">
              {data.tags.map(t => (
                <span key={t} className="card-modal-tag">{t}</span>
              ))}
            </div>
          )}

          <h2 className="card-modal-title">{data.title}</h2>
          <p className="card-modal-desc">{data.description}</p>

          {/* CTA buttons */}
          <div className="card-modal-cta-row">
            {data.href && data.href !== '#' && (
              <a
                className="card-modal-cta"
                href={data.href}
                target={isExternal ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                Visit live site
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
            <Link to="/case-studies" className="card-modal-cta-ghost" onClick={onClose}>
              View case study
            </Link>
          </div>

          {/* Client / Industry / Year info row */}
          {(data.client || data.industry || data.year) && (
            <div className="card-modal-info-row">
              {data.client && (
                <div className="card-modal-info-item">
                  <div className="card-modal-info-label">Client</div>
                  <div className="card-modal-info-value">{data.client}</div>
                </div>
              )}
              {data.industry && (
                <div className="card-modal-info-item">
                  <div className="card-modal-info-label">Industry</div>
                  <div className="card-modal-info-value">{data.industry}</div>
                </div>
              )}
              {data.year && (
                <div className="card-modal-info-item">
                  <div className="card-modal-info-label">Year</div>
                  <div className="card-modal-info-value">{data.year}</div>
                </div>
              )}
            </div>
          )}

          {/* Project Overview */}
          {data.overview && (
            <>
              <div className="card-modal-divider" />
              <div className="card-modal-section-title">Project Overview</div>
              <p className="card-modal-overview-text">{data.overview}</p>
            </>
          )}

          {/* What We Did */}
          {data.whatWeDid?.length > 0 && (
            <>
              <div className="card-modal-divider" />
              <div className="card-modal-section-title">What We Did</div>
              <ul className="card-modal-checklist">
                {data.whatWeDid.map(item => (
                  <li key={item}>
                    <span className="card-modal-check"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Tech Stack */}
          {data.techStack?.length > 0 && (
            <>
              <div className="card-modal-divider" />
              <div className="card-modal-section-title">Tech Stack</div>
              <div className="card-modal-tech-chips">
                {data.techStack.map(t => (
                  <span key={t} className="card-modal-tech-chip">{t}</span>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
