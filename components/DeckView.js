import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import { white } from '../utils/colors';
import { handleDeleteDeck } from '../actions';

const DeckView = ({ deck, navigation, deleteDeck }) => {
  const onDeleteDeck = () => {
    const { id } = deck;

    deleteDeck(id);

    navigation.navigate('Decks');
  }

  const startQuiz = () => {
    if (deck.questions.length === 0) {
      alert('Atlest one question is required to start quiz.')
      return
    }
    navigation.navigate('Quiz', {'deckId': deck.id})
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 4, justifyContent: 'center'}}>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={styles.cardsInfo}>{deck.questions.length} cards</Text>
        <TouchableOpacity
          style={[styles.btnCont, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
          onPress={() => navigation.navigate(
            'AddCard', {'deckId': deck.id}
          )}
        >
          <Text style={[styles.btnText, {color: 'black'}]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCont, {backgroundColor: 'black'}]}
          onPress={startQuiz}
        >
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: 70}}>
        <Button
          title='Delete'
          color='red'
          onPress={onDeleteDeck}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    padding: 40,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 5,
  },
  btnCont: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 100,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  },
  cardsInfo: {
    fontSize: 20,
    color: '#A9A9A9',
    textAlign: 'center',
    paddingBottom: 20,
  },
})


const mapStateToProps = (state, {route}) => {
  const { deckId } = route.params
  return {
    deck: state[deckId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDeck: (deckId) => {
      dispatch(handleDeleteDeck(deckId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
