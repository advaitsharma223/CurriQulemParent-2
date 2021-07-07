import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput,  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingsScreen extends React.Component{

    constructor() {
        super();
        this.state = {
            emailId: '',
            firstName: '',
            lastName: '',
            contact: '',
            subject: '',
            schoolName: '',
        }
    }

    getTeacherDetails = ()=> {
        var email = firebase.auth().currentUser.email;
        db.collection('teachers').where('email_id', '==', email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    contact: data.contact,
                    subject: data.subject,
                    schoolName: data.school_name,
                    emailId: data.emailId
                })
            })
        });
    }

    componentDidMount() {
        this.getTeacherDetails();
    }

    updateTeacherDetails = () => {
        db.collection('teachers').doc(this.state.docId)
        .update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            subject: this.state.subject,
            school_name: this.state.schoolName,
            email_Id: this.state.emailId
        })
        Alert.alert("Teacher Profile has been Updtated");
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#6fc0b8' }}>
                <View style = {styles.formContainer}>
                    <View style={{ flex: 0.66,padding: RFValue(10),}}>
                    <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style = {styles.formTextInput}
                            placeholder = {"First Name"}
                            maxLength = {12}
                            onChangeText = {(text)=> {
                                this.setState({
                                    firstName: text,
                                })
                            }}
                            value = {this.state.firstName}
                        />
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style = {styles.formTextInput}
                            placeholder = {"Last Name"}
                            maxLength = {12}
                            onChangeText = {(text)=> {
                                this.setState({
                                    lastName: text,
                                })
                            }}
                            value = {this.state.lastName}
                        />
                        <Text style={styles.label}>Contact</Text>
                        <TextInput
                        style = {styles.formTextInput}
                        placeholder = {"Contact"}
                        maxLength = {10}
                        onChangeText = {(text)=> {
                            this.setState({
                                contact: text,
                            })
                        }}
                        value = {this.state.contact}
                        />
                        <Text style={styles.label}>Subject</Text>
                        <TextInput
                        style = {styles.formTextInput}
                        placeholder = {"Subject"}
                        maxLength = {2}
                        onChangeText = {(text)=> {
                            this.setState({
                                subject: text,
                            })
                        }}
                        value = {this.state.subject}
                        />
                        <Text style={styles.label}>School Name</Text>
                        <TextInput
                            style = {styles.formTextInput}
                            placeholder = {"School Name"}
                            multiline = {true}
                            onChangeText = {(text)=> {
                                this.setState({
                                    schoolName: text,
                                })
                            }}
                            value = {this.state.schoolName}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {()=>{
                                this.updateTeacherDetails();
                            }}>
                            <Text>
                                Update
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6fc0b8'
    },
    formContainer:{
      flex: 0.88,
      justifyContent: 'center'
    },
    formTextInput:{
      width:"90 %",
      height:RFValue(50),
      alignSelf:'center',
      borderColor:'grey',
      borderRadius:10,
      borderWidth:1,
      marginBottom: RFValue(20),
      marginLeft: RFValue(20),
      padding: RFValue(10),
    },
    button:{
      width:"75%",
      height:RFValue(60),
      justifyContent:'center',
      alignItems:'center',
      borderRadius:RFValue(50),
      backgroundColor:"#32867d",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:RFValue(20)
    },
    buttonView:{
        flex: 0.22,
        alignItems: 'center',
        marginTop: RFValue(30)
    },
    buttonText:{
      fontSize:RFValue(23),
      fontWeight:"bold",
      color:"#fff"
    },
    label:{
        fontSize: RFValue(18),
        color: '#717d7e',
        fontWeight: 'bold',
        padding: RFValue(10),
        marginLeft: RFValue(20)
    }
  })
  