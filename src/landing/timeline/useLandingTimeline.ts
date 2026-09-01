import { useEffect, type MutableRefObject, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TIMELINE } from '@/config/dominos'
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
      const lines = gsap.utils.toArray<HTMLElement>('[data-quote-line]', stage)
      const indicator = stage.querySelector<HTMLElement>('[data-scroll-indicator]')
      const veil = stage.querySelector<HTMLElement>('[data-veil]')

      if (!name || !quote || lines.length < 3) {
        frame = requestAnimationFrame(setup)
        return
      }

      const apply = (progress: number) => {
        progressRef.current.value = progress

        const nameOut = span(
          progress,
          TIMELINE.nameLeave.start,
          TIMELINE.nameLeave.end,
          'power2.inOut',
        )
        name.style.clipPath = `inset(0% 0% ${nameOut * 100}% 0%)`
        name.style.opacity = String(1 - nameOut)

        lines.forEach((line, i) => {
          const start = TIMELINE.quote.start + i * TIMELINE.quote.stagger
          const t = span(progress, start, start + TIMELINE.quote.duration, 'power3.out')
          line.style.transform = `translate3d(0, ${(1 - t) * 110}%, 0)`
        })

        const quoteOut = span(progress, TIMELINE.handoff.start, 0.98, 'power2.in')
        quote.style.opacity = String(1 - quoteOut)

        if (indicator) {
          indicator.style.opacity = String(
            1 - span(progress, TIMELINE.indicatorFade.start, TIMELINE.indicatorFade.end),
          )
        }

        if (veil) {
          const v = span(progress, TIMELINE.handoff.start, TIMELINE.handoff.end, 'power2.in')
          veil.style.opacity = String(v)
          veil.style.visibility = v > 0.001 ? 'visible' : 'hidden'
        }
      }

      if (reducedMotion) {
        apply(0)
        name.style.clipPath = 'inset(0% 0% 0% 0%)'
        name.style.opacity = '1'
        lines.forEach((line) => {
          line.style.transform = 'none'
        })
        quote.style.opacity = '1'
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
