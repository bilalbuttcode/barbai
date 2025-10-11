import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../Assets/BaseURL/api';

const AnalyzeHeader = ({ back = false, sharei = false, url = null, remainingCredits = 0, openSubscription = false }) => {
  const [visible, setVisible] = useState(false);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const navigation = useNavigation();

  const handleBack = () => {
    setVisible(false);
    navigation.goBack();
  };




  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${baseURL}/pricing-plans`);
        const data = await response.json();

        // Ignore free plans
        const filteredPlans = data.plans.filter(plan => plan.plan_type !== 'free');
        setPlans(filteredPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          setRemainingCredits('0');
        }
      } catch (err) {
        console.log('Error loading userId:', err);
      }
    };
    loadUserData();
  }, []);
  useEffect(() => {
    console.log(openSubscription)
    if (openSubscription) {
      setSubscriptionVisible(true);
    }
  }, [openSubscription]);

  const handleLogout = async () => {
    try {
      setVisible(false);
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('token');
      navigation.replace('GetStartScreen');
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  const handleBuySubscription = () => {
    setVisible(false);
    // fetchPlans(); // fetch pricing from API
    setSubscriptionVisible(true);
  };

  const handlePlanSelect = (planType, price, credits) => {
    setSubscriptionVisible(false);
    navigation.navigate('PaymentScreen', { planType, price, credits });
  };
  ;

  return (
    <View style={styles.container}>
      <View style={{ width: '40%', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={require('../../Assets/Images/Logo2.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <View style={{ width: '60%', justifyContent: 'center' ,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <View style={{ alignItems: 'center', backgroundColor: '#E0E0E0', padding: 5, borderRadius: 6 }}>
          <Text style={{ fontSize: 16, color: '#000' }}>
            Credits: {remainingCredits}
          </Text>
        </View>
        {sharei && url ? (<TouchableOpacity style={styles.tryOnBtn} onPress={() => navigation.navigate('ShareScreen', { url })}  >
          <Text style={styles.tryOnText}>Share</Text>
        </TouchableOpacity>) : (<View></View>)}
      </View>

      {/* --- MAIN MENU --- */}
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={styles.modal}
      >
        <View style={styles.dropdown}>
          {back && (
            <TouchableOpacity style={styles.item} onPress={handleBack}>
              <Icon name="arrow-back" size={20} color="#000" style={styles.icon} />
              <Text style={styles.label}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.item} onPress={handleBuySubscription}>
            <Icon name="card-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.label}>Buy Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Icon name="log-out-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* --- SUBSCRIPTION MODAL --- */}
      <Modal
        isVisible={subscriptionVisible}
        onBackdropPress={() => setSubscriptionVisible(false)}
        backdropOpacity={0.4}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={styles.planModal}
      >
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Choose Your Plan</Text>

          {plans.map((plan) => {
            const finalPrice = plan.price - (plan.price * plan.discount / 100);

            return (
              <TouchableOpacity
                key={plan.plan_type}
                style={styles.planCard}
                onPress={() => handlePlanSelect(plan.plan_type, finalPrice, plan.credits)}
              >
                <Text style={styles.planName}>
                  {plan.plan_type === 'pro' ? 'Monthly Plan' : 'Yearly Plan'}
                </Text>

                {/* 💰 Show price and discount */}
                <Text style={styles.planPrice}>
                  ${finalPrice.toFixed(2)}{' '}
                  {plan.discount > 0 && (
                    <Text style={{ color: 'green', fontSize: 13 }}>
                      ({plan.discount}% off)
                    </Text>
                  )}
                </Text>

                <Text style={styles.planCredits}>
                  Includes {plan.credits} credits
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </Modal>
    </View>
  );
};

export default AnalyzeHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 80,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 180,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: { marginRight: 10 },
  label: { fontSize: 16, color: '#000' },

  // Subscription Modal
  planModal: { justifyContent: 'center', alignItems: 'center' },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  planTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  planCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#3572EF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  planName: { fontSize: 16, fontWeight: '600', color: '#050C9C' },
  planPrice: { fontSize: 14, color: '#3572EF' },
  planCredits: { fontSize: 13, color: '#555', marginTop: 5 },
  discountBadge: {
    backgroundColor: '#FF5C5C',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 12,
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
   tryOnBtn: {
    backgroundColor: "#3572EF",
    // paddingVertical: 8,
    borderRadius: 6,
    // marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 80,
    // marginTop: 10,
  },
});
