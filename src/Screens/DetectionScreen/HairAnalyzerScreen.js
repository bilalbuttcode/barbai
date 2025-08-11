import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import AnalyzeHeader from '../../Components/HeaderComponent/AnalyzeHeader';

export default function HairAnalyzerScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filters = [
    {
      id: '1',
      name: 'Hair Style',
      options: [
        'Oval',
        'One Length',
        'A-Line',
        'The Bob',
        'Inverted Bob',
        'Bi-Level',
        'Pixie',
      ],
    },
    {
      id: '2',
      name: 'Length',
      options: ['Short', 'Medium', 'Long'],
    },
    {
      id: '3',
      name: 'Texture',
      options: ['Color'],
    },
  ];

  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };

  return (
    <View style={{ backgroundColor: '#fff' }} >
      <AnalyzeHeader back={true} />
      <View style={styles.container}>
        {/* Top Header */}


        {/* Main Image Area */}
        <View style={styles.mainArea}>
          <Text style={styles.loadingIcon}>✨</Text>
          <Text style={styles.loadingText}>Analyzing Your Features..</Text>
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
              <View  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{width: '50%',marginRight: 5}}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>

                </View>
                <View style={{width: '50%',marginLeft: 5}}>
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
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    // position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 26,
  },
  shareButton: {
    backgroundColor: '#3572EF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  shareText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainArea: {
    marginTop: 10,
    height: 400,
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 22,
  },
  loadingText: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
  },
  tryOnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: '#fff',

    // iOS shadow

  },
  tryOnCard: {
    flex: 1,
    marginHorizontal: 4,
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
  tryOnImage: {
    height: 100,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  tryOnBtn: {
    backgroundColor: '#3572EF',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: 'center',
  },
  tryOnTitle: {
    color: '#000',
    // fontWeight: 'bold',
    textAlign: 'center',

  },
  tryOnText: {
    color: '#fff',
  },
  viewFiltersBtn: {
    backgroundColor: '#3572EF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '6%',
  },
  viewFiltersText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  filterCategory: { marginBottom: 15 },
  filterHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#3572EF',
    backgroundColor: '#3572EF20',
  },
  optionText: { color: '#333', fontSize: 14 },
  optionTextSelected: { color: '#3572EF', fontWeight: 'bold' },
  closeBtn: {
    marginTop: 15,
    backgroundColor: '#3572EF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
