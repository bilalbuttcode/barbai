import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Login from './src/Screens/AuthScreens/Login';
import Signup from './src/Screens/AuthScreens/Signup';
import Splash from './src/Screens/SplashScreen/Splash';
import UserManual from './src/Screens/SplashScreen/UserManual';
import GetStartScreen from './src/Screens/AuthScreens/GetStartScreen';
import UploadPhotoScreen from './src/Screens/DetectionScreen/UploadPhotoScreen';
import ChooseStyleCategoryScreen from './src/Screens/DetectionScreen/ChooseStyleCategoryScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseStyleCategoryScreen"
          component={ChooseStyleCategoryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GetStartScreen"
          component={GetStartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserManual"
          component={UserManual}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadPhotoScreen"
          component={UploadPhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        {/* UploadPhotoScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})