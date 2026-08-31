import type { Ref } from 'react'
import styles from './ScrollIndicator.module.css'

type Props = {
  rootRef?: Ref<HTMLDivElement>
}

export function ScrollIndicator({ rootRef }: Props) {
  return (
    <div className={styles.indicator} ref={rootRef} aria-hidden="true">
      <span className={styles.label}>Scroll</span>
      <span className={styles.line} />
    </div>
  )
}
