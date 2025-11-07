import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import baseURL from "../../Assets/BaseURL/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../Components/HeaderComponent/Header";
export default function PaymentScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const { confirmPayment } = useStripe();
  const route = useRoute();
  const { planType, price, credits } = route.params;


  // const API_URL = "https://9a8212c41713.ngrok-free.app"; // Flask backend URL

  const handlePayPress = async ({ }) => {
    setLoading(true);
    try {
      // 1️⃣ Create PaymentIntent on Flask backend
      const response = await fetch(`${baseURL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,              // 🔹 Pass real user ID
          planType: planType,        // "premium" | "pro" | "yearly_pro"
          credits: credits,           // 🔹 Number of credits to add
          amount: price,          // 🔹 Amount in cents ($10.00)
          currency: "usd",
        }),
      });


      const { clientSecret, error } = await response.json();

      if (error || !clientSecret) {
        console.log(error);
        Alert.alert("Error", error || "Unable to create payment intent");
        setLoading(false);
        return;
      }

      // 2️⃣ Confirm payment with Stripe SDK — include payment method type
      const { paymentIntent, error: confirmError } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card", // ✅ Required
      });

      if (confirmError) {
        Alert.alert("Payment Failed", confirmError.message);
      } else if (paymentIntent) {
        Alert.alert("✅ Success", `Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={{ marginTop: 50 }}>
        <Text style={styles.header}>💳 Pay Securely</Text>

        <View style={styles.cardBox}>
          <Text style={styles.label}>Card details</Text>

          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
              expiration: "MM/YY",
              cvc: "CVC",
              // postalCode: "ZIP",
            }}
            cardStyle={{
              backgroundColor: "#000000",
              textColor: "#ffffff",
              // placeholderColor: "#999",
              // borderWidth: 1,
              // borderColor: "#ddd",
              // borderRadius: 8,
              // fontSize: 16,
            }}
            style={styles.cardField}
            placeholderTextColor="#999"
          />

          {/* <Text style={styles.helperText}>
          Use test card: 4242 4242 4242 4242 — Exp: any future date — CVC: any 3 digits
        </Text> */}
        </View>

        <TouchableOpacity
          style={[styles.payButton, loading && { opacity: 0.6 }]}
          onPress={handlePayPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    // justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#3572EF",
    marginBottom: 20,
  },
  cardBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },
  cardField: {
    width: "100%",
    height: 60,
    marginVertical: 10,
  },
  helperText: {
    fontSize: 13,
    color: "#555",
    marginTop: 5,
  },
  payButton: {
    backgroundColor: "#3572EF",
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
