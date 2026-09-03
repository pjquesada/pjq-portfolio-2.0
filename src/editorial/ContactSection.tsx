import { site } from '@/config/site'
import { SectionIndex } from '@/brand/SectionIndex'
import { SketchMark } from '@/brand/SketchMark'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import reveal from './reveal.module.css'
import { Reveal } from './useReveal.tsx'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className={styles.contact} id="contact">
      <Reveal className={reveal.reveal} reducedMotion={reducedMotion}>
        <SectionIndex index={site.contact.index} />
        <h2 className={styles.headline}>
          {site.contact.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <SketchMark kind="arrow" className={styles.arrow} />
      </Reveal>

      <Reveal className={`${reveal.reveal} ${styles.links}`} reducedMotion={reducedMotion}>
        <ul>
          {site.contact.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p className={styles.email}>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </Reveal>
    </section>
  )
}
