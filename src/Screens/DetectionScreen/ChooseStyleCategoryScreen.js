import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetectionHeader from '../../Components/HeaderComponent/DetectionHeader';

const ChooseStyleCategoryScreen = () => {
  const navigation = useNavigation();

  const handleSelectGender = (gender) => {
    Alert.alert('Selected', `You selected ${gender}`);
    navigation.navigate('UploadPhotoScreen');
  };

  return (
    <View style={styles.container}>
      <DetectionHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Style{'\n'}Category</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectGender('Male')}
          >
            <Icon name="mars" size={50} color="#000" />
            <Text style={styles.cardText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectGender('Female')}
          >
            <Icon name="venus" size={50} color="#000" />
            <Text style={styles.cardText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseStyleCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 10,
  },
  cardText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
