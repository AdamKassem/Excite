import * as React from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
  FlatList,
  Picker,
  } from 'react-native';
import colors from '../assets/colors/colors';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import genSchedule from './genSchedule';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default schedule = ({route,navigation}) =>{
    const {item} = route.params; //retrieving parameters from call
    
    const [loaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
    });

    const renderCardItem = ({item}) => {
        return(
            
            <TouchableOpacity 
              key = {item.id}
              onPress = {()=>{
                navigation.navigate("Event's Page!",{item: item})  
              }}
              >
                
              <View style= {[styles.cardItemWrapper, {backgroundColor: item.selected? colors.orange: 'white' }]}>
                  <Image source = {{width: 20, height: 20, uri: item.image}} style = {styles.cardItemImage}/>
                  <View style = {{width: '100%', height: '45%', overflow:'hidden', paddingHorizontal: 10}}>
                    <Text style= {styles.cardTitleWrapper}>{item.title}</Text>
                  </View>
                  
              </View>   
              
            </TouchableOpacity>
        )
    };

    return(
        <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>Schedule</Text>
              
                <View style={styles.cardListWrapper}>
                  <FlatList
                    data={item}
                    renderItem={renderCardItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </View>
         
        </View>

    );
}

const styles =StyleSheet.create({
    cardWrapper: {
        marginTop: 30,
      },
    
      cardTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        paddingHorizontal: 20,
        borderBottomColor: '#F84040',
        borderBottomWidth: 2,
        marginHorizontal:15,
        color: 'black'
      },
    
      cardTitleWrapper: {
        paddingVertical:5,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Semibold',
        fontSize: 14,
        color: colors.textDark,
      },
    
      cardListWrapper: {
        paddingTop: 15,
        //paddingBottom: 20,
      },
    
      cardItemWrapper: {
        backgroundColor: '#F5CA48',
        marginLeft: 20,
        borderRadius: 20,
        /*shadowColor: colors.black,
        shadowOffset: {
          width: 20,
          height: 40,
        },*/ 
        height: 155, 
        width: 120,
        
        shadowOpacity: 5,
        shadowRadius: 10,
        elevation: 4,
        paddingBottom:10,
        overflow: 'hidden',
      },
    
      cardItemImage: {
        width: '100%',
        height: '65%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        alignSelf: 'center',
        marginHorizontal: 20,
      },
    
      cardItemTitle: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop: 10,
        
      },
    
      cardSelectWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20,
        
      },
    
});