import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput, Button, ImageBackground} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
const LoginScreenComponent = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const image = { uri: "https://www.invespcro.com/blog/images/blog-images/main.png" };
    return <View>
        <ImageBackground source={image} style={{flex:1,width:412,justifyContent:"center",marginLeft:0,}}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text style={{marginLeft:-245}}> Email: </Text>
                <TextInput 
                    style={styles.textInputStyle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    placeholder="Email"
                    onChangeText={(currentText) => setEmail(currentText) }
                />

                <Text style={{marginLeft:-217}}> Password </Text>
                <TextInput 
                    style={styles.textInputStyle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(currentText) => setPassword(currentText)}
                />
                <View style={styles.viewStyle}>
                    <View style={styles.buttonStyle}>
                    <Icon.Button  
                        name="login"
                        backgroundColor="#3b5998"
                        onPress={() => firebase.auth().signInWithEmailAndPassword(email, password)}>
                            Login In
                    </Icon.Button>
                    </View>
                    
                    <View style={styles.buttonStyle}>
                    <Icon2.Button  
                        name="add-user"
                        backgroundColor="#3b5998"
                        onPress={() => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then(() => {
                                        setEmail("")
                                        setPassword("")
                                    })
                                    .catch(() => {
                                        console.log("Some error happened")
                                    })

                            }
                        }
                    >Signup</Icon2.Button>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </View>
}

export default LoginScreenComponent;
const styles=StyleSheet.create({
    textInputStyle:{
        width:300,
        borderWidth: 1,
        margin: 10,
        padding : 10,
        borderRadius:10,
        backgroundColor:'#fff'
        
    },
    buttonStyle:{
        margin:10,
        padding:5,
        marginLeft:30,
        width:110,
    },
    viewStyle:{
        flexDirection:"row",
    }
})