import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

//wth
//initializing firebase:
const firebaseConfig={
    apiKey: "AIzaSyBgjIg9H_v7iTjh-2BJRbFLI8TUTy080oQ",
    authDomain: "react-firebase-e1d25.firebaseapp.com",
    projectId: "react-firebase-e1d25",
    storageBucket: "react-firebase-e1d25.appspot.com",
    messagingSenderId: "664721531468",
    appId: "1:664721531468:web:a6b057fb0ecd447a130ae9",
    measurementId: "G-SSB5NJSF08"
};

if (!firebase.apps.length) {  
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

//done initialization

import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

export default class App extends React.Component{
  constructor (props){
    super(props);

    this.state =({
      email:'',
      password:'',
    });
  }

  signUpUser = (email, password) =>{
    try {
      if(this.state.password.length<5)
      {
        alert("Please enter at least 5 characters")
        return;
      }  
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email,password) => {
    try {
      firebase.auth().signInUserWithEmailAndPassword(email, password).then(function (user){
        console.log(user) //returns user's details
      })
    } catch (error) {
      console.log(error.toString())
    }
  }

  render(){  
    
    return (
    
      
         <Container style ={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autocrrect={false} 
              autoCapitalize="none"
              onChangeText ={(email)=>this.setState({email})}
            />
          </Item>
  
          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry={true}
              autocrrect={false} 
              autoCapitalize="none"
              onChangeText ={(password)=>this.setState({password})}
            />
          </Item>
  
          <Button style ={{marginTop:10, backgroundColor: "green"}}
            full
            rounded
            success
            onPress = {()=>this.loginUser(this.state.email,this.state.password)}
          >
            <Text style={{color:"white"}}>Login</Text>
          </Button>
  
          <Button style ={{marginTop:5, backgroundColor: "dodgerblue"}}
            full
            rounded
            primary
            onPress = {()=>this.signUpUser(this.state.email,this.state.password)}
          >
            <Text style={{color:"white"}}>Sign Up</Text>
          </Button>
  
        </Form>
      </Container>
  
      
      
    
  );}
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
