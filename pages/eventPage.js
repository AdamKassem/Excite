import * as React from 'react';
import {SafeAreaView, 
  Text, 
  View, 
  StyleSheet, 
  FlatList, 
  Image, 
  ScrollView,
  ImageBackgroundComponent,
  ImageBackground,
  TouchableOpacity,
  } from 'react-native';
import colors from '../assets/colors/colors';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';

  export default eventPage = ({route, navigation}) =>{
      const {item} = route.params; //retrieving parameters from call
      //console.log(item);
      //<ImageBackground source={item.image} style={styles.image} >

      const [loaded] = useFonts({
        //'Montserrat': require('../assets/fonts/Montserrat.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
    
      });

      return(
        <View style={styles.container}>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
                {/*Header*/}
                <View style ={ styles.headerWrapper}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <View style = {styles.backWrapper}>
                        <Feather name = 'chevron-left' size = {30} color = {colors.orange}/>
                    </View>
                </TouchableOpacity>
                </View>

                

                {/* event */}
                <View style = {styles.eventWrapper}>
                    <View style = {styles.eventTypeWrapper}>
                        <View style={styles.eventType}>
                            <Feather name = {item.typeIcon} size = {17}/>   
                            <Text style={{marginLeft: 3, fontFamily: 'Montserrat-Semibold', color: colors.background}}>{item.type}</Text> 
                        </View>
                    </View>

                    <View style ={styles.eventTitleWrapper}>
                        <Image source = {{ uri: item.image}} style = {styles.backgroundImage}/>
                        <View style = {{flexDirection:'column'}}>
                            
                            <Text style ={styles.eventSubTitle}>Rating: {item.rating} </Text>
                            <Text style = { styles.eventTitle}>{item.title}</Text>
                            <Text style = {styles.address}>{item. address}</Text> 
                        </View>
                        <TouchableOpacity style= {{justifyContent:'center', marginLeft:10}} onPress={()=> navigation.goBack()}>
                            <Feather name="plus" size ={25} style={[styles.plus,{backgroundColor: item.selected? 'white': '#F8404090'}]}/>
                        </TouchableOpacity>
                    </View>    
                      
                         
                    
                </View>

                {/*Map View*/}
                <View style = {styles.mapWrapper}>
                   
                        <View style = {styles.costAndDistanceWrapper}>
                            <View style = {styles.costWrapper}>
                                <Text>Cost: {item.cost}</Text>
                            </View>
                            <View style = {styles.distanceWrapper}>
                                <Text>Distance</Text>
                            </View>
                        </View>
                        <View style = {styles.descriptionWrapper}>
                            <Text>Description</Text>
                        </View>
                
                </View>    

            </ScrollView>
        </View>
           
      );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        marginTop:35
    },

    headerWrapper:{
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backWrapper:{
        marginTop: 10,
        marginLeft:12,
        borderColor: colors.orange,
        borderWidth:2,
        borderRadius: 15,
        padding:7,
        
    },
    eventWrapper: {
        flexDirection: 'column',

    },
    eventTypeWrapper:{
        marginTop: 85,
        marginLeft: 24,
        flexDirection: 'row',
    },
    eventType: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 5,
        borderWidth:2,
        borderRadius: 15,
        backgroundColor: '#FFFFFF80',
        fontFamily: 'Montserrat-Regular'
    },
    eventTitleWrapper:{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius:20,
        borderColor: colors.orange,
        marginHorizontal: 24,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 20,
        //backgroundColor: '#FFFFFF18',
        overflow: 'hidden',
        justifyContent:'center'
        
    },
    eventTitle: {
        
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: colors.textDark,
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
        color: colors.textDark
    },
    address:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: colors.textDark
    },
    mapWrapper:{
        marginTop: 16,
        height:405,
        marginHorizontal: 24,
        borderColor: 'white',
        borderWidth:2,
        borderRadius: 25,

    },

    costAndDistanceWrapper:{
        flexDirection: 'row',
        marginHorizontal: 13,
        marginTop:  175,
        backgroundColor: 'white',
        padding: 11,
        borderRadius: 30,
        justifyContent:'space-between'
    },  
    costWrapper:{
        backgroundColor: '#00009080',
        borderRadius: 20,
        padding: 10,
        alignContent:'center'
    }  ,
    distanceWrapper:{
        backgroundColor: '#00009080',
        borderRadius: 20,
        padding: 10,
        alignContent:'center',
        marginRight:22,
    },
    backgroundImage:{
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.3
    },
    addWrapper:{
        flexDirection: 'row',
      
        //
    },
    plusWrapper:{
        height: 20,
        width: 40,
        alignItems: 'center',
        
    },
    plus: {
        padding: 5,
        backgroundColor: colors.orange,
        borderRadius: 40,
        alignSelf: 'center'
      },
    
});
/*<View style={{alignSelf:'center', height: item.height<220? item.height : 220, overflow:'hidden'}}>
                            <Image source = {item.image} style = {styles.cardItemImage}/>
                        </View>*/
                      /*  <MapView style={{
                            width: "100%",
                            height: "100%",
                        }}>*/