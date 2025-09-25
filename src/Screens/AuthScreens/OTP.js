// OTP.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import baseURL from "../../Assets/BaseURL/api";
import Loader from "../../Components/Loader/Loader";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
const OTP = ({ navigation }) => {

    const [otp, setOtp] = useState("");
    const route = useRoute();
    const { email } = route.params;

    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            Alert.alert("Invalid OTP ❌", "Please enter all 6 digits.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/verify-email`, {
                email,
                otp,
            });

            if (response.data.message) {
                Alert.alert("Success ✅", response.data.message, [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("OTP verified");
                            navigation.replace("Login"); // ✅ Go to login after verification
                        },
                    },
                ]);
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.error || "Invalid OTP or Email");
            } else {
                Alert.alert("Error", "Unable to connect to server");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>

            <OtpInput
                numberOfDigits={6}
                focusColor="#3572EF"
                focusStickBlinkingDuration={500}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => setOtp(text)}
                theme={{
                    pinCodeContainerStyle: styles.otpBox,
                    filledPinCodeContainerStyle: styles.otpBoxFilled,
                    pinCodeTextStyle: styles.otpText,
                }}
            />

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            {loading && <Loader />}
        </View>
    );
};

export default OTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#050C9C",
        marginBottom: 20,
    },
    otpBox: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#A7E6FF",
        width: 50,
        height: 60,
    },
    otpBoxFilled: {
        backgroundColor: "#EAF4FF",
        borderColor: "#3572EF",
    },
    otpText: {
        fontSize: 20,
        color: "#050C9C",
        fontWeight: "bold",
    },
    button: {
        marginTop: 30,
        backgroundColor: "#3572EF",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
