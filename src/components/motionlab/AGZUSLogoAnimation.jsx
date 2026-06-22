import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const BASE = 420
const ORBIT_RX = 158
const ORBIT_RY = 90

// Ambient floating particles positioned around the logo
const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2
  const r = 175 + (i % 3) * 22
  return {
    id: i,
    cx: BASE / 2 + Math.cos(angle) * r,
    cy: BASE / 2 + Math.sin(angle) * r,
    dur: 3.5 + (i % 5) * 0.55,
    delay: i * 0.22,
  }
})

function FloatParticle({ cx, cy, dur, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{ width: 4, height: 4, left: cx - 2, top: cy - 2, background: 'var(--red)' }}
      animate={{ opacity: [0.08, 0.55, 0.08], scale: [0.6, 1.4, 0.6] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

export default function AGZUSLogoAnimation({ position = { x: 0, y: 0 }, gesture = 'idle' }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [burstKey, setBurstKey] = useState(0)

  // Scale to fit container on small screens
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setScale(Math.min(1, w / BASE))
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Trigger burst on each new pinch
  useEffect(() => {
    if (gesture === 'pinch') setBurstKey(k => k + 1)
  }, [gesture])

  // Motion values for smooth hand-tracking interpolation
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  useEffect(() => { rawX.set(position.x) }, [position.x])
  useEffect(() => { rawY.set(position.y) }, [position.y])

  const sx = useSpring(rawX, { stiffness: 75, damping: 22 })
  const sy = useSpring(rawY, { stiffness: 75, damping: 22 })

  // Logo tilt from position
  const tiltRY = useTransform(sx, [-1, 1], [-13, 13])
  const tiltRX = useTransform(sy, [-1, 1], [10, -10])
  const shiftX = useTransform(sx, [-1, 1], [-16, 16])
  const shiftY = useTransform(sy, [-1, 1], [14, -14])

  // Orbit dot tracks position clamped to the ellipse
  const dotX = useTransform(sx, [-1, 1], [-ORBIT_RX, ORBIT_RX])
  const dotY = useTransform(sy, [-1, 1], [ORBIT_RY, -ORBIT_RY])

  const isGlowing  = gesture === 'palm'
  const isSwiping  = gesture === 'swipe'

  const SWOOSH = `M ${BASE*0.18} ${BASE*0.72} Q ${BASE*0.40} ${BASE*0.36} ${BASE*0.66} ${BASE*0.44} Q ${BASE*0.85} ${BASE*0.52} ${BASE*0.88} ${BASE*0.36}`

  return (
    <div ref={wrapRef} className="w-full max-w-[420px] mx-auto flex-shrink-0">
      {/* Fixed-size inner scaled to fit */}
      <div
        style={{
          width: BASE,
          height: BASE,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'relative',
        }}
      >

        {/* Red glow behind logo — grows on palm */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{ width: isGlowing ? 280 : 130, height: isGlowing ? 280 : 130, opacity: isGlowing ? 0.5 : 0.18 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.6), transparent 70%)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
        />

        {/* Violet ambient glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 340, height: 340, background: 'radial-gradient(circle, rgba(124,58,237,0.11), transparent 70%)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
        />

        {/* SVG layer: orbit ellipse + red swoosh */}
        <svg viewBox={`0 0 ${BASE} ${BASE}`} fill="none" xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none">

          {/* Rotating dashed orbit ellipse */}
          <motion.ellipse
            cx={BASE/2} cy={BASE/2} rx={ORBIT_RX} ry={ORBIT_RY}
            stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" strokeDasharray="8 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${BASE/2}px ${BASE/2}px` }}
          />

          {/* Swoosh glow (wide, soft) */}
          <motion.path d={SWOOSH} stroke="rgba(239,68,68,0.22)" strokeWidth="12" strokeLinecap="round"
            animate={{ opacity: [0.12, 0.32, 0.12] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Swoosh main line */}
          <motion.path d={SWOOSH} stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round"
            animate={{
              pathLength: [0.5, 1, 0.5],
              opacity: [0.7, 1, 0.7],
              filter: isGlowing
                ? ['drop-shadow(0 0 6px rgba(239,68,68,0.8))', 'drop-shadow(0 0 18px rgba(239,68,68,1))', 'drop-shadow(0 0 6px rgba(239,68,68,0.8))']
                : ['drop-shadow(0 0 3px rgba(239,68,68,0.35))', 'drop-shadow(0 0 9px rgba(239,68,68,0.65))', 'drop-shadow(0 0 3px rgba(239,68,68,0.35))'],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Ambient floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map(p => <FloatParticle key={p.id} {...p} />)}
        </div>

        {/* Pinch burst — new key on each pinch triggers fresh animation */}
        <AnimatePresence>
          {burstKey > 0 && Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2
            return (
              <motion.div
                key={`burst-${burstKey}-${i}`}
                className="absolute pointer-events-none rounded-full"
                style={{ width: 7, height: 7, background: 'var(--red)', left: BASE/2 - 3.5, top: BASE/2 - 3.5 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1.5 }}
                animate={{ x: Math.cos(a)*145, y: Math.sin(a)*145, opacity: 0, scale: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              />
            )
          })}
        </AnimatePresence>

        {/* Orbit dot — follows hand position along the ellipse */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 12, height: 12,
            background: 'var(--t-1)',
            border: '2px solid rgba(239,68,68,0.55)',
            boxShadow: '0 0 8px rgba(239,68,68,0.3)',
            left: BASE/2 - 6, top: BASE/2 - 6,
            x: dotX,
            y: dotY,
          }}
        />

        {/* Swipe wrapper (outer rotation) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={isSwiping ? { rotateY: [0, 24, -24, 0] } : { rotateY: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Tilt wrapper (inner — tracks hand position) */}
          <motion.div
            className="flex flex-col items-center gap-5"
            style={{ rotateX: tiltRX, rotateY: tiltRY, x: shiftX, y: shiftY, transformStyle: 'preserve-3d' }}
          >
            {/* Floating logo circle */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="relative w-[136px] h-[136px] rounded-full bg-white flex items-center justify-center"
                animate={{
                  boxShadow: isGlowing
                    ? '0 0 0 10px rgba(239,68,68,0.10), 0 0 55px 12px rgba(239,68,68,0.32), 0 8px 36px -8px rgba(0,0,0,0.14)'
                    : '0 0 0 0px transparent, 0 0 0 0 transparent, 0 8px 36px -8px rgba(0,0,0,0.14)',
                }}
                transition={{ duration: 0.55 }}
                style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}
              >
                <img src="/logo.png" alt="AGZUS" className="w-[96px] h-[96px] object-contain" />
              </motion.div>
            </motion.div>

            {/* Brand wordmark */}
            <div className="text-center">
              <div className="font-display text-[40px] font-semibold text-[var(--t-1)] tracking-tight leading-none">
                AG<span className="text-[var(--red)]">Z</span>US
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--t-4)] mt-1.5">
                Technology Solutions
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
      {/* Reserve height so parent doesn't collapse */}
      <div style={{ height: BASE * scale }} aria-hidden="true" />
    </div>
  )
}
