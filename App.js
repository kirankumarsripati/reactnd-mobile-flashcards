import React, {Component} from 'react'
import {createStore} from 'redux'
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import {Provider} from 'react-redux'

import reducer from './reducers'
import {white} from './utils/colors'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {setLocalNotification} from './utils/notifications'


function FlashcardStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const RouteConfigs = {
  Decks:{
    name: 'Decks',
    component: DeckList,
    options: {tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='view-list' size={30} color={tintColor} />, title: 'Deck'}
  },
  AddDeck:{
    component: NewDeck,
    name: 'Add Deck',
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  },
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'black' : white,
    style: {
      height: Platform.OS === 'ios' ? 90 : 56,
      backgroundColor: Platform.OS === 'ios' ? white : 'black',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
};

const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['Decks']} />
    <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
)

const Stack = createStackNavigator()

const MainNav = () => (
    <Stack.Navigator headerMode='screen'>
        <Stack.Screen
          name='Decks'
          component={TabNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='DeckView'
          component={DeckView}
          options={{
              headerTintColor: white, headerStyle: {
                  backgroundColor: 'black',
              }
          }}
        />
        <Stack.Screen
          name='AddCard'
          component={AddCard}
          options={{headerTintColor: white, headerStyle: {
              backgroundColor: 'black',
            }
          }}
        />
        <Stack.Screen
          name='Quiz'
          component={Quiz}
          options={{headerTintColor: white, headerStyle: {
              backgroundColor: 'black',
            }
          }}
        />
    </Stack.Navigator>
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashcardStatusBar backgroundColor={'black'} barStyle='light-content' />
          <NavigationContainer style={styles.container}>
              <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
