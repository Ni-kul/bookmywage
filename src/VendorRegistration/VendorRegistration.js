// VendorRegistration
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, BackHandler, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginPost } from '../API';
import { useIsFocused } from '@react-navigation/native';

export default function VendorRegistration({ navigation }) {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [name, setname] = useState('');
    const [mobilenum, setmobilenum] = useState('');
    const [emailid, setemailid] = useState('');
    const [location, setlocation] = useState('');
    const [pincode, setpincode] = useState('');
    const [aadharnum, setaadharnum] = useState('');
    const [pannum, setpannum] = useState('');
    const [drivinglicensenum, setdrivinglicensenum] = useState('');
    const [Passportnum, setPassportnum] = useState('');

    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [msg6, setmsg6] = useState('');
    const [msg7, setmsg7] = useState('');
    const [msg8, setmsg8] = useState('');
    const [msg9, setmsg9] = useState('');

    const [msg10, setmsg10] = useState('');



    useEffect(() => {
        const handleBackButton = () => {
            if (isFocused) {
                global.Type = 2;
                navigation.navigate('FlashScreen');
                return true;
            }
            return false;
        };

        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }

        return () => {
            // Clean up the back button listener when the component unmounts or is not focused
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [isFocused, navigation]);

    const ToRegistration = async () => {
        if (name == '') {
            setmsg1('*Please Enter Name')
        } else {
            setmsg1('')
        }
        if (mobilenum == '') {
            setmsg2('*Please Enter Mobile Number')
        } else {
            setmsg2('')
        }
        if (emailid == '') {
            setmsg3('*Please Enter E-mail Id')
        } else {
            setmsg3('')
        }
        if (location == '') {
            setmsg4('*Please Enter Location')
        } else {
            setmsg4('')
        }
        if (pincode == '') {
            setmsg5('*Please Enter Pin code')
        } else {
            setmsg5('')
        }
        if (aadharnum == '') {
            setmsg6('*Please Enter Aadhar Card Number')
        } else {
            setmsg6('')
        }
        if (pannum == '') {
            setmsg7('*Please Enter Pan Card Number')
        } else {
            setmsg7('')
        }
        if (drivinglicensenum == '') {
            setmsg8('*Please Enter Driving License Number')
        } else {
            setmsg8('')
        }
        if (Passportnum == '') {
            setmsg9('*Please Enter Passport Number')
        } else {
            setmsg9('')
        }
        if (mobilenum != '' && emailid != '') {
            // name != '' && mobilenum != '' && emailid != '' && location != '' && pincode != '' && aadharnum != '' && pannum != '' && drivinglicensenum != '' && Passportnum != '') {

            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);

            const data = {
                user_id: userDataArray.id,
                name: name,
                number: mobilenum,
                email: emailid,
                location: location,
                pincode: pincode,
                aadharcard: aadharnum,
                pancard: pannum,
                driving_licence: drivinglicensenum,
                passport: Passportnum,
            };
            // console.log('data', data);
            setLoading(true);
            const response = await loginPost(global.URL + 'vendorregister', data);
            // console.log('vendorregister --> response', response);
            setLoading(false);
            if (response.success == true) {
                navigation.navigate('WelcomePageV');
            } else {
                if (response.data && response.data.number) {
                    alert(response.data.number[0])
                }
                else {
                    alert(response.message);
                }
                // setmsg10
            }
        }
    }


    return (
        <View style={globalstyles.flexview}>

            <ScrollView>
                <View>
                    <Image source={require('../../images/vendorR.png')} style={styles.vendorRimg} />
                </View>

                <View style={globalstyles.Registermainview}>

                    <Text style={globalstyles.titletxt}>Vendor Registration</Text>


                    {/* <Text style={globalstyles.titletxt11}>Vendor Registr llll i</Text>
                    <Text style={globalstyles.t1}>Vendor Registration</Text> */}

                    <View style={{ marginBottom: 10 }}>

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/v1.png')} style={globalstyles.userimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter your name'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={name}
                                onChangeText={(text) => setname(text)}
                            />
                        </View>
                        {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/mo.png')} style={styles.moimg} />
                            </View>

                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter your number'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={mobilenum}
                                keyboardType='numeric'
                                maxLength={10}
                                onChangeText={(text) => setmobilenum(text)}
                            />
                        </View>
                        {msg2 ? <Text style={globalstyles.msg}>{msg2}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/em.png')} style={styles.emailimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter your E-mail Id'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={emailid}
                                onChangeText={(text) => setemailid(text)}
                            />
                        </View>
                        {msg3 ? <Text style={globalstyles.msg}>{msg3}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/location.png')} style={styles.locationicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Location'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={location}
                                onChangeText={(text) => setlocation(text)}
                            />
                        </View>
                        {msg4 ? <Text style={globalstyles.msg}>{msg4}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/pincode.png')} style={globalstyles.userimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter your Pin code'
                                placeholderTextColor='#464444'
                                color='#000000'
                                keyboardType='numeric'
                                maxLength={6}
                                value={pincode}
                                onChangeText={(text) => setpincode(text)}
                            />
                        </View>
                        {msg5 ? <Text style={globalstyles.msg}>{msg5}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/adharcard.png')} style={styles.adharicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Aadhar Card Number'
                                placeholderTextColor='#464444'
                                color='#000000'
                                keyboardType='numeric'
                                maxLength={12}
                                value={aadharnum}
                                onChangeText={(text) => setaadharnum(text)}
                            />
                        </View>
                        {msg6 ? <Text style={globalstyles.msg}>{msg6}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/pancard.png')} style={styles.emailimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Pan Card Number'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={pannum}
                                onChangeText={(text) => setpannum(text)}
                            />
                        </View>
                        {msg7 ? <Text style={globalstyles.msg}>{msg7}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/drivelicense.png')} style={styles.drivelicenseicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Driving License Number'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={drivinglicensenum}
                                onChangeText={(text) => setdrivinglicensenum(text)}
                            />
                        </View>
                        {msg8 ? <Text style={globalstyles.msg}>{msg8}</Text> : null}

                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/passport.png')} style={styles.emailimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Passport Number'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={Passportnum}
                                onChangeText={(text) => setPassportnum(text)}
                            />
                        </View>
                        {msg9 ? <Text style={globalstyles.msg}>{msg9}</Text> : null}



                        <View style={{ marginBottom: 10, marginTop: 40 }}>
                            <TouchableOpacity style={globalstyles.button} onPress={ToRegistration}>
                                <Text style={globalstyles.buttontxt}>Submit</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>

            </ScrollView>


        </View>
    )
}