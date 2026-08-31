import { site } from '@/config/site'
import styles from './QuoteStatement.module.css'

type Props = {
  reducedMotion?: boolean
}

export function QuoteStatement({ reducedMotion }: Props) {
  return (
    <blockquote
      className={`${styles.quote} ${reducedMotion ? styles.static : ''}`}
      data-quote
    >
      <p className={styles.lines}>
        {site.quote.map((line) => (
          <span className={styles.mask} key={line}>
            <span className={styles.line} data-quote-line>
              {line}
            </span>
          </span>
        ))}
      </p>
    </blockquote>
  )
}
