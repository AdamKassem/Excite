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
import StarRating from 'react-native-star-rating';


export default genSchedule = ({navigation}) =>{
      const [loaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'stardo':  require('../assets/fonts/StardosStencil-Regular.ttf'),
      });

      return(
          <View style= {styles.container}>
            <LinearGradient
                colors = {['#F8A300','#F84040']}
                start = {{x:1, y:0}}
                end = {{x:0, y:0}} 
                style={styles.titleWrapper}>
                
                <View style={styles.title}>
                    <Feather name="calendar" size={16} color='black'/>
                    <Text style={styles.titleText}>Categories</Text>
                </View>
            </LinearGradient>

            <View style = {styles.rowWrapper}>
                <View style = {styles.row}>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <MaterialCommunityIcons name = 'food' size={20} style = {{alignSelf: 'center'}} color = {colors.orange}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20} style = {{alignSelf: 'center'}}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style ={styles.rowElement}>
                            <Feather name = 'restaurant' size={20}   color = {colors.orange}/>
                            <Text style= {styles.elementText}>Restaurant</Text>
                        </View>
                    </TouchableOpacity>
                   
                   
                </View>

                
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,

    },
    titleText:{
        marginLeft:5,
        fontFamily: 'Montserrat-Semibold',
        fontSize: 14,
        marginBottom: 5,
        color: colors.white,
        //alignItems:'center',
        alignSelf: 'center'
    },

    title:{
        flexDirection:'row',
        marginLeft: 10,
        borderBottomColor: colors.textLight,
        borderBottomWidth: 1,
        alignContent:'center',
        justifyContent:'center'
    },

    titleWrapper:{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 30,
        padding: 20,
        //backgroundColor: colors.orange,
        //justifyContent:'center',
        borderRadius:50,
        marginLeft:10,
        width:200
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