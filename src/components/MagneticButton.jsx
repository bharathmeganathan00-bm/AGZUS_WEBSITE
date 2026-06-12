import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function MagneticButton({
  children,
  strength = 0.4,
  radius = 80,
  variant = 'primary',
  size = 'md',
  type,
  disabled,
  onClick,
  className = '',
}) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { stiffness: 200, damping: 18, mass: 0.6 }
  const rawX = useSpring(0, springConfig)
  const rawY = useSpring(0, springConfig)
  const textX = useTransform(rawX, v => v * 0.4)
  const textY = useTransform(rawY, v => v * 0.4)

  const handleMouseMove = e => {
    const isMobile = window.innerWidth < 640
    const effectiveRadius = isMobile ? radius * 0.6 : radius
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < effectiveRadius) {
      rawX.set(dx * strength)
      rawY.set(dy * strength)
      setIsHovered(true)
    } else {
      rawX.set(0)
      rawY.set(0)
      setIsHovered(false)
    }
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }

  const variantClasses = {
    primary: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
    outline: 'border-2 border-slate-700 text-slate-900 hover:bg-slate-100/5',
    ghost: 'text-slate-900 hover:bg-slate-900/8',
    dark: 'bg-slate-900 text-white shadow-lg',
  }

  const sizeClasses = {
    sm: 'h-9 px-5 text-sm rounded-full',
    md: 'h-12 px-8 text-base rounded-full',
    lg: 'h-14 px-12 text-lg rounded-full',
  }

  // Use motion.button when type="submit" or type="button", otherwise motion.div
  const isNativeButton = type === 'submit' || type === 'button'
  const MotionTag = isNativeButton ? motion.button : motion.div

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap"
      style={{ display: 'inline-flex', padding: `${radius * 0.25}px` }}
    >
      <MotionTag
        type={isNativeButton ? type : undefined}
        disabled={isNativeButton ? disabled : undefined}
        onClick={onClick}
        style={{ x: rawX, y: rawY }}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative inline-flex items-center justify-center font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden ${variantClasses[variant] || ''} ${sizeClasses[size] || ''} ${className}`}
      >
        <motion.span
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
        />
        <motion.span
          style={{ x: textX, y: textY }}
          className="relative z-10 flex items-center gap-2"
        >
          {children}
        </motion.span>
      </MotionTag>
    </div>
  )
}
