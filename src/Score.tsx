import React from 'react'
import { useSelector, State } from './Store'
import styles from './Score.scss'

const getTotal = (state: State): number => state.width * state.height

export const getPar = (state: State): number =>
  Math.floor(getTotal(state) * 1.4)

export const getScore = (state: State): string =>
  `${Math.round(
    ((getTotal(state) - state.attempts + state.matched.length * 2) /
      getTotal(state)) *
      100
  )}% ${state.attempts} / ${getTotal(state)} Par ${getPar(state)}`
// state.width * state.height - state.attempts + state.matched.length * 2

export const Score: React.FC = () => {
  const score = useSelector(getScore)
  return <div className={styles.score}>{score}</div>
}
