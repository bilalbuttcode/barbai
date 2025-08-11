import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShareScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Title */}
      <Text style={styles.appName}>BarbAI</Text>
      <Text style={styles.subtitle}>Save & Share Your Perfect Look</Text>

      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://via.placeholder.com/200' }} // Replace with your image
          style={styles.image}
        />
      </View>

      {/* Save Image */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonText}>Save with Watermark</Text>
          <Text style={styles.freeTag}>Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPro}>
          <Text style={styles.buttonTextWhite}>Save without Watermark</Text>
          <Text style={styles.proTag}>Pro</Text>
        </TouchableOpacity>
      </View>

      {/* Share on Socials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Share on Socials</Text>
        <View style={styles.socialRow}>
          <Icon name="instagram" size={26} color="#000" />
          <Icon name="tiktok" size={26} color="#000" />
          <Icon name="whatsapp" size={26} color="#000" />
          <Icon name="facebook" size={26} color="#000" />
        </View>
      </View>

      {/* Barber Code */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Barber Code</Text>
        <Text style={styles.sectionDesc}>
          Generate a code to show your barber for the perfect cut
        </Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Generate Code</Text>
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
    width: 220,
    height: 220,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#E0D7FF',
  },
  section: {
    marginVertical: 15,
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
    backgroundColor: '#7F56D9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
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
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
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
