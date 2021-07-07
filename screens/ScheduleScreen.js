import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import{Card,Header,Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class ScheduleScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            NineToNineFourty: '',
            NineFourtyToTenTwenty: '',
            TenTwentyToTenFourty: 'Break1',
            TenFourtyToElevenTwenty: '',
            ElevenTwentyToTwelve: '',
            TwelveToTwelveFourty: '',
            TwelveFourtyToOneTwenty: 'Break2',
            OneTwentyToTwo: '',
            isModalVisible: 'false'
        }
    }

    addSchedule = () =>  {
        db.collection('Schedule').add({
            NineToNineFourty: this.state.Nine_To_Nine_Fourty,
            NineFourtyToTenTwenty: this.state.Nine_Fourty_To_Ten_Twenty,
            TenTwentyToTenFourty: this.state.Ten_Twenty_To_Ten_Fourty,
            TenFourtyToElevenTwenty: this.state.Ten_Fourty_To_Eleven_Twenty,
            ElevenTwentyToTwelve: this.state.Eleven_Twenty_To_Twelve,
            TwelveToTwelveFourty: this.state.Twelve_To_Twelve_Fourty,
            TwelveFourtyToOneTwenty: this.state.Twelve_Fourty_To_One_Twenty,
            OneTwentyToTwo: this.state.One_Twenty_To_Two
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
                        <Text style={styles.modalTitle}>Scheduler</Text>
                    </View>
                    <View style={{ flex: 0.95, justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.label}>9:00 - 9:40</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                                this.setState({
                                    NineToNineFourty: text
                                })
                            }}
                        />
                        <Text style={styles.label}>9:40 - 10:20</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            maxLength ={8}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                    NineFourtyToTenTwenty: text
                                })
                            }}
                        />
                        <Text style={styles.label}>10:20 - 10:40</Text>
                        <Card >
                            <Text style={styles.formTextInput}>Short Break</Text>
                        </Card>
                        <Text style={styles.label}>10:40 - 11:20</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            maxLength ={10}
                            onChangeText={(text)=>{
                                this.setState({
                                    TenFourtyToElevenTwenty: text
                                })
                            }}
                        />
                        <Text style={styles.label}>11:20 - 12:00</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            onChangeText={(text)=>{
                                this.setState({
                                    ElevenTwentyToTwelve: text
                                })
                            }}
                        />
                        <Text style={styles.label}>12:00 - 12:40</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            onChangeText={(text)=>{
                                this.setState({
                                    TwelveToTwelveFourty: text
                                })
                            }}
                        />
                        <Text style={styles.label}>12:40 - 1:20</Text>
                        <Card >
                            <Text style={styles.formTextInput}>Lunch Break</Text>
                        </Card>
                        <Text style={styles.label}>1:20 - 2:00</Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder ={"Period Name"}
                            onChangeText={(text)=>{
                                this.setState({
                                    OneTwentyToTwo: text
                                })
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.addScheduleButton}
                                onPress={()=>
                                    this.addSchedule()
                                }
                            >
                            <Text style={styles.addScheduleButtonText}>Add</Text>
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
            <View >
                {
                    this.showModal()
                }
                <TouchableOpacity
                    style={styles.AddButton}
                    onPress={() => this.setState({ isModalVisible: true })}
                >
                    <Text
                        style={styles.AddButtonText}
                    >
                        Set Schedule
                    </Text>
                </TouchableOpacity>
            </View>
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
    addScheduleButton:{
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
    addScheduleButtonText: {
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
        fontSize: RFValue(13),
        color: "#717D7E",
        fontWeight: "bold",
        paddingLeft: RFValue(10),
        marginLeft: RFValue(20)
    },
})
