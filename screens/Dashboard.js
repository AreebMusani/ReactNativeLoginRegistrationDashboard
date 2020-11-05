import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Firebase from '../Firebase'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        Firebase.database().ref('Books').on("value", (datasnap) => {
            const data = datasnap.val();
            const fetchdata = Object.values(data);
            let items = []
            fetchdata.forEach((item) => {
                items.push(item)
            })
            this.setState({
                list: items
            })
        })

    }
    renderItem = ({ item }) => {
        return (
            <ScrollView>
                <View style={styles.div}>
                    <Image source={require('../assets/book.jpg')} style={{ width: 300, height: '100%', paddingLeft: 10, flexBasis: '35%', resizeMode: 'contain' }} />
                    <View style={{ flexBasis: '65%', paddingLeft: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{item.Book}</Text>
                        <Text style={{ color: 'orange', fontSize: 15, fontWeight: 'normal' }}>{item.Author}</Text>
                        <Text style={{ color: 'red' }}>Quantity: {item.Quantity}</Text>
                        <Text style={{ fontWeight: 'bold', color: 'orange' }}>{item.Price} PKR</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Add Book')}>
                    <Text style={styles.paragraph}>Add Books</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36485f',
        paddingTop: 10
    },
    div: {
        borderColor: '#fff',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: 10
    },
    btn: {
        padding: 15,
        backgroundColor: 'orange',
        borderRadius: 15,
        //marginTop: 20,
        margin: 15
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});
export default Dashboard
