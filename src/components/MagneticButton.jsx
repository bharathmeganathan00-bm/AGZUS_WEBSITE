import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function MagneticButton({ children, strength = 0.38, radius = 80, className = '' }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const cfg = { stiffness: 220, damping: 20, mass: 0.5 }
  const rawX = useSpring(0, cfg)
  const rawY = useSpring(0, cfg)
  const innerX = useTransform(rawX, v => v * 0.35)
  const innerY = useTransform(rawY, v => v * 0.35)

  const pad = radius * 0.22

  const onMove = e => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    if (Math.sqrt(dx * dx + dy * dy) < radius) {
      rawX.set(dx * strength)
      rawY.set(dy * strength)
      setHovered(true)
    } else {
      rawX.set(0); rawY.set(0); setHovered(false)
    }
  }

  const onLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex ${className}`}
      style={{ padding: pad, margin: -pad }}
    >
      <motion.div
        style={{ x: rawX, y: rawY, position: 'relative' }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* children text shifts at a slightly smaller offset for depth */}
        <motion.span style={{ x: innerX, y: innerY }} className="contents">
          {children}
        </motion.span>
      </motion.div>
    </div>
  )
}
