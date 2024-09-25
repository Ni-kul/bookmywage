// OTPVerification
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, BackHandler, ActivityIndicator, ToastAndroid, Keyboard, Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { verifyotp } from '../API';

export default function OTPVerification({ route, navigation }) {

    const [enterOTP, setenterOTP] = useState('');
    const [timer, setTimer] = useState(20);
    const [showResend, setShowResend] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [msg1, setmsg1] = useState('');

    const Udata = route.params;
    // console.log('Udata', Udata)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        let newIntervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(newIntervalId);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(newIntervalId);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
            clearInterval(newIntervalId);
        };
    }, []);

    const formatTime = (timeInSeconds) => {
        const seconds = timeInSeconds % 60;
        return `${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = () => {
        setTimer(20);
        setShowResend(false)
    };

    const handleResend = async () => {
        clearInterval(intervalId);
        startTimer();
        const newIntervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(newIntervalId);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(newIntervalId);
    };



    const ToHomeScreen = async () => {
        // Alert.alert('11')
        if (enterOTP == '') {
            setmsg1('*Please Enter OTP')
        } else {
            setmsg1('');
            //             verifyotp

            // user_id
            // otp
            const data = {
                user_id: Udata.id,
                otp: enterOTP,
            };

            setLoading(true);
            const response = await verifyotp(global.URL + 'verifyotp', data);
            // console.log('OTP --> response', response)
            setLoading(false);
            if (response.success == true) {
                // alert('Succesfully OTP')
                const setdata = await AsyncStorage.setItem('Userdata', JSON.stringify(response.data[0]));
                navigation.navigate('HomeScreen');
            } else {
                // alert('Not OTP')
            }
        }
    }

    return (
        <View style={globalstyles.flexview}>

            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                {loading ?
                    <View style={globalstyles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null}
                <View style={globalstyles.signmainview}>

                    <View style={{ height: '50%' }}>
                        <Image source={require('../../images/otpback.png')} style={styles.otpbackimg} />
                    </View>

                    <View style={[styles.signview, { height: isKeyboardVisible ? 'auto' : '54%' }]}>
                        <Text style={globalstyles.titletxt}>OTP Verification</Text>

                        <Text style={styles.txt1}>Enter the OTP send to  +91 {Udata.number}</Text>
                        <Text style={styles.txt1}>{formatTime(timer)} </Text>

                        <OTPTextInput
                            containerStyle={{ width: '84%', marginTop: '5%', backgroundColor: 'white', alignSelf: 'center', }}
                            textInputStyle={styles.otptxtinput}
                            tintColor={'#555353'}
                            offTintColor={'#555353'}
                            inputCount={4}
                            handleTextChange={(enterOTP) => setenterOTP(enterOTP)}
                        />
                        {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}

                        {showResend &&
                            <View style={styles.resendview}>
                                <Text style={styles.txt2}>Don’t received code ? </Text>
                                <TouchableOpacity onPress={handleResend}><Text style={styles.txt3}>Resend</Text></TouchableOpacity>
                            </View>
                        }
                        <View style={{ marginBottom: '10%', marginTop: '10%' }}>
                            <TouchableOpacity style={globalstyles.button} onPress={ToHomeScreen}>
                                <Text style={globalstyles.buttontxt}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>

    )
}