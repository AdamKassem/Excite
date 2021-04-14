import * as React from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
  } from 'react-native';
import colors from '../assets/colors/colors';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';


  export default eventPage = ({route, navigation}) =>{
      const {item} = route.params; //retrieving parameters from call
     
      const [loaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
      });

      return(
        <LinearGradient
        colors = {['#e5e5e5', '#e5e5e5', colors.textLightWhite, colors.textLightWhite]}
        start = {{x:0, y:1}}
        end = {{x:0, y:0}}
        style={styles.container}>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
               
                <Image source = {{ uri: item.image}} style = {styles.backgroundImage}/>
                
                {/*Header*/}
                
                <LinearGradient
                        colors = {['#F8A30099','#F8761D99','#F8404099','#F8404099']}
                        start = {{x:1, y:0}}
                        end = {{x:0, y:0}}
                        style = {styles.headerWrapper}>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <View style = {styles.backWrapper}>
                            <Feather name = 'chevron-left' size = {40} color = {colors.white} />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>    
                
                
                {/* event */}
                <View style = {styles.eventWrapper}>
                    <View style = {styles.eventTypeWrapper}>
                        <View style={styles.eventType}>
                            <Feather name = {item.typeIcon} size = {17}/>   
                            <Text style={{marginLeft: 3, fontFamily: 'Montserrat-Semibold', color: colors.background}}>{item.type}</Text> 
                        </View>
                    </View>

                    
                    
                    <LinearGradient
                        colors = {['#F8A300','#F8761D99','#F8404099','#F84040']}
                        start = {{x:1, y:0}}
                        end = {{x:0, y:0}}
                        style = {styles.eventTitleWrapper}>
                        <View style = {{flexDirection:'column'}}>
                            
                            <Text style ={styles.eventSubTitle}>Rating: {item.rating} </Text>
                            <Text style = { styles.eventTitle}>{item.title}</Text>
                            
                        </View>
                        <TouchableOpacity style= {styles.plusWrapper} onPress={()=> navigation.goBack()}>
                            <Feather name="plus" size ={25} style={[styles.plus,{backgroundColor:  'white'}]}/>
                        </TouchableOpacity>
                    </LinearGradient>  
                  

                
                         
                    
                </View>
                
                
                {/*Map View*/}
                <View
                        style = {styles.mapWrapper}
                >
                    
                    <MapView style={{
                        width: "100%",
                        height: "100%",
                        position: 'absolute',
                        
                    }} />
                        
                    

                    <View style = {styles.Wrapper}>
                        <View
                            style = {styles.addressWrapper}
                        >
                            <View style = {styles.addressTitle}>
                                <MaterialCommunityIcons name = 'map' size = {15} style= {{padding: 5, borderRadius: 5, backgroundColor: colors.orangeOp, justifyContent:'center', marginRight:5}}/>
                                <Text style ={{fontFamily: 'Montserrat-Bold'}}>Address: </Text>
                            </View>
                            <View style = {styles.address}>
                                <Text style ={{fontFamily: 'Montserrat-Semibold'}}>{item.address}</Text>
                            </View>
                        </View>
                        <View
                            style = {styles.costAndDistanceWrapper}
                        >
                            <View style = {styles.costWrapper}>
                                <Feather name ='dollar-sign' size ={15} style= {{padding: 5, borderRadius: 5, backgroundColor: colors.orangeOp, justifyContent:'center', marginRight:5}}/>
                                <Text style ={{fontFamily: 'Montserrat-Bold'}}>Cost: $$</Text>
                            </View>
                            <View style = {styles.distanceWrapper}>
                                <MaterialCommunityIcons name = 'directions' size = {15} style= {{padding: 5, borderRadius: 5, backgroundColor: colors.orangeOp, justifyContent:'center', marginRight:5}}/>
                                <Text style ={{fontFamily: 'Montserrat-Bold'}}>Distance: </Text>
                                <Text style ={{fontFamily: 'Montserrat-Semibold'}}>500m </Text>
                            </View>
                        </View>

                        <View
                            style = {styles.descriptionWrapper}
                        >
                            <View style = {styles.descriptionTitle}>
                                <Feather name = 'database' size = {15} style= {{padding: 5, borderRadius: 5, backgroundColor: colors.orangeOp, justifyContent:'center', marginRight:5}}/>
                                <Text style ={{fontFamily: 'Montserrat-Bold',}}>Description: </Text>
                            </View>
                            <View style = {styles.description}>
                                <Text style ={{fontFamily: 'Montserrat-Regular'}}>This is a sample description, because google API didn't return any data ahahah kust fill this space to test </Text>
                            </View>
                        </View>

                    </View>
                
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
        </LinearGradient>
           
      );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.textLightWhite,
        marginTop:35
    },

    headerWrapper:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:5,
        borderRadius:50,
        justifyContent: 'center',
        alignContent:'center',
        height: 55,
        width: 56,
        marginTop: 10,
        marginLeft: 10,
        borderColor: colors.black,
        borderWidth:2,
        paddingRight: 15,
        
    },
    backWrapper:{
        alignSelf:'center'
    },
    eventWrapper: {
        flexDirection: 'column',

    },
    eventTypeWrapper:{
        marginTop: 25,
        marginLeft: 24,
        flexDirection: 'row',
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
    eventTitleWrapper:{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius:20,
        borderColor: colors.black,
        marginHorizontal: 24,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 20,
        overflow: 'hidden',
        justifyContent:'center',
        
    },
    eventTitle: {
        
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: colors.white,
        width: 275
        
    },
    cardItemImage: {
        
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        alignSelf: 'center',
        marginHorizontal: 20,
      },    
    eventSubTitle:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: colors.white
    },
    
    mapWrapper:{
        flex:1,
        marginTop: 25,
        marginBottom:25,
        height:385,
        marginHorizontal: 15,
        borderColor: colors.textDark,
        borderWidth:2,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'space-evenly'
    },

    costAndDistanceWrapper:{
        flexDirection: 'row',
        marginHorizontal: 13,
        marginTop:  25,
        backgroundColor: '#e5e5e5',
        padding: 11,
        borderRadius: 20,
        justifyContent:'space-between',
        borderColor: colors.black,
        borderWidth:2,
        
    },  
    costWrapper:{
        backgroundColor: '#F5C0B4',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 8,
        alignContent:'center',
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderWidth: 2,
        borderColor: colors.orange
    }  ,
    distanceWrapper:{
        backgroundColor: '#F5C0B4',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 8,
        alignContent:'center',
        
        alignContent:'center',
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderWidth: 2,
        borderColor: colors.orange
    },
   
    backgroundImage:{
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 410,
        right: 0,
        opacity: 0.6,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:10,
        borderWidth: 3,
        borderColor: colors.black
    },
    addWrapper:{
        flexDirection: 'row',
      
        //
    },
    plusWrapper:{
        justifyContent:'center', 
        marginLeft:10, 
        borderColor:colors.black, 
        borderWidth: 2, 
        height: 25,
        borderRadius:90,
        alignSelf: 'center'
    },
    plus: {
        padding: 5,
        backgroundColor: colors.orange,
        borderRadius: 40,
        alignSelf: 'center',
        justifyContent: 'center'
      },

    descriptionWrapper:{
        flexDirection: 'column',
        marginHorizontal: 13,
        marginTop:  25,
        backgroundColor: '#e5e5e5',
        padding: 11,
        borderRadius: 20,
        justifyContent:'space-between',
        marginBottom: 25,
        borderColor: colors.black,
        borderWidth:2,
    },

    descriptionTitle:{
        backgroundColor: '#F5C0B4',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 8,
        alignContent:'center',
        opacity:1,
        width: 150,
        alignItems:'center',
        flexDirection:'row',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: colors.orange
    },

    description: {
        backgroundColor: '#e5e5e5',
        borderRadius: 15,
        padding: 10,
        alignContent:'center',
        
        alignContent:'center',
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    
    addressWrapper:{
        flexDirection: 'column',
        marginHorizontal: 13,
        marginTop:  25,
        backgroundColor: '#e5e5e5',
        padding: 11,
        borderRadius: 20,
        justifyContent:'space-between',
        borderColor: colors.black,
        borderWidth:2,
    },  

    address :{
        backgroundColor: '#e5e5e5',
        borderRadius: 15,
        padding: 10,
        alignContent:'center',
        
        alignContent:'center',
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    Wrapper: {
        flexDirection: 'column',
        backgroundColor: '#00000070',
        borderRadius: 20,
        justifyContent:'space-between',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    addressTitle:{
        backgroundColor: '#F5C0B4',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal:8,
        alignContent:'center',
        opacity:1,
        width: 120,
        alignItems:'center',
        flexDirection:'row',
        marginBottom: 10,
        borderWidth:2,
        borderColor: colors.orange
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
