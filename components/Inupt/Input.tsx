import { type InputHTMLAttributes, useRef } from 'react'

import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange() {
    if (inputRef.current) {
      const event = {
        target: inputRef.current,
      }
      props.onChange?.(event)
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
    <label htmlFor={props.id}>
      {label}
      <div className={styles['input-container']}>
        <button
          tabIndex={-1}
          className={styles.inc}
          type="button"
          onClick={increment}
        >
          &#8249;
        </button>
        <input ref={inputRef} {...props} id={props.id} type="number" step={1} />
        <button
          tabIndex={-1}
          className={styles.dec}
          type="button"
          onClick={decrement}
        >
          &#8250;
        </button>
      </div>
    </label>
  )
}
