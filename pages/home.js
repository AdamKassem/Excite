import * as React from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList, Image, ScrollView,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Font from 'expo-font'

import colors from '../assets/colors/colors';
import cardData from '../assets/data/cardData';

Feather.loadFont();
MaterialCommunityIcons.loadFont();


import { useFonts } from 'expo-font';

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
            <View style= {[styles.cardItemWrapper, {backgroundColor: item.selected? '#12435A': 'white' , marginLeft: item.id == 1 ? 20 : 0}]}>
                <Image source = {{width: 20, height: 20, uri: item.image}} style = {styles.cardItemImage}/>

                <Text style= {styles.cardTitleWrapper}>{item.title}</Text>

                <View style = {[StyleSheet.cardSelectWrapper, {backgroundColor: item.selected ? 'white' : 'orange'}]}>
                   <Text>insert nav icon</Text>
                </View>
            </View>
        )
    };


    return(
        <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerWrapper}>
                <Feather name="menu" size={24} color='#E85C2B' />
                <Image
                 source={require('../assets/images/Logo.png')}
                 style={[styles.logo, {marginRight:10}]}
                />
            </View>

            <Text style = {[styles.line, {marginLeft: 10, marginRight:10}]}></Text>

            {/* Search */}

            <View style={styles.searchWrapper}>
              <Feather name="search" size={16} color='black'/>
              <View style={styles.search}>
                <Text style={styles.searchText}>Search</Text>
              </View>
            </View>


         
            
            {/* Cards */}
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
            <View style={styles.cardWrapper}>
              <Text style={styles.cardTitle}>CAFES</Text>
              <View style={styles.cardListWrapper}>
                <FlatList
                  data={cardData[3]}
                  renderItem={renderCardItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                />
              </View>
            </View>

            

          </SafeAreaView>
          
         </ScrollView>
         </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },

  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },

  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },

  searchText: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },

  cardWrapper: {
    marginTop: 30,
  },

  cardTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
    borderBottomColor: '#F84040',
    borderBottomWidth: 2,
  },

  cardListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },

  cardItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  cardItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
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
  }

  
});
