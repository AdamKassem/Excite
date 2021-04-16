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
  SafeAreaView
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

                  <View style ={{flexDirection: 'row',justifyContent:'space-between'}}>
                    <View style = {styles.eventTypeWrapper}>
                          <View style={styles.eventType}>
                              <Feather name = {item.typeIcon} size = {17}/>   
                              <Text style={{marginLeft: 3, fontFamily: 'Montserrat-Semibold', color: colors.background}}>{item.type}</Text> 
                          </View>
                    </View>
                    <View style = {styles.eventCostWrapper}>
                        <View style={styles.eventType}>
                            <Feather name ='dollar-sign' size ={15} style= {{ borderRadius: 5,  alignSelf:'center', marginRight:0}}/>
                            <Text style={{marginLeft: 3, fontFamily: 'Montserrat-Semibold', color: colors.background}}>Cost: {item.cost}</Text> 
                        </View>
                    </View>
                  </View>

                  <View style = {{width: '100%', height: '45%', overflow:'hidden', paddingHorizontal: 10,flexDirection:'column'}}>
                    <Text style= {styles.cardTitleWrapper}>{item.title}</Text>
                  </View>
                  
                  
              </View>   
              
            </TouchableOpacity>
        )
    };

    return(
        <View style={styles.container}>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}> 
            <View style={styles.cardWrapper}>
                {/* Header */}

                <SafeAreaView >
                    <View style={{marginTop:15}}>
                        <Feather name="chevron-left" size={50} color='#E85C2B' onPress = {() =>
                        navigation.goBack()} />
                    </View>
                  
                    <View
                        style = {styles.headWrapper}
                        >
                        
                        <Text style = {[styles.line, {marginLeft: 10, marginRight:10}]}>Here's a Schedule</Text>
                        <Text style = {[styles.line, {marginLeft: 10, marginRight:10}]}>Crafted For You!</Text>
                        
                    </View>

                
                
                
                  <View style={styles.cardListWrapper}>
                    <FlatList
                      data={item}
                      renderItem={renderCardItem}
                      keyExtractor={(item) => item.id}
                      horizontal={false}
                    />
                  </View>
              </SafeAreaView>
                
          </View>
          </ScrollView>
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
                        <TouchableOpacity 
                            onPress = {()=>{
                                navigation.navigate("Home!")
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

const styles =StyleSheet.create({
    container:{
      flex:1
    },
    cardWrapper: {
        marginTop: 35,
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
        borderBottomColor: colors.orange,
        borderBottomWidth:2,
        marginTop:20
      },
    
      cardListWrapper: {
        paddingTop: 15,
        paddingBottom: 20,
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
        height: 305, 
        width: 350,
        marginVertical:15,
        shadowOpacity: 5,
        shadowRadius: 10,
        elevation: 4,
        paddingBottom:10,
        overflow: 'hidden',
      },
    
      cardItemImage: {
        width: '100%',
        height: '75%',
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

      headWrapper:{
        flexDirection:'column',
        justifyContent:'flex-end',
        marginTop:-55,
        
        alignSelf:'center',
        width:300,
        borderRadius: 20,
        paddingBottom:5,
        borderBottomColor: '#F84040',
        borderBottomWidth: 2,
        paddingHorizontal:30,
    },

    line : {
        fontFamily: 'Montserrat-Bold',
        fontSize:22,
        alignSelf:'center',
        
        color: colors.black,
        padding:5,
        borderRadius:20,
        justifyContent:'center',
        
      },
    
    eventTypeWrapper:{
        marginTop: -35,
        
        marginLeft: 10,
        flexDirection: 'row',
    },
    eventCostWrapper:{
      marginTop: -35,
      
      marginRight: 10,
      flexDirection: 'row',
      justifyContent:'flex-end'
    },
    eventType: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 5,
        borderWidth:2,
        borderRadius: 15,
        backgroundColor: '#FFFFFF99',
        fontFamily: 'Montserrat-Regular'
    },
    bottomBar: {
      backgroundColor: '#e5e5e5',
      
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
});