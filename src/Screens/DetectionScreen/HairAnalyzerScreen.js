// import React, { useState ,useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   FlatList,
//   Image
// } from 'react-native';
// import AnalyzeHeader from '../../Components/HeaderComponent/AnalyzeHeader';
// export default function HairAnalyzerScreen({ route }) {

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [showOverlay, setShowOverlay] = useState(true);
//   const { imageUri } = route.params;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowOverlay(false);
//     }, 2000); // Hide after 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

// const filters = [
//   {
//     id: '1',
//     name: 'Gender',
//     options: ['Men', 'Women'],
//   },
//   {
//     id: '2',
//     name: 'Face Shape',
//     options: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'],
//   },
//   {
//     id: '3',
//     name: 'Hair Texture',
//     options: ['Straight', 'Wavy', 'Curly', 'Coily'],
//   },
//   {
//     id: '4',
//     name: 'Length',
//     options: ['Short', 'Medium', 'Long', 'Braids'],
//   },
//   {
//     id: '5',
//     name: 'Categories (Men)',
//     options: ['Fades', 'Afro', 'Buzz', 'Waves', 'Mohawk'],
//   },
//   {
//     id: '6',
//     name: 'Categories (Women)',
//     options: ['Pixie', 'Bob', 'Undercut', 'Natural', 'Locs'],
//   },
// ];

//   const toggleFilter = (category, option) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [category]: prev[category] === option ? null : option,
//     }));
//   };

//   return (
//     <View style={{ backgroundColor: '#fff' }} >
//       <AnalyzeHeader back={true} />
//       <View style={styles.container}>
//         {/* Top Header */}


//         {/* Main Image Area */}
//       <View style={styles.container}>
//         <View style={styles.mainArea}>
//           <Image
//             source={{ uri: imageUri }}
//             style={{ width: '100%', height: '100%', borderRadius: 10 }}
//             resizeMode="cover"
//           />
//           {showOverlay && (
//             <View style={styles.overlay}>
//               <Text style={styles.loadingIcon}>✨</Text>
//               <Text style={styles.loadingText}>Analyzing Your Features..</Text>
//             </View>
//           )}
//         </View>
//       </View>

//         {/* Try On Row */}
//         <View style={styles.tryOnRow}>
//           <View style={styles.tryOnCard}>
//             <View style={styles.tryOnImage} />
//             <Text style={styles.tryOnTitle}>Fade</Text>
//             <TouchableOpacity style={styles.tryOnBtn}>

//               <Text style={styles.tryOnText}>Try On</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.tryOnCard}>
//             <View style={styles.tryOnImage} />
//             <Text style={styles.tryOnTitle}>Fade</Text>
//             <TouchableOpacity style={styles.tryOnBtn}>

//               <Text style={styles.tryOnText}>Try On</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* View Filters Button */}
//         <TouchableOpacity
//           style={styles.viewFiltersBtn}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.viewFiltersText}>View Filters</Text>
//         </TouchableOpacity>

//         {/* Filters Modal */}
//         <Modal
//           animationType="slide"
//           transparent
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Filters</Text>
//               <ScrollView>
//                 {filters.map((category) => (
//                   <View key={category.id} style={styles.filterCategory}>
//                     <Text style={styles.filterHeading}>{category.name}</Text>
//                     <View style={styles.optionsRow}>
//                       {category.options.map((option) => {
//                         const isSelected = selectedFilters[category.name] === option;
//                         return (
//                           <TouchableOpacity
//                             key={option}
//                             style={[
//                               styles.optionButton,
//                               isSelected && styles.optionButtonSelected,
//                             ]}
//                             onPress={() => toggleFilter(category.name, option)}
//                           >
//                             <Text
//                               style={[
//                                 styles.optionText,
//                                 isSelected && styles.optionTextSelected,
//                               ]}
//                             >
//                               {option}
//                             </Text>
//                           </TouchableOpacity>
//                         );
//                       })}
//                     </View>
//                   </View>
//                 ))}
//               </ScrollView>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <View style={{ width: '50%', marginRight: 5 }}>
//                   <TouchableOpacity
//                     style={styles.closeBtn}
//                     onPress={() => setModalVisible(false)}
//                   >
//                     <Text style={styles.closeText}>Close</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ width: '50%', marginLeft: 5 }}>
//                   <TouchableOpacity
//                     style={styles.closeBtn}
//                     onPress={() => setModalVisible(false)}
//                   >
//                     <Text style={styles.closeText}>Apply Filter</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#fff',
//     // padding: 15,
//     paddingLeft: 15,
//     paddingRight: 15,
//     // position: 'relative',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   icon: {
//     fontSize: 26,
//   },
//   shareButton: {
//     backgroundColor: '#3572EF',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   shareText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   mainArea: {
//     marginTop: 10,
//     height: 400,
//     backgroundColor: '#E9ECEF',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingIcon: {
//     fontSize: 22,
//   },
//   loadingText: {
//     marginTop: 5,
//     fontSize: 16,
//     color: '#555',
//   },
//   tryOnRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//     backgroundColor: '#fff',
//   },
//   tryOnCard: {
//     flex: 1,
//     marginHorizontal: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 3.5,
//     // Android shadow
//     elevation: 5,
//     padding: 5,
//     margin: 5,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   tryOnImage: {
//     height: 100,
//     backgroundColor: '#D9D9D9',
//     borderRadius: 8,
//   },
//   tryOnBtn: {
//     backgroundColor: '#3572EF',
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginTop: 5,
//     alignItems: 'center',
//   },
//   tryOnTitle: {
//     color: '#000',
//     // fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   tryOnText: {
//     color: '#fff',
//   },
//   viewFiltersBtn: {
//     backgroundColor: '#3572EF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: '6%',
//   },
//   viewFiltersText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   filterCategory: { marginBottom: 15 },
//   filterHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   optionButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   optionButtonSelected: {
//     borderColor: '#3572EF',
//     backgroundColor: '#3572EF20',
//   },
//   optionText: { color: '#333', fontSize: 14 },
//   optionTextSelected: { color: '#3572EF', fontWeight: 'bold' },
//   closeBtn: {
//     marginTop: 15,
//     backgroundColor: '#3572EF',
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },

