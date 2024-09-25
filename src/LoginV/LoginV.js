import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';

const LoginV = ({ navigation }) => {
  const [name, setname] = useState('');
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


  // const ToForgetPassword = async () => {
  //   navigation.navigate('ForgetPassword');
  // }
  const ToVendorRegistration = async () => {
    navigation.navigate('VendorRegistration');
  }
  // 
  const ToHomeScreenV = async () => {
    if (name == '') {
      setmsg1('*Please Enter Name')
    } else {
      setmsg1('')
    }
    if (password == '') {
      setmsg2('*Please Enter Password')
    } else {
      setmsg2('')
    }
    // if (name != '' && password != '') {
    // const data = {
    //   name: name,
    //   password: password,
    // };

    // setLoading(true);
    // const response = await (global.URL + '', data);
    // console.log('login --> response', response)
    // setLoading(false);
    // if (response) {
    // alert('Succesfully login-V')
    navigation.navigate('HomeScreenV');
    // } else {
    // alert('Not login-V')
    // }
    // }
  }

  return (
    <View style={globalstyles.flexview}>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        {/* {loading ? 
          <View style={globalstyles.spinner}>
            <ActivityIndicator size="large" color="#1976d2" animating={loading} />
          </View>
          : null} */}
        <View style={globalstyles.signmainview}>

          <View style={{ height: '44%' }}>
            <Image resizeMode='stretch' source={require('../../images/signin.png')} style={styles.loginbackimg} />
          </View>
          <View style={styles.hadtxtview}>
            <Text style={styles.hadtxt}>Welcome Back To </Text>
            <Text style={styles.hadtxt2}>VENDOR LOGIN</Text>
          </View>

          <View style={[styles.signview, { height: isKeyboardVisible ? 'auto' : '60%' }]}>

            <Text style={globalstyles.titletxt}>Sign in</Text>

            <Text style={styles.txt4}>( User name & password send to your mail id <Text style={{ fontWeight: 'bold' }}>service.03@gmail.com )</Text></Text>

            <View style={{ marginBottom: '8%', }}>

              <View style={styles.inputmainview}>
                <View style={globalstyles.inputimgview}>

                  <Image source={require('../../images/v1.png')} style={globalstyles.userimg} />
                </View>

                <TextInput
                  style={globalstyles.inputtxt}
                  placeholder='Enter your name'
                  placeholderTextColor='#464444'
                  value={name}
                  color='#000000'
                  onChangeText={(text) => setname(text)}
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

              {/* <TouchableOpacity style={styles.onforget} onPress={ToForgetPassword}>
                <Text style={styles.txt1}>Forget password ?</Text>
              </TouchableOpacity> */}

              <View style={styles.lastview}>
                <TouchableOpacity style={globalstyles.button} onPress={ToHomeScreenV}>
                  <Text style={globalstyles.buttontxt}>Sign In</Text>
                </TouchableOpacity>
              </View>

              {/*  <Text style={styles.txt2}>Didn’t have account? </Text>
                <TouchableOpacity onPress={ToVendorRegistration}><Text style={styles.txt3}>Registration</Text></TouchableOpacity>
               */}

            </View>

          </View>
        </View>

      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginV;