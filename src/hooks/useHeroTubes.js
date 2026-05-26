import { useEffect } from 'react'

export function useHeroTubes(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let app = null
    let cancelled = false

    const rand = n =>
      Array.from({ length: n }, () =>
        '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
      )

    const init = async () => {
      await new Promise(r => setTimeout(r, 100))
      if (cancelled) return

      let TubesCursor = null
      try {
        const mod = await import(
          'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        )
        TubesCursor = mod.default
      } catch (e) {
        console.warn('Tubes module failed to load:', e)
        return
      }
      if (!TubesCursor || cancelled) return

      try {
        app = TubesCursor(canvas, {
          tubes: {
            colors: ['#ef4444', '#8965e0', '#5e72e4'],
            lights: {
              intensity: 200,
              colors: ['#21d4fd', '#b721ff', '#f4d03f', '#ef4444'],
            },
          },
        })

        const wrap = canvas.parentElement
        const lockSize = () => {
          if (!wrap) return
          const w = wrap.clientWidth
          const h = wrap.clientHeight
          if (w === 0 || h === 0) return
          canvas.style.width = w + 'px'
          canvas.style.height = h + 'px'
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          canvas.width = Math.floor(w * dpr)
          canvas.height = Math.floor(h * dpr)
          if (app.renderer && typeof app.renderer.setSize === 'function') {
            app.renderer.setSize(w, h, false)
            app.renderer.setPixelRatio(dpr)
          }
          if (app.camera) {
            app.camera.aspect = w / h
            app.camera.updateProjectionMatrix && app.camera.updateProjectionMatrix()
          }
        }
        requestAnimationFrame(lockSize)
        window.addEventListener('resize', lockSize, { passive: true })

        canvas.addEventListener('click', () => {
          if (!app || !app.tubes) return
          app.tubes.setColors(rand(3))
          app.tubes.setLightsColors(rand(4))
        })
      } catch (e) {
        console.warn('Hero tubes init failed:', e)
      }
    }

    init()
    return () => {
      cancelled = true
      if (app && app.renderer) {
        try { app.renderer.dispose() } catch (_) {}
      }
    }
  }, [canvasRef])
}
