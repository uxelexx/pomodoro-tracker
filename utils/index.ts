import type { Colors } from '@/types'
import { DASHOFFSET, DASHSTROKE, colors } from '@/constants'

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

export function getKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

export function getEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export function getAccentColor(color: Colors) {
  return colors[color]
}
