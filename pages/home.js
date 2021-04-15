import * as React from 'react';
import {SafeAreaView, 
  Text, 
  View, 
  StyleSheet, 
  FlatList,
  Button, 
  Image, 
  ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import cardData from '../assets/data/cardData';

Feather.loadFont();

import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import {LinearGradient} from 'expo-linear-gradient';

export default home = ({navigation}) => {

  const [loaded] = useFonts({
    //'Montserrat': require('../assets/fonts/Montserrat.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),

  });
  
  if (!loaded) {
    return null; 
  }


    const renderCardItem = ({item}) => {
        return(
            <TouchableOpacity 
              key = {item.id}
              onPress = {()=>{
                navigation.navigate("Event's Page!",{item: item})  
              }}
              >
                
              <View style= {[styles.cardItemWrapper, {backgroundColor: item.selected? colors.orange: 'white' , marginLeft: item.id == '0' ? 15 : 0}]}>
                  <Image source = {{width: 20, height: 20, uri: item.image}} style = {styles.cardItemImage}/>
                  <View style = {{width: '100%', height: '45%', overflow:'hidden', paddingHorizontal: 10}}>
                    <Text style= {styles.cardTitleWrapper}>{item.title}</Text>
                  </View>
                  
              </View>   
              
            </TouchableOpacity>
        )
    };
    {/*'add' icon */}
    /*<View style = {StyleSheet.cardSelectWrapper}>
                    <Feather name="plus" size ={16} style={[styles.plus,{backgroundColor: item.selected? 'white':colors.orange}]}/>
                  </View>*///

 
    return(
        <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerWrapper}>
                <Feather name="menu" size={24} color='#E85C2B' onPress = {() =>
                  navigation.navigate("Menu",{item:item})} />
                <TouchableOpacity onPress = {()=> navigation.navigate("Home!")}>
                  <Image
                  source={require('../assets/images/Logo.png')}
                  style={[styles.logo, {marginRight:10}]}
                  />
                </TouchableOpacity>
            </View>

            <Text style = {[styles.line, {marginLeft: 10, marginRight:10}]}></Text>

          </SafeAreaView>

            {/*generte schedule*/}

            <TouchableOpacity onPress = {()=> navigation.navigate("Generate Schedule!")}>
              <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}} 
                style={styles.searchWrapper}>
                
                  <View style={styles.search}>
                    <Feather name="calendar" size={16} color='black'/>
                    <Text style={styles.searchText}>Generate Schedule</Text>
                  </View>
                
              </LinearGradient>
            </TouchableOpacity>


           
            
            {/* List1 */} 
            <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>RESTAURANTS</Text>
              
                <View style={styles.cardListWrapper}>
                  <FlatList
                    data={cardData[0]}
                    renderItem={renderCardItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </View>
         
            </View>

           
            {/* List2 */}
            <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>MUSEUMS</Text> 
              <View style={styles.cardListWrapper}>
                <FlatList
                  data={cardData[1]}
                  renderItem={renderCardItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                />
              </View>
            </View>

            

            {/* List3 */}
            <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>TOURIST ATTRACTIONS</Text>
              <View style={styles.cardListWrapper}>
                <FlatList
                  data={cardData[2]}
                  renderItem={renderCardItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                />
              </View>
            </View>
 
            
            
            {/* LIST4 */}
            <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>CAFES</Text>
              <View style={styles.cardListWrapper}>
                <FlatList
                  data={cardData[3]}
                  renderItem={renderCardItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  style = {{marginBottom: 20}}
                />
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
          
         </View> 
         
    );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    marginTop:35
    
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
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
    color: color.textDark,
  },

  cardListWrapper: {
    paddingTop: 15,
    //paddingBottom: 20,
  },

  cardItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
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

  cardSelectIcon: {
    alignSelf: 'center',
  },
  
  plus: {
    padding: 5,
    backgroundColor: colors.orange,
    borderRadius: 40,
    alignSelf: 'center'
  },

  line : {
    borderBottomColor: '#F84040',
    borderBottomWidth: 2,
    alignItems:'center'
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
  
  gradient: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  }
});
 