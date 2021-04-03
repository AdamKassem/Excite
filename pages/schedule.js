import * as React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default function schedule (){

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
    
    return(
        <View style={styles.container}>
            <SafeAreaView>
                    <Ionicons name="md-chevron-back" size={40,30} color={'#ED452F'}/>
                    <View >
                        <Text style = {styles.header1Text}>February</Text>
                        <Text style = {styles.header2Text}>2021</Text>
                    </View>

                    {/*days*/}
                    <View style = {styles.daysWrapper}>
                        <Text style = {styles.dayTextStyle}>S</Text>
                        <Text style = {styles.dayTextStyle}>M</Text>
                        <Text style = {styles.dayTextStyle}>T</Text>
                        <Text style = {styles.dayTextStyle}>W</Text>
                        <Text style = {styles.dayTextStyle}>T</Text>
                        <Text style = {styles.dayTextStyle}>F</Text>
                        <Text style = {styles.dayTextStyle}>S</Text>
                    </View>

                    {/*dates week 1*/}
                    <View style = {styles.weekWrapper}>
                        <View style = {[styles.datesWrapper,{backgroundColor: 'black'}]}>
                            <Text style = {styles.dateTextStyle}>28</Text>
                        </View>
                        <View style = {[styles.datesWrapper,{backgroundColor: 'black'}]}>
                            <Text style = {styles.dateTextStyle}>29</Text>
                        </View>
                        <View style = {[styles.datesWrapper,{backgroundColor: 'black'}]}>
                            <Text style = {styles.dateTextStyle}>30</Text>
                        </View>
                        <View style = {[styles.datesWrapper,{backgroundColor: 'black'}]}>
                            <Text style = {styles.dateTextStyle}>31</Text>
                        </View>
                        
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>1</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>2</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>3</Text>
                        </View>
                        
                        
                    </View>

                    {/*dates week 2*/}
                    <View style = {styles.weekWrapper}>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>4</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>5</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>6</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>7</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>8</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>9</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>10</Text>
                        </View>
                        
                        
                    </View>


                    {/*dates week 3*/}
                    <View style = {styles.weekWrapper}>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>11</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>12</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>13</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>14</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>15</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>16</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>17</Text>
                        </View>
                        
                        
                    </View>

                    {/*dates week 4*/}
                    <View style = {styles.weekWrapper}>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>18</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>19</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>20</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>21</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>22</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>23</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>24</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>25</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>26</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>27</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>28</Text>
                        </View>
                        
                    </View>


                    {/*dates week 5*/}
                    <View style = {styles.weekWrapper}>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>29</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>30</Text>
                        </View>
                        <View style = {styles.datesWrapper}>
                            <Text style = {styles.dateTextStyle}>31</Text>
                        </View>
                        
                    </View>


                    

                </SafeAreaView>
        </View>
    );
 }


const styles = StyleSheet.create({
   container:{
       flex: 1,
       backgroundColor: 'black'
    },
   
    header1Text:{
        paddingHorizontal: 16,
        fontFamily: 'stardo',
        fontSize: 41,
        color: '#C93636'
               
    },
    header2Text:{
        paddingHorizontal: 22,
        fontFamily: 'stardo',
        fontSize: 23,
        color: '#C93636'
    },

    daysWrapper:{
        paddingHorizontal: 14,
        flexDirection: 'row',
        paddingTop: 9,
        justifyContent: 'center',
        alignContent: 'center',
    },

    dayTextStyle:{
        marginLeft: 21.5,
        marginRight:21.5,
        //marginTop: 20,
        //marginBottom: 20,
        fontFamily: 'stardo',
        fontSize: 16,
        color: '#949494'
    },
    
    weekWrapper:{
        paddingHorizontal: 14,
        flexDirection: 'row',
        paddingTop: 9,
        
    },

    datesWrapper:{
        width: 41,
        height: 41,
        flexDirection: 'row',
        borderRadius:100,
        backgroundColor: '#C93636',
        justifyContent: 'center',
        alignContent: 'center',
        marginRight:13
    },

    dateTextStyle:{
        marginTop:9,
        fontFamily: 'stardo',
        fontSize: 16,
        color: '#949494'
    }
});