import { useRef, useEffect, useCallback } from 'react'

const CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.crossOrigin = 'anonymous'
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

function detectGesture(lm) {
  // lm: array of 21 {x,y,z} landmarks from MediaPipe
  const thumbTip  = lm[4]
  const indexTip  = lm[8]
  const middleTip = lm[12]
  const ringTip   = lm[16]
  const pinkyTip  = lm[20]
  const indexMCP  = lm[5]
  const middleMCP = lm[9]
  const ringMCP   = lm[13]
  const pinkyMCP  = lm[17]

  // Pinch: thumb tip very close to index tip
  const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y)
  if (pinchDist < 0.07) return 'pinch'

  // Palm: all 4 fingers extended (tip.y < mcp.y, because y grows downward)
  const allExtended = [
    indexTip.y  < indexMCP.y,
    middleTip.y < middleMCP.y,
    ringTip.y   < ringMCP.y,
    pinkyTip.y  < pinkyMCP.y,
  ].every(Boolean)
  if (allExtended) return 'palm'

  return 'moving'
}

export default function HandGestureController({
  active,
  onPosition,
  onGesture,
  onCameraStatus,
  onModeChange,
}) {
  const videoRef      = useRef(null)
  const streamRef     = useRef(null)
  const handsRef      = useRef(null)
  const rafRef        = useRef(null)
  const processingRef = useRef(false)
  const prevWristRef  = useRef(null)
  const swipeTimeout  = useRef(null)

  const stopAll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    clearTimeout(swipeTimeout.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (handsRef.current) {
      try { handsRef.current.close() } catch {}
      handsRef.current = null
    }
    processingRef.current = false
    prevWristRef.current  = null
  }, [])

  useEffect(() => {
    if (!active) {
      stopAll()
      onModeChange?.('mouse')
      return
    }

    let cancelled = false

    async function start() {
      // Camera support check
      if (!navigator.mediaDevices?.getUserMedia) {
        onCameraStatus?.('unsupported')
        onModeChange?.('mouse')
        return
      }

      onCameraStatus?.('requesting')

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
        })
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }

        onCameraStatus?.('loading')

        await loadScript(`${CDN}/hands.js`)
        if (cancelled) return

        if (typeof window.Hands !== 'function') throw new Error('MediaPipe unavailable')

        const hands = new window.Hands({
          locateFile: file => `${CDN}/${file}`,
        })
        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.65,
        })
        hands.onResults(results => {
          if (!results.multiHandLandmarks?.length) {
            onGesture?.('idle')
            prevWristRef.current = null
            return
          }
          const lm = results.multiHandLandmarks[0]
          const wrist = lm[0]

          // Normalize position: front camera is mirrored, so invert x
          const px = Math.max(-1, Math.min(1, (0.5 - wrist.x) * 2))
          const py = Math.max(-1, Math.min(1, (0.5 - wrist.y) * 2))
          onPosition?.({ x: px, y: py })

          // Swipe: large horizontal velocity
          if (prevWristRef.current) {
            const dx = (prevWristRef.current.x - wrist.x) * 2
            if (Math.abs(dx) > 0.14) {
              onGesture?.('swipe')
              clearTimeout(swipeTimeout.current)
              swipeTimeout.current = setTimeout(() => onGesture?.('moving'), 700)
              prevWristRef.current = wrist
              return
            }
          }
          prevWristRef.current = wrist
          onGesture?.(detectGesture(lm))
        })

        handsRef.current = hands
        onCameraStatus?.('active')
        onModeChange?.('hand')

        // Frame processing loop (skip if previous frame still processing)
        const loop = async () => {
          if (!processingRef.current && videoRef.current?.readyState >= 2 && handsRef.current) {
            processingRef.current = true
            try { await handsRef.current.send({ image: videoRef.current }) } catch {}
            processingRef.current = false
          }
          rafRef.current = requestAnimationFrame(loop)
        }
        loop()

      } catch (err) {
        if (cancelled) return
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          onCameraStatus?.('denied')
        } else {
          onCameraStatus?.('error')
        }
        onModeChange?.('mouse')
      }
    }

    start()

    return () => {
      cancelled = true
      stopAll()
    }
  }, [active])

  // Hidden video element for webcam frames
  return (
    <video
      ref={videoRef}
      playsInline
      muted
      aria-hidden="true"
      style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', top: 0, left: 0 }}
    />
  )
}
