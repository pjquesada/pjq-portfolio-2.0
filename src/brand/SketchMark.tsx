import styles from './SketchMark.module.css'

type Props = {
  kind?: 'hatch' | 'arrow'
  className?: string
}

export function SketchMark({ kind = 'hatch', className }: Props) {
  if (kind === 'arrow') {
    return (
      <svg
        className={`${styles.mark} ${className ?? ''}`}
        viewBox="0 0 48 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 11c8-6 18-8 28-6 4 .8 8 2.4 14 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M38 4c2 3 5 6 8 8-4 .4-8 .2-11-1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg
      className={`${styles.mark} ${className ?? ''}`}
      viewBox="0 0 36 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 4l8 12M9 3l8 13M15 2l9 14M22 3l8 12" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
