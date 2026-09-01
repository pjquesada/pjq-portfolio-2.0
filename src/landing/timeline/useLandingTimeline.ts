import { useEffect, type MutableRefObject, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { span } from './math'

gsap.registerPlugin(ScrollTrigger)

type Args = {
  stageRef: RefObject<HTMLElement | null>
  progressRef: MutableRefObject<{ value: number }>
  reducedMotion: boolean
  enabled: boolean
}

export function useLandingTimeline({
  stageRef,
  progressRef,
  reducedMotion,
  enabled,
}: Args) {
  useEffect(() => {
    if (!enabled) return
    const stage = stageRef.current
    if (!stage) return

    let cancelled = false
    let trigger: ScrollTrigger | undefined
    let frame = 0

    const setup = () => {
      if (cancelled) return

      const name = stage.querySelector<HTMLElement>('[data-hero-name]')
      const quote = stage.querySelector<HTMLElement>('[data-quote]')
      const masks = gsap.utils.toArray<HTMLElement>('[data-quote-mask]', stage)
      const indicator = stage.querySelector<HTMLElement>('[data-scroll-indicator]')
      const veil = stage.querySelector<HTMLElement>('[data-veil]')

      if (!name || !quote || masks.length < 3) {
        frame = requestAnimationFrame(setup)
        return
      }

      const apply = (progress: number) => {
        progressRef.current.value = progress

        const nameOut = span(progress, 0.15, 0.3, 'power2.inOut')
        name.style.clipPath = `inset(0% 0% ${nameOut * 100}% 0%)`
        name.style.opacity = String(1 - nameOut)

        const quoteIn = span(progress, 0.62, 0.76, 'power3.out')
        const quoteOut = span(progress, 0.9, 0.98, 'power2.in')
        quote.style.opacity = String(quoteIn * (1 - quoteOut))
        quote.style.transform = `translate3d(0, ${(1 - quoteIn) * 1.15}rem, 0)`

        masks.forEach((mask) => {
          mask.style.clipPath = 'none'
        })

        if (indicator) {
          indicator.style.opacity = String(1 - span(progress, 0, 0.08))
        }

        if (veil) {
          const v = span(progress, 0.9, 1, 'power2.in')
          veil.style.opacity = String(v)
          veil.style.visibility = v > 0.001 ? 'visible' : 'hidden'
        }
      }

      if (reducedMotion) {
        apply(0)
        name.style.clipPath = 'inset(0% 0% 0% 0%)'
        name.style.opacity = '1'
        masks.forEach((mask) => {
          mask.style.clipPath = 'none'
        })
        quote.style.opacity = '1'
        quote.style.transform = 'none'
        if (veil) veil.style.opacity = '0'
        return
      }

      apply(0)

      trigger = ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: '+=380%',
        pin: true,
        scrub: 0.75,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      })
    }

    setup()

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    void document.fonts?.ready.then(refresh)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)
      trigger?.kill()
    }
  }, [enabled, progressRef, reducedMotion, stageRef])
}
