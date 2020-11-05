import React, { Component } from 'react'
import { Text, View,StyleSheet,Image } from 'react-native'
import Firebase from '../Firebase'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

class PasswordForget extends Component {
    constructor(props){
        super(props)
        this.state={
            myprofile: []
        }
    }
    componentDidMount(){
        const uid = Firebase.auth().currentUser.uid;
        Firebase.database().ref('User/'+uid+'/MyProfile').once("value",(datasnap)=>{
            const data = datasnap.val();
            this.setState({
                myprofile: data
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/Profile-Male-PNG.png')} style={{width:200,height:200,marginVertical:25}}/>
                <View>
                    <View style={styles.item}>
                        <Text style={styles.field}>UserName:</Text>
                        <Text style={styles.values}>{this.state.myprofile.UserName}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.field}>Email:</Text>
                        <Text style={styles.values}>{this.state.myprofile.Email}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.field}>Contact No:</Text>
                        <Text style={styles.values}>{this.state.myprofile.Phone}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.field}>Password:</Text>
                        <Text style={styles.values}>{this.state.myprofile.Password}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#36485f',
      alignItems: 'center',
    },
    item:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //paddingVertical: 15,
        //paddingHorizontal:10,
        borderBottomWidth: 2,
        width:width - 20,
        marginTop:10,
        borderBottomColor: '#fff',
        paddingHorizontal:5,
        paddingVertical:10
    },
    field:{
        flexBasis:'30%',
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff'
    },
    values:{
        fontWeight:'bold',
        fontSize: 20,
        flexBasis: '70%',
        flexWrap: 'wrap',
        alignSelf: 'center',
        color: '#f5f5f5',       
    }
});
export default PasswordForget