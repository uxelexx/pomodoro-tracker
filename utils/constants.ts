import type { Colors, ColorsHex, MinMax, Timer } from '@/types'

export const RADIUS = 40
export const DASHOFFSET = 110
export const DASHSTROKE = 360

export const colors: Record<Colors, ColorsHex> = {
  red: '#f77272',
  blue: '#6488ea',
  purple: '#d980f8',
} as const

export const maxMinTime: Record<Timer, MinMax> = {
  pomodoro: {
    max: 60,
    min: 20,
  },
  'short-break': {
    max: 10,
    min: 5,
  },
  'long-break': {
    max: 20,
    min: 15,
  },
} as const
