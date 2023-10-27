import cn from "classnames";
import { CardContainer } from "./card/Card";
import { useZoom } from "./zoom";
import { Victory } from "./victory/Victory";
import { Score } from "./score/Score";
import styles from "./App.module.css";
import { useSelector } from "./store";
import { isVictory } from "./victory";

function App() {
  const ref = useZoom<HTMLDivElement>();
  const victory = useSelector(isVictory);

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
  );
}

export default App;
