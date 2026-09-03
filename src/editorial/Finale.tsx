import { useEffect, useRef, useState } from 'react'
import { site } from '@/config/site'
import { usePrefersReducedMotion } from '@/landing/hooks/usePrefersReducedMotion'
import styles from './Finale.module.css'

const COUNT = 6

export function Finale() {
  const reducedMotion = usePrefersReducedMotion()
  const [fallen, setFallen] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const timers = useRef<number[]>([])

  const running = fallen > 0 && !revealed

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const start = () => {
    if (running) return
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []

    if (reducedMotion) {
      setFallen(COUNT)
      setRevealed(true)
      return
    }

    setRevealed(false)
    setFallen(1)
    for (let i = 1; i < COUNT; i += 1) {
      const id = window.setTimeout(() => setFallen(i + 1), i * 130)
      timers.current.push(id)
    }
    const done = window.setTimeout(() => setRevealed(true), COUNT * 130 + 280)
    timers.current.push(done)
  }

  return (
    <section className={styles.finale} aria-label="Chain reaction">
      <p className={styles.prompt}>{revealed ? site.finale.done : site.finale.prompt}</p>
      <div className={styles.row}>
        {Array.from({ length: COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.tile} ${fallen > i ? styles.down : ''} ${
              i === COUNT - 1 && revealed ? styles.reveal : ''
            }`}
            onClick={i === 0 ? start : undefined}
            disabled={i !== 0 || running}
            aria-label={i === 0 ? 'Start the chain reaction' : undefined}
            tabIndex={i === 0 ? 0 : -1}
          >
            {i === COUNT - 1 ? (
              <img src="/images/logo.png" alt="" className={styles.face} />
            ) : (
              <span className={styles.pips} aria-hidden="true">
                <i />
                <i />
              </span>
            )}
          </button>
        ))}
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
