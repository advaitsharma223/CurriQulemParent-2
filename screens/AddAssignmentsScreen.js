import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Header';
import {SafeAreaProvider} from "react-native-safe-area-context";
// http://worldtimeapi.org/api/timezone/Asia/Tokyo

export default class AddAssignmentsScreen extends React.Component{
    constructor() {
        super();
        this.state={
            firstName: '',
            lastName: '',
            emailId: '',
            assignmentName: '',
            description: '',
            dueTime: '',
            subject: '',
            seen: 'false'
        }
    }

    getTeacherDetailsForAssignment = ()=> {
        var email = firebase.auth().currentUser.email;
        db.collection('teachers').where('email_id', '==', email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    subject: data.subject,
                    emailId: data.emailId
                })
            })
        });
    }

    addAssignment = () => {
        console.log(db);
        db.collection('assignments').add({
            assignment_Name: this.state.assignmentName,
            description: this.state.description,
            due_Time: this.state.dueTime,
            subject: this.state.subject,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_Id: this.state.emailId,
            seen: this.state.seen
        })
    }
    
    render(){
        return(
            <SafeAreaProvider>
            <View >
                <MyHeader title='Add Assignments' navigation={this.props.navigation}/>
                <TextInput
                    style ={styles.detailsTextInput}
                    placeholder={"Assignment Name"}
                    onChangeText={(text)=>{
                        this.setState({
                            assignmentName: text
                        })
                    }}
                />
                <TextInput
                    style ={[styles.detailsTextInput, {height:300}]}
                    placeholder={"Description"}
                    onChangeText={(text)=>{
                        this.setState({
                            description: text
                        })
                    }}
                />
                <TextInput
                    style ={styles.detailsTextInput}
                    placeholder={"Due Time"}
                    onChangeText={(text)=>{
                        this.setState({
                            dueTime: text
                        })
                    }}
                />
                <TouchableOpacity 
                    style={styles.AddAssignmentsButton}
                    onPress = {()=>{
                        this.addAssignment()
                    }}
                    >
                    <Text style={styles.AddAssignmentsButtonText}>Add Assignments</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    AddAssignmentsButton: {
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        backgroundColor: "#00FFFF",
    },

    AddAssignmentsButtonText: {
        color:'#ffff',
        fontWeight:'bold',
        fontSize:20
    },
    detailsTextInput:{
        width:"505%",
        height:35,
        alignSelf:'center',
        borderColor:'#00FFFF',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
        
      },
})