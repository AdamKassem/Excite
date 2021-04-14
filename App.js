import 'react-native-gesture-handler';
import * as React from 'react';
import {Text,View, SafeAreaView, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LinearGradient} from 'expo-linear-gradient';

import schedule from './pages/schedule';
import home from './pages/home'
import eventPage from './pages/eventPage'
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

import map from './pages/map'
import colors from './assets/colors/colors';
const Stack = createStackNavigator();

export default function App() {
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
    </Stack.Navigator>
    
            
            {/* Bottom bar */}
            
              <View style = {styles.bottomBar}>
              <LinearGradient
              colors = {['#F8A300','#F84040']}
              start = {{x:1, y:0}}
              end = {{x:0, y:0}}
              style = {styles.gradient}
              >
                  {/* Bottom bar comtents*/}
                  <View style = {styles.bottomContent}>
                    <Feather name = "map-pin" size = {28,36} color ='white' />
                    <Feather name = "calendar" size = {36,36} color ='white'/>
                    <Image
                        source={require('./assets/images/whiteLogo.png')}
                        style={{width: 36, height: 36}}
                        />
                    <Feather name = "search" size = {36,36} color ='white' />
                    <Feather name = "user" size = {36,36} color ='white'/> 
                  </View>
              </LinearGradient>
              </View>

            
    

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
    //backgroundColor: colors.background,
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