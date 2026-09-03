import { useEffect, useRef, useState, type ReactNode } from 'react'

export function useReveal(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  return { ref, visible }
}

export function Reveal({
  children,
  className,
  reducedMotion,
}: {
  children: ReactNode
  className?: string
  reducedMotion: boolean
}) {
  const { ref, visible } = useReveal(reducedMotion)
  return (
    <div ref={ref} className={className} data-revealed={visible ? 'true' : 'false'}>
      {children}
    </div>
  )
}