//   closeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   overlay: {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent dark layer
//   borderRadius: 10,
// },
// loadingIcon: {
//   fontSize: 22,
//   color: '#fff',
// },
// loadingText: {
//   marginTop: 5,
//   fontSize: 16,
//   color: '#fff',
//   fontWeight: 'bold',
// }
// });
import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import AnalyzeHeader from '../../Components/HeaderComponent/AnalyzeHeader';
import baseURL from '../../Assets/BaseURL/api';

export default function HairAnalyzerScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showOverlay, setShowOverlay] = useState(true);
  const [processedImage, setProcessedImage] = useState(null);

  const { imageUri } = route.params;

  useEffect(() => {
    const callApi = async () => {
      try {
        const formData = new FormData();
        formData.append('user_id', '15'); // TODO: dynamically pass user id if available
        formData.append('image', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });

        const response = await fetch(`${baseURL}/edit-hairstyle`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const result = await response.json();
        if (result.output_path) {
          // Convert backend path to accessible URL
          // If your backend serves static files, adjust base URL accordingly
          const outputUrl = `${baseURL}/generated_images/${result.user_id}_edited.png`;
          setProcessedImage(outputUrl);
        } else {
          Alert.alert('Error', 'Failed to process image.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong while processing image.');
      } finally {
        setShowOverlay(false);
      }
    };

    callApi();
  }, [imageUri]);

  const filters = [
    { id: '1', name: 'Gender', options: ['Men', 'Women'] },
    { id: '2', name: 'Face Shape', options: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'] },
    { id: '3', name: 'Hair Texture', options: ['Straight', 'Wavy', 'Curly', 'Coily'] },
    { id: '4', name: 'Length', options: ['Short', 'Medium', 'Long', 'Braids'] },
    { id: '5', name: 'Categories (Men)', options: ['Fades', 'Afro', 'Buzz', 'Waves', 'Mohawk'] },
    { id: '6', name: 'Categories (Women)', options: ['Pixie', 'Bob', 'Undercut', 'Natural', 'Locs'] },
  ];

  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <AnalyzeHeader back={true} />
      <View style={styles.container}>
        {/* Main Image Area */}
        <View style={styles.mainArea}>
          <Image
            source={{ uri: processedImage || imageUri }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            resizeMode="cover"
          />
          {showOverlay && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Analyzing Your Features..</Text>
            </View>
          )}
        </View>

        {/* Try On Row */}
        <View style={styles.tryOnRow}>
          <View style={styles.tryOnCard}>
            <View style={styles.tryOnImage} />
            <Text style={styles.tryOnTitle}>Fade</Text>
            <TouchableOpacity style={styles.tryOnBtn}>
              <Text style={styles.tryOnText}>Try On</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tryOnCard}>
            <View style={styles.tryOnImage} />
            <Text style={styles.tryOnTitle}>Fade</Text>
            <TouchableOpacity style={styles.tryOnBtn}>
              <Text style={styles.tryOnText}>Try On</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* View Filters Button */}
        <TouchableOpacity
          style={styles.viewFiltersBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.viewFiltersText}>View Filters</Text>
        </TouchableOpacity>

        {/* Filters Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filters</Text>
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
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '50%', marginRight: 5 }}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', marginLeft: 5 }}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
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
  container: { backgroundColor: '#fff', paddingLeft: 15, paddingRight: 15, flex: 1 },
  mainArea: {
    marginTop: 10,
    height: 400,
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  loadingText: { marginTop: 10, fontSize: 16, color: '#fff', fontWeight: 'bold' },
  tryOnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  tryOnCard: {
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  tryOnImage: { height: 100, backgroundColor: '#D9D9D9', borderRadius: 8 },
  tryOnBtn: {
    backgroundColor: '#3572EF',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: 'center',
  },
  tryOnTitle: { color: '#000', textAlign: 'center' },
  tryOnText: { color: '#fff' },
  viewFiltersBtn: {
    backgroundColor: '#3572EF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '6%',
  },
  viewFiltersText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  filterCategory: { marginBottom: 15 },
  filterHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: 20, borderWidth: 1, borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  optionButtonSelected: { borderColor: '#3572EF', backgroundColor: '#3572EF20' },
  optionText: { color: '#333', fontSize: 14 },
  optionTextSelected: { color: '#3572EF', fontWeight: 'bold' },
  closeBtn: {
    marginTop: 15, backgroundColor: '#3572EF',
    paddingVertical: 10, borderRadius: 8, alignItems: 'center',
  },
  closeText: { color: '#fff', fontWeight: 'bold' },
});
