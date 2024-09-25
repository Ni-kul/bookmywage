// WelcomePage
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, BackHandler, ToastAndroid } from 'react-native';
import FastImage from 'react-native-fast-image'
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomePage({ navigation }) {
    // const navigation = useNavigation(); // Get navigation object

    useEffect(() => {
        navigation.addListener('focus', () => {
            // console.log('global.Type - U W', global.Type);

            const checkUserLogin = async () => {
                const finalRes = await AsyncStorage.getItem('Userdata');
                console.log('W---- >> Userdata', finalRes)
                if (finalRes != null) {
                    navigation.navigate('HomeScreen');
                } else {
                    // console.log('H-U')
                    navigation.navigate('WelcomePage');
                }
            };
            const timer = setTimeout(checkUserLogin, 100);

            return () => clearTimeout(timer);
            // checkUserLogin()
        })
    });

    const ToLogin = async () => {
        navigation.navigate('Login');
    }
    const ToSignup = async () => {
        navigation.navigate('Signup');
    }
    return (
        <View style={globalstyles.flexview}>
            {/* <StatusBar backgroundColor="#0D0E46" /> */}
            <ScrollView>
                <View style={styles.viewone}>
                    <Text style={styles.txt1}>Explore The All Types</Text>
                    <Text style={styles.txt2}>Of <Text style={{ color: '#3A47C9' }}>Service</Text></Text>

                    <View style={styles.imgmainview}>
                        <Image source={require('../../images/w5.png')} style={styles.w1img} />
                        <View style={styles.rowimageview}>
                            <Image source={require('../../images/w22.png')} style={styles.w2img} />
                            <Image source={require('../../images/w44.png')} style={styles.w2img} />
                        </View>
                        <Image source={require('../../images/w33.png')} style={styles.w4img} />

                    </View>

                    <View style={{ marginVertical: '11%', }} >
                        <TouchableOpacity style={globalstyles.button} onPress={ToLogin}>
                            <Text style={globalstyles.buttontxt}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signupbtn} onPress={ToSignup}>
                            <Text style={styles.signupbtntxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};
