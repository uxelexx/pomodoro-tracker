import { usePomodoro } from '@/context/timerContext'
import type { Timer } from '@/types'
import { type MouseEvent, useState } from 'react'
import { Timer as PomodoroTimer } from '../Timer'

import styles from './Pomodoro.module.css'

export function Pomodoro() {
  const { durations } = usePomodoro()
  const [timerType, setTimerType] = useState<Timer>('pomodoro')
  const minutes = durations[timerType]

  function handleTimerTypeChange(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLButtonElement) {
      setTimerType(event.target.value as Timer)
    }
  }

  function activeClass(type: Timer) {
    return timerType === type ? styles.active : ''
  }

  return (
    <section>
      <div className={styles.buttons} onClick={handleTimerTypeChange}>
        <button className={activeClass('pomodoro')} value="pomodoro">
          Pomodoro
        </button>
        <button className={activeClass('shortBreak')} value="shortBreak">
          Short break
        </button>
        <button className={activeClass('longBreak')} value="longBreak">
          Long break
        </button>
      </div>
      <PomodoroTimer initialMinutes={minutes} />
    </section>
  )
}
