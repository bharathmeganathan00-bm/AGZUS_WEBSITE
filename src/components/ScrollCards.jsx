import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function ScrollCards({
  cards,
  direction = 'bottom',
  cardScale = 0.88,
  cardRotation = 2,
  className = '',
  containerClassName = '',
}) {
  const container = useRef(null)
  const cardRefs  = useRef([])

  useGSAP(
    () => {
      const els        = cardRefs.current.filter(Boolean)
      const totalCards = els.length
      if (totalCards === 0) return

      const getOffset = () => {
        if (direction === 'top')   return { yPercent: -110 }
        if (direction === 'left')  return { xPercent: -110 }
        if (direction === 'right') return { xPercent:  110 }
        return { yPercent: 110 }                              // default: bottom
      }

      // Put every card on its own GPU layer upfront — avoids mid-scroll layer
      // promotion which is the main source of jank.
      gsap.set(els, { force3D: true, z: 0.01 })

      // Card 0 visible and centred; remaining cards offset + invisible.
      // Using opacity (not visibility) so the browser can composite without
      // triggering a paint.
      gsap.set(els[0], { xPercent: 0, yPercent: 0, scale: 1, rotation: 0, opacity: 1 })
      for (let i = 1; i < totalCards; i++) {
        gsap.set(els[i], { xPercent: 0, yPercent: 0, ...getOffset(), scale: 1, rotation: 0, opacity: 0 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${window.innerHeight * totalCards}`,
          pin: true,
          scrub: 0.35,          // tight lag — feels responsive, not "chasing"
          pinSpacing: true,
          fastScrollEnd: true,  // snaps to rest when fast-scrolling
          invalidateOnRefresh: true,
        },
      })

      for (let i = 0; i < totalCards - 1; i++) {
        // Outgoing: scale + subtle rotation
        tl.to(els[i], {
          scale: cardScale,
          rotation: cardRotation,
          opacity: 0.6,
          duration: 1,
          ease: 'none',
          force3D: true,
        }, i)

        // Incoming: slide in + fade up from 0
        tl.to(els[i + 1], {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'none',
          force3D: true,
        }, i)
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh())
      if (container.current) ro.observe(container.current)

      return () => {
        ro.disconnect()
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    },
    { scope: container, dependencies: [direction, cards.length, cardScale, cardRotation] }
  )

  return (
    <div ref={container} className={`relative w-full h-screen ${className}`}>
      <div className="relative flex h-screen w-full items-center justify-center">
        <div
          className={`relative w-[95%] sm:w-[90%] lg:w-[85%] max-w-[1400px] aspect-video overflow-hidden rounded-3xl shadow-2xl ${containerClassName}`}
          style={{ perspective: '1200px' }}
        >
          {cards.map((card, i) => (
            <div
              key={card.id ?? i}
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              ref={(el) => { cardRefs.current[i] = el }}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
