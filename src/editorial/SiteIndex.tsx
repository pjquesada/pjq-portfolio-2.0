import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import styles from './SiteIndex.module.css'

export function SiteIndex() {
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const ids = site.nav.map((item) => item.id)
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target.getAttribute('id')
        if (id) setActive(id)
      },
      { threshold: [0.18, 0.4], rootMargin: '-20% 0px -45% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav} aria-label="Sections">
      {site.nav.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={item.id === active ? styles.on : undefined}
        >
          <span className={styles.num}>{item.index}</span>
          <span className={styles.label}>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
