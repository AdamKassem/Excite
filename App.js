import 'react-native-gesture-handler';
import * as React from 'react';
import {Text,View, SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LinearGradient} from 'expo-linear-gradient';

import schedule from './pages/schedule';
import home from './pages/home'
import eventPage from './pages/eventPage'
import genSchedule from './pages/genSchedule'
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

import map from './pages/map'
import colors from './assets/colors/colors';
const Stack = createStackNavigator();

export default function App({navigation}) {
  const moveHome = ({navigation}) => {
    return(
      navigation.navigate("Home!")
    );
  }
  return (
    
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home!" 
        component={home} 
        options={
          {headerShown: false,}
        }
      />
      <Stack.Screen 
        name="Event's Page!" 
        component={eventPage} 
        options={
          {headerShown: false,}
        }
      />
      <Stack.Screen 
        name="Menu" 
        component={eventPage} 
        options={
          {headerShown: false,}
        }
      />
      <Stack.Screen 
        name="Generate Schedule!" 
        component={genSchedule} 
        options={
          {headerShown: false,}
        }
      />
      <Stack.Screen 
        name="Schedule Result" 
        component={genSchedule} 
        options={
          {headerShown: false,}
        }
      />
    </Stack.Navigator>

  

  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#E5E5E5',
  },

  bottomContent: {
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical:20,
    flexDirection:'row'
  },
  
  gradient: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  }
}
  
);
/*position: 'absolute',
    left:0,
    right:0,
    bottom: 0,
    backgroundColor: colors.subcolor,
    opacity:0.95,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    justifyContent: 'center' ,
    marginHorizontal: -10,*/