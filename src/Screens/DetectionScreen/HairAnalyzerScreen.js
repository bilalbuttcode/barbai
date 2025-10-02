import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import AnalyzeHeader from "../../Components/HeaderComponent/AnalyzeHeader";
import baseURL from "../../Assets/BaseURL/api";
import { hairstyleswomen } from "../../Assets/Images/women/hairstyleswomen";
import { hairstylesmen } from "../../Assets/Images/men/hairstylesmen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
export default function HairAnalyzerScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [userId, setUserId] = useState(null);

  const { imageUri, selectedGender } = route.params;
  // console.log(imageUri, selectedGender)

  // load dataset by gender
  useEffect(() => {
    console.log(selectedGender);
    if (selectedGender.toLowerCase() === "men") {
      setRecommendations([{ auto: false }, ...hairstylesmen]);
    } else {
      setRecommendations([{ auto: false }, ...hairstyleswomen]);
    }
  }, [selectedGender]);

  const tryOnHairstyle = async (item) => {
    console.log("Trying hairstyle:", item, "with image:", imageUri);

    try {
      setShowOverlay(true);

      // Build FormData
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("gender", selectedGender.toLowerCase());
      formData.append("image", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      if (item.auto) {
        formData.append("auto_recommend", "true");
      } else {
        formData.append("auto_recommend", "false");
        formData.append("hairstyle", item.hairstyle);
        formData.append("hair_length", item.length);
        formData.append("hair_type", item.hairType);
      }

      // Send request
      const response = await fetch(`${baseURL}/edit-hairstyle`, {
        method: "POST",
        body: formData,
        // ⚠️ No Content-Type here! RN sets it automatically
      });

      const rawText = await response.text(); // always read text first
      // console.log("Raw server response:", rawText);

      if (!response.ok) {
        console.error("Server error response:", rawText);
        Alert.alert("Error", "Server failed to process image.");
        return;
      }

      let result;
      try {
        result = JSON.parse(rawText);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        Alert.alert("Error", "Invalid server response.");
        return;
      }

      console.log("Parsed API Result:", result);

      if (result.edited_image) {
        const outputUrl = `${baseURL}/generated_images/${result.edited_image}`;
        setProcessedImage(outputUrl);

      } else {
        console.error("API Error:", result.error || "Unknown error");
        Alert.alert("Error", result.error || "Failed to process image.");
      }
    } catch (error) {
      console.error("Request Error:", error);
      Alert.alert("Error", "Something went wrong while processing image.");
    } finally {
      setShowOverlay(false);
    }
  };



  // card UI
  const renderCard = ({ item }) => (
    <View style={styles.tryOnCard}>
      {item.auto ? (
        <View style={styles.tryOnImage}>
          <Text style={{ textAlign: "center", marginTop: 40, color: "#555" }}>Auto Recommendation</Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          {item?.length ? (
            <Image
              source={item.image}
              style={styles.tryOnImage}
              resizeMode="contain"
            />
          ) : (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, styles.tryOnImage]}>
              <FontAwesome5 name="magic" size={40} color="#555" />
              <Text style={{ textAlign: "center", marginTop: 6 }}>AI Recommendation</Text>
            </View>
          )}
        </View>
      )}
      {/* <Text style={styles.tryOnTitle}>
        {item.auto ? "AI Recommended"}
      </Text> */}
      <TouchableOpacity
        style={styles.tryOnBtn}
        onPress={() => tryOnHairstyle(item)}
      >
        <Text style={styles.tryOnText}>Try On</Text>
      </TouchableOpacity>
    </View>
  );

  // filter toggler
  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.warn("No userId found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    loadUserId();
  }, []);


  const filters = [
    { id: "2", name: "Hair Texture", options: ["Straight", "Wavy", "Curly", "Coily"] },
    { id: "3", name: "Length", options: ["Short", "Medium", "Long", "Braids"] },
    selectedGender.toLowerCase() === "men"
      ? { id: "4", name: "Categories (Men)", options: ["Fades", "Afro", "Buzz", "Waves", "Mohawk"] }
      : { id: "5", name: "Categories (Women)", options: ["Pixie", "Bob", "Undercut", "Natural", "Locs"] },
  ];

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <AnalyzeHeader back={true} sharei={processedImage?.length>0?true:false} url={processedImage?.length>0?processedImage:null}/>
      <View style={styles.container}>
        {/* Main Image Area */}
        <View style={styles.mainArea}>
          <Image
            source={{ uri: processedImage || imageUri }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
          {showOverlay && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          )}
        </View>
        <View>
          <FlatList
            data={recommendations}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item.auto ? "auto" : `${item.hairstyle}-${index}`
            }
            renderItem={renderCard}
            style={{ marginTop: 12 }}
          />
          <TouchableOpacity
            style={styles.viewFiltersBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.viewFiltersText}>View Filters</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {filters.map((category) => (
                  <View key={category.id} style={styles.filterCategory}>
                    <Text style={styles.filterHeading}>{category.name}</Text>
                    <View style={styles.optionsRow}>
                      {category.options.map((option) => {
                        const isSelected = selectedFilters[category.name] === option;
                        return (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.optionButton,
                              isSelected && styles.optionButtonSelected,
                            ]}
                            onPress={() => toggleFilter(category.name, option)}
                          >
                            <Text
                              style={[
                                styles.optionText,
                                isSelected && styles.optionTextSelected,
                              ]}
                            >{option}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "50%", marginRight: 5 }}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "50%", marginLeft: 5 }}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                      setModalVisible(false);

                      // Build filter object
                      const filterItem = {
                        hairstyle:
                          selectedGender.toLowerCase() === "men"
                            ? selectedFilters["Categories (Men)"]
                            : selectedFilters["Categories (Women)"],
                        length: selectedFilters["Length"],
                        hairType: selectedFilters["Hair Texture"],
                      };

                      console.log("Applying filters:", filterItem);

                      // Ensure at least hairstyle is selected
                      if (!filterItem.hairstyle) {
                        Alert.alert("Error", "Please select a hairstyle category.");
                        return;
                      }

                      tryOnHairstyle(filterItem);
                    }}
                  >
                    <Text style={styles.closeText}>Apply Filter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
  mainArea: {
    marginTop: 10,
    height: 400,
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#fff", fontWeight: "bold" },
  tryOnCard: {
    width: 140,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 180,
    marginBottom: 10,
  },
  tryOnImage: {
    height: 120,
    width: 120,
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tryOnBtn: {
    backgroundColor: "#3572EF",
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: "center",
    // marginTop: 10,
  },
  tryOnTitle: { color: "#000", textAlign: "center", marginTop: 4 },
  tryOnText: { color: "#fff" },
  viewFiltersBtn: {
    backgroundColor: "#3572EF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "5%",
  },
  viewFiltersText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: { width: "85%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  filterCategory: { marginBottom: 15 },
  filterHeading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 6,
  },
  optionButtonSelected: { borderColor: "#3572EF", backgroundColor: "#3572EF20" },
  optionText: { color: "#333", fontSize: 14 },
  optionTextSelected: { color: "#3572EF", fontWeight: "bold" },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#3572EF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold" },
});
