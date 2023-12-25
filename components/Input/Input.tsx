import styles from './Input.module.css'

import type { Timer } from '@/types'
import { getMinMaxTime } from '@/utils'
import { useRef, type ChangeEvent, type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: Timer
}

export function Input({ label, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { onChange } = props
  const { max, min } = getMinMaxTime(label)

  function handleChange() {
    if (inputRef.current) {
      const event = {
        target: inputRef.current,
      } as ChangeEvent<HTMLInputElement>
      onChange?.(event)
    }
  }

  function increment() {
    if (inputRef.current) {
      inputRef.current.stepUp()
      handleChange()
    }
  }

  function decrement() {
    if (inputRef.current) {
      inputRef.current.stepDown()
      handleChange()
    }
  }
  return (
    <div className={styles.container}>
      <label htmlFor={label}>{label.replace('-', ' ')}</label>
      <div className={styles['input-container']}>
        <button
          tabIndex={-1}
          className={styles.inc}
          type="button"
          onClick={increment}
        >
          &#8249;
        </button>
        <input
          {...props}
          className={styles.input}
          ref={inputRef}
          id={label}
          type="number"
          step={1}
          max={max}
          min={min}
        />
        <button
          tabIndex={-1}
          className={styles.dec}
          type="button"
          onClick={decrement}
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}
