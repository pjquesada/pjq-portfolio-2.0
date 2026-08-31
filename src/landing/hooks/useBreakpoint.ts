import { useEffect, useState } from 'react'
import type { Breakpoint } from '@/config/camera'

function readBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop'
  if (window.matchMedia('(max-width: 767px)').matches) return 'mobile'
  if (window.matchMedia('(max-width: 1099px)').matches) return 'tablet'
  return 'desktop'
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(readBreakpoint)

  useEffect(() => {
    const onChange = () => setBreakpoint(readBreakpoint())
    const mobile = window.matchMedia('(max-width: 767px)')
    const tablet = window.matchMedia('(max-width: 1099px)')
    mobile.addEventListener('change', onChange)
    tablet.addEventListener('change', onChange)
    onChange()
    return () => {
      mobile.removeEventListener('change', onChange)
      tablet.removeEventListener('change', onChange)
    }
  }, [])

  return breakpoint
}
