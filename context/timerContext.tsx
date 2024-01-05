import type { Colors, Durations, Fonts, Timer } from '@/types'
import { getAccentColor, getMinMaxTime } from '@/utils'
import React, { createContext, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

// some new feature

type InitialCtxState = {
  durations: Durations
  font: Fonts
  activeColor: Colors
}

type CtxActions = {
  changeFont: (font: Fonts) => void
  changeColor: (color: Colors) => void
  changeDurations: (type: Timer, time: number) => void
}

type ContextProps = InitialCtxState & CtxActions

const initialState: InitialCtxState = {
  durations: {
    pomodoro: getMinMaxTime('pomodoro').min,
    'short-break': getMinMaxTime('short-break').min,
    'long-break': getMinMaxTime('long-break').min,
  },
  font: 'defaultFont',
  activeColor: 'red',
}

const PomodoroContext = createContext<ContextProps>({} as ContextProps)

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useImmer<InitialCtxState>(initialState)

  function changeFont(font: Fonts) {
    setState(draft => {
      draft.font = font
    })
  }

  function changeDurations(type: Timer, time: number) {
    setState(draft => {
      draft.durations[type] = time
    })
  }

  function changeColor(color: Colors) {
    setState(draft => {
      draft.activeColor = color
    })
  }

  useEffect(() => {
    function changeAccentColor(color: Colors) {
      document.documentElement.style.setProperty(
        '--accent',
        getAccentColor(color)
      )
    }
    changeAccentColor(state.activeColor)
  }, [state.activeColor])

  const contextValues = {
    ...state,
    changeFont,
    changeColor,
    changeDurations,
  }

  return (
    <PomodoroContext.Provider value={contextValues}>
      {children}
    </PomodoroContext.Provider>
  )
}

//eslint-disable-next-line react-refresh/only-export-components
export const usePomodoro = () => useContext(PomodoroContext)
