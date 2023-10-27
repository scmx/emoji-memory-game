import cn from 'classnames'
import { useSelector } from './Store'
import { CardContainer } from './Card'
import { useZoom } from './zoom'
import { Victory, isVictory } from './Victory'
import { Score } from './Score'
import styles from './App.module.css'

function App() {
  const ref = useZoom<HTMLDivElement>()
  const victory = useSelector(isVictory)

  return (
    <div
      ref={ref}
      className={cn(styles.container, {
        [styles.victory]: victory,
      })}
    >
      <Score />
      <CardContainer />
      <Victory />
    </div>
  )
}

export default App
