import styles from './SectionIndex.module.css'

type Props = {
  index: string
  className?: string
}

export function SectionIndex({ index, className }: Props) {
  return <p className={`${styles.index} ${className ?? ''}`}>{index}</p>
}
