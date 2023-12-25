import { type InputHTMLAttributes, useRef } from 'react'

import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { id, onChange } = props

  function handleChange() {
    if (inputRef.current) {
      const event = {
        target: inputRef.current,
      }
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
      <label htmlFor={id}>{label}</label>
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
          id={id}
          type="number"
          step={1}
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
