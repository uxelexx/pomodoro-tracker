import styles from './Settings.module.css'

import { Input } from '@/components/Input'
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
    const { id, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [id]: Number(value),
    }))
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
            onChange={handleChangeInput}
            value={inputs.pomodoro}
          />
          <Input
            label="short-break"
            onChange={handleChangeInput}
            value={inputs['short-break']}
          />
          <Input
            label="long-break"
            onChange={handleChangeInput}
            value={inputs['long-break']}
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
