import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Dashboard from './Dashboard'
import PasswordForget from './PasswordForget' 
import {createDrawerNavigator} from '@react-navigation/drawer'
import AddBook from './AddBook'

class HomeDrawer extends Component {
    render() {
    const Drawer = createDrawerNavigator();
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={Dashboard}/>
                <Drawer.Screen name="My Profile" component={PasswordForget}/>
                <Drawer.Screen name="Add Book" component={AddBook}/>
            </Drawer.Navigator>        
        )
    }
}

export default HomeDrawer