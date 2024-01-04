export type ColorsHex = '#f77272' | '#6488ea' | '#d980f8'
export type Colors = 'red' | 'blue' | 'purple'

export type Fonts = string //todo: Add fonts 

export type Timer = 'pomodoro' | 'short-break' | 'long-break'
export type Durations = Record<Timer, number>
export type MinMax = {
  max: number
  min: number
}
