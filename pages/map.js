  
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView,StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import {Marker}  from 'react-native-maps';
import cardData from '../assets/data/cardData';



import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();
import colors from '../assets/colors/colors';
import {LinearGradient} from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function map ({route,navigation}){
  const {item} = route.params;
  
   const [loaded] = useFonts({
    //'Montserrat': require('../assets/fonts/Montserrat.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),

  });
  
 
    
      return(
        
        
         
        <View style = {styles.container}>
           
          <MapView
              initialRegion={{
                latitude: 32.9862242,
                longitude: -96.7516555,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{
                  flex:1,
                  position:'absolute',
                  height: '100%',
                  width: '100%',
                  opacity:1
                  
              }} >
          
                  { 
                      
                      item.map((event) => (
                          <Marker key ={event.id} coordinate = {{latitude:event.lat,longitude:event.long}} onPress = {()=> navigation.navigate("Event's Page!",{item:event})}></Marker>
                  ))}
              
          </MapView>

          <View style = {styles.header}>
              <TouchableOpacity onPress={()=> navigation.goBack()}>
                          <View style = {styles.backWrapper}>
                              <Feather name = 'chevron-left' size = {40} color = {colors.orange} />
                          </View>
              </TouchableOpacity>
              <Text style = {styles.headerText}> Map </Text>
          </View>
      
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
                      
                      <TouchableOpacity 
                      onPress = {()=>{
                          navigation.navigate("homeMap", {item: cardData[0]});
                      }}>
                      <Feather name = "map-pin" size = {28,36} color ='white' />
                      </TouchableOpacity>
                      <Feather name = "calendar" size = {36,36} color ='white'/>
                      <TouchableOpacity 
                      onPress = {()=>{
                          navigation.navigate("Home!",cardData)
                      }}>
                      <Image
                          source={require('../assets/images/whiteLogo.png')}
                          style={{width: 36, height: 36}}
                          />
                      </TouchableOpacity>
                      <Feather name = "search" size = {36,36} color ='white' />
                      <Feather name = "user" size = {36,36} color ='white'/> 
                  </View>
              </LinearGradient>
          </View>  
      </View>    
        
      
      );
  }
                


const styles = StyleSheet.create({
  container:{
      flex:1,
      marginTop:25
  },
  backWrapper:{
      alignSelf:'flex-start'
  },
  header:{
      flexDirection:'column',
      justifyContent:'space-between',
      backgroundColor:'#e5e5e5',
      padding: 12,
      paddingVertical:20,
      borderBottomLeftRadius:40,
      borderBottomRightRadius: 40,
      shadowOpacity: 5,
      shadowRadius: 10,
      elevation: 20
  },
  headerText:{
      marginTop:-35,
      fontSize: 20,
      alignSelf:'center',
      justifyContent:'center',
      borderBottomColor: colors.orange,
      borderBottomWidth: 2,
  },
  bottomBar: {
      flex:1,
      backgroundColor: '#E5E5E5',
      position:'absolute',
      top:'90%',
      right:0,
      left:0,
    }, 
  
    bottomContent: {
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical:20,
      flexDirection:'row'
    },
    
    gradient: {

      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      
    },
    
    searchWrapper: {
      flexDirection: 'row',
      alignSelf: 'center',
      paddingHorizontal: 20,
      marginTop: 30,
      padding: 20,
      //backgroundColor: colors.orange,
      //justifyContent:'center',
      borderRadius:50
    },
  
    search: {
      flexDirection:'row',
      marginLeft: 10,
      borderBottomColor: colors.textLight,
      borderBottomWidth: 1,
      alignContent:'center',
      justifyContent:'center'
      
    },
  
    searchText: {
      marginLeft:5,
      fontFamily: 'Montserrat-Semibold',
      fontSize: 14,
      marginBottom: 5,
      color: colors.white,
      //alignItems:'center',
      alignSelf: 'center'
    },
});