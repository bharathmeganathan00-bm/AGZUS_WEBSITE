import { motion } from 'framer-motion'

const CAMERA_LABELS = {
  idle:        'Not Active',
  requesting:  'Requesting…',
  loading:     'Loading AI…',
  active:      'Active',
  denied:      'Access Denied',
  error:       'Not Found',
  unsupported: 'Unsupported',
}

const GESTURE_LABELS = {
  idle:    'None',
  moving:  'Moving',
  palm:    'Open Palm',
  pinch:   'Pinch',
  swipe:   'Swipe',
}

const MODE_LABELS = {
  mouse: 'Mouse / Touch',
  hand:  'Hand Tracking',
}

function Row({ label, value, pulse }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-black/[0.05] last:border-0">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--t-4)]">
        {label}
      </span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: pulse ? 'var(--red)' : 'rgba(0,0,0,0.15)' }}
        />
        <span className="text-[12px] font-semibold text-[var(--t-2)] truncate">{value}</span>
      </div>
    </div>
  )
}

export default function GestureStatusPanel({ cameraStatus = 'idle', gesture = 'idle', mode = 'mouse' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-black/[0.07] shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] p-5 w-[200px] flex-shrink-0"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--red)] mb-1">
        / Status
      </div>
      <div>
        <Row label="Camera"  value={CAMERA_LABELS[cameraStatus] ?? cameraStatus} pulse={cameraStatus === 'active'} />
        <Row label="Gesture" value={GESTURE_LABELS[gesture]     ?? gesture}       pulse={gesture !== 'idle'} />
        <Row label="Mode"    value={MODE_LABELS[mode]           ?? mode}           pulse={mode === 'hand'} />
      </div>
    </motion.div>
  )
}
