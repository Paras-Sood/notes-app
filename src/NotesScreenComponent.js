import React, { useState, useEffect } from 'react';
import  {Text, FlatList, View, StyleSheet, TextInput, Button,ImageBackground}  from 'react-native';
import SingleNoteSummaryComponent from './SingleNoteSummaryComponent';
import CreateNoteComponent from './CreateNoteComponent';
import firebase from 'firebase'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// a react component is nothing but a javascript function

const NotesScreenComponent = () => {

    const [data, setData] = useState([]);
    // to write javascript inside jsx, i need to enclose javascript code in {}
    // {name: 'abc', 'age': 12} -> {name} -> {name: 'abc'}
    // item , index

    // /users/{id}/ 

    const loggedInUserId = firebase.auth().currentUser.uid
    
    useEffect(() => {firebase.database()
        .ref(`/users/${loggedInUserId}/`)
        .on('value', (completeNewData) => {

            const newDataList = _.map(completeNewData.val(), (value, key) => {
                // console.log("Value", value)
                console.log("Key", key)
                return {...value}
            })

            setData(newDataList.reverse())
        }
    )}, [])

    const addNewNote = (text) => {
        if(text.length > 0){
            setData([{"text": text, "date": new Date()}, ...data])
        }
        
    }
    const image = {uri : "https://fsa.zobj.net/crop.php?r=Y7XpYTU5wXAZHT1I-HGkqNiqY1umyP2ahrm8H1akctM1u5gRfs35OOglkZ8Cj3zonzO0Gh7mBcZ3bi5czNKnkuqe-F1E1iJjTvnOB1d5p2o59NL3le93Wd6fOMo-lSfWf-IgvhxkJdQv8RSV"}

    return <View>
        <ImageBackground source={image} style={{flex:1,width:420,alignItems:"center"}}>
        <View style={styles.viewProperties}>
            <Icon.Button 
                name="logout"
                backgroundColor="#3b5998"
                onPress={() => firebase.auth().signOut()}
            >Logout</Icon.Button>


            <CreateNoteComponent
                onCreateButtonPress={
                (text) => addNewNote(text) 
            }/>
            
            <View style={[{margin:5},{width:120,marginLeft:100,}]}>
                <Icon.Button
                    name="delete"
                    onPress={() => {
                        // Store the text on firebase as well
                        // /users/{id}/
                            const loggedInUserId = firebase.auth().currentUser.uid
                            const pathForData = `/users/${loggedInUserId}/`
            
                            firebase.database()
                                .ref(pathForData)
                                .remove()
                                .then(function() {
                                    console.log("Remove succeeded.")})
                    }}
                >Delete All</Icon.Button>
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                style={styles.listProperties}
                data={data}
                keyExtractor={(item, index) => {
                    // console.log("This is the value of ITEM")
                    // console.log(item.key)
                        return index.toString()
                    }
                }
                numColumns={2}
                renderItem={({item}) => {
                    // console.log(index, item)
                    return <SingleNoteSummaryComponent myNoteDate={item.date} myNoteText={item.text}  myNoteTitle={item.title}/>
                }
                
            }   
            />
        </View>
        </ImageBackground>
    </View>

}


const styles = StyleSheet.create({
    viewProperties : {
        marginTop: 50
    },
    textProperties: {
        fontSize: 24
    },
    textViewStyle: {
        margin: 10,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    }
});

const randomBackground = () => {
    var red = Math.floor(Math.random() * 255) // 123
    var green = Math.floor(Math.random() * 255) // 45
    var blue = Math.floor(Math.random() * 255) // 43

    // String Interpolation
    // In a string -> isnert a value of some other data type
    // ""  ''  ``

    return `rgb(${red}, ${green}, ${blue})` // rgb(123, 45, 43)
}

export default NotesScreenComponent;