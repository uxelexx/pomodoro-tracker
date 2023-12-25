import { formatTime } from '@/utils'
import { Progress } from '../Progress'
import styles from './Timer.module.css'
import { useTimer } from './useTimer'

type PomodoroProps = {
  initialMinutes: number
}

export function Timer({ initialMinutes }: PomodoroProps) {
  const { dashOffset, seconds, isPause, setIsPause } = useTimer(initialMinutes)
  const formatedTime = formatTime(seconds)

  function togglePause() {
    setIsPause(p => !p)
  }

  return (
    <article className={styles.circles}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <Progress dashOffset={dashOffset} />
          <p className={styles.timer}>{formatedTime}</p>
          <button onClick={togglePause} className={styles.pause}>
            {isPause ? 'Start' : 'Pause'}
          </button>
        </div>
      </div>
    </article>
  )
}
