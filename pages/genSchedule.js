import * as React from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList
  } from 'react-native';
import colors from '../assets/colors/colors';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
Entypo.loadFont();
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import generateCards from '../assets/data/generateCards';
import { TextInput } from 'react-native-gesture-handler';
import { render } from 'react-dom';

  var typeArray = [];
  var itemSelected=[];
  for(var i =0; i<9; i++){
      itemSelected[i]=0;
  }
export default genSchedule = ({route,navigation} ) =>{
     
      
      const [loaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
        'Tomorrow':require('../assets/fonts/Tomorrow-Bold.ttf'),
      });

      
      var cardArray = [];
      var photoRefs = [];
      var imagesReceived = 0;

      var generateSchedule = (types, radius) => {
        clear();
        cardArray = [];
        photoRefs = [];
        imagesReceived = 0;
        for(var i =0; i<9; i++){
            itemSelected[i]=0;
        }
        var prevLoc = "32.9858,-96.760627";
        console.log("\nGenerating Schedule...\n")
        getEvents(0, types.length, prevLoc, radius, types);
        
      };
    
      var getEvents = (i, typeLength, prevLoc, radius, types) => {
        if(i >= typeLength){
            for(var j = 0; j < photoRefs.length; j++){
                setCardImage(j, photoRefs[j], photoRefs.length);
            }
            //navigation.navigate("Schedule Result", {item: cardArray})
            return;
        }
        else{
          var url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?"),
          params = {
            key:"AIzaSyCYW0drTYtabjf1zEoAVNyBYZGNkI_FxwQ", 
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
                if(responseJson.results[randomChoice].hasOwnProperty("photos")) {
                    photoRefs.push(responseJson.results[randomChoice].photos[0].photo_reference);
                  }

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
                    id: i.toString(),
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
                    openNow: openNowStr,
                    lat: responseJson.results[i].geometry.location.lat,
                    long: responseJson.results[i].geometry.location.lng
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

      var setCardImage = (i, photoreference, photoCount) => {
        var url = new URL("https://maps.googleapis.com/maps/api/place/photo?"),
          params = {
            key:"AIzaSyCYW0drTYtabjf1zEoAVNyBYZGNkI_FxwQ", 
            photoreference: photoreference, 
            maxheight: 250
          }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        //console.log(url);
        fetch(url, {
          method: 'GET',
        })
          .then((responseImage) => {
            //Success
            cardArray[i].image = responseImage.url;
            imagesReceived++;
            if(imagesReceived >= photoCount){
                navigation.navigate("Schedule Result", {item: cardArray})
            }
            //console.log("Image url: "+ responseImage.url)
          })
          //If response is not in json then in error
          .catch((error) => {
            //Error
            alert("ERROR IN PHOTO CALL "+JSON.stringify(error));
            console.error(error);
          });
      }
    
      
      var clear = () =>{
        typeArray=[];
        itemSelected=[];
        for(var i =0; i<9; i++){
            itemSelected[i]=0;
        }
        navigation.navigate("Generate Schedule!", typeArray)
        //generateCards.init();
      }
    

      return(
        <LinearGradient
        colors = {['#e5e5e5', '#e5e5e500']}
        start = {{x:0, y:1}}
        end = {{x:0, y:0}}
        style={styles.container}>
      
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          
          >
            
            {/* Header */}

            <SafeAreaView >
                <View style={{marginTop:10}}>
                    <Feather name="chevron-left" size={50} color='#E85C2B' onPress = {() =>
                    navigation.goBack()} />
                </View>
              
            <View
                style = {styles.headWrapper}
                >
                
                <Text style = {[styles.line, {marginLeft: 10, marginRight:10}]}>Pick Your Types:</Text>
                
            </View>

            
            </SafeAreaView>
            
            {/*Back and Header
            <View style = {styles.backgroundView}/>
                
                {/*Header
                
                <LinearGradient
                        colors = {['#F8A30099','#F8761D99','#F8404099','#F8404099']}
                        start = {{x:1, y:0}}
                        end = {{x:0, y:0}}
                        style = {styles.back}>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <View style = {styles.backWrapper}>
                            <Feather name = 'chevron-left' size = {40} color = {colors.white} />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>    
                
                
                {/* event 
                <View style = {styles.eventWrapper}>
                    
                    <LinearGradient
                        colors = {['#F8A300','#F8761D99','#F8404099','#F84040']}
                        start = {{x:1, y:0}}
                        end = {{x:0, y:0}}
                        style = {styles.eventTitleWrapper}>

                            <Text style = { styles.titleText}>Pick Your Event Types :</Text>
                            
                        
                        
                    </LinearGradient>  
                  

                
                         
                    
                </View>*/}
           

            

            <View
                style={styles.rowWrapper}>
                
                <Image source = {require('../assets/images/background.png')} style = {styles.backgroundImage}/>
            <View style = {styles.row}>
                    <TouchableOpacity onPress= {()=>{typeArray.push("restaurant"); itemSelected[0]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}  }>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[0]?colors.orange:'white',borderColor:itemSelected[0]?'white':colors.orange}]}>
                            <MaterialCommunityIcons name = 'food' size={20} style = {{alignSelf: 'center',color: itemSelected[0]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[0]?colors.white:colors.black}]}>Restaurant</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[0]}
                                                rating={itemSelected[0]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity  onPress ={()=>{typeArray.push("movie_theater"); itemSelected[1]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[1]?colors.orange:'white',borderColor:itemSelected[1]?'white':colors.orange}]}>
                            <MaterialCommunityIcons name = 'movie' size={20} style = {{alignSelf: 'center',color: itemSelected[1]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[1]?colors.white:colors.black, paddingHorizontal:18}]}>Movie Theater</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[1]}
                                                rating={itemSelected[1]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("night_club"); itemSelected[2]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected) }}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[2]?colors.orange:'white',borderColor:itemSelected[2]?'white':colors.orange}]}>
                            <MaterialCommunityIcons name = 'party-popper' size={20} style = {{alignSelf: 'center',color: itemSelected[2]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[2]?colors.white:colors.black}]}>Night Club</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[2]}
                                                rating={itemSelected[2]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity onPress ={()=>{typeArray.push("cafe"); itemSelected[3]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[3]?colors.orange:'white',borderColor:itemSelected[3]?'white':colors.orange}]}>
                            <MaterialIcons name = 'local-cafe' size={20} style = {{alignSelf: 'center',color: itemSelected[3]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[3]?colors.white:colors.black}]}>Cafe</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[3]}
                                                rating={itemSelected[3]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("museum"); itemSelected[4]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[4]?colors.orange:'white',borderColor:itemSelected[4]?'white':colors.orange}]}>
                            <MaterialIcons name = 'museum' size={20} style = {{alignSelf: 'center',color: itemSelected[4]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[4]?colors.white:colors.black}]}>Museum</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[4]}
                                                rating={itemSelected[4]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("bar"); itemSelected[5]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}> 
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[5]?colors.orange:'white',borderColor:itemSelected[5]?'white':colors.orange}]}>
                            <Entypo name = 'drink' size={20} style = {{alignSelf: 'center',color: itemSelected[5]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[5]?colors.white:colors.black}]}>Bar</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[5]}
                                                rating={itemSelected[5]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity onPress ={()=>{typeArray.push("tourist_attraction"); itemSelected[6]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[6]?colors.orange:'white', borderColor:itemSelected[6]?'white':colors.orange}]}>
                            <MaterialCommunityIcons name = 'car-convertible' size={20} style = {{alignSelf: 'center',color: itemSelected[6]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[6]?colors.white:colors.black,paddingLeft:11}]}>Tourist Attraction</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[6]}
                                                rating={itemSelected[6]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("gym"); itemSelected[7]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[7]?colors.orange:'white',borderColor:itemSelected[7]?'white':colors.orange}]}>
                            <MaterialCommunityIcons name = 'run' size={20} style = {{alignSelf: 'center',color: itemSelected[7]?colors.white:colors.orange}} color = {colors.orange}/>
                            <Text style= {[styles.elementText, {color: itemSelected[7]?colors.white:colors.black}]}>Gym</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[7]}
                                                rating={itemSelected[7]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{typeArray.push("park"); itemSelected[8]+=1;navigation.navigate("Generate Schedule!", typeArray, itemSelected)}}>
                        <View style ={[styles.rowElement,{backgroundColor: itemSelected[8]?colors.orange:'white',borderColor:itemSelected[8]?'white':colors.orange}]}>
                            <MaterialIcons name = 'park' size={20}   color = {colors.orange} style = {{alignSelf: 'center', color: itemSelected[8]?colors.white:colors.orange}}/>
                            <Text style= {[styles.elementText, {color: itemSelected[8]?colors.white:colors.black}]}>Park</Text>
                            <View style={{alignSelf:'center',marginTop:7,}}>
                                <StarRating
                                                disabled={false}
                                                maxStars={itemSelected[8]}
                                                rating={itemSelected[8]}
                                                fullStar = {require('../assets/images/rating.png')}
                                                fullStarColor = {colors.white}
                                                emptyStar= {require('../assets/images/rating2.png')}
                                                halfStar = {require('../assets/images/rating3.png')}
                                                starSize = {12}
                                                
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>
            </View>

            <LinearGradient
                        colors = {[colors.white, colors.white]}
                        start = {{x:1, y:1}}
                        end = {{x:0, y:0}} 
                        style ={styles.selected}>
            
                <Text style={{color: colors.orange, fontFamily:'Montserrat-Bold',fontSize:17}}> Selected : </Text>
                <Text style={[styles.selectedText,{backgroundColor:'#FFFFFF00', width:230}]}> {typeArray.join(", ")} </Text>
                
                
            </LinearGradient>

            {/*Select options */}
            <View style= {styles.optionWrapper}>

                {/*Generate button */}
                <TouchableOpacity onPress = {()=> 
                    //{for(var i = 0; i < typeArray.length; i++){console.log(typeArray[i])}}\
                    {generateSchedule(typeArray,3000);}
                }
                    >
                <LinearGradient
                    colors = {['#F8A300','#F84040']}
                    start = {{x:1, y:0}}
                    end = {{x:0, y:0}} 
                    style={styles.generateWrapper}>
                    <Text style={styles.generateText}>Generate</Text>
                </LinearGradient>
                </TouchableOpacity>

                {/*Clear button */}
                <TouchableOpacity onPress = {()=> clear()}>
                <View
                    style={styles.clearWrapper}>
                    <Text style={styles.clearText}>Clear</Text>
                </View>
                </TouchableOpacity>
            </View>
       
        
         
     
    </ScrollView>
    
    {/* Bottom bar */}
    <View style = {styles.bottomBar}>
         <LinearGradient
         colors = {['#F8A300','#F84040']}
         start = {{x:1, y:0}}
         end = {{x:0, y:0}}
         style = {styles.bottomGradient}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        flexDirection:'column'
    },

    back:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:5,
        borderRadius:50,
        //justifyContent: 'center',
        //alignContent:'center',
        height: 55,
        width: 56,
        //marginTop: 10,
        //marginLeft: 10,
        borderColor: '#e5e5e599',
        borderWidth:2,
        paddingRight: 5,
        marginTop:5,
        marginLeft:5,        
    },
    /*headerWrapper:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:5,
        borderRadius:50,
        justifyContent: 'center',
        alignContent:'center',
        
        marginTop: 10,
        marginHorizontal: 10,
        borderColor: colors.black,
        borderWidth:2,
        paddingRight: 15,
        
    },*/

    titleText:{
        fontFamily: 'Tomorrow',
        fontSize: 22,
        color: colors.white,
        //width: 230,
        alignSelf:'center',
        marginTop:-1,
        marginHorizontal:15,
        //paddingHorizontal:15,
        borderBottomColor: colors.white,
        borderBottomWidth:1,
        alignSelf:'center'
    },

    titleWrapper:{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
        padding: 10,
        justifyContent:'flex-start',
        borderRadius:50,
    },

    optionWrapper:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center',
    },

    generateWrapper:{
        padding: 15,
        alignSelf:'center',
        //width:200,
        borderRadius:50,
        marginBottom:5,
        borderColor:colors.white,
        /*shadowColor: colors.black,
        shadowOffset: {
            width: 20,
            height: 40,
        },*/
        shadowOpacity: 5,
        shadowRadius: 20,
        borderWidth:2
    },

    clearWrapper:{
        alignContent:'center',
        borderRadius:50,
        marginBottom:10,
        //backgroundColor: '#FFFFFF90',
    },
    
    clearText:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark,
        alignSelf: 'center',
        borderBottomColor: colors.orange,
        borderBottomWidth: 1,
    },

    generateText:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: colors.white,
        
        alignSelf: 'center',
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
    },

    rowWrapper:{
        marginTop: 8,
        flexDirection: 'column',
        width:'95%',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius: 30,
        paddingTop:5,
        backgroundColor:'#1E1E2230',
        marginHorizontal:20,
        borderColor:'#FFFFFF99',
        borderWidth:2,
    },

    row:{
        flexDirection:'row',
        marginBottom:10,
        justifyContent: 'space-evenly'
    },

    rowElement: {
        flexDirection:'column',
        height: 122,
        width:100,
        marginHorizontal:5,
        borderColor: colors.orange,
        borderWidth: 2,
        borderRadius: 20,
        alignContent:'center',
        justifyContent:'center',
        //alignSelf:'center',
        backgroundColor:'blue'
    },

    elementText:{
        marginTop:10,
        fontFamily: 'Montserrat-Bold',
        alignSelf:'center',
        justifyContent:'center'
    },

    bottomBar: {
        backgroundColor: '#E5E5E5',
    }, 
    
    bottomContent: {
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical:20,
        flexDirection:'row'
    },
    topBar: {
        backgroundColor: colors.textLightWhite,
        borderColor:colors.textDark,
        borderWidth:1,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    }, 
    
    topContent: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical:10,
        flexDirection:'row'
    },
    bottomGradient: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        
    },
    topGradient:{
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        
    },
    backWrapper:{
        alignSelf:'flex-start',
    },

    eventTitleWrapper:{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius:20,
        borderColor: colors.textDark,
        marginHorizontal: 10,
        marginTop: 5,
        paddingHorizontal: 16,
        paddingVertical: 20,
        overflow: 'hidden',
        justifyContent:'center',
        backgroundColor:'#F8404099'
        
    },
    
    selected:{
        flexDirection:'row',
        padding:7,
        //backgroundColor:colors.orange,
        marginVertical:16,
        borderColor:colors.orange,
        borderWidth:2,
        overflow:'hidden',
        paddingHorizontal:10,
        alignSelf:'center',
        alignContent:'center',
        borderRadius:5,
        width: '94%'
        
    },
    selectedText:{
        color:colors.textLightWhite,
        fontSize:17,
        fontFamily:'Montserrat-Bold',
        borderRadius: 5,
    },
    backgroundImage:{
        flex:1,
        position: 'absolute',
        top: 13,
        left: 30,
        bottom: 0,
        right: 20,
        opacity: 0.4,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:10,
        borderWidth: 0,
        borderColor: colors.black,
        alignSelf:'center'
    },

    backgroundView:{
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 574,
        right: 0,
        opacity: 0.6,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:10,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor:'#00000049',
    },

    headWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:-45,
        marginBottom:20,
        alignSelf:'center',
        width:250,
        borderRadius: 20,
        paddingBottom:5
    },

    line : {
        fontFamily: 'Montserrat-Bold',
        fontSize:22,
        alignSelf:'center',
        borderBottomColor: '#F84040',
        borderBottomWidth: 2,
        alignItems:'center',
        color: colors.black,
        padding:5,
        borderRadius:20,
      },
});

