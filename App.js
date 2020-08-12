import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotesScreenComponent from './src/NotesScreenComponent';
import firebase from 'firebase';
import LoginScreenComponent from './src/LoginScreenComponent';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  const image = { uri: "https://www.invespcro.com/blog/images/blog-images/main.png" };
  
  if(firebase.apps.length === 0){
    var firebaseConfig = {
      //Firebase Api
      //Firebase Config
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  }

  firebase.auth().onAuthStateChanged((user) => {
    if(user === null) {
      setUserLoggedIn(false)
    } else {
      setUserLoggedIn(true)
    }
  })

  if(userLoggedIn) {
    return (
      <View style={styles.container}>
        <NotesScreenComponent/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={{flex:1,width:612,justifyContent:"center",marginLeft:0,resizeMode: "cover",start:80,marginEnd:20}}>
          <LoginScreenComponent/>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdffbf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
