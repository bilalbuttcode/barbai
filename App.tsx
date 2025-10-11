import { Share, StyleSheet, Text, View } from 'react-native'
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
import HairAnalyzerScreen from './src/Screens/DetectionScreen/HairAnalyzerScreen';
import ShareScreen from './src/Screens/ShareScreen/ShareScreen';
import OTP from './src/Screens/AuthScreens/OTP';
import ForgotPasswordScreen from './src/Screens/AuthScreens/ForgotPasswordScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './src/Screens/Payment/PaymentScreen';
const App = () => {
  const Stack = createStackNavigator();
  return (
    <StripeProvider publishableKey="pk_test_51SCZAaI1LfkX92dPsJuFztpS6lFBUQHnSU9m4eDoKBtZJCAuyGbfd4SDoBLhkP0LaTDPEMZCXwVhjTYiEnNpXBWm00GuQwKBTk">
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
          <Stack.Screen
            name="HairAnalyzerScreen"
            component={HairAnalyzerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShareScreen"
            component={ShareScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  )
}

export default App

const styles = StyleSheet.create({})