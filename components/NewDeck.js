import React, {Component} from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'
import {CommonActions} from '@react-navigation/native'

import {saveDeckTitle, getDecks} from '../utils/api'
import {white} from '../utils/colors'
import {addDeck} from '../actions'


class NewDeck extends Component {
  state = {
    title: ''
  }

  onChange = (text) => {
    this.setState({
      title: text
    })
  }

  submit = () => {
    const {title} = this.state

    if (title === '') {
      alert('You must fill title field')
      return
    }

    this.props.dispatch(addDeck(title))

    this.setState({
      title: ''
    })

    saveDeckTitle(title)

     this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'Decks',
      }))

  }

  render() {
    const {title} = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Deck Title"
          onChangeText={this.onChange}
        />
        <TouchableOpacity style={styles.btnCont} onPress={this.submit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    paddingBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 5,
  },
  btnCont: {
    backgroundColor: 'black',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  }
})

export default connect()(NewDeck)
