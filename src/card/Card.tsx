import React, { useEffect, useRef, useMemo, createRef, RefObject } from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "../store";
import styles from "./Card.module.css";
import { CardInfo, CardIndex } from "./types";
import { State } from "../store/State";
import { isVictory } from "../victory";

type Pos = [number, number];
const getNextCardPos = (
  [x, y]: Pos,
  [xMax, yMax]: Pos,
  event: KeyboardEvent,
): Pos => {
  switch (event.code) {
    case "ArrowLeft":
      return [Math.max(0, x - 1), y];
    case "ArrowRight":
      return [Math.min(xMax, x + 1), y];
    case "ArrowUp":
      return [x, Math.max(0, y - 1)];
    case "ArrowDown":
      return [x, Math.min(yMax, y + 1)];
    default:
      return [x, y];
  }
};

const getNextCardIndex = (
  currentCardIndex: number,
  event: KeyboardEvent,
  state: State,
): number => {
  const [x, y] = getNextCardPos(
    [
      currentCardIndex % state.width,
      Math.floor(currentCardIndex / state.width),
    ],
    [state.width - 1, state.height - 1],
    event,
  );
  return x + y * state.width;
};

type CardProps = {
  card: CardInfo;
  cardIndex: CardIndex;
  isFlipped: boolean;
  isMatched: boolean;
};
const Card = React.forwardRef<HTMLButtonElement, CardProps>(function Card(
  { card, cardIndex, isFlipped, isMatched },
  ref,
) {
  const dispatch = useDispatch();
  return (
    <button
      ref={ref}
      autoFocus={cardIndex === 0}
      key={cardIndex}
      className={cn(styles.card, {
        [styles.flipped]: isFlipped || isMatched,
        [styles.matched]: isMatched,
      })}
      onClick={() =>
        !isFlipped &&
        !isMatched &&
        dispatch({ type: "FLIP", payload: cardIndex })
      }
    >
      <div className={styles.front}>😶</div>
      <div className={styles.back}>{card.emoji}</div>
    </button>
  );
});

const getActiveCardIndex = (cardRefs: RefObject<HTMLButtonElement>[]) =>
  cardRefs
    .map((cardRef) => cardRef.current)
    .indexOf(document.activeElement as HTMLButtonElement);

export const CardContainer: React.FC = () => {
  const state = useSelector((state) => state);
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useMemo(
    () =>
      [...Array(state.cards.length)].map(() => createRef<HTMLButtonElement>()),
    [state.cards.length],
  );
  useEffect(() => {
    const cardEl = ref.current;
    if (!cardEl) return;
    const onKeyDown = (event: KeyboardEvent) => {
      setTimeout(() => {
        const nextCardIndex = getNextCardIndex(
          getActiveCardIndex(cardRefs),
          event,
          state,
        );
        if (nextCardIndex === -1) {
          return;
        }
        cardRefs[nextCardIndex].current?.focus();
      });
    };
    cardEl?.addEventListener("keydown", onKeyDown);

    return () => {
      cardEl?.removeEventListener("keydown", onKeyDown);
    };
  }, [cardRefs, state]);
  const victory = isVictory(state);
  useEffect(() => {
    if (!victory) {
      cardRefs[0].current?.focus();
    }
  }, [cardRefs, victory]);
  const width = `${state.width * 4}em`;

  return (
    <div
      ref={ref}
      className={styles.cardContainer}
      style={{ width, height: width }}
    >
      {state.cards.map((card, cardIndex) => (
        <Card
          ref={cardRefs[cardIndex]}
          key={cardIndex}
          card={card}
          cardIndex={cardIndex}
          isFlipped={state.flipped.includes(cardIndex)}
          isMatched={state.matched.includes(card.emoji)}
        />
      ))}
    </div>
  );
};
