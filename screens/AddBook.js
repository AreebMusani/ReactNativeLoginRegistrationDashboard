import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput ,TouchableOpacity,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Firebase from '../Firebase'

class AddBook extends Component {
    constructor(props){
        super(props)
        this.state={
            BookName:'',
            Author: '',
            Quantity: null,
            Price: null
        }
    }
    AddItem(book,author,quantity,price){
        const myUserId = Firebase.auth().currentUser.uid;
        const newkey = Firebase.database().ref('Books').push().key;
        const bookdata = {
            id : newkey,
            Book : book,
            Author : author,
            Quantity : quantity,
            Price : price
        }
        var updates = {};
        updates['/Books/' + newkey] = bookdata;
        updates['/User/' + myUserId + '/MyBooks/' + newkey] = bookdata;
        Firebase.database().ref().update(updates)
            .then(()=>{
                alert("New Book Added Successfully!")
                this.props.navigation.navigate("Dashboard");
            }).catch((error)=>{
                alert(error)
            })
    }
    render() {
        return (
            <View style={styles.Addbook}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.registerHead}>Add Books</Text>
                <TextInput value={this.state.BookName} onChangeText={(text)=>this.setState({BookName: text})} placeholder="Book Name" placeholderTextColor='grey'
                 style={styles.input} autoFocus={true}/>
                <TextInput value={this.state.Author} onChangeText={(text)=>this.setState({Author: text})} placeholder="Author"
                 placeholderTextColor='grey' style={styles.input} autoFocus={false}/>
                <TextInput value={this.state.Quantity} onChangeText={(text)=>this.setState({Quantity: text})} placeholder="Quantity of Books" placeholderTextColor='grey'
                 style={styles.input} keyboardType='number-pad' autoFocus={false}/>
                <TextInput value={this.state.Price} onChangeText={(text)=>this.setState({Price: text})} placeholder="Price" placeholderTextColor='grey'
                 style={styles.input} keyboardType='number-pad' autoFocus={false} />
                <TouchableOpacity style={styles.btn} onPress={()=>this.AddItem(this.state.BookName,this.state.Author,this.state.Quantity,this.state.Price)}>
                    <Text style={styles.paragraph}>Add Item</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Addbook: {
        alignSelf: 'stretch',
        padding: 20,
        flex: 1,
      //alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#36485f',
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
})
export default AddBook