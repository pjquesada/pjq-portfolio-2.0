import styles from './Pips.module.css'

type Props = {
  count: number
  filled?: number
  label?: string
}

export function Pips({ count, filled = count, label }: Props) {
  const total = Math.max(1, Math.min(6, count))
  const on = Math.max(0, Math.min(total, filled))
  return (
    <span className={styles.pips} aria-hidden={label ? undefined : true} aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`${styles.pip} ${i < on ? styles.on : ''}`} />
      ))}
    </span>
  )
}
