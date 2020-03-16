import ReactDOM from "react-dom";
import React, {
  useReducer,
  ReducerAction,
  Reducer,
  Dispatch,
  useLayoutEffect,
  useRef
} from "react";
import cn from "classnames";
import { Emoji, getRandomEmojiPairs } from "./emojis";
import "./styles.scss";
import styles from "./App.scss";
import { size } from "./size";

type CardIndex = number;
type Card = {
  emoji: Emoji;
};

type State = {
  width: number;
  height: number;
  flipped: CardIndex[];
  matched: Emoji[];
  cards: Card[];
  attempts: number;
};

const cardCount = 16;
const [width, height] = size(cardCount);

const generateCards = (size: number): State["cards"] =>
  getRandomEmojiPairs(size).map(emoji => ({ emoji }));

const buildCards = (state: State): State => ({
  ...state,
  cards: generateCards(state.width * state.height)
});

console.log(styles);

const initialState: State = buildCards({
  width,
  height,
  flipped: [],
  matched: [],
  cards: [],
  attempts: 0
});

type Action = { type: string; payload: any };

const reducer: Reducer<State, Action> = (state: State, action) => {
  console.groupCollapsed(action.type, action.payload);
  console.log("before", state);
  const result: State = actions[action.type](state, action.payload);
  console.log("after", result);
  console.groupEnd();
  return result;
};

const actions: Record<string, (state: State, ...args: any[]) => State> = {
  reset: state => initialState,
  flip: (state, cardIndex: CardIndex): State => {
    const nextState = { ...state, attempts: state.attempts + 1 };
    if (state.flipped.length === 0) {
      return { ...nextState, flipped: [cardIndex] };
    }
    const prevIndex = state.flipped[state.flipped.length - 1];
    if (state.cards[cardIndex].emoji !== state.cards[prevIndex].emoji) {
      return { ...nextState, flipped: [prevIndex, cardIndex] };
    }
    return {
      ...nextState,
      flipped: [],
      matched: [...state.matched, state.cards[cardIndex].emoji]
    };
    // const flipped =
    //   state.flipped.length === 2
    //     ? [state.flipped[1], cardIndex]
    //     : [state.flipped[0], cardIndex];

    // const match =
    //   state.flipped.length === 2 &&
    //   state.cards[flipped[0]].emoji === state.cards[flipped[1]].emoji
    //     ? [state.cards[cardIndex].emoji]
    //     : [];
    // if (match.length) {
    //   console.log(match[0]);
    // }

    // return {
    //   ...state,
    //   flipped,
    //   matched: [...state.matched, ...match]
    // };
  }
};

type CardProps = {
  card: Card;
  cardIndex: CardIndex;
  dispatch: Dispatch<Action>;
  isFlipped: boolean;
  isMatched: boolean;
};
const Card: React.FC<CardProps> = ({
  card,
  cardIndex,
  dispatch,
  isFlipped,
  isMatched
}) => {
  return (
    <button
      autoFocus={cardIndex === 0}
      key={cardIndex}
      className={cn(styles.card, {
        [styles.flipped]: isFlipped || isMatched,
        [styles.matched]: isMatched
      })}
      onClick={() => dispatch({ type: "flip", payload: cardIndex })}
      disabled={isFlipped || isMatched}
    >
      <div className={styles.front}>😶</div>
      <div className={styles.back}>{card.emoji}</div>
    </button>
  );
};

const useZoom = <T extends HTMLElement>(): React.MutableRefObject<T | null> => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const onResize = () => {
      if (ref.current == null) {
        return;
      }
      const parent = ref.current.parentNode as HTMLElement;
      console.log(parent.clientWidth);
      console.log(parent.clientHeight);

      const wd = parent.clientWidth / ref.current.clientWidth;
      const hd = parent.clientHeight / ref.current.clientHeight;
      const zoom = (parent.clientWidth > parent.clientHeight
        ? hd
        : wd
      ).toString();
      console.log(
        parent.clientWidth,
        ref.current.clientWidth,
        parent.clientHeight,
        ref.current.clientHeight,
        zoom
      );
      ref.current.style.zoom = zoom;
      // console.log({
      //   wd,
      //   hd,
      //   zoom,
      //   current: [ref.current.clientWidth, ref.current.clientHeight]
      // });
      // console.log(event);
      // console.log({
      //   clientWidth: ref.current.clientWidth,
      //   clientHeight: ref.current.clientHeight
      // });
      // debugger
      // console.log(ref.current.parentNode);
    };

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return ref;
};

const App = () => {
  const ref = useZoom<HTMLDivElement>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const width = state.width * 4;
  const victory = state.matched.length * 2 === state.cards.length;
  return (
    <div
      ref={ref}
      className={cn(styles.container, { [styles.victory]: victory })}
    >
      <div className={styles.score}>{state.attempts}</div>
      <div
        className={styles.cardContainer}
        style={{ width: `${width}em`, height: `${width}em` }}
      >
        {state.cards.map((card, cardIndex) => (
          <Card
            key={cardIndex}
            card={card}
            cardIndex={cardIndex}
            dispatch={dispatch}
            isFlipped={state.flipped.includes(cardIndex)}
            isMatched={state.matched.includes(card.emoji)}
          />
        ))}
      </div>
      {victory && (
        <div className={styles.victory}>
          You won!
          <button
            className={styles.playAgain}
            onClick={() => dispatch({ type: "reset" })}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.body.querySelector("#main"));
