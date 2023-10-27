import { getRandomEmojiPairs, Emoji } from './emojis'
import { CardIndex, Card } from './Card'
import { size } from './size'
import React, {
  Reducer,
  useReducer,
  createContext,
  Dispatch,
  useContext
} from 'react'

const cardCount = 16
const [width, height] = size(cardCount)

export type State = {
  width: number
  height: number
  flipped: CardIndex[]
  matched: Emoji[]
  cards: Card[]
  attempts: number
}

const generateCards = (size: number): State['cards'] =>
  getRandomEmojiPairs(size).map(emoji => ({ emoji }))

const buildCards = (state: State): State => ({
  ...state,
  cards: generateCards(state.width * state.height)
})

const getInitialState = (): State =>
  buildCards({
    width,
    height,
    flipped: [],
    matched: [],
    cards: [],
    attempts: 0
  })

type FSA = { type: string; payload?: any; error?: boolean }
type FlipAction = FSA & { type: 'FLIP'; payload: number }
type ResetAction = FSA & { type: 'RESET' }

export type Action = FlipAction | ResetAction

type AppReducer = Reducer<State, Action>

const appReducer: AppReducer = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      return getInitialState()
    }
    case 'FLIP': {
      const cardIndex: CardIndex = action.payload
      const attempts = state.attempts + 1
      console.log(
        state.width * state.height,
        attempts,
        state.matched.length * 2
      )
      const nextState = { ...state, attempts }
      if (state.flipped.length === 0) {
        return { ...nextState, flipped: [cardIndex] }
      }
      const prevIndex = state.flipped[state.flipped.length - 1]
      if (state.cards[cardIndex].emoji !== state.cards[prevIndex].emoji) {
        return { ...nextState, flipped: [prevIndex, cardIndex] }
      }
      return {
        ...nextState,
        flipped: [],
        matched: [...state.matched, state.cards[cardIndex].emoji]
      }
    }
    default: {
      return state
    }
  }
}

type Middleware = (reducer: AppReducer) => AppReducer

const loggerMiddleware: Middleware = reducer => (state, action) => {
  console.groupCollapsed(action.type, action.payload)
  console.log('before', state)
  const result: State = reducer(state, action)
  console.log('after', result)
  console.groupEnd()
  return result
}

const rootReducer = loggerMiddleware(appReducer)

const StateContext = createContext<State>(getInitialState())
const DispatchContext = createContext<Dispatch<Action>>(action => null)

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, getInitialState())
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useDispatch = () => useContext(DispatchContext)

type Selector<T> = (state: State) => T
export const useSelector = <T,>(selector: Selector<T>) =>
  selector(useContext(StateContext))
