import { WORK } from '@/config/work'
import { Pips } from '@/brand/Pips'
import { SectionIndex } from '@/brand/SectionIndex'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import reveal from './reveal.module.css'
import { Reveal } from './useReveal.tsx'
import styles from './SelectedWork.module.css'

export function SelectedWork() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className={styles.work} id="work">
      <Reveal className={`${reveal.reveal} ${styles.header}`} reducedMotion={reducedMotion}>
        <SectionIndex index="04 / Selected work" />
        <p className={styles.thesis}>One decision causes the next.</p>
      </Reveal>

      <ol className={styles.list}>
        {WORK.map((project, i) => (
          <li key={project.id} className={styles.item}>
            <Reveal className={reveal.reveal} reducedMotion={reducedMotion}>
              <article className={styles.project}>
                <div className={styles.visual} data-n={project.number}>
                  <span className={styles.num}>{project.number}</span>
                  <span className={styles.divider} aria-hidden="true" />
                  <Pips count={4} filled={project.pips} />
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.name}>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <dl>
                    <div>
                      <dt>Role</dt>
                      <dd>
                        <Pips count={3} filled={Math.min(3, project.pips)} />
                        {project.role}
                      </dd>
                    </div>
                    <div>
                      <dt>Year</dt>
                      <dd>
                        <Pips count={2} filled={2} />
                        {project.year}
                      </dd>
                    </div>
                    <div>
                      <dt>Type</dt>
                      <dd>
                        <Pips count={4} filled={project.pips} />
                        {project.discipline}
                      </dd>
                    </div>
                  </dl>
                  <p className={styles.summary}>{project.summary}</p>
                  <p className={styles.step}>
                    {String(i + 1).padStart(3, '0')} → {String(Math.min(i + 2, WORK.length)).padStart(3, '0')}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
