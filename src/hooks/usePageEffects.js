import { useEffect } from 'react'
import {
  initReveal,
  initCounters,
  initTilt,
  initCardGlow,
  initScrollText,
  initCursor,
  initTextRoll,
} from '../lib/animations'

let cursorInitialized = false

export function usePageEffects({ scrollText = false } = {}) {
  useEffect(() => {
    const cleanups = []

    cleanups.push(initReveal())
    cleanups.push(initCounters())
    cleanups.push(initTilt())
    cleanups.push(initCardGlow())
    if (scrollText) cleanups.push(initScrollText())

    if (!cursorInitialized) {
      cursorInitialized = true
      cleanups.push(initCursor())
    }

    initTextRoll()

    return () => {
      cleanups.forEach(fn => fn && fn())
    }
  }, [scrollText])
}
