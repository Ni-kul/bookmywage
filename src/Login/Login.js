import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, ToastAndroid, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation(); // Get navigation object
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [passwdSH, setpasswdSH] = useState(true);
  const [btnshow, setbtnshow] = useState('1');
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [msg1, setmsg1] = useState('');
  const [msg2, setmsg2] = useState('');

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

  const ToSignup = async () => {
    navigation.navigate('Signup');
  }


  const ToForgetPassword = async () => {
    navigation.navigate('ForgetPassword');
  }

  const ToHomeScreen = async () => {
    navigation.navigate('HomeScreen');
  }
  // 
  const Tologin = async () => {
    if (email == '') {
      setmsg1('*Please Enter E-mail')
    } else {
      setmsg1('')
    }
    if (password == '') {
      setmsg2('*Please Enter Password')
    } else {
      setmsg2('')
    }
    if (email != '' && password != '') {

      const data = {
        email: email,
        password: password,
      };

      setLoading(true);
      const response = await loginPost(global.URL + 'login', data);
      // console.log('login --> response', response)
      setLoading(false);
      if (response.success == true) {
        // alert('Succesfully login')
        const setdata = await AsyncStorage.setItem('Userdata', JSON.stringify(response.data[0]));
        navigation.navigate('HomeScreen');
      } else {
        alert(response.data.error);
        // console.log('not login')
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
          <View style={{ height: '44%' }}>
            <Image source={require('../../images/loginback.png')} style={styles.loginbackimg} />
          </View>

          <View style={[styles.signview, { height: isKeyboardVisible ? 'auto' : '60%' }]}>


            <Text style={globalstyles.titletxt}>Sign in</Text>


            <View style={{ marginBottom: '4%', }}>

              <View style={styles.inputmainview}>
                <View style={globalstyles.inputimgview}>
                  <Image source={require('../../images/v1.png')} style={globalstyles.userimg} />
                </View>

                <TextInput
                  style={globalstyles.inputtxt}
                  placeholder='Enter your E-mail'
                  placeholderTextColor='#464444'
                  value={email}
                  color='#000000'
                  onChangeText={(text) => setemail(text)}
                />
              </View>
              {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}

              <View style={styles.inputmainview}>
                <View style={globalstyles.inputimgview}>
                  <Image source={require('../../images/v2.png')} style={globalstyles.userimg} />
                </View>

                <TextInput
                  style={globalstyles.inputpasswdtxt}
                  placeholder='Enter your password'
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
              </View>
              {msg2 ? <Text style={globalstyles.msg}>{msg2}</Text> : null}

              <TouchableOpacity style={styles.onforget} onPress={ToForgetPassword}>
                <Text style={styles.txt1}>Forget password ?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={globalstyles.button} onPress={Tologin}>
                <Text style={globalstyles.buttontxt}>Sign In</Text>
              </TouchableOpacity>


              <View style={styles.lastview}>
                <Text style={styles.txt2}>Didn’t have account? </Text>
                <TouchableOpacity onPress={ToSignup}><Text style={styles.txt3}>Sign up</Text></TouchableOpacity>
              </View>

            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
};

export default Login;