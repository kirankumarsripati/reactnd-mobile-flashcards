import * as API from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';

export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks,
  }
}

export const addDeck = (id, title) => {
  return {
    type: ADD_DECK,
    id,
    title,
  }
}

export const addCard = (id, card) => {
  return {
    type: ADD_CARD,
    id,
    card,
  }
}

export const deleteDeck = (id) => {
  return {
    type: DELETE_DECK,
    id,
  }
}

export const handleGetAllDecks = () => (dispatch) => {
  return API.getDecks()
    .then((decks) => {
      dispatch(getDecks(decks));
    });
}

export const handleAddDeck = (id, title) => (dispatch) => {
  return API.saveDeckTitle(id, title)
    .then((deck) => {
      dispatch(addDeck(id, title));
    })
}

export const handleAddCard = (deckId, card) => (dispatch) => {
  return API.addCard(deckId, card)
    .then(() => {
      dispatch(addCard(deckId, card));
    })
}

export const handleDeleteDeck = (deckId) => (dispatch) => {
  return API.deleteDeck(deckId)
    .then(() => {
      dispatch(deleteDeck(deckId));
    })
}
