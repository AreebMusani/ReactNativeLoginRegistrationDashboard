import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer,DrawerActions,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Registration from './screens/Registration'
import HomeDrawer from './screens/HomeDrawer'
import PasswordForget from './screens/PasswordForget'
import AddBook from './screens/AddBook'
import Firebase from './Firebase'

const Stack = createStackNavigator();

export default function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(()=>{
  Firebase.auth().onAuthStateChanged(authUser => {
    authUser
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false)
  })
},[])
const handleSignIn = (email,password) => {
    Firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            alert("You are login Successfully")
            setIsAuthenticated(true);
        })
        .catch((error)=>{
            alert(error)
        })
};

  const handleSignUp = (userName,email,phone,password) => {
    Firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{
            const uid = response.user.uid
            const data = {
                id : uid,
                UserName : userName,
                Email : email,
                Phone : phone,
                Password : password
            };
            Firebase.database().ref('User/'+uid+'/MyProfile').set(data)
            .then(()=>{
                alert("User Created Successfully!")
                setIsAuthenticated(true);

            }).catch((error)=>{
                alert(error)
            })
        }).catch((error)=>{
            alert(error)
        })
  };

  const handleSignOut = () => {
    Firebase.auth().signOut();
    setIsAuthenticated(false);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (<>
          <Stack.Screen 
          name="Dashboard" 
          component={HomeDrawer} 
          options={({route,navigation})=>({
              headerTitle: getFocusedRouteNameFromRoute(route),
              headerStyle: {
                backgroundColor: 'red', 
              },
              headerLeftContainerStyle:{
                paddingLeft: 10
              },
              headerRightContainerStyle:{
                paddingRight: 10
              },
              headerTitleAlign:'center',
              headerTintColor:'#fff',
              headerLeft: () => (
                <Button
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  title="Menu"
                />
              ),
              headerRight: () => (
                <Button onPress={handleSignOut} title="Sign Out" />
              )
          })}
          />
          <Stack.Screen name="Add Book" component={AddBook}/>
          </>
        ) : (
            <>
              <Stack.Screen 
              name="Login" 
              options={{
              animationTypeForReplace: 'pop',
              headerStyle: {
                backgroundColor: 'red', 
              },
              headerLeftContainerStyle:{
                paddingLeft: 10
              },
              headerRightContainerStyle:{
                paddingRight: 10
              },
              headerTitleAlign:'center',
              headerTintColor:'#fff',
              }
              
              }>
                {(props) => (
                  <Login {...props} onclick={handleSignIn} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Registration" options={{headerStyle: {
                backgroundColor: 'red', 
              },
              headerLeftContainerStyle:{
                paddingLeft: 10
              },
              headerRightContainerStyle:{
                paddingRight: 10
              },
              headerTitleAlign:'center',
              headerTintColor:'#fff',}}>
                  {(props)=>(
                    <Registration {...props} signup={handleSignUp}/>
                  )}
              </Stack.Screen>
              <Stack.Screen
              name="My Profile"
              component={PasswordForget}
              />
            </>
          )}

      </Stack.Navigator>
    </NavigationContainer >

  );
}

