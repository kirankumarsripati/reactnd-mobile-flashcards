import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated} from 'react-native'
import {AppLoading} from 'expo'
import {connect} from 'react-redux'

import {getDecks} from '../utils/api'
import { white } from '../utils/colors'
import {receiveDecks} from '../actions'


class DeckList extends Component {
  state = {
    ready: false,
    bounceValues: [],
  }
  componentDidMount() {
    const {dispatch} = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(({decks}) => {
        this.setState({
          ready: true,
          bounceValues: [...Array(Object.keys(decks).length).keys()].map(() => new Animated.Value(1)),
        })
      })
  }

  goToDeckView = (key, index) => {
    const {bounceValues} = this.state
  
    Animated.sequence([
      Animated.timing(bounceValues[index], {duration: 150, toValue: 1.04}),
      Animated.timing(bounceValues[index], {toValue: 1, duration: 120})
    ]).start(() => this.props.navigation.navigate(
      'DeckView', {'deckId': key}
    ))
  }

  render() {
    const {decks} = this.props
    const {ready, bounceValues} = this.state
    
    if (ready === false) {
      return <AppLoading/>
    }

    return (
      <ScrollView style={styles.container}>
        {decks.map((deck, index) => {
          const key = deck.title
          return (
            <TouchableOpacity key={key} onPress={() => this.goToDeckView(key, index)}>
              <View style={styles.deckInfo}>
                  <Animated.Text style={[styles.deckTitle, {transform: [{scale: bounceValues[index]}]}]}>
                    {deck.title}
                  </Animated.Text>
                  <Animated.Text style={[styles.cardsInfo, {transform: [{scale: bounceValues[index]}]}]}>
                    {deck.questions.length} cards
                  </Animated.Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deckInfo: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    padding: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  deckTitle: {
    fontSize: 35,
  },
  cardsInfo: {
    fontSize: 20,
    color: '#A9A9A9',
    textAlign: 'center',
  }
})


function mapStateToProps(decks) {
  return {
    decks: Object.values(decks).sort((a, b) => a.title.localeCompare(b.title))
  }
}

export default connect(mapStateToProps)(DeckList)
