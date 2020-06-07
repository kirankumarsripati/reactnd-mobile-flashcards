import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import { white } from '../utils/colors';
import { handleAddCard } from '../actions';

const AddCard = ({ deckId, navigation, addCard }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const onChangeQuestion = (text) => setQuestion(text);

  const onChangeAnswer = (text) => setAnswer(text);

  const onSubmit = () => {
    if (question === '') {
      alert('Question is required!');
      return;
    }
    if (answer === '') {
      alert('Answer is required!');
      return;
    }

    addCard(deckId, { question, answer });

    setQuestion('');
    setAnswer('');

    navigation.navigate('DeckView');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Text style={styles.text}>Add your question</Text>
      <TextInput
        style={styles.input}
        value={question}
        placeholder="What's your question?"
        onChangeText={onChangeQuestion}
      />
      <TextInput
        style={styles.input}
        value={answer}
        placeholder="What's your answer?"
        onChangeText={onChangeAnswer}
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
    margin: 10,
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


const mapStateToProps = (state, { route }) => {
  const { deckId } = route.params
  return {
    deckId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (deckId, card) => {
      dispatch(handleAddCard(deckId, card));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
