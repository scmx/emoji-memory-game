import { useEffect, useRef } from "react";
import { isVictory } from ".";
import { useDispatch, useSelector } from "../store";
import styles from "./Victory.module.css";

export function Victory() {
  const victory = useSelector(isVictory);
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  });

  if (!victory) {
    return null;
  }
  return (
    <div className={styles.victory}>
      You win!
      <button
        ref={ref}
        className={styles.playAgain}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Play again
      </button>
    </div>
  );
}
