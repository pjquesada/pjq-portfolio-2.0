import { site } from '@/config/site'
import styles from './QuoteStatement.module.css'

type Props = {
  rootRef?: (node: HTMLQuoteElement | null) => void
  setLineRef?: (index: number, node: HTMLSpanElement | null) => void
  reducedMotion?: boolean
}

export function QuoteStatement({ rootRef, setLineRef, reducedMotion }: Props) {
  return (
    <blockquote className={`${styles.quote} ${reducedMotion ? styles.static : ''}`} ref={rootRef}>
      <p className={styles.lines}>
        {site.quote.map((line, i) => (
          <span className={styles.mask} key={line}>
            <span className={styles.line} ref={(node) => setLineRef?.(i, node)}>
              {line}
            </span>
          </span>
        ))}
      </p>
    </blockquote>
  )
}
