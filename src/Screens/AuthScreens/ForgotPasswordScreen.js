import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import baseURL from "../../Assets/BaseURL/api";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/HeaderComponent/Header";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
const ForgotPasswordScreen = () => {
    const [step, setStep] = useState(1); // 1 = enter email, 2 = enter otp + password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSendOtp = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/forgot-password`, { email });
            Alert.alert("Success", res.data.message);
            setStep(2);
        } catch (err) {
            Alert.alert("Error", err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!otp || !newPassword) {
            Alert.alert("Error", "Please enter OTP and new password");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/reset-password`, {
                email,
                otp,
                new_password: newPassword,
            });
            Alert.alert("Success", res.data.message);
            setStep(1);
            navigation.replace("Login");
            setEmail("");
            setOtp("");
            setNewPassword("");
        } catch (err) {
            Alert.alert("Error", err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Header onBackPress={() => navigation.goBack()} />
            <View style={styles.container}>
                {step === 1 ? (
                    <>
                        <Text style={styles.title}>Forgot Password</Text>
                        <View >
                            <View style={styles.inputContainer}>
                                <View style={styles.Circle}><Icon name="mail" size={20} color="#999" style={styles.inputIcon} /></View>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        placeholder="Email"
                                        style={styles.input}
                                        placeholderTextColor="#999"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
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

                        <View style={styles.inputContainer}>
                            <View style={styles.Circle}><Icon name="lock" size={20} color="#999" style={styles.inputIcon} /></View>
                            <View style={{ width: '100%' }}>
                                <TextInput placeholder="Password"
                                    secureTextEntry style={styles.input}
                                    placeholderTextColor="#999"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                            </View>

                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleVerify}>
                            <Text style={styles.buttonText}>Verify & Reset</Text>
                        </TouchableOpacity>

                    </>
                )}
            </View>
            {loading && <Loader />}
        </View>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        // justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#1F4FFF",
    },
    inputContainer: {
        width: '100%',

        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 15,
        position: 'relative',
        flexDirection: 'row',
    },
    Circle: {
        width: 60,
        height: 60,
        borderRadius: 30,                // Half of width/height
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#ffffff',

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        // Android Shadow
        elevation: 6,
    },
    inputIcon: {
        // marginRight: 10,
        color: '#1F4FFF',

    },
    input: {
        fontSize: 16,
        height: 50,
        paddingLeft: 55,
        backgroundColor: '#ffffff',      // White background
        color: '#000000',                // Black text
        borderRadius: 25,
        shadowColor: '#000',             // Shadow color
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1                // For Android shadow
    },
    button: {
        backgroundColor: "#3572EF",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    otpBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
    },
    otpBoxFilled: {
        borderColor: "#3572EF",
        backgroundColor: "#A7E6FF",
    },
    otpText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
