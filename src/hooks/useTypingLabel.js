import { useEffect, useRef, useState } from 'react'

const TYPING_SPEED_MS = 70

export const useTypingLabel = (label, trigger, startDelay = 0) => {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const timerRef = useRef(null)
  const delayRef = useRef(null)
  const isRunKeyMode = typeof trigger === 'number'

  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (delayRef.current) {
      clearTimeout(delayRef.current)
      delayRef.current = null
    }
  }

  useEffect(() => {
    const active = isRunKeyMode ? trigger > 0 : trigger

    if (!active) {
      clearTimers()
      setTyping(false)
      setText('')
      return undefined
    }

    clearTimers()
    setTyping(false)
    setText('')

    delayRef.current = setTimeout(() => {
      setTyping(true)
      setText('')

      let index = 0
      timerRef.current = setInterval(() => {
        index += 1
        setText(label.slice(0, index))
        if (index >= label.length) {
          clearInterval(timerRef.current)
          timerRef.current = null
          setTyping(false)
        }
      }, TYPING_SPEED_MS)
    }, startDelay)

    return () => {
      clearTimers()
      if (!isRunKeyMode) {
        setTyping(false)
        setText('')
      }
    }
  }, [trigger, label, startDelay, isRunKeyMode])

  return { text, typing }
}
