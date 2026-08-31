import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type TimelineDom = {
  name: HTMLElement | null
  quoteLines: Array<HTMLElement | null>
  quote: HTMLElement | null
  indicator: HTMLElement | null
  veil: HTMLElement | null
}

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
  const domRef = useRef<TimelineDom>({
    name: null,
    quoteLines: [null, null, null],
    quote: null,
    indicator: null,
    veil: null,
  })

  useEffect(() => {
    if (!enabled) return
    const stage = stageRef.current
    if (!stage) return

    const { name, quoteLines, quote, indicator, veil } = domRef.current

    if (reducedMotion) {
      progressRef.current.value = 0
      if (quote) gsap.set(quote, { autoAlpha: 1 })
      quoteLines.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 0, autoAlpha: 1 })
      })
      if (veil) gsap.set(veil, { autoAlpha: 0 })
      if (name) gsap.set(name, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, autoAlpha: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(name, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, autoAlpha: 1 })
      gsap.set(quote, { autoAlpha: 1 })
      gsap.set(quoteLines, { yPercent: 110, autoAlpha: 1 })
      gsap.set(indicator, { autoAlpha: 1 })
      gsap.set(veil, { autoAlpha: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(progressRef.current, { value: 1, duration: 1, ease: 'none' }, 0)

      if (indicator) {
        tl.to(indicator, { autoAlpha: 0, duration: 0.08 }, 0)
      }

      if (name) {
        tl.to(
          name,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            y: -40,
            autoAlpha: 0,
            duration: 0.15,
            ease: 'power2.inOut',
          },
          0.15,
        )
      }

      quoteLines.forEach((line, i) => {
        if (!line) return
        tl.to(
          line,
          {
            yPercent: 0,
            duration: 0.085,
            ease: 'power3.out',
          },
          0.68 + i * 0.055,
        )
      })

      if (quote) {
        tl.to(quote, { autoAlpha: 0, duration: 0.08, ease: 'power2.in' }, 0.9)
      }

      if (veil) {
        tl.to(veil, { autoAlpha: 1, duration: 0.1, ease: 'power2.in' }, 0.9)
      }
    }, stage)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    void document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [enabled, progressRef, reducedMotion, stageRef])

  return domRef
}
