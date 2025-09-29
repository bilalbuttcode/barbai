import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent/Header';
import axios from 'axios';
import baseURL from '../../Assets/BaseURL/api';
import Loader from '../../Components/Loader/Loader';
// import {  } from "../../Assets/Images/men";
const Signup = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/signup`, {
        user_name: username,
        email,
        password,
      });
      if (response.data.message) {
        Alert.alert("Success", response.data.message, [
          { text: "OK", onPress: () => {console.log("ok");   navigation.navigate("OTP", { email: email });}},
        ]);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Error", error.response.data.error || "Something went wrong");
      } else {
        Alert.alert("Error", "Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header onBackPress={() => navigation.navigate('GetStartScreen')} />
      {/* Logo */}
      <View style={{ alignItems: 'center', marginTop: 50, paddingHorizontal: 30, }}>
        <Image
          source={require('../../Assets/Images/Logo2.png')}
          style={styles.logo}
        />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>Create an account</Text>

        {/* Username Input */}
        <View >
          <View style={styles.inputContainer}>
            <View style={styles.Circle}><Icon name="user" size={20} color="#1F4FFF" style={styles.inputIcon} /></View>
            <View style={{ width: '100%' }}>
              <TextInput placeholder="Username"
                style={styles.input}
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername} />
                </View>
          </View>
        </View>
        <View >

          <View >
            <View style={styles.inputContainer}>
              <View style={styles.Circle}><Icon name="mail" size={20} color="#999" style={styles.inputIcon} /></View>
              <View style={{ width: '100%' }}>
                <TextInput placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail} /></View>
            </View>
          </View>


          <View style={styles.inputContainer}>
            <View style={styles.Circle}><Icon name="lock" size={20} color="#999" style={styles.inputIcon} /></View>
            <View style={{ width: '100%' }}>
              <TextInput placeholder="Password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
              /></View>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={() => handleSignup()} disabled={loading}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>


        {/* Sign Up Link */}
        <TouchableOpacity onPress={() => navigation.replace('Login')}  disabled={loading}>
          <Text style={styles.signUpText}>
            Already have an account? <Text style={styles.signUpLink}>Sign in here</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: 30,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',

    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
    position: 'relative',
    flexDirection: 'row',
  },
  Circle: {
    width: 60,
    height: 60,
    borderRadius: 30,                // Half of width/height
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#ffffff',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android Shadow
    elevation: 6,
  },
  inputIcon: {
    // marginRight: 10,
    color: '#1F4FFF',

  },
  input: {
    fontSize: 16,
    height: 50,
    paddingLeft: 55,
    backgroundColor: '#ffffff',      // White background
    color: '#000000',                // Black text
    borderRadius: 25,
    shadowColor: '#000',             // Shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1                // For Android shadow
  },
  signInButton: {
    backgroundColor: '#1F4FFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    color: '#aaa',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  socialIcon: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#555',
    fontSize: 14,
  },
  signUpLink: {
    color: '#1F4FFF',
    fontWeight: '500',
  },

});

