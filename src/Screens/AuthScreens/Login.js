import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent/Header';
import UploadPhotoScreen from '../DetectionScreen/UploadPhotoScreen';
const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      {/* Logo */}
      <View style={{ alignItems: 'center', marginTop: 50,  paddingHorizontal: 30, }}>
      <Image
        source={require('../../Assets/Images/Logo2.png')} // replace with your actual logo path
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subText}>Login to your account</Text>

      {/* Username Input */}
      <View >

        <View style={styles.inputContainer}>
          <View style={styles.Circle}><Icon name="user" size={20} color="#999" style={styles.inputIcon} /></View>
          <View style={{ width: '100%' }}><TextInput placeholder="Username" style={styles.input} placeholderTextColor="#999" /></View>
        </View>
      </View>
            <View >

        <View style={styles.inputContainer}>
          <View style={styles.Circle}><Icon name="lock" size={20} color="#999" style={styles.inputIcon} /></View>
          <View style={{ width: '100%' }}><TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#999" /></View>
        </View>
      </View>

      {/* Password Input */}
      {/* <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.inputIcon} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#999" />
      </View> */}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.replace('ChooseStyleCategoryScreen')}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>


      {/* Sign Up Link */}
      <TouchableOpacity>
        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink}>Sign up here</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    color: '#1e90ff',
    
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
    backgroundColor: '#1e90ff',
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
    color: '#1e90ff',
    fontWeight: '500',
  },

});

