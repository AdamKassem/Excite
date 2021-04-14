import * as React from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
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

export default eventPage = ({route, navigation}) =>{
    const {item} = route.params;
    
}