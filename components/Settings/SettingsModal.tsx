import styles from './Settings.module.css'

import { Input } from '@/components/Inupt'
import { RadioButton } from '@/components/RadioButton'
import { colors } from '@/constants'
import { usePomodoro } from '@/context/timerContext'
import type { Colors } from '@/types'
import { getKeys } from '@/utils'
import { useState, type ChangeEvent, type FormEvent } from 'react'

type SettingProps = {
  closeModal: () => void
}

export function SettingsModal({ closeModal }: SettingProps) {
  const { durations, changeDurations, activeColor, changeColor } = usePomodoro()
  const [inputs, setInputs] = useState(durations)
  const [selectedColor, setSelectedColor] = useState<Colors>(activeColor)

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setInputs({ ...inputs, [e.target.id]: Number(e.target.value) })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    getKeys(inputs).forEach(key => {
      changeDurations(key, inputs[key])
    })
    changeColor(selectedColor)
    closeModal()
  }

  function handleChangeColor(color: Colors) {
    setSelectedColor(color)
  }

  return (
    <div className={styles.modal}>
      <header className={styles['modal-header']}>
        <h2>Settings</h2>
        <button tabIndex={0} className={styles.close} onClick={closeModal}>
          <CrossIcon />
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <p>Time (minutes)</p>
        <div className={styles.durations}>
          <Input
            label="pomodoro"
            id="pomodoro"
            type="number"
            onChange={handleChangeInput}
            value={inputs.pomodoro}
            max={60}
            min={20}
          />
          <Input
            label="short break"
            id="shortBreak"
            type="number"
            onChange={handleChangeInput}
            value={inputs.shortBreak}
            max={10}
            min={5}
          />
          <Input
            label="long break"
            id="longBreak"
            type="number"
            onChange={handleChangeInput}
            value={inputs.longBreak}
            max={20}
            min={15}
          />
        </div>
        <div className={styles.hr} />
        <div className={styles.colors}>
          <p>Color</p>
          <div className={styles['radio-group']}>
            <RadioButton
              colors={colors}
              selectedColor={selectedColor}
              changeColor={handleChangeColor}
            />
          </div>
        </div>
        <button className={styles.apply} type="submit">
          Apply
        </button>
      </form>
    </div>
  )
}

///////////////////////// Close icon
const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
)
