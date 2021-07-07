import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddAssignmentsScreen from './screens/AddAssignmentsScreen';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import ScheduleScreen from './screens/ScheduleScreen';

import WelcomeScreen from './screens/WelcomeScreen.js';
import ClassScreen from './screens/ClassScreen.js';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  ClassScreen: {screen:ClassScreen},
});

const AppContainer =  createAppContainer(switchNavigator)