/*/*
eventTitleWrapper:{
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius:30,
        borderColor: colors.black,
        //marginHorizontal: 14,
        marginTop: 6,
        marginHorizontal:0,
        //paddingHorizontal: 16,
        paddingVertical: 15,
        paddingHorizontal:0,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor:colors.orange,
        
    },
<View style = {styles.topBar}>
                <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}}
                style = {styles.topGradient}
                >
                    <View style = {styles.topContent}>
                        <LinearGradient
                            colors = {['#F8A300','#F84040']}
                            start = {{x:1, y:0}}
                            end = {{x:0, y:0}}
                            style = {styles.back}>
                            <TouchableOpacity onPress={()=> navigation.goBack()}>
                                <View style = {styles.backWrapper}>
                                    <Feather name = 'chevron-left' size = {40} color = {colors.white} />
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>

                        <Text style = { styles.titleText}>Pick Your Event Types :</Text>
                    </View>
                </LinearGradient>
            </View>
<View style = {styles.backgroundView}/>
<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                
                <LinearGradient
                            colors = {['#F8A300','#F84040']}
                            start = {{x:1, y:1}}
                            end = {{x:0, y:0}}
                            style = {styles.eventTitleWrapper}>
                                
                                <LinearGradient
                                    colors = {['#F8A300','#F84040']}
                                    start = {{x:1, y:0}}
                                    end = {{x:0, y:0}}
                                    style = {styles.back}>
                                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                                        <View style = {styles.backWrapper}>
                                            <Feather name = 'chevron-left' size = {40} color = {colors.white} />
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>  
                                
                                <Text style = { styles.titleText}>Pick Your Event Types :</Text>
                </LinearGradient>
            </View>
colors = {['#e5e5e5', '#e5e5e5', '#e5e5e5', colors.textLightWhite, colors.textLightWhite]}

var cardSelected =[];
      for(var i = 0; i< 9; i++)
      {
          cardSelected[i]=false;
      }
      var str=' ';

      var printSelect = (index) =>{
        
        switch(index)
        {
            case 0:
                str= str+ ' Restaurant';
                break;
            case 1:
                str+=  ' Movie Theater';
                break;
            case 2:
                str+=  ' Night Club';
                break;
            case 3:
                str+=  ' Cafe';
                break;
            case 4:
                str += ' Museum';
                break;
            case 5:
                str+=  ' Bar';
                break;
            case 6:
                str+=  ' Tourist Attraction';
                break;
            case 7:
                str += ' Gym';
                break;
            case 8:
                str+=  ' Park';
                break;
        }  
        return(
            //console.log(str)
            <SafeAreaView>
                <View style ={{backgroundColor:'black'}}>
                <Text style={{fontFamily:'Montserrat-Bold', fontSize: 16, color:'white'}}>{str}</Text>
                </View>
            </SafeAreaView>
            
          );
      }
      var cardSelectedUpdate = (int) =>{
        colors.card[6]='red'
      }
      var clear = () =>{
          typeArray=[];
          str=' ';
          generateCards.init();
      }
      {header}
       <LinearGradient
                        colors = {['#F8A300','#F8761D','#F84040','#F84040']}
                        start = {{x:1, y:0}}
                        end = {{x:0, y:0}}
                        style = {styles.headerWrapper}>
                    
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Pick Your Event Types</Text>
                    </View>
            </LinearGradient>
*/