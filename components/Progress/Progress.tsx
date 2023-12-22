import styles from './Progress.module.css'

import { DASHSTROKE, RADIUS } from '@/utils/constants'

type ProgressProps = {
  dashOffset: number
}

export function Progress({ dashOffset }: ProgressProps) {
  return (
    <svg
      className={styles.svg}
      version="1.1"
      id="circle"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        strokeDashoffset={dashOffset}
        strokeDasharray={DASHSTROKE.toString()}
      ></circle>
    </svg>
  )
}
