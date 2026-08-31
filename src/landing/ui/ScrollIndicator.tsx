import styles from './ScrollIndicator.module.css'

export function ScrollIndicator() {
  return (
    <div className={styles.indicator} data-scroll-indicator aria-hidden="true">
      <span className={styles.label}>Scroll</span>
      <span className={styles.line} />
    </div>
  )
}
