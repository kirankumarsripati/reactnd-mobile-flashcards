import {RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK, REMOVE_DECK} from '../actions'


function decks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat([action.card])
        }
      }
    case REMOVE_DECK :
      delete state[action.title]
      return {
        ...state
      }
    default :
      return state
  }
}

export default decks
