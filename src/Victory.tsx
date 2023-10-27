import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector, State } from './Store'
import styles from './Victory.scss'

export const isVictory = (state: State) =>
  state.matched.length * 2 === state.cards.length

export const Victory: React.FC = () => {
  const victory = useSelector(isVictory)
  const dispatch = useDispatch()
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  })

  if (!victory) {
    return null
  }
  return (
    <div className={styles.victory}>
      You win!
      <button
        ref={ref}
        className={styles.playAgain}
        onClick={() => dispatch({ type: 'RESET', payload: null })}>
        Play again
      </button>
    </div>
  )
}
