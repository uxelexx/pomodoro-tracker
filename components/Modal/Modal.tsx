import React, { useEffect, useRef, useState, type MouseEvent } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'

type ModalProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const portalContainer = document.createElement('div')
document.body.prepend(portalContainer)

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const [focusableElements, setFocusableElements] =
    useState<NodeListOf<HTMLElement> | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  function handleClickOutside(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keyup', handleEsc)

      if (modalRef.current) {
        modalRef.current.focus()
        const focusableElems = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        setFocusableElements(focusableElems)
      }
    }

    return () => {
      document.removeEventListener('keyup', handleEsc)
      setFocusableElements(null)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    // trap focus inside modal window
    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && focusableElements) {
        const firstElem = focusableElements[0]
        const lastElem = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElem) {
          lastElem?.focus()
          event.preventDefault()
        } else if (!event.shiftKey && document.activeElement === lastElem) {
          firstElem?.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [focusableElements])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      tabIndex={-1}
      ref={modalRef}
      onMouseDown={handleClickOutside}
      className={styles.overlay}
    >
      {children}
    </div>,
    portalContainer
  )
}
