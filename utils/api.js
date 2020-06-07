import { AsyncStorage } from 'react-native'
import defaultData from './_DATA';

export const FLASHCARDS_DATA_KEY = 'flashcardsData'

export async function getDecks() {
  const result = await AsyncStorage.getItem(FLASHCARDS_DATA_KEY);
  if (result) {
    return JSON.parse(result);
  } else {
    await AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
}

export async function getDeck(id) {
  const result = await AsyncStorage.getItem(FLASHCARDS_DATA_KEY)
  const decks = JSON.parse(result);
  return decks[id];
}

export async function saveDeckTitle(id, title) {
  await AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify({
    [id]: {
      id,
      title,
      questions: []
    }
  }))
}

export async function addCard(id, card) {
  await AsyncStorage.getItem(FLASHCARDS_DATA_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[id]
      deck.questions.push(card)
      AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify({
        [id]: deck
      }))
    })
}

export async function deleteDeck(id) {
  return AsyncStorage.getItem(FLASHCARDS_DATA_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[id]
      AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(data))
    })
}
