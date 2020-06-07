import {
  GET_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
} from '../actions';

const decks = (state={}, action) => {
  switch(action.type) {
    case GET_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.id]: {
          title: action.title,
          questions: [],
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat([action.card]),
        }
      }
    case DELETE_DECK :
      delete state[action.id]
      return {
        ...state,
      }
    default :
      return state;
  }
}

export default decks;
