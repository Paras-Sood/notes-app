import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, CheckBox} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';

const SingleNoteSummaryComponent = (props) => {
    
    const [newNoteText, setNewNoteText] = useState('')

    const [isSelected, setSelection] = useState(false);    

    // const valueToDel=ref.once('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var childKey = childSnapshot.key;
    //       var childData = childSnapshot.val();
    //       // ...
    //     });
    //   });

    // function deleteNote() {
    //     return API.del("notes", `/notes/${id}`);
    // }

    // const cut = () => {
    //     if(isSelected)
    //     {
    //         return "line-through"; 
    //     }
    //     else
    //     {
    //         return "none";
    //     }
    // }

    return <View  backgroundColor={randomBackground()} style={styles.textViewStyle}>
        <Text style={styles.dateProp}> {props.myNoteDate} </Text>
        <Text style={[{textDecorationLine:cutLine(isSelected)}, styles.textProperties ]}> {props.myNoteText}</Text>
        {/* <Button 
            title="Delete" 
            onPress={()=>{
                let key = DatabaseService.shared.REF_BASE.child("users").child(snapshot.key).childByAutoId().key
                messagesRef.queryOrderedByKey().queryEqual(toValue = key).remove();
            // const loggedInUserId = firebase.auth().currentUser.uid
            // const dataId = props
            // const pathForData = `/users/${loggedInUserId}/`
            
            // firebase.database()
            //     .ref(pathForData)
            //     .on('value',function(completeNewData) {
            //         completeNewData.val(), (value, key) => {
            //             // console.log("Value", value)
            //             console.log("Key", key)
            //     })
            //     .remove()
            //     .then(function() {
            //         console.log("Remove succeeded.")})
            
        }}/> */}


        {/* <View style={styles.checkboxContainer}>
            <CheckBox
                style={styles.checkBoxProp}
                value={isSelected}
                onValueChange={setSelection}
            />
            <Text style={styles.emojiProp}>{isSelected ? "👍" : "🙄" }</Text>
        </View> */}


                {/* // title ="Delete"
                // onPress={(props) => {
                    // Store the text on firebase as well
                    // // /users/{id}/
                        // const loggedInUserId = firebase.auth().currentUser.uid
                        // const pathForData = `/notes/${id}/`
        
                        // firebase.database()
                        //     .ref(pathForData)
                        //     .remove()
                            
                            

                    // FirebaseInstanceId.deleteInstanceId();

                    // An Instance ID sent from a client service SDK
                    // const idToDelete = 'INSTANCE_ID';

                    // admin.instanceId().deleteInstanceId(idToDelete);
                // }} */}
    </View>
}

const randomBackground = () => {
    var red = Math.floor(Math.random() * 255) // 123
    var green = Math.floor(Math.random() * 255) // 45
    var blue = Math.floor(Math.random() * 255) // 43

    // String Interpolation
    // In a string -> isnert a value of some other data type
    // ""  ''  ``

    //For light colours only
    if(red<100 || blue<100 || green<100)
    {
        red+=50
        blue+=40
    }
    

    return `rgb(${red}, ${green}, ${blue})` // rgb(123, 45, 43)
}

    const cutLine = (props) => {
        if(props===true)
        {
            return `line-through`
        }
        else{
            return `none`
        }
    }

const styles = StyleSheet.create({
    textProperties: {
        fontSize: 20,
        margin:5,
    },
    textViewStyle: {
        height: 150,
        width: 150,
        margin: 10,
        borderRadius: 10,
        padding: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dateProp : {
        position:"absolute",
        top:5,
        alignItems:"center"
    },
    checkboxProp:{
        backgroundColor: '#fff'
    },
    checkboxContainer:{
        flexDirection:"row",
        borderWidth:0.1,
        margin:2,
        top:10,
        bottom:2,
        right:5,
        borderRadius:10
    },
    emojiProp: {
        fontSize:20
    }
});


export default SingleNoteSummaryComponent;
