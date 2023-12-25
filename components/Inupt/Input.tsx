import type { InputHTMLAttributes } from 'react'

import './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <label htmlFor={props.id}>
      {label}
      <input {...props} id={props.id} type="number" />
    </label>
  )
}
