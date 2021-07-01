import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import { ListItem } from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/Header';
import {SafeAreaProvider} from "react-native-safe-area-context";
import db from '../config';
import firebase from 'firebase';

export default class Screen extends React.Component{

    constructor() {
        super();
        this.state={
            className: '',
            grade: '',
            subject: '',
            schoolName: '',
            teacherName: '',
            isModalVisible: 'false',
            //teacherDocId: [],
            //userId: firebase.auth().currentUser.email,
        }
    }
    //componentDidMount(){
      //  this.getTeacherDetails();
    //}

    //getTeacherDetails =()=>{
      //  db.collection("teachers").where("emailId","==", userId)
        //.onSnapshot((snapshot) => {
          //  var teacherDocId = snapshot.docs.map(document => document.data());
            //this.setState({
              //  teacherDocId: teacherDocId
            //});
        //})
    //}
    
    addClass = () => {
        db.collection('Classes').add({
            //teacherDocId: this.state.teacherDocId,
            class_name: this.state.className,
            teacher_name: this.state.teacherName,
            school_name: this.state.schoolName,
            grade: this.state.grade,
            subject: this.state.subject
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
                        <Text style={styles.modalTitle}>Add Class</Text>
                    </View>
                    <View style={{ flex: 0.95, justifyContent: "center", alignItems: "center"}}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Class Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                                this.setState({
                                    className: text
                                })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Grade"}
                            maxLength ={8}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                    grade: text
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
                            placeholder ={"Teacher's Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                                this.setState({
                                    teacherName: text
                                })
                            }}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"School Name"}
                            onChangeText={(text)=>{
                                this.setState({
                                    schoolName: text
                                })
                            }}
                        />
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.addClassButton}
                                onPress={()=>
                                    this.addClass()
                                }
                            >
                            <Text style={styles.addClassButtonText}>Add</Text>
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
            <SafeAreaProvider>
                <View style = {{ flex: 0.05, justifyContent: "center", alignItems: "center"}}>
                    <MyHeader title='My Classes' navigation={this.props.navigation}/>
                    {
                        this.showModal()
                    }
                    <TouchableOpacity
                        style={styles.AddButton}
                        onPress={() => this.setState({ isModalVisible: true })}
                    >
                        <Text style={styles.AddButtonText}>Add Class</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    AddButton: {
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        backgroundColor: "#00FFFF",
    },

    AddButtonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    modalTitle :{   
        fontSize:RFValue(30),
        color:'#00FFFF',
        fontWeight: "bold",
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
    addClassButton:{
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
    addClassButtonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#FFFFFF"
      },
      cancelButtonText: {
        fontSize: RFValue(20),
        color: "#00FFFF",
        marginTop: RFValue(10),
      },
})