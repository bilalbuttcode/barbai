import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserManual = () => {
    const swiperRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigation = useNavigation();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (currentIndex < 2) {
    //             const nextIndex = currentIndex + 1;
    //             swiperRef.current.scrollBy(1);
    //             setCurrentIndex(nextIndex);
    //         } else {
    //             clearInterval(interval);
    //             const userId = AsyncStorage.getItem("userId");
    //             const token = AsyncStorage.getItem("token");
    //             console.log(token ,userId );
    //             if (userId && token) {
    //                 // Already logged in → go to ChooseStyleCategoryScreen
    //                 navigation.replace("ChooseStyleCategoryScreen");
    //             } else {
    //                   navigation.replace("GetStartScreen");

    //             }
    //         }
    //     }, 3000); // 3 seconds interval

    //     return () => clearInterval(interval);
    // }, [currentIndex]);
    useEffect(() => {
        const interval = setInterval(async () => {
            if (currentIndex < 2) {
                const nextIndex = currentIndex + 1;
                swiperRef.current.scrollBy(1);
                setCurrentIndex(nextIndex);
            } else {
                clearInterval(interval);

                // ✅ properly await AsyncStorage values
                const userId = await AsyncStorage.getItem("userId");
                const token = await AsyncStorage.getItem("token");

                console.log("Auth check:", userId, token);

                if (userId && token) {
                    navigation.replace("ChooseStyleCategoryScreen");
                } else {
                    navigation.replace("GetStartScreen");
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);





    return (
        <Swiper
            ref={swiperRef}
            loop={false}
            scrollEnabled={false} // 🔒 Disable manual swiping
            showsPagination={true}
            dotColor="#ccc"
            activeDotColor="#000"
        >
            <View style={styles.slide}>
                <Text style={styles.title}>Find Your Perfect Look with AI</Text>
                <Text style={styles.description}>
                    No more guessing. Simply upload your photo and our advanced AI will
                    analyze your facial features to suggest hairstyles that are perfect for you.
                </Text>
            </View>

            <View style={styles.slide}>
                <Text style={styles.title}>Upload Your Photo</Text>
                <Text style={styles.description}>
                    Use your camera or gallery to upload a clear photo of yourself.
                </Text>
            </View>

            <View style={styles.slide}>
                <Text style={styles.title}>Explore Hairstyles</Text>
                <Text style={styles.description}>
                    Try different AI-recommended hairstyles and save your favorite looks!
                </Text>
            </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#444',
        lineHeight: 20,
    },
});

export default UserManual;
