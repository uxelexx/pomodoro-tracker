import React, { createContext, useContext } from 'react'
import { useImmer } from 'use-immer'

type Timer = 'pomodoro' | 'short-break' | 'long-break'

type ColorsHex = '#f77272' | '#70f2f7' | '#d980f8'
type Colors = 'red' | 'blue' | 'purple'

type Fonts = string

type Durations = Record<Timer, number>

type InitialState = {
  color: ColorsHex
  font: Fonts
  durations: Durations
}

type ContextProps = InitialState & {
  changeFont: (font: Fonts) => void
  changeColor: (color: Colors) => void
}

const colors: Record<Colors, ColorsHex> = {
  red: '#f77272',
  blue: '#70f2f7',
  purple: '#d980f8',
}

const initialState: InitialState = {
  color: colors.purple,
  font: 'defaultFont',
  durations: {
    pomodoro: 25 * 60, // 25 minutes in seconds
    'short-break': 5 * 60, // 5 minutes in seconds
    'long-break': 15 * 60, // 15 minutes in seconds
  },
}

const PomodoroContext = createContext<ContextProps>({} as ContextProps)

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useImmer<InitialState>(initialState)

  function changeFont(font: Fonts) {
    setValue(draft => {
      draft.font = font
    })
  }

  function changeColor(color: Colors) {
    setValue(draft => {
      draft.color = colors[color]
    })
  }

  const contextValues = {
    ...value,
    changeFont,
    changeColor,
  }

  return (
    <PomodoroContext.Provider value={contextValues}>
      {children}
    </PomodoroContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePomodoro = () => useContext(PomodoroContext)
