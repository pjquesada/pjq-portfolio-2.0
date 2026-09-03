import { site } from '@/config/site'
import { Pips } from '@/brand/Pips'
import { SectionIndex } from '@/brand/SectionIndex'
import { SketchMark } from '@/brand/SketchMark'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import reveal from './reveal.module.css'
import { Reveal } from './useReveal.tsx'
import styles from './AboutSection.module.css'

export function AboutSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className={styles.about} id="about">
      <Reveal className={`${reveal.reveal} ${styles.top}`} reducedMotion={reducedMotion}>
        <SectionIndex index={site.about.index} />
        <SketchMark className={styles.hatch} />
      </Reveal>

      <Reveal className={`${reveal.reveal} ${styles.statementWrap}`} reducedMotion={reducedMotion}>
        <h2 className={styles.statement}>
          {site.about.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </Reveal>

      <div className={styles.grid}>
        <Reveal className={`${reveal.reveal} ${styles.portrait}`} reducedMotion={reducedMotion}>
          <figure className={styles.figure}>
            <img src="/images/logo.png" alt="Hand-drawn portrait of Pablo Quesada" />
            <figcaption>Identity, 2D</figcaption>
          </figure>
        </Reveal>

        <Reveal className={`${reveal.reveal} ${styles.copy}`} reducedMotion={reducedMotion}>
          <p className={styles.role}>
            {site.about.role}
            <span className={styles.rule} aria-hidden="true">
              03 ─ 06
            </span>
          </p>
          <p className={styles.discipline}>{site.about.discipline}</p>
          {site.about.intro.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <Reveal className={`${reveal.reveal} ${styles.capabilities}`} reducedMotion={reducedMotion}>
        <p className={styles.capLabel}>Capabilities</p>
        <ul className={styles.list}>
          {site.capabilities.map((item) => (
            <li key={item.label}>
              <Pips count={item.pips} label={`${item.pips} of 4`} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
