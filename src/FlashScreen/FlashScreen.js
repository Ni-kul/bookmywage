// FlashScreen
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FlashScreen() {
    const navigation = useNavigation(); // Get navigation object

    useEffect(() => {
        navigation.addListener('focus', () => {

            const checkUserLogin = async () => {
                const finalRes = await AsyncStorage.getItem('Userdata');
                console.log('---- >> Userdata', finalRes)
                if (finalRes) {
                    navigation.navigate('HomeScreen');
                } else {
                    navigation.navigate('WelcomePage');
                }
            };
            const timer = setTimeout(checkUserLogin, 1000);

            return () => clearTimeout(timer);

        })
    });


    const handlePayment = () => {
        var options = {
            description: 'Test Payment',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_TREPWNGhQCTA0t', // Your Razorpay Key ID
            amount: '500000', // Amount in paise, so 5000 = 50 INR
            name: 'Test Corp',
            prefill: {
                email: 'test@example.com',
                contact: '9191919191',
                name: 'Test User'
            },
            theme: { color: '#F37254' }
        };

        console.log('options', options);

        RazorpayCheckout.open(options).then((data) => {
            // handle success
            Alert.alert(`Success: ${data.razorpay_payment_id}`);
            console.log(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            Alert.alert("Payment failed, please try again.");
            console.log(`Error: ${error.code} | ${error.description}`);
        });
    };

    return (
        <View style={styles.flashview}>
            {/* <StatusBar backgroundColor="#0D0E46" /> */}

            <FastImage resizeMode='contain' source={require('../../images/flashimg.png')} style={styles.flashimg} />

            {/* <Text>razorpay</Text>
            <TouchableOpacity onPress={handlePayment}>
                <Text>Pay Now</Text>
            </TouchableOpacity> */}


        </View>
    );
};
