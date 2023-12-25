import './App.css'
import { Pomodoro } from '@/components/Pomodoro'
import { Settings } from '@/components/Settings'
import { PomodoroProvider } from '@/context/timerContext'

function App() {
  return (
    <>
      <h1>pomodoro</h1>
      <PomodoroProvider>
        <Pomodoro />
        <Settings />
      </PomodoroProvider>
    </>
  )
}

export default App
