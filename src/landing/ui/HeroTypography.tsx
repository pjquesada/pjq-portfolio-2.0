import { site } from '@/config/site'
import styles from './HeroTypography.module.css'

type Props = {
  reducedMotion?: boolean
}

export function HeroTypography({ reducedMotion }: Props) {
  return (
    <header className={`${styles.hero} ${reducedMotion ? styles.reduced : ''}`}>
      <p className={styles.metaLeft}>{site.meta.left}</p>
      <p className={styles.metaRight}>{site.meta.right}</p>
      <div className={styles.nameWrap}>
        <h1 className={styles.name} data-hero-name>
          <span className={styles.line}>{site.name.first}</span>
          <span className={styles.line}>{site.name.last}</span>
        </h1>
        <p className={styles.fragment} data-hero-fragment>
          {site.fragment}
        </p>
      </div>
    </header>
  )
}
