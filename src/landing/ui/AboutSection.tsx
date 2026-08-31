import { site } from '@/config/site'
import styles from './AboutSection.module.css'

export function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <p className={styles.index}>{site.about.index}</p>
        <div className={styles.copy}>
          <p className={styles.kicker}>{site.about.kicker}</p>
          {site.about.body.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        <span>
          {site.name.first} {site.name.last}
        </span>
        <span>{site.footer.note}</span>
        <span>© {site.footer.year}</span>
      </footer>
    </section>
  )
}
