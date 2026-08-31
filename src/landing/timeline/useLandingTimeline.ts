import { useEffect, type MutableRefObject, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

    let ctx: gsap.Context | undefined
    let cancelled = false
    let frame = 0

    const setup = () => {
      if (cancelled) return

      const name = stage.querySelector<HTMLElement>('[data-hero-name]')
      const quote = stage.querySelector<HTMLElement>('[data-quote]')
      const lines = gsap.utils.toArray<HTMLElement>('[data-quote-line]', stage)
      const indicator = stage.querySelector<HTMLElement>('[data-scroll-indicator]')
      const veil = stage.querySelector<HTMLElement>('[data-veil]')

      if (!name || lines.length < 3) {
        frame = requestAnimationFrame(setup)
        return
      }

      if (reducedMotion) {
        progressRef.current.value = 0
        gsap.set(quote, { autoAlpha: 1 })
        gsap.set(lines, { yPercent: 0, autoAlpha: 1 })
        gsap.set(veil, { autoAlpha: 0 })
        gsap.set(name, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1 })
        return
      }

      ctx = gsap.context(() => {
        gsap.set(name, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1 })
        gsap.set(quote, { autoAlpha: 1 })
        gsap.set(lines, { yPercent: 110, autoAlpha: 1 })
        gsap.set(indicator, { autoAlpha: 1 })
        gsap.set(veil, { autoAlpha: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=380%',
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to(progressRef.current, { value: 1, duration: 1, ease: 'none' }, 0)

        if (indicator) {
          tl.to(indicator, { autoAlpha: 0, duration: 0.08 }, 0)
        }

        tl.to(
          name,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            autoAlpha: 0,
            duration: 0.16,
            ease: 'power2.inOut',
          },
          0.15,
        )

        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 0.1,
            stagger: 0.045,
            ease: 'power3.out',
          },
          0.58,
        )

        if (quote) {
          tl.to(quote, { autoAlpha: 0, duration: 0.08, ease: 'power2.in' }, 0.9)
        }

        if (veil) {
          tl.to(veil, { autoAlpha: 1, duration: 0.1, ease: 'power2.in' }, 0.9)
        }
      }, stage)
    }

    setup()

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    void document.fonts?.ready.then(refresh)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)
      ctx?.revert()
    }
  }, [enabled, progressRef, reducedMotion, stageRef])
}
