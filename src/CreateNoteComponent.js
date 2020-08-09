import React, {useState} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native'
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CreateNoteComponent = (props) => {

    const [newNoteText, setNewNoteText] = useState('')

    const [newNoteTitle, setNewNoteTitle] = useState('')

    return <View >
        <TextInput 
            style={styles.titleInputStyle}
            placeholder="Title"
            value={newNoteTitle}
            onChangeText={(currentTitle)=>{
                setNewNoteTitle(currentTitle)
            }}
        />
        <View style={{flexDirection:"row"}}>
            <TextInput 
            style={styles.textInputStyles}
            autoCorrect={false}
            placeholder="New Note"
            multiline={true}
            value={newNoteText}
            onChangeText={(currentText) => {
                    setNewNoteText(currentText)
            
            }
            }
            />
            <View style={styles.createButtonProp}>
                <Icon.Button
                    name="circle-with-plus"
                    backgroundColor="#fdffbf"
                    style={styles.iconStyle}
                    onPress={() => {
                        // Store the text on firebase as well
                        // /users/{id}/
                        if(newNoteText !== '' && newNoteTitle !== '') {
                            const loggedInUserId = firebase.auth().currentUser.uid
                            const pathForData = `/users/${loggedInUserId}/`
                            firebase.database()
                                .ref(pathForData)//.child(newNoteTitle)
                                .push({
                                    'date': new Date().toDateString(),
                                    'title':newNoteTitle,
                                    'text': newNoteText
                                })
                            setNewNoteText('')
                            setNewNoteTitle('')
                        }

                    }}
                ></Icon.Button>
            </View>
        </View>
    </View>
    
}

const styles = StyleSheet.create({
    textInputStyles: {
        borderWidth: 0.7,
        width: 260,
        height: 140,
        borderRadius: 10,
        padding: 15,
        fontSize: 21,
        margin:10,
        backgroundColor: '#d5f7f3'
    },
    titleInputStyle : {
        borderWidth: 0.7,
        width: 320,
        height: 50,
        borderRadius: 10,
        padding: 8,
        fontSize: 23,
        margin:10,
        backgroundColor: '#fff'

    },
    createButtonProp:{
        height:50,
        borderRadius:10,
        width:50,
        marginTop:50,
        justifyContent:"flex-end",
        backgroundColor:"#3b5998"
    },
    iconStyle:{
        height:50,
        borderRadius:10,
        width:50,
        backgroundColor:"#3b5998"
    }
});

export default CreateNoteComponent;