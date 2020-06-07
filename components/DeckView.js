import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Button, Platform} from 'react-native'
import {connect} from 'react-redux'
import {CommonActions} from '@react-navigation/native'
import {AppLoading} from 'expo'

import {white} from '../utils/colors'
import {removeDeck} from '../actions'
import {dropDeck} from '../utils/api'


class DeckView extends Component {
  delete = () => {
    const {deck, dispatch} = this.props
    const title = deck.title
    dispatch(removeDeck(title))

    this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'Decks',
      }))

    dropDeck(title)

  }

  startQuiz = () => {
    const {deck} = this.props
    if (deck.questions.length === 0) {
      alert('Deck must have at least one question to start a quiz.')
      return
    }
    this.props.navigation.navigate(
      'Quiz', {'deckId': deck.title}
    )
  }
  render () {
    const {deck} = this.props

    if (deck === undefined) {
      return <AppLoading/>
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <Text style={styles.text}>{deck.title}</Text>
          <Text style={styles.cardsInfo}>{deck.questions.length} cards</Text>
          <TouchableOpacity
            style={[styles.btnCont, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
            onPress={() => this.props.navigation.navigate(
              'AddCard', {'deckId': deck.title}
            )}
          >
            <Text style={[styles.btnText, {color: 'black'}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnCont, {backgroundColor: 'black'}]}
            onPress={this.startQuiz}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: 70}}>
          <Button
            title='Delete'
            color='red'
            onPress={this.delete}
            style={{fontSize: 20}}
          />
        </View>
      </View>
    )
  }
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


function mapStateToProps(state, {route}) {
  const {deckId} = route.params
  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckView)
