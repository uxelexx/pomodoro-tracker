import styles from './RadioButton.module.css'

import type { Colors, ColorsHex } from '@/types'
import { getEntries } from '@/utils'
import type { KeyboardEvent } from 'react'

type RadioButtonProps = {
  colors: Record<Colors, ColorsHex>
  selectedColor: Colors
  changeColor: (color: Colors) => void
}

export function RadioButton({
  colors,
  selectedColor,
  changeColor,
}: RadioButtonProps) {
  function handleKeyPress(
    event: KeyboardEvent<HTMLSpanElement>,
    color: Colors
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      changeColor(color)
    }
  }
  return getEntries(colors).map(([color, hex]) => (
    <label key={color} className={styles['custom-radio']}>
      <input
        type="radio"
        id={color}
        checked={selectedColor === color}
        onChange={() => changeColor(color)}
        tabIndex={-1}
      />
      <span className="sr-only">{color}</span>
      <span
        className={styles['radio-dot']}
        onKeyDown={e => handleKeyPress(e, color)}
        tabIndex={0}
        role="radio"
        aria-checked={selectedColor === color}
        aria-label={color}
        style={{ backgroundColor: hex }}
      ></span>
    </label>
  ))
}
