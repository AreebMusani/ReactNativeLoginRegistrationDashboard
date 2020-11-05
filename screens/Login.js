import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import Firebase from '../Firebase'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={require('../assets/favicon.png')} style={{ width: 300, height: 100, resizeMode: 'contain', marginBottom: 15, alignSelf: 'center' }} />
                    <TextInput value={this.state.email} onChangeText={(text) => this.setState({ email: text })} placeholder="Email" keyboardType='email-address' placeholderTextColor='grey' style={styles.input} autoFocus={true} />
                    <TextInput value={this.state.password} onChangeText={(text) => this.setState({ password: text })} placeholder="Password" placeholderTextColor='grey' style={styles.input} secureTextEntry={true} autoFocus={false} />
                    <TouchableOpacity onPress={() => this.props.onclick(this.state.email, this.state.password)} style={styles.btn}>
                        <Text style={styles.paragraph}>
                            LOGIN
                    </Text>
                    </TouchableOpacity>
                    <Text style={{ marginVertical: 10, textAlign: 'center', color: 'grey' }}>OR</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>
                        <Text style={styles.paragraph}>Sign Up</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingTop: 25
    },
    login: {
        color: '#fff'
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        padding: 10,
        marginVertical: 10,
        fontSize: 20,
        color: '#fff'
    },
    btn: {
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 8,
        marginTop: 10
    }
});
export default Login
