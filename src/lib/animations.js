/* =========================================================
   Ported animation behaviors from the original site.js
   Each function returns a cleanup callback.
   ========================================================= */

export function initReveal() {
  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'))
    return () => {}
  }
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  els.forEach(el => io.observe(el))
  return () => io.disconnect()
}

export function initCounters() {
  const els = document.querySelectorAll('[data-counter]')
  if (!els.length) return () => {}

  const animate = el => {
    const target = parseFloat(el.dataset.counter) || 0
    const decimals = parseInt(el.dataset.decimals || '0', 10)
    const dur = parseInt(el.dataset.duration || '1800', 10)
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const start = performance.now()
    const tick = t => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = target * eased
      el.textContent = prefix + v.toFixed(decimals) + suffix
      if (p < 1) requestAnimationFrame(tick)
      else el.textContent = prefix + target.toFixed(decimals) + suffix
    }
    requestAnimationFrame(tick)
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target)
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  els.forEach(el => io.observe(el))
  return () => io.disconnect()
}

export function initTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouchDevice  = window.matchMedia('(hover: none)').matches
  const cards = document.querySelectorAll('.tilt')
  const handlers = []
  cards.forEach(card => {
    const max = (prefersReduced || isTouchDevice) ? 0 : parseFloat(card.dataset.tilt || '5')
    if (max === 0) return
    const onMove = e => {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = (0.5 - py) * max
      const ry = (px - 0.5) * max
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
      card.style.setProperty('--mx', px * 100 + '%')
      card.style.setProperty('--my', py * 100 + '%')
    }
    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    handlers.push({ card, onMove, onLeave })
  })
  return () => {
    handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    })
  }
}

export function initCardGlow() {
  const cards = document.querySelectorAll('.card-glow:not(.tilt)')
  const handlers = []
  cards.forEach(card => {
    const onMove = e => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%')
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%')
    }
    card.addEventListener('mousemove', onMove)
    handlers.push({ card, onMove })
  })
  return () => handlers.forEach(({ card, onMove }) => card.removeEventListener('mousemove', onMove))
}

export function initScrollText() {
  const stages = document.querySelectorAll('.scroll-stage')
  if (!stages.length) return () => {}

  const cleanups = []

  stages.forEach(stage => {
    const textEl = stage.querySelector('.scroll-text')
    if (!textEl) return

    const splitNode = (node, container) => {
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          ;[...child.nodeValue].forEach(c => {
            const span = document.createElement('span')
            span.className = 'ch' + (c === ' ' ? ' space' : '')
            span.textContent = c === ' ' ? ' ' : c
            container.appendChild(span)
          })
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const wrap = document.createElement('span')
          wrap.className = child.className
          container.appendChild(wrap)
          splitNode(child, wrap)
        }
      })
    }

    const flat = document.createElement('span')
    flat.style.display = 'inline'
    splitNode(textEl, flat)
    textEl.innerHTML = ''
    textEl.appendChild(flat)

    const chars = Array.from(textEl.querySelectorAll('.ch'))
    if (!chars.length) return
    const center = (chars.length - 1) / 2

    const update = () => {
      const r = stage.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const total = r.height - vh
      if (total <= 0) return
      const p = Math.max(0, Math.min(1, -r.top / total))
      const t = Math.max(0, Math.min(1, p / 0.5))
      const factor = 1 - t
      chars.forEach((ch, i) => {
        const d = i - center
        const x = d * 50 * factor
        const rotX = d * 50 * factor
        ch.style.transform = `translate3d(${x}px,0,0) rotateX(${rotX}deg)`
      })
    }

    update()
    let raf = null
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    })
  })

  return () => cleanups.forEach(fn => fn())
}

export function initCursor() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return () => {}
  const spot = document.createElement('div')
  spot.className = 'cursor-spot'
  document.body.appendChild(spot)
  let raf
  const onMove = e => {
    document.body.classList.add('has-cursor')
    if (raf) cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      spot.style.left = e.clientX + 'px'
      spot.style.top = e.clientY + 'px'
    })
  }
  const onLeave = () => document.body.classList.remove('has-cursor')
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onLeave)
  return () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseleave', onLeave)
    spot.remove()
  }
}

export function initTextRoll() {
  const STAGGER = 0.035
  const buildRow = (text, className, center) => {
    const row = document.createElement('span')
    row.className = className
    const len = text.length
    ;[...text].forEach((c, i) => {
      const span = document.createElement('span')
      span.className = 'ch'
      span.textContent = c === ' ' ? ' ' : c
      const delay = center ? STAGGER * Math.abs(i - (len - 1) / 2) : STAGGER * i
      span.style.transitionDelay = delay + 's'
      row.appendChild(span)
    })
    return row
  }
  document.querySelectorAll('.text-roll:not([data-rolled])').forEach(el => {
    const text = el.textContent.trim()
    if (!text) return
    el.textContent = ''
    el.appendChild(buildRow(text, 'text-roll-front', true))
    el.appendChild(buildRow(text, 'text-roll-back', true))
    el.setAttribute('data-rolled', 'true')
  })
  return () => {}
}
