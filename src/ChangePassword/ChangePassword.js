// ChangePassword
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';

export default function ChangePassword({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [createpasswd, setcreatepasswd] = useState('');
    const [confirmpasswd, setconfirmpasswd] = useState('');
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');

    const changepasswd = async () => {
        if (createpasswd == '') {
            setmsg1('*Please Create Password')
        } else {
            setmsg1('')
        }
        if (confirmpasswd == '') {
            setmsg2('*Please Enter The New Password');
        } else if (confirmpasswd != createpasswd) {
            setmsg2('*Please Enter Currect Password');
        } else {
            setmsg2('')
        }
        if (createpasswd != '' && confirmpasswd != '') {

            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            // console.log('userData', userData);
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            // console.log('userDataArray', userDataArray.id);

            // changepassword
            const data = {
                user_id: userDataArray.id,
                password: createpasswd,
            };

            console.log('data', data)
            setLoading(true);
            const response = await loginPost(global.URL + 'changepassword', data);
            console.log('changepassword --> response', response);
            setLoading(false);
            if (response.success == true) {
                navigation.goBack();
                //   alert('Succesfully ');
            } else {
                //   alert('Not')
            }

        }
    }
    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >

                <View style={globalstyles.headerone}>
                    <Headerone />
                    <Text style={globalstyles.headertxt}>Change Password</Text>
                </View>

                <Image resizeMode='contain' source={require('../../images/changepsswd.png')} style={styles.changepsswdimg} />

                <View style={styles.inputmainview}>
                    <Text style={globalstyles.inputitletxt}>Create Password</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Password'
                        placeholderTextColor='#878787'
                        value={createpasswd}
                        color='#000000'
                        onChangeText={(text) => setcreatepasswd(text)}
                    />
                    {msg1 ? <Text style={globalstyles.msgm}>{msg1}</Text> : null}


                    <Text style={globalstyles.inputitletxt}>Confirm Password</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Password'
                        placeholderTextColor='#878787'
                        value={confirmpasswd}
                        color='#000000'
                        onChangeText={(text) => setconfirmpasswd(text)}
                    />
                    {msg2 ? <Text style={globalstyles.msgm}>{msg2}</Text> : null}
                </View>

                <View style={{ marginTop: 40, marginBottom: 36 }}>
                    <TouchableOpacity style={globalstyles.button} onPress={changepasswd}>
                        <Text style={globalstyles.buttontxt}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/*  */}
            </ScrollView>
        </View>
    )
}