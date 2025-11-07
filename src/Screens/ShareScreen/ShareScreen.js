
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import DetectionHeader from '../../Components/HeaderComponent/DetectionHeader';
import RNFS from 'react-native-fs';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

const ShareScreen = ({ route }) => {
  const { url } = route.params; // 👈 Get url from params
  const [localFilePath, setLocalFilePath] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- Auto download once on mount ----
  // ---- Native share ----
const shareToAll = async () => {
  if (!localFilePath) {
    Alert.alert("Please wait", "Image not downloaded yet.");
    return;
  }

  try {
    await Share.open({
      title: 'Check out my hairstyle!',
      message: 'Here is the look I created using BarbAI 💈✂️',
      url: `file://${localFilePath}`, // use local file
      failOnCancel: false,
    });
  } catch (err) {
    console.log("Share error =>", err);
  }
};

  useEffect(() => {
    const downloadToCache = async () => {
      try {
        const fileName = `barbai_${Date.now()}.jpg`;
        const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

        const download = await RNFS.downloadFile({
          fromUrl: url,
          toFile: localPath,
        }).promise;

        if (download.statusCode === 200) {
          setLocalFilePath(localPath);
        } else {
          Alert.alert("Error", "Failed to download image.");
        }
      } catch (err) {
        console.log("Auto-download error =>", err);
        Alert.alert("Error", "Could not download image.");
      } finally {
        setLoading(false);
      }
    };

    downloadToCache();
  }, [url]);

  // ---- Save to Device ----
  const saveToDevice = async () => {
    if (!localFilePath) {
      Alert.alert("Please wait", "Image not downloaded yet.");
      return;
    }
    try {
      const fileName = `image_${Date.now()}.jpg`;
      const destination = `${RNFS.PicturesDirectoryPath}/${fileName}`;

      await RNFS.copyFile(localFilePath, destination);
      Alert.alert("Success", "Image saved to device!");
    } catch (err) {
      console.log("Save error =>", err);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  // ---- Share to Social ----
  const shareTo = async (platform) => {
    if (!localFilePath) {
      Alert.alert("Please wait", "Image not downloaded yet.");
      return;
    }
    try {
      const options = {
        title: 'Check out my hairstyle!',
        message: 'Here is the look I created using BarbAI 💈✂️',
        url: `file://${localFilePath}`,  // 👈 use local path directly
      };

      if (platform === 'instagram') {
        await Share.shareSingle({ ...options, social: Share.Social.INSTAGRAM });
      } else if (platform === 'whatsapp') {
        await Share.shareSingle({ ...options, social: Share.Social.WHATSAPP });
      } else if (platform === 'facebook') {
        await Share.shareSingle({ ...options, social: Share.Social.FACEBOOK });
      }
    } catch (err) {
      console.log("Share error =>", err);
      Alert.alert("Error", "Could not share the image.");
    }
  };

  // ---- Copy Link ----
  const copyLink = () => {
    Clipboard.setString(url);
    Alert.alert("Copied", "URL copied successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <DetectionHeader back={true} />

      {/* Loader while downloading */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3572EF" />
          <Text style={{ marginTop: 10, color: '#3572EF' }}>Downloading...</Text>
        </View>
      ) : (
        <>
          {/* Image */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: localFilePath ? `file://${localFilePath}` : url }} style={styles.image} />
          </View>

          <View style={{ alignItems: 'center' }}>
            {/* Save Image */}
            <View style={styles.section}>
              <View style={styles.sectionTitle_cont}>
                <Feather name="download" size={20} color="#000" />
                <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Save Image</Text>
              </View>
              <View style={styles.section_inner}>
                <TouchableOpacity style={styles.buttonOutline} onPress={saveToDevice}>
                  <Text style={styles.buttonText}>Save to device</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Share on Socials */}
            <View style={styles.section}>
              <View style={styles.sectionTitle_cont}>
                <Entypo name="share" size={20} color="#000" />
                <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Share on Social Media</Text>
              </View>
              <View style={styles.section_inner}>
                <View style={styles.socialRow}>
                  {/* <TouchableOpacity style={styles.socialBtn} onPress={() => shareTo('instagram')}>
                    <Icon name="instagram" size={26} color="#000" />
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.socialBtn} onPress={() => shareTo('whatsapp')}>
                    <Icon name="whatsapp" size={26} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} onPress={() => shareTo('facebook')}>
                    <Icon name="facebook" size={26} color="#000" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialBtn} onPress={shareToAll}>
                    <Entypo name="share" size={26} color="#000"/>
                  </TouchableOpacity>

                </View>
              </View>
            </View>

            {/* Barber Link */}
            <View style={styles.section}>
              <View style={styles.sectionTitle_cont}>
                <Entypo name="link" size={20} color="#000" />
                <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Barber Link</Text>
              </View>
              <Text style={styles.sectionDesc}>
                Generate a Link to show your barber for the perfect cut
              </Text>
              <TouchableOpacity style={styles.primaryButton} onPress={copyLink}>
                <Text style={styles.primaryButtonText}>Generate Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  imageWrapper: { alignItems: 'center', marginVertical: 15 },
  image: { width: 300, height: 300, borderRadius: 12, borderWidth: 4, borderColor: '#B3C9FF' },
  section: { marginVertical: 15, width: '90%', elevation: 5, padding: 5, margin: 5, backgroundColor: '#fff', borderRadius: 10 },
  section_inner: { padding: 10 },
  sectionTitle_cont: { alignItems: 'center', flexDirection: 'row' },
  buttonOutline: { borderWidth: 1, borderColor: '#ccc', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  buttonText: { fontSize: 15, color: '#000' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  sectionDesc: { fontSize: 14, color: '#555', marginBottom: 10 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 40 },
  socialBtn: { elevation: 5, margin: 5, backgroundColor: '#fff', borderRadius: 10, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' },
  primaryButton: { backgroundColor: '#3572EF', paddingVertical: 10, borderRadius: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }
});

export default ShareScreen;