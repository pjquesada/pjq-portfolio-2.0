import { useMemo, useRef } from 'react'
import { AboutSection } from '@/editorial/AboutSection'
import { Colophon } from '@/editorial/Colophon'
import { ContactSection } from '@/editorial/ContactSection'
import { Finale } from '@/editorial/Finale'
import { SelectedWork } from '@/editorial/SelectedWork'
import { SiteIndex } from '@/editorial/SiteIndex'
import { ExperienceProvider } from '@/landing/experienceContext'
import { useBreakpoint } from '@/landing/hooks/useBreakpoint'
import { usePointerParallax } from '@/landing/hooks/usePointerParallax'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import { DominoScene } from '@/landing/scene/DominoScene'
import { preloadLandingAssets } from '@/landing/scene/preload'
import { useLandingTimeline } from '@/landing/timeline/useLandingTimeline'
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

  useLandingTimeline({
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

  return (
    <ExperienceProvider value={value}>
      <Loader />
      <SiteIndex />
      <main>
        <section
          className={`${styles.stage} ${reducedMotion ? styles.reduced : ''}`}
          ref={stageRef}
          id="intro"
          aria-label="Intro"
        >
          <DominoScene />
          <HeroTypography reducedMotion={reducedMotion} />
          <QuoteStatement reducedMotion={reducedMotion} />
          <span id="process" className={styles.anchor} />
          <ScrollIndicator />
          <div className={styles.veil} data-veil />
        </section>
        <AboutSection />
        <SelectedWork />
        <Colophon />
        <ContactSection />
        <Finale />
      </main>
    </ExperienceProvider>
  )
}
