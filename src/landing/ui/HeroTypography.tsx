import type { Ref } from 'react'
import { site } from '@/config/site'
import styles from './HeroTypography.module.css'

type Props = {
  nameRef?: Ref<HTMLHeadingElement>
  reducedMotion?: boolean
}

export function HeroTypography({ nameRef, reducedMotion }: Props) {
  return (
    <header className={`${styles.hero} ${reducedMotion ? styles.reduced : ''}`}>
      <p className={styles.metaLeft}>{site.meta.left}</p>
      <p className={styles.metaRight}>{site.meta.right}</p>
      <h1 className={styles.name} ref={nameRef}>
        <span className={styles.line}>{site.name.first}</span>
        <span className={styles.line}>{site.name.last}</span>
      </h1>
    </header>
  )
}
