import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageEffects } from '../hooks/usePageEffects'
import Footer from '../components/Footer'
import AGZUSLogoAnimation    from '../components/motionlab/AGZUSLogoAnimation'
import HandGestureController from '../components/motionlab/HandGestureController'
import GestureStatusPanel    from '../components/motionlab/GestureStatusPanel'

// ── Icons ─────────────────────────────────────────────────────────────────────

const ChevRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const StopIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
  </svg>
)

// Camera-denied / error notice
function Notice({ type }) {
  const messages = {
    denied:      'Camera access was denied. Using mouse / touch tracking instead. Allow camera in browser settings and click Start to try again.',
    error:       'No camera found on this device. Using mouse / touch tracking as fallback.',
    unsupported: 'Camera is not supported in this browser. Using mouse / touch tracking instead.',
  }
  if (!messages[type]) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 max-w-[500px] mx-auto text-center"
    >
      <p className="text-[13px] text-amber-800 leading-relaxed">{messages[type]}</p>
    </motion.div>
  )
}

// Gesture hint pills
const HINTS = [
  { icon: '✋', label: 'Open palm  →  Red glow grows' },
  { icon: '🤏', label: 'Pinch  →  Particle burst' },
  { icon: '👋', label: 'Swipe fast  →  3D spin' },
  { icon: '↕', label: 'Move hand  →  Logo follows' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MotionLab() {
  usePageEffects()

  const [active,       setActive]       = useState(false)
  const [position,     setPosition]     = useState({ x: 0, y: 0 })
  const [gesture,      setGesture]      = useState('idle')
  const [cameraStatus, setCameraStatus] = useState('idle')
  const [mode,         setMode]         = useState('mouse')

  const stageRef = useRef(null)

  // Mouse fallback — only when camera hand tracking is not active
  const handleMouseMove = useCallback(e => {
    if (mode === 'hand') return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const x =  ((e.clientX - rect.left)  / rect.width  - 0.5) * 2
    const y = -((e.clientY - rect.top)   / rect.height - 0.5) * 2
    setPosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
    setGesture('moving')
  }, [mode])

  const handleMouseLeave = useCallback(() => {
    if (mode === 'hand') return
    setGesture('idle')
    setPosition({ x: 0, y: 0 })
  }, [mode])

  // Touch fallback
  const handleTouchMove = useCallback(e => {
    if (mode === 'hand' || !e.touches.length) return
    const touch = e.touches[0]
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const x =  ((touch.clientX - rect.left)  / rect.width  - 0.5) * 2
    const y = -((touch.clientY - rect.top)   / rect.height - 0.5) * 2
    setPosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
    setGesture('moving')
  }, [mode])

  const handleTouchEnd = useCallback(() => {
    if (mode === 'hand') return
    setGesture('idle')
    setPosition({ x: 0, y: 0 })
  }, [mode])

  const handleStart = () => setActive(true)

  const handleStop = () => {
    setActive(false)
    setMode('mouse')
    setCameraStatus('idle')
    setGesture('idle')
    setPosition({ x: 0, y: 0 })
  }

  const errorType = ['denied', 'error', 'unsupported'].includes(cameraStatus) ? cameraStatus : null

  return (
    <main className="w-full flex flex-col items-center px-4 md:px-6 pt-8">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto mt-6 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--red)] mb-3">
            / Motion Lab
          </div>
          <h1 className="font-display text-[32px] sm:text-[48px] md:text-[60px] font-medium tracking-tight text-[var(--t-1)] leading-[1.05]">
            Control AG<span className="text-[var(--red)]">Z</span>US<br className="hidden sm:block" />
            {' '}With Your Hand
          </h1>
          <p className="mt-5 text-[15px] text-[var(--t-3)] max-w-[500px] mx-auto leading-relaxed">
            Move your hand to interact with our futuristic motion experience. No plugins required — works in any modern browser.
          </p>
        </motion.div>

        {/* Start / Stop button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          {!active ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--red)] text-white text-[14px] font-semibold hover:bg-red-600 active:scale-[0.97] transition-all shadow-[0_4px_24px_-6px_rgba(239,68,68,0.45)]"
            >
              Start Gesture Mode
              <ChevRight />
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-black/[0.12] text-[var(--t-2)] text-[14px] font-semibold hover:border-black/20 hover:text-[var(--t-1)] active:scale-[0.97] transition-all"
            >
              <StopIcon />
              Stop Gesture Mode
            </button>
          )}

          {/* Mouse fallback hint */}
          {!active && (
            <p className="text-[12px] text-[var(--t-4)] font-mono">
              Or just move your mouse over the logo below
            </p>
          )}
        </motion.div>

        {/* Error notice */}
        <AnimatePresence>
          {errorType && <Notice type={errorType} />}
        </AnimatePresence>
      </section>

      {/* ── INTERACTIVE STAGE ────────────────────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative w-full max-w-[1400px] mx-auto mt-10 px-4 md:px-6 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* HandGestureController — headless, manages webcam + MediaPipe */}
        <HandGestureController
          active={active}
          onPosition={setPosition}
          onGesture={setGesture}
          onCameraStatus={setCameraStatus}
          onModeChange={setMode}
        />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-4">
          {/* Animated logo (center) */}
          <AGZUSLogoAnimation position={position} gesture={gesture} />

          {/* Status panel */}
          <GestureStatusPanel cameraStatus={cameraStatus} gesture={gesture} mode={mode} />
        </div>
      </section>

      {/* ── GESTURE HINTS ────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto mt-12 px-4 md:px-6">
        <div className="reveal mb-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--t-4)]">
            / Gesture Guide
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HINTS.map(({ icon, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur-sm border border-black/[0.07] rounded-2xl p-5 flex flex-col items-center gap-3 text-center shadow-[0_2px_14px_-4px_rgba(0,0,0,0.06)]"
            >
              <span className="text-[28px] leading-none">{icon}</span>
              <span className="text-[12.5px] text-[var(--t-3)] leading-snug font-medium">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INFO SECTION ─────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1400px] mx-auto mt-16 mb-4 px-4 md:px-6">
        <div className="bg-white/60 backdrop-blur-sm border border-black/[0.07] rounded-2xl p-6 md:p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--red)] mb-2">Camera</div>
              <p className="text-[13px] text-[var(--t-3)] leading-relaxed">
                Click <strong className="text-[var(--t-2)]">Start Gesture Mode</strong> to request camera access. Permission is only asked once. No video is recorded or transmitted.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--red)] mb-2">Technology</div>
              <p className="text-[13px] text-[var(--t-3)] leading-relaxed">
                Hand tracking runs entirely in your browser using MediaPipe Hands — a real-time ML model that detects 21 hand landmarks at up to 60 fps.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--red)] mb-2">Fallback</div>
              <p className="text-[13px] text-[var(--t-3)] leading-relaxed">
                If camera is unavailable or denied, the experience automatically switches to mouse and touch control — the full animation still works.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
