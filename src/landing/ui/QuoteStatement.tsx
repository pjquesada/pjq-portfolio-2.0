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
      <p className={styles.meta}>{site.quoteMeta}</p>
      <p className={styles.lines}>
        {site.quote.map((line, i) => (
          <span className={`${styles.mask} ${styles[`weight${i}` as 'weight0']}`} key={line} data-quote-mask>
            <span className={styles.line} data-quote-line>
              {line}
            </span>
          </span>
        ))}
      </p>
      <p className={styles.kicker}>{site.quoteKicker}</p>
    </blockquote>
  )
}
