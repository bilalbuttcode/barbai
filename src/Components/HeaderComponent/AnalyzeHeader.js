import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AnalyzeHeader = ({ back = false , sharei = false , url = null}) => { // <-- back prop with default false
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const handleBack = () => {
        setVisible(false);
        navigation.goBack();
    };

    const handleLogout = () => {
        setVisible(false);
        // Add your logout logic here (e.g., clearing tokens, navigating to Login)
        navigation.replace('GetStartScreen');
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '50%', justifyContent: 'center', }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        source={require('../../Assets/Images/Logo2.png')} // change path to your logo
                        style={styles.logo}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ width: '50%',justifyContent: 'center',marginLeft:'30%' }}>
                {sharei && url?(<TouchableOpacity style={styles.tryOnBtn} onPress={() => navigation.navigate('ShareScreen',{url})} >
                    <Text style={styles.tryOnTitle}>Share</Text>
                </TouchableOpacity>):(<View></View>)}
                
            </View>

            <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                backdropOpacity={0.3}
                animationIn="fadeIn"
                animationOut="fadeOut"
                style={styles.modal}>
                <View style={styles.dropdown}>
                    {back && ( // <-- conditionally render Back button
                        <TouchableOpacity style={styles.item} onPress={handleBack}>
                            <Icon name="arrow-back" size={20} color="#000" style={styles.icon} />
                            <Text style={styles.label}>Back</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.item} onPress={handleLogout}>
                        <Icon name="log-out-outline" size={20} color="#000" style={styles.icon} />
                        <Text style={styles.label}>Logout</Text>
                    </TouchableOpacity>
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
        // justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row'
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
        width: 150,
        elevation: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
    tryOnBtn: {
        backgroundColor: '#3572EF',
        // paddingVertical: 2,
        // padding:5,
        width:60,
        height: 30,
        borderRadius: 6,
        // marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // width: '20%',
    },
    tryOnTitle: {
        color: '#fff',
        // fontWeight: 'bold',
        textAlign: 'center',

    },
});
