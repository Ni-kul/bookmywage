// ForgetPassword
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles';
import { globalstyles } from '../globalstyles';

export default function ForgetPassword({ navigation }) {

    const [password, setpassword] = useState('');
    const [passwdSH, setpasswdSH] = useState(true);
    const [btnshow, setbtnshow] = useState('1');
    const [msg1, setmsg1] = useState('');


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const passwdshowhide = (value) => {
        // console.log('value', value)
        setbtnshow(value)
        if (value == '1') {
            setpasswdSH(true)
        } else {
            setpasswdSH(false)
        }
    }
    const ToLoginScreen = async () => {
        navigation.navigate('Login');
    }

    const Tologin = async () => {
        if (password == '') {
            setmsg1('*Please Enter E-mail')
        } else {
            setmsg1('')
            navigation.navigate('Login');
        }

    }

    return (
        <View style={globalstyles.flexview}>

            {/* <StatusBar backgroundColor="#ffff" /> */}
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
            >
                <View style={globalstyles.signmainview}>

                    <View style={{ height: '44%' }}>
                        <Image source={require('../../images/loginback.png')} style={styles.loginbackimg} />
                    </View>

                    <View style={[styles.signview, { height: isKeyboardVisible ? 'auto' : '60%' }]}>

                        <Text style={globalstyles.titletxt}>Forget Password</Text>

                        <View style={{ marginVertical: 10 }}>


                            {/* <View style={globalstyles.inputmainview}>
                                <View style={globalstyles.inputimgview}>

                                    <Image source={require('../../images/v2.png')} style={globalstyles.userimg} />
                                </View>

                                <TextInput
                                    style={globalstyles.inputpasswdtxt}
                                    placeholder='Enter your E-mail'
                                    placeholderTextColor='#464444'
                                    value={password}
                                    color='#000000'
                                    secureTextEntry={passwdSH}
                                    onChangeText={(text) => setpassword(text)}
                                />
                                {btnshow == '1' ?
                                    <TouchableOpacity onPress={() => passwdshowhide(2)} >
                                        <Image source={require('../../images/v3.png')} style={globalstyles.passwdhideimg} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => passwdshowhide(1)}>
                                        <Image source={require('../../images/view.png')} style={globalstyles.passwdhideimg} />
                                    </TouchableOpacity>
                                }
                            </View> */}
                            <View style={styles.inputmainview}>
                                <View style={globalstyles.inputimgview}>
                                    <Image source={require('../../images/v1.png')} style={globalstyles.userimg} />
                                </View>

                                <TextInput
                                    style={globalstyles.inputtxt}
                                    placeholder='Enter your E-mail'
                                    placeholderTextColor='#464444'
                                    value={password}
                                    color='#000000'
                                    onChangeText={(text) => setpassword(text)}
                                />
                            </View>

                            {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}


                            <View style={{ marginTop: 50, marginBottom: 10 }}>
                                <TouchableOpacity style={globalstyles.button} onPress={Tologin}>
                                    <Text style={globalstyles.buttontxt}>Save</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}