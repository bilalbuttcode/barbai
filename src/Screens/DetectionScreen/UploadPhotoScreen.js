import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  BackHandler
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetectionHeader from '../../Components/HeaderComponent/DetectionHeader';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const UploadPhotoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedGender } = route.params;
  useEffect(() => {
    const backAction = () => {
      navigation.goBack(); // 👈 Go back to previous screen
      return true; // Prevent default exit app behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };



  const handleUploadPhoto = async () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log('Image selected: ', response.assets[0]);
          navigation.navigate('HairAnalyzerScreen', {
            imageUri: response.assets[0].uri,
            selectedGender: selectedGender,
          });
          // Do something with the image
        }
      },
    );
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }
    launchCamera(
      { mediaType: 'photo', quality: 0.6 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          console.log('Photo taken: ', response.assets[0]);
          navigation.navigate('HairAnalyzerScreen', {
            imageUri: response.assets[0].uri,
            selectedGender: selectedGender,
          });

          // Do something with the image
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <DetectionHeader back={true} />

      <View style={styles.content}>
        <Text style={styles.title}>Upload Your Photo</Text>
        <Text style={styles.subtitle}>
          For best results, use a clear, front-facing photo with good lighting.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
            <Icon name="plus" size={40} color="#000" />
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Icon name="camera" size={40} color="#000" />
            <Text style={styles.buttonText}>Take picture from{'\n'}camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadPhotoScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '45%',
    height: 140,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  buttonText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
