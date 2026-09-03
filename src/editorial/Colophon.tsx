import { useState } from 'react'
import { site } from '@/config/site'
import { SectionIndex } from '@/brand/SectionIndex'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import reveal from './reveal.module.css'
import { Reveal } from './useReveal'
import styles from './Colophon.module.css'

const TILES = [0, 1, 2, 3, 4]

export function Colophon() {
  const reducedMotion = usePrefersReducedMotion()
  const [hover, setHover] = useState<number | null>(null)

  return (
    <section className={styles.colophon} id="colophon">
      <Reveal className={reveal.reveal} reducedMotion={reducedMotion}>
        <SectionIndex index={site.colophon.index} />
        <h2 className={styles.heading}>{site.colophon.heading}</h2>
      </Reveal>

      <Reveal className={`${reveal.reveal} ${styles.row}`} reducedMotion={reducedMotion}>
        <ul className={styles.tools}>
          {site.colophon.tools.map((tool, i) => (
            <li key={tool}>
              <button
                type="button"
                className={styles.tag}
                onPointerEnter={() => setHover(i % TILES.length)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i % TILES.length)}
                onBlur={() => setHover(null)}
              >
                {tool}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.mini} aria-hidden="true">
          {TILES.map((i) => (
            <span
              key={i}
              className={`${styles.tile} ${hover === i && !reducedMotion ? styles.tip : ''}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
