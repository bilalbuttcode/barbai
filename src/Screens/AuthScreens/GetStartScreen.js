import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/Logo2.png')} // replace with your actual logo path
        style={styles.logo}
      />
      <Text style={styles.title}>Barb AI</Text>
      <Text style={styles.subtitle}>See It Before you cut it</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
        </Text>
      </Text>

      <Text
        style={styles.guestText}
        onPress={() => navigation.navigate('ChooseStyleCategoryScreen')}
      >
        start as a guest
      </Text>
    </View>
  );
};

export default GetStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1F4FFF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
    color: '#1F4FFF',
    fontWeight: '600',
  },
  guestText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
});
