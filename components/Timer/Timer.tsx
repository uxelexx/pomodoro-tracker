import { calcTick, formatTime } from '@/utils/index'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Progress } from '../Progress'
import styles from './Timer.module.css'

type PomodoroProps = {
  seconds: number
  isRunning: boolean
}

export function Timer() {
  const [seconds, setSeconds] = useState<number>(10)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [dashOffset, setDashOffset] = useState(0)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const tick = useMemo(() => calcTick(seconds), []) //memoize initial seconds tick value

  const animate = (time: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = time
    }

    const elapsed = time - startTimeRef.current

    if (elapsed >= 1000) {
      // One second has passed
      startTimeRef.current = time
      if (seconds > 0) {
        setSeconds(seconds - 1)
        setDashOffset(dashOffset - tick)
      } else {
        // Pomodoro session is complete
        setIsRunning(false)
        setSeconds(0)
        setDashOffset(0)
        return
      }
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, seconds])

  function handlePause() {
    setIsRunning(!isRunning)
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
    }
  }

  return (
    <article className={styles.circles}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <Progress dashOffset={dashOffset} />
          <p className={styles.timer}>{formatTime(seconds)}</p>
          <button onClick={handlePause} className={styles.pause}>
            <p>{!isRunning ? 'Start' : 'Pause'}</p>
          </button>
        </div>
      </div>
    </article>
  )
}
