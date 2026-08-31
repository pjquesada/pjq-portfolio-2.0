import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import styles from './Loader.module.css'

export function Loader() {
  const { active, progress, loaded, total } = useProgress()
  const [hidden, setHidden] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const assetsReady = progress >= 100 || (total > 0 && loaded >= total && !active)
    const delay = assetsReady ? 200 : 2400
    const timer = window.setTimeout(() => setLeaving(true), delay)
    return () => window.clearTimeout(timer)
  }, [active, loaded, progress, total])

  useEffect(() => {
    if (!leaving) return
    const done = window.setTimeout(() => setHidden(true), 700)
    return () => window.clearTimeout(done)
  }, [leaving])

  if (hidden) return null

  return (
    <div className={`${styles.loader} ${leaving ? styles.leave : ''}`} aria-hidden="true">
      <p className={styles.mark}>PQ</p>
      <div className={styles.track}>
        <span className={styles.bar} style={{ transform: `scaleX(${Math.max(progress / 100, 0.06)})` }} />
      </div>
    </div>
  )
}
