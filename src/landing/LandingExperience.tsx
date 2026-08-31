import { useCallback, useMemo, useRef } from 'react'
import { ExperienceProvider } from '@/landing/experienceContext'
import { useBreakpoint } from '@/landing/hooks/useBreakpoint'
import { usePointerParallax } from '@/landing/hooks/usePointerParallax'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import { DominoScene } from '@/landing/scene/DominoScene'
import { preloadLandingAssets } from '@/landing/scene/preload'
import { useLandingTimeline } from '@/landing/timeline/useLandingTimeline'
import { AboutSection } from '@/landing/ui/AboutSection'
import { HeroTypography } from '@/landing/ui/HeroTypography'
import { Loader } from '@/landing/ui/Loader'
import { QuoteStatement } from '@/landing/ui/QuoteStatement'
import { ScrollIndicator } from '@/landing/ui/ScrollIndicator'
import styles from './LandingExperience.module.css'

preloadLandingAssets()

export function LandingExperience() {
  const reducedMotion = usePrefersReducedMotion()
  const breakpoint = useBreakpoint()
  const progress = useRef({ value: 0 })
  const pointer = usePointerParallax(!reducedMotion && breakpoint === 'desktop')
  const stageRef = useRef<HTMLElement>(null)

  const domRef = useLandingTimeline({
    stageRef,
    progressRef: progress,
    reducedMotion,
    enabled: true,
  })

  const value = useMemo(
    () => ({
      progress,
      pointer,
      breakpoint,
      reducedMotion,
    }),
    [breakpoint, pointer, reducedMotion],
  )

  const setLineRef = useCallback((index: number, node: HTMLSpanElement | null) => {
    domRef.current.quoteLines[index] = node
  }, [domRef])

  return (
    <ExperienceProvider value={value}>
      <Loader />
      <main>
        <section
          className={`${styles.stage} ${reducedMotion ? styles.reduced : ''}`}
          ref={stageRef}
          aria-label="Landing"
        >
          <DominoScene />
          <HeroTypography
            reducedMotion={reducedMotion}
            nameRef={(node) => {
              domRef.current.name = node
            }}
          />
          <QuoteStatement
            reducedMotion={reducedMotion}
            rootRef={(node) => {
              domRef.current.quote = node
            }}
            setLineRef={setLineRef}
          />
          <ScrollIndicator
            rootRef={(node) => {
              domRef.current.indicator = node
            }}
          />
          <div
            className={styles.veil}
            ref={(node) => {
              domRef.current.veil = node
            }}
          />
        </section>
        <AboutSection />
      </main>
    </ExperienceProvider>
  )
}
