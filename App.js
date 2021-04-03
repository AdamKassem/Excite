import 'react-native-gesture-handler';
import * as React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import schedule from './pages/schedule';
import home from './pages/home'
import map from './pages/map'
const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home!" 
        component={home} 
        options={
          {headerShown: true,}
        }
      />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}