import React, { Component } from 'react'
import { Text, View,StyleSheet, TextInput ,TouchableOpacity,Image,ScrollView } from 'react-native'
import Firebase from '../Firebase'

class Registration extends Component {
    constructor(props){
        super(props)
        this.state={
            userName:'',
            email: '',
            phone: null,
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.register}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.registerHead}>Registeration</Text>
                <TextInput value={this.state.userName} onChangeText={(text)=>this.setState({userName: text})} placeholder="UserName" placeholderTextColor='grey'
                 style={styles.input} autoFocus={true}/>
                <TextInput value={this.state.email} onChangeText={(text)=>this.setState({email: text})} placeholder="Email" keyboardType='email-address'
                 placeholderTextColor='grey' style={styles.input} autoFocus={false}/>
                <TextInput value={this.state.phone} onChangeText={(text)=>this.setState({phone: text})} placeholder="Phone" placeholderTextColor='grey'
                 style={styles.input} keyboardType='number-pad' autoFocus={false}/>
                <TextInput value={this.state.password} onChangeText={(text)=>this.setState({password: text})} placeholder="Password" placeholderTextColor='grey'
                 style={styles.input} secureTextEntry={true} autoFocus={false} />
                <TouchableOpacity style={styles.btn} onPress={()=>this.props.signup(this.state.userName,this.state.email,this.state.phone,this.state.password)}>
                    <Text style={styles.paragraph}>Sign Up</Text>
                </TouchableOpacity>
                </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#36485f',
    },
    register: {
        alignSelf: 'stretch',
        paddingHorizontal: 30
    },
    registerHead:{
        color: '#fff',
        fontSize: 30,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 20 
    },
    input:{
        padding: 10,
        marginVertical: 10,
        fontSize: 20,
        color: '#fff'
    },
    btn:{
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 8,
        marginTop: 20
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});
export default Registration