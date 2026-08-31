import { useEffect, useRef } from 'react'

export function usePointerParallax(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      pointer.current.x = x
      pointer.current.y = y
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pointer
}
