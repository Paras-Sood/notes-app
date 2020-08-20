import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import NotesScreenComponent from './src/NotesScreenComponent';
import firebase from 'firebase';
import LoginScreenComponent from './src/LoginScreenComponent';
import Hyperlink from 'react-native-hyperlink';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  
  const image = { uri: "https://www.invespcro.com/blog/images/blog-images/main.png" };
  
  if(firebase.apps.length === 0){
    var firebaseConfig = {
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
      <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        <NotesScreenComponent/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={{justifyContent:"center",alignItems:"center",flex:1}}>
          <LoginScreenComponent/>
          <View style={{alignItems:"center",justifyContent:"center",position:'absolute',bottom:0,marginBottom:10,borderWidth:0.5,borderRadius:50,padding:12}}>
                <Hyperlink linkDefault={true}>
                    <View flexDirection="row">
                        <Text>Give your Feedback </Text><Text style={{textDecorationLine:"underline",color: '#00f'}} onPress={()=>{Linking.openURL('https://forms.gle/W32rnj6Bup1LVmFB8')}}>Here</Text>
                    </View>
                </Hyperlink>
            </View>
        </ImageBackground>
      </View>
    );
  }


  // return (
  //   <View style={styles.container}>
  //     {/* <NotesScreenComponent/> */}
  //     <LoginScreenComponent/>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdffbf',
  },
});
