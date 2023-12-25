import { useCallback, useEffect, useRef, useState } from 'react'
import { calcTick } from '../../utils'

export function useTimer(minutes: number) {
  const minutesToSeconds = minutes * 60
  const [isPause, setIsPause] = useState(true)
  const [seconds, setSeconds] = useState(minutesToSeconds)
  const [dashOffset, setDashOffset] = useState(0)
  const startTimeRef = useRef<number>(0)
  const requestRef = useRef<number | null>(null)

  const dashOffsetTick = calcTick(minutesToSeconds)

  useEffect(() => {
    setSeconds(minutesToSeconds)
    setDashOffset(0)
    setIsPause(true)
  }, [minutesToSeconds])

  const animate = useCallback(
    (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time
      }

      const elapsed = time - startTimeRef.current

      if (elapsed >= 1000) {
        // One second has passed
        startTimeRef.current = time
        if (seconds > 0) {
          setSeconds(s => s - 1)
          setDashOffset(dashOffset - dashOffsetTick)
        } else {
          // Pomodoro session is complete
          setIsPause(true)
          setSeconds(0)
          setDashOffset(0)
          //todo add audio on timer end
          return
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    },
    [dashOffset, dashOffsetTick, seconds]
  )

  useEffect(() => {
    if (!isPause) {
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
    }
  }, [isPause, seconds, animate, minutes])

  return { seconds, dashOffset, isPause, setIsPause }
}
