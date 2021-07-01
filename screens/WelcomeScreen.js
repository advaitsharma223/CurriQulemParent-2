import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class WelcomeScreen extends React.Component{

    constructor() {
        super();
        this.state={
            emailId: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            contact: '',
            subject: '',
            schoolName: '',
            defaultEmailId: '@teacher.com',
            isModalVisible: 'false'
        }
    }

    userSignUp = (emailId, password, confirmPassword) =>{
        console.log("***************"+emailId+"****************");
        if(password !== confirmPassword) {
            return Alert.alert("Password doesn't match\nCheck your password.")
        }else(
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(()=>{
                console.log("auth success");
                db.collection('teachers').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    school_name: this.state.schoolName,
                    subject: this.state.subject,
                    emailId: this.state.defaultEmailId,
                })
                return  Alert.alert(
                    'Teacher Added Successfully',
                    '',
                    [
                      {text: 'Continue', onPress: () => this.setState({"isModalVisible": false})},
                    ]
                );
            })
        )
        
    }
   
    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            this.props.navigation.navigate('ClassScreen')
        })
        .catch((error)=> {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert('Please Enter Correct Password\nOr see if you have signed up'+error.message)
        })
    }

    showModal = ()=>{
        return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
            >
            
                <ScrollView style={{ flex:1, backgroundColor: '#fff'}}>

               
                    <View style = {{ flex: 0.05, justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.modalTitle}>Sign Up</Text>
                    </View>
                    <View style={{ flex: 0.95, justifyContent: "center", alignItems: "center"}}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"First Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                            this.setState({
                                firstName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Last Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                            this.setState({
                                lastName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Contact"}
                            maxLength ={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                            this.setState({
                                contact: text
                            })
                            }}
                        />
                        <Text style={styles.label}>Just Before The Default Text,</Text>
                        <Text style={styles.label}>Type Your First And Last Name Without Any Space</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Email"}
                            keyboardType ={'email-address'}
                            onChangeText={(text)=>{
                                this.setState({
                                    defaultEmailId: text
                                })
                            }}
                            value = {this.state.defaultEmailId}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Password"}
                            secureTextEntry = {true}
                            onChangeText={(text)=>{
                            this.setState({
                                password: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Confirm Password"}
                            secureTextEntry = {true}
                            onChangeText={(text)=>{
                            this.setState({
                                confirmPassword: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Subject"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                            this.setState({
                                subject: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"School Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                            this.setState({
                                schoolName: text
                            })
                            }}
                        />
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={()=>
                                    this.userSignUp(this.state.defaultEmailId, this.state.password, this.state.confirmPassword)
                                }
                            >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                        
                        <Text
                            style={styles.cancelButtonText}
                            onPress={() => {
                                this.setState({ isModalVisible: false });
                            }}
                        >
                            Cancel
                        </Text>
                    </View>
                    
                </ScrollView>    
            </Modal>
        )
      }

    render(){
        return(
            <View style = {{flex:1 }}>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', paddingTop: 240}}>
                    {
                        this.showModal()
                    }
                    <TextInput 
                        style = {styles.EmailIdTextInput}
                        placeholder = "Email Id"
                        keyboardType ='email-address'
                        onChangeText={(text)=>{
                            this.setState({
                              emailId: text
                            })
                        }}
                    />

                    <TextInput
                        style = {styles.PasswordTextInput}
                        placeholder = "Password"
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                              password: text
                            })
                        }}
                    />

                    <TouchableOpacity style = {styles.LoginButton}
                        onPress = {()=>{
                            this.userLogin(this.state.emailId, this.state.password)
                        }}
                    >
                        <Text style = {styles.LoginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.SignUpButton}
                         onPress={() => this.setState({ isModalVisible: true })}
                    >
                        <Text style = {styles.SignUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    EmailIdTextInput: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#00FFFF',
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    PasswordTextInput: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#00FFFF',
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    LoginButton: {
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        backgroundColor: "#00FFFF",
    },

    LoginButtonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },

    SignUpButton: {
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        backgroundColor: "#00FFFF",
    },

    SignUpButtonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    formTextInput:{
        width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#00FFFF",
        paddingBottom: RFValue(10),
        marginLeft: RFValue(20),
        marginBottom: RFValue(14),
        borderRadius: 10
    },
    registerButton:{
      width: "75%",
      height: RFValue(50),
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(3),
      backgroundColor: "#00FFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(10),
      borderRadius: 10
    },
    registerButtonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#FFFFFF"
    },
    cancelButtonText: {
      fontSize: RFValue(20),
      color: "#00FFFF",
      marginTop: RFValue(10),
    },
    label: {
        fontSize: RFValue(6),
        color: "#717D7E",
        fontWeight: "bold",
        paddingLeft: RFValue(10),
        marginLeft: RFValue(20),
    },
    modalTitle :{   
        fontSize:RFValue(30),
        color:'#00FFFF',
        fontWeight: "bold",
    },
})