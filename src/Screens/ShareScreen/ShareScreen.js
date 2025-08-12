import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import DetectionHeader from '../../Components/HeaderComponent/DetectionHeader';

const ShareScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Title */}
      {/* <Text style={styles.appName}>BarbAI</Text>
      <Text style={styles.subtitle}>Save & Share Your Perfect Look</Text> */}

      {/* Image */}
      <DetectionHeader back={true} />
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://via.placeholder.com/200' }}
          style={styles.image}
        />
      </View>
      <View style={{ alignItems: 'center' }}>

        {/* Save Image */}
        <View style={styles.section}>
          <View style={styles.sectionTitle_cont}>
            <View><Feather name="download" size={20} color="#000" /></View>
            <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Save Image</Text>
          </View>
          <View style={styles.section_inner}>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonText}>Save with Watermark</Text>
              <Text style={styles.freeTag}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPro}>
              <Text style={styles.buttonTextWhite}>Save without Watermark</Text>
              <Text style={styles.proTag}>Pro</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share on Socials */}
        <View style={styles.section}>
          <View style={styles.sectionTitle_cont}>
            <View><Entypo name="share" size={20} color="#000" /></View>
            <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Share on Social Media</Text>
          </View>
          <View style={styles.section_inner}>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Icon name="instagram" size={26} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Icon name="whatsapp" size={26} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Icon name="facebook" size={26} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Barber Code */}
        <View style={styles.section}>
           <View style={styles.sectionTitle_cont}>
            <View><Entypo name="link" size={20} color="#000" /></View>
            <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Barber Link</Text>
          </View>
          <Text style={styles.sectionDesc}>
            Generate a Link to show your barber for the perfect cut 
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Generate Link</Text>
          </TouchableOpacity>
        </View>

        {/* High-Resolution Download */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>High-Resolution Download</Text>
          <Text style={styles.sectionDesc}>
            Get crystal-clear images perfect for showing your barber
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Upgrade for Hi-Res</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7F56D9',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    marginVertical: 15,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#B3C9FF',
  },
  section: {
    marginVertical: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    // Android shadow
    elevation: 5,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  section_inner: {
    padding: 10,
    // alignItems: 'center',
  },
  sectionTitle_cont: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginBottom: 10,

  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPro: {
    backgroundColor: '#3572EF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    // Android shadow
    elevation: 5,
    // padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height:40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',


  },
  buttonText: {
    fontSize: 15,
    color: '#000',
  },
  buttonTextWhite: {
    fontSize: 16,
    color: '#fff',
  },
  freeTag: {
    color: '#555',
    fontSize: 14,
  },
  proTag: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    alignItems: 'center',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    // marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#3572EF',
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ShareScreen;
