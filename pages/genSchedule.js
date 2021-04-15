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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import cardData from '../assets/data/cardData';

Entypo

export default genSchedule = ({navigation}) =>{
      const [loaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
      });

      var typeArray = [];
      var cardArray = [];

      var generateSchedule = (types, radius) => {
        typeArray = [];
        cardArray = [];
        var prevLoc = "32.9858,-96.760627";
        console.log("\nGenerating Schedule...\n")
        getEvents(0, types.length, prevLoc, radius, types);
        
      };
    
      var getEvents = (i, typeLength, prevLoc, radius, types) => {
        if(i >= typeLength){
            navigation.navigate("Schedule Result")
            return;
        }
        else{
          var url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?"),
          params = {
            key:"AIzaSyAwD4pzdZUnkO1CHCRxrjT_pSA6ONTaL_0", 
            location: prevLoc, 
            radius: radius,
            type: types[i]
          }
          Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
          //console.log(url);
          fetch(url, {
            method: 'GET',
          })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
              //Success
              if(responseJson.results.length > 0){
                var randomChoice = Math.floor(Math.random()*responseJson.results.length);
                console.log(responseJson.results[randomChoice].name);
                prevLoc = responseJson.results[randomChoice].geometry.location.lat+","+responseJson.results[randomChoice].geometry.location.lng;
                var costStr = "";
                for(var j = 0; j < responseJson.results[randomChoice].price_level; j++){
                    costStr += "$"
                }
                var openNowStr = "";
                if(!responseJson.results[randomChoice].hasOwnProperty('opening_hours')){
                    openNowStr = "Closed"
                }
                else if(!responseJson.results[randomChoice].opening_hours.open_now){
                    openNowStr = "Closed"
                }
                else{
                    openNowStr = "Open"
                }
                card = {
                    id: randomChoice.toString(),
                    //image: require("../images/outdoor1.png"),
                    image: "https://lh3.googleusercontent.com/p/AF1QipMxbRXvky1a-aPDviu2FilAkT3FKt4e2cNY-INp=s1600-h5",
                    title: responseJson.results[randomChoice].name,
                    selected: false,
                    address: responseJson.results[randomChoice].vicinity,
                    rating: responseJson.results[randomChoice].rating,
                    type: (responseJson.results[randomChoice].types[0].charAt(0).toUpperCase() + responseJson.results[randomChoice].types[0].slice(1)).split('_').join(' '),
                    typeIcon: 'key',
                    cost: costStr,
                    status: responseJson.results[randomChoice].business_status,
                    openNow: openNowStr
                }
                cardArray.push(card);
                console.log("cardArray length: "+cardArray.length);
              }
              else{
                console.log("No places of type "+types[i]+" found");
              }
              i++;
              getEvents(i, typeLength, prevLoc, radius, types);
            })
            //If response is not in json then in error
            .catch((error) => {
              //Error
              alert(JSON.stringify(error));
              console.error(error);
            });
        }
    
      }
    

      return(
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style= {styles.container}>
            <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}} 
                style={styles.titleWrapper}>
                
                <View style={styles.title}>
                    
                    <Text style={styles.titleText}>Pick Your Event Types</Text>
                </View>
            </LinearGradient>

            <View style = {styles.rowWrapper}>
                <View style = {styles.row}>
                    <TouchableOpacity onPress= {()=>{typeArray.push("restaurant")} }>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'food' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress ={()=>{typeArray.push("movie_theater")}}>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'movie' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Movie Theater</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("night_club")}}>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'party-popper' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Night Club</Text>
                        </View>
                    </TouchableOpacity>
                    
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity onPress ={()=>{typeArray.push("cafe")}}>
                        <View style ={styles.rowElement}>
                            <MaterialIcons name = 'local-cafe' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Cafe</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("museum")}}>
                        <View style ={styles.rowElement}>
                            <MaterialIcons name = 'museum' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Museum</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("bar")}}> 
                        <View style ={styles.rowElement}>
                            <Entypo name = 'drink' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Bar</Text>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity onPress ={()=>{typeArray.push("tourist_attraction")}}>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'car-convertible' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Tourist Attraction</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("gym")}}>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'run' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Gym</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("park")}}>
                        <View style ={styles.rowElement}>
                            <MaterialIcons name = 'park' size={20}   color = {colors.orange}/>
                            <Text style= {styles.elementText}>Park</Text>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>

                
            </View>
            <TouchableOpacity onPress = {()=> 
                //{for(var i = 0; i < typeArray.length; i++){console.log(typeArray[i])}}\
                {generateSchedule(typeArray,10000);}
            }
                >
              <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}} 
                style={styles.titleWrapper}>
                
                  <View style={styles.title}>
                    <Feather name="calendar" size={16} color='black'/>
                    <Text style={styles.titleText}>Generate</Text>
                  </View>
                
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> typeArray=[]}>
              <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}} 
                style={styles.titleWrapper}>
                
                  <View style={styles.title}>
                    <Feather name="calendar" size={16} color='black'/>
                    <Text style={styles.titleText}>Clear</Text>
                  </View>
                
              </LinearGradient>
            </TouchableOpacity>
        </View>
        </ScrollView>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,

    },
    titleText:{
        marginLeft:5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: 5,
        color: colors.white,
        alignSelf: 'center',
        borderBottomColor: colors.textLight,
        borderBottomWidth: 1,
        paddingHorizontal: 5
    },

    title:{
        flexDirection:'row',
        marginLeft: 10,
        
        alignContent:'center',
        justifyContent:'center'
    },

    titleWrapper:{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
        padding: 20,
        //backgroundColor: colors.orange,
        //justifyContent:'center',
        borderRadius:50,
        marginLeft:10,
        width:300
    },

    rowWrapper:{
        marginTop: 40,
        flexDirection: 'column',
    },
    row:{
        flexDirection:'row',
        marginBottom:10,
        justifyContent: 'space-evenly'
    },
    rowElement: {
        flexDirection:'column',
        height: 150,
        width:100,
        marginRight:10,
        borderColor: colors.orange,
        borderWidth: 2,
        borderRadius: 20,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    elementText:{
        marginTop:10,
        fontFamily: 'Montserrat-Bold',
    }
});