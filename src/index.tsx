import ReactDOM from 'react-dom'
import React from 'react'
import cn from 'classnames'
import { Provider, useSelector } from './Store'
import { CardContainer } from './Card'
import { useZoom } from './zoom'
import { Victory, isVictory } from './Victory'
import { Score } from './Score'
import './styles.scss'
import styles from './App.scss'

const App: React.FC = () => {
  const ref = useZoom<HTMLDivElement>()
  const victory = useSelector(isVictory)

  return (
    <div
      ref={ref}
      className={cn(styles.container, {
        [styles.victory]: victory
      })}>
      <Score />
      <CardContainer />
      <Victory />
    </div>
  )
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.body.querySelector('#main')
)
