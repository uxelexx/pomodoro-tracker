import { DASHOFFSET, DASHSTROKE } from '@/utils/constants'

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`
}

export function calcTick(seconds: number) {
  return (DASHSTROKE - DASHOFFSET) / seconds
}
