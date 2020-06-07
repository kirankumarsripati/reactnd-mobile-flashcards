import {AsyncStorage} from 'react-native'
import {DECKS_STORAGE_KEY, handleDecks} from './_decks'


export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(handleDecks)
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[id]
      return deck
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function submitCard(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[title]
      deck.questions.push(card)
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck
      }))
    })
}

export function dropDeck(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
