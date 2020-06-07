import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import { white } from '../utils/colors'
import { handleGetAllDecks } from '../actions'


const DeckList = ({ decks, initializeData, navigation }) => {
  React.useEffect(() => {
    initializeData();
  }, [initializeData])

  const goToDeckView = (key, index) => {
    navigation.navigate(
      'DeckView', {'deckId': key}
    )
  }

  return (
    <ScrollView style={styles.container}>
      {Object.keys(decks).map((id) => {
        const deck = decks[id];
        return (
          <TouchableOpacity key={id} onPress={() => goToDeckView(id)}>
            <View style={styles.deckInfo}>
                <Text style={[deck.deckTitle]}>
                  {deck.title}
                </Text>
                <Text style={[styles.cardsInfo]}>
                  {deck.questions.length} cards
                </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
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


const mapStateToProps = (decks) => {
  return {
    decks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeData: () => {
      dispatch(handleGetAllDecks());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
