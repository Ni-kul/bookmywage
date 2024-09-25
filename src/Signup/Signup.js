import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { register } from '../API';

const Signup = () => {
  const navigation = useNavigation(); // Get navigation object
  const [name, setname] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [emailid, setemailid] = useState('');
  const [password, setpassword] = useState('');

  const [passwdSH, setpasswdSH] = useState(true);
  const [btnshow, setbtnshow] = useState('1');
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [msg1, setmsg1] = useState('');
  const [msg2, setmsg2] = useState('');
  const [msg3, setmsg3] = useState('');
  const [msg4, setmsg4] = useState('');

  const [msg5, setmsg5] = useState('');


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

  // const ToOTPVerification = async () => {
  //   navigation.navigate('OTPVerification');
  // }

  const ToOTPVerification = async () => {
    if (name == '') {
      setmsg1('*Please Enter Name')
    } else {
      setmsg1('')
    }
    if (mobileno == '') {
      setmsg2('*Please Enter Mobile Number')
    } else {
      setmsg2('')
    }
    if (emailid == '') {
      setmsg3('*Please Enter Email-id')
    } else {
      setmsg3('')
    }
    if (password == '') {
      setmsg4('*Please Enter Password')
    } else {
      setmsg4('')
    }
    if (name != '' && mobileno != '' && emailid != '' && password != '') {
      //       register

      // name
      // number
      // password
      // email
      const data = {
        name: name,
        password: password,
        number: mobileno,
        email: emailid,
      };

      setLoading(true);
      const response = await register(global.URL + 'register', data);
      // console.log('signup --> response', response)
      setLoading(false);
      if (response.success == true) {
        setmsg5('')
        // alert('Succesfully Signup')
        navigation.navigate('OTPVerification', response.data[0]);
      } else {
        if (response.data && response.data.number) {
          setmsg5(response.data.number[0]);
          // alert(response.data.number[0])
        }
        else {
          alert(response.message);
        }
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
        {/* <ScrollView> */}
        {/* <StatusBar backgroundColor="#ffff" /> */}
        <View style={globalstyles.signmainview}>

          <View style={{ height: '40%' }}>
            <Image resizeMode='stretch' source={require('../../images/supback.png')} style={styles.signbackimg} />
          </View>
          <View style={[styles.signview, { height: isKeyboardVisible ? 'auto' : '66%' }]}>

            <TouchableOpacity onPress={ToOTPVerification}>
              <Text style={globalstyles.titletxt}>Sign Up</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: '4%' }}>

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
                  <Image source={require('../../images/mo.png')} style={styles.moimg} />
                </View>

                <TextInput
                  style={globalstyles.inputtxt}
                  placeholder='Enter your Number'
                  placeholderTextColor='#464444'
                  maxLength={10}
                  keyboardType='numeric'
                  value={mobileno}
                  color='#000000'
                  onChangeText={(text) => setmobileno(text)}
                />
              </View>
              {msg2 ? <Text style={globalstyles.msg}>{msg2}</Text> : null}
              {msg5 ? <Text style={globalstyles.msg}>{msg5}</Text> : null}

              <View style={styles.inputmainview}>
                <View style={globalstyles.inputimgview}>
                  <Image source={require('../../images/em.png')} style={styles.emailimg} />
                </View>
                <TextInput
                  style={globalstyles.inputtxt}
                  placeholder='Enter your E-mail Id'
                  placeholderTextColor='#464444'
                  value={emailid}
                  color='#000000'
                  onChangeText={(text) => setemailid(text)}
                />
              </View>
              {msg3 ? <Text style={globalstyles.msg}>{msg3}</Text> : null}

              <View style={styles.inputmainview}>
                <View style={globalstyles.inputimgview}>
                  <Image source={require('../../images/pass.png')} style={styles.passimg} />
                </View>
                <TextInput
                  style={globalstyles.inputpasswdtxt}
                  placeholder='Create password'
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
              {msg4 ? <Text style={globalstyles.msg}>{msg4}</Text> : null}


              <View style={{ marginVertical: '10%' }}>
                <TouchableOpacity style={globalstyles.button} onPress={ToOTPVerification}>
                  <Text style={globalstyles.buttontxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>


            </View>

          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;