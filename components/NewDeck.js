import React from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

import { white } from '../utils/colors'
import { handleAddDeck } from '../actions'


const NewDeck = ({ addDeck, navigation }) => {
  const [title, setTitle] = React.useState('');

  const onChange = (text) => setTitle(text);

  const onSubmit = () => {
    if (title === '') {
      alert('Title is required')
      return
    }

    addDeck(title);
    setTitle('');

    navigation.navigate('Decks');
  }

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
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.btnCont} onPress={onSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (title) => {
      dispatch(handleAddDeck(title));
    }
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
