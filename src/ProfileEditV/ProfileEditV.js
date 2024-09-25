// ProfileEditV
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileEditV({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [userid, setuserid] = useState('');
    const [name, setname] = useState('');
    const [phoneno, setphoneno] = useState('');
    const [emailid, setemailid] = useState('');
    const [address, setaddress] = useState('');
    const [pincode, setpincode] = useState('');
    const [aadharcard, setaadharcard] = useState('');
    const [pancard, setpancard] = useState('');
    const [driving_licence, setdriving_licence] = useState('');
    const [passport, setpassport] = useState('');

    const [profileimg, setprofileimg] = useState(null);
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [msg6, setmsg6] = useState('');
    const [msg7, setmsg7] = useState('');
    const [msg8, setmsg8] = useState('');
    const [msg9, setmsg9] = useState('');


    useEffect(() => {
        navigation.addListener('focus', async () => {
            userdata();
        });

        const userdata = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('Vendordata');
            // console.log('userData', userData);
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            if (userDataArray) {
                setuserid(userDataArray.id);
                setname(userDataArray.name);
                setaddress(userDataArray.location);
                setemailid(userDataArray.email);
                setphoneno(userDataArray.number);
                setprofileimg(userDataArray.profile_pic)
                setpincode(userDataArray.pincode)
                setaadharcard(userDataArray.aadharcard)
                setpancard(userDataArray.pancard)
                setdriving_licence(userDataArray.driving_licence)
                setpassport(userDataArray.passport)
            }
        }
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    function select() {
        // Alert.alert('alert ! , ok')
        Alert.alert("", "Choos a Option", [
            {
                text: 'Back',
                onPress: () => { }
            },
            {
                text: 'Gallery',
                onPress: () => openLibrary(),
            },
            {
                text: 'Camera',
                onPress: () => openCamera(),
            },
        ]);
    }
    const openCamera = () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        launchCamera(options, async (response) => {
            // console.log('response --> C', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {

                const base64data = response.assets[0].base64;
                // console.log('base64data', base64data)

                if (base64data) {
                    const imgdata = {
                        base64: 'data:image/jpeg;base64,' + base64data,
                    };

                    try {
                        setLoading(true);
                        const uploadimg = await loginPost(global.URL + 'uploadimage', imgdata);
                        // console.log('uploadimg C', uploadimg);
                        setLoading(false);
                        // if (uploadimg) {
                        //     const imgpathcut = uploadimg.data.replace('images/', '');
                        //     // console.log('imgpathcut', imgpathcut)
                        //     setprofileimg(imgpathcut);

                        //     const data = {
                        //         user_id: userid,
                        //         name: name,
                        //         mobile: phoneno,
                        //         address: address,
                        //         profile_image: imgpathcut,
                        //         email: emailid,
                        //     };

                        //     setLoading(true);
                        //     const response = await loginPost(global.URL + 'updateuserprofile', data);
                        //     // console.log('updateuserprofile --> response', response)
                        //     setLoading(false);
                        //     const result = await AsyncStorage.getItem('Userdata')
                        //     // console.log('Data in result Userdata-(3) :', result);

                        //     const screenData = JSON.parse(result)
                        //     // console.log('Data in screenData--(4) :', screenData);

                        //     const newUpdatedUserInfo = {
                        //         ...screenData,
                        //         "name": name,
                        //         "mobile": phoneno,
                        //         "address": address,
                        //         "profile_pic": imgpathcut,
                        //         "email": emailid,
                        //     };
                        //     // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

                        //     AsyncStorage.setItem('Userdata', JSON.stringify(newUpdatedUserInfo))

                        //     const updateget = await AsyncStorage.getItem('Userdata');
                        //     // console.log('Data updateget--(6):', updateget);
                        //     // Alert.alert('Successfully Updated.');

                        // } else {
                        //     console.log('ccccc')
                        // }
                    } catch (uploadError) {
                        console.error('Error uploading image:', uploadError);
                    }

                } else {
                    console.error('Base64 data not found in response:', response);
                }
            }
        });
    }

    const openLibrary = () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        launchImageLibrary(options, async (response) => {
            // console.log('response --> G', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // const base64 = response.assets[0].base64;
                const base64data = response.assets && response.assets[0].base64;
                // console.log('base64data', base64data)
                if (base64data) {
                    const imgdata = {
                        base64: 'data:image/jpeg;base64,' + base64data,
                    };
                    try {
                        setLoading(true);
                        const uploadimg = await loginPost(global.URL + 'uploadimage', imgdata);
                        // console.log('uploadimg G', uploadimg);
                        setLoading(false);
                        // if (uploadimg) {
                        //     const imgpathcut = uploadimg.data.replace('images/', '');
                        //     // console.log('imgpathcut --> G', imgpathcut)
                        //     setprofileimg(imgpathcut);

                        //     const data = {
                        //         user_id: userid,
                        //         name: name,
                        //         mobile: phoneno,
                        //         address: address,
                        //         profile_image: imgpathcut,
                        //         email: emailid,
                        //     };

                        //     setLoading(true);
                        //     const response = await loginPost(global.URL + 'updateuserprofile', data);
                        //     // console.log('updateuserprofile --> response', response)
                        //     setLoading(false);
                        //     const result = await AsyncStorage.getItem('Userdata')
                        //     // console.log('Data in result Userdata-(3) :', result);

                        //     const screenData = JSON.parse(result)
                        //     // console.log('Data in screenData--(4) :', screenData);

                        //     const newUpdatedUserInfo = {
                        //         ...screenData,
                        //         "name": name,
                        //         "mobile": phoneno,
                        //         "address": address,
                        //         "profile_pic": imgpathcut,
                        //         "email": emailid,
                        //     };
                        //     // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

                        //     AsyncStorage.setItem('Userdata', JSON.stringify(newUpdatedUserInfo))

                        //     const updateget = await AsyncStorage.getItem('Userdata');
                        //     // console.log('Data updateget--(6):', updateget);
                        //     Alert.alert('Successfully Updated.');

                        // }
                    } catch (uploadError) {
                        console.error('Error uploading image:', uploadError);
                    }

                } else {
                    console.error('Base64 data not found in response:', response);
                }
            }
        })
    }

    const updatedata = async () => {
        if (name == '') {
            setmsg1('*Please Enter The Name')
        } else {
            setmsg1('')
        }
        if (phoneno == '') {
            setmsg2('*Please Enter The Mobile Number')
        } else {
            setmsg2('')
        }
        if (emailid == '') {
            setmsg3('*Please Enter The E-mail Id')
        } else {
            setmsg3('')
        }
        if (address == '') {
            setmsg4('*Please Enter The Address')
        } else {
            setmsg4('')
        }
        // if (pincode == '') {
        //     setmsg5('*Please Enter Pin code')
        // } else {
        //     setmsg5('')
        // }
        // if (aadharcard == '') {
        //     setmsg6('*Please Enter Aadhar Card Number')
        // } else {
        //     setmsg6('')
        // }
        // if (pancard == '') {
        //     setmsg7('*Please Enter Pan Card Number')
        // } else {
        //     setmsg7('')
        // }
        // if (driving_licence == '') {
        //     setmsg8('*Please Enter Driving License Number')
        // } else {
        //     setmsg8('')
        // }
        // if (passport == '') {
        //     setmsg9('*Please Enter Passport Number')
        // } else {
        //     setmsg9('')
        // }

        // if (name != '' && phoneno != '' && emailid != '' && address != '') {

        //     // && pincode != '' && aadharcard != '' && pancard != '' && driving_licence != '' && passport != ''
        //     const data = {
        //         vendor_id: userid,
        //         name: name,
        //         number: phoneno,
        //         location: address,
        //         profile_image: profileimg,
        //         email: emailid,
        //         // pincode: pincode,
        //         // aadharcard: aadharcard,
        //         // pancard: pancard,
        //         // driving_licence: driving_licence,
        //         // passport: passport,
        //     };

        //     setLoading(true);
        //     const response = await loginPost(global.URL + 'updatevendorprofile', data);
        //     // console.log('updatevendorprofile --> response', response)
        //     setLoading(false);
        //     const result = await AsyncStorage.getItem('Vendordata')
        //     // console.log('Data in result Userdata-(3) :', result);

        //     const screenData = JSON.parse(result)
        //     // console.log('Data in screenData--(4) :', screenData);

        //     const newUpdatedUserInfo = {
        //         ...screenData,
        //         "name": name,
        //         "number": phoneno,
        //         "email": emailid,
        //         "location": address,
        //         "profile_pic": profileimg,
        //         // "pincode": pincode,
        //         // "aadharcard": aadharcard,
        //         // "pancard": pancard,
        //         // "driving_licence": driving_licence,
        //         // "passport": passport,

        //     };
        //     // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

        //     AsyncStorage.setItem('Vendordata', JSON.stringify(newUpdatedUserInfo))

        //     const updateget = await AsyncStorage.getItem('Vendordata');
        //     // console.log('Data updateget--(6):', updateget);
        //     // Alert.alert('Successfully Updated.');
        // }
    }


    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >

                <View style={styles.viewone}>
                    {profileimg ?
                        <Image source={{ uri: global.IMG + profileimg }} style={globalstyles.proBackimg} />
                        :
                        <Image resizeMode='stretch' source={require('../../images/proimg1.png')} style={globalstyles.proBackimg} />
                    }
                    {/* <Image resizeMode='stretch' source={require('../../images/proimg1.png')} style={globalstyles.proBackimg} /> */}
                    <TouchableOpacity style={globalstyles.Backarrowview2} onPress={goBack}>
                        <Image source={require('../../images/rrl.png')} style={globalstyles.Backarrowimg2} />
                    </TouchableOpacity>

                    <View style={globalstyles.Triangleview}>

                    </View>

                    <TouchableOpacity style={styles.editiconview} onPress={select}>
                        <Image resizeMode='contain' source={require('../../images/edit2.png')} style={styles.editimg} />
                    </TouchableOpacity>

                    <View style={globalstyles.nameimgview}>

                        <View style={globalstyles.Profileimgview}>
                            {profileimg ?
                                <Image source={{ uri: global.IMG + profileimg }} style={globalstyles.Profileimg} />
                                :
                                <Image source={require('../../images/proimg1.png')} style={globalstyles.Profileimg} />
                            }
                            {/* <Image source={require('../../images/proimg1.png')} style={globalstyles.Profileimg} /> */}
                            {/* } */}
                        </View>

                        <View style={{ width: '62%' }}>

                            <View style={globalstyles.nameview}>
                                <Text style={globalstyles.nametxt}>{name}</Text>
                            </View>

                            <View style={globalstyles.addressview}>
                                <Image resizeMode='contain' source={require('../../images/loctionicon.png')} style={globalstyles.loctionicon} />
                                <Text style={globalstyles.addresstxt}>{address}</Text>

                            </View>

                        </View>

                    </View>

                    <View style={{ width: '92%', alignSelf: 'center', marginTop: 20, }}>

                        <Text style={globalstyles.inputitletxt}>Name</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Your Name'
                            placeholderTextColor='#878787'
                            value={name}
                            color='#000000'
                            onChangeText={(text) => setname(text)}
                        />
                        {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}


                        <Text style={globalstyles.inputitletxt}>Mobile Number</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Your Mobile Number'
                            placeholderTextColor='#878787'
                            keyboardType='numeric'
                            value={phoneno}
                            color='#000000'
                            onChangeText={(text) => setphoneno(text)}
                        />
                        {msg2 ? <Text style={globalstyles.msg}>{msg2}</Text> : null}

                        <Text style={globalstyles.inputitletxt}>E-mail Id</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Your Mail Id '
                            placeholderTextColor='#878787'
                            value={emailid}
                            color='#000000'
                            onChangeText={(text) => setemailid(text)}
                        />
                        {msg3 ? <Text style={globalstyles.msg}>{msg3}</Text> : null}


                        <Text style={globalstyles.inputitletxt}>Address</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Your Address'
                            placeholderTextColor='#878787'
                            value={address}
                            color='#000000'
                            onChangeText={(text) => setaddress(text)}
                        />
                        {msg4 ? <Text style={globalstyles.msg}>{msg4}</Text> : null}

                        {/* <Text style={globalstyles.inputitletxt}>Pincode</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Pincode'
                            placeholderTextColor='#878787'
                            value={pincode}
                            color='#000000'
                            keyboardType='numeric'
                            maxLength={6}
                            onChangeText={(text) => setpincode(text)}
                        />
                        {msg5 ? <Text style={globalstyles.msg}>{msg5}</Text> : null}


                        <Text style={globalstyles.inputitletxt}>Aadhar Card Number</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Aadhar Card Number'
                            placeholderTextColor='#878787'
                            keyboardType='numeric'
                            value={aadharcard}
                            color='#000000'
                            maxLength={12}
                            onChangeText={(text) => setaadharcard(text)}
                        />
                        {msg6 ? <Text style={globalstyles.msg}>{msg6}</Text> : null}

                        <Text style={globalstyles.inputitletxt}>Pan Card Number</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Pan Card Number'
                            placeholderTextColor='#878787'
                            value={pancard}
                            color='#000000'
                            onChangeText={(text) => setpancard(text)}
                        />
                        {msg7 ? <Text style={globalstyles.msg}>{msg7}</Text> : null}

                        <Text style={globalstyles.inputitletxt}>Driving Licence Number</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Driving License Number'
                            placeholderTextColor='#878787'
                            value={driving_licence}
                            color='#000000'
                            onChangeText={(text) => setdriving_licence(text)}
                        />
                        {msg8 ? <Text style={globalstyles.msg}>{msg8}</Text> : null}

                        <Text style={globalstyles.inputitletxt}>Passport Number</Text>
                        <TextInput
                            style={globalstyles.inputtxt2}
                            placeholder='Enter Passport Number'
                            placeholderTextColor='#878787'
                            value={passport}
                            color='#000000'
                            onChangeText={(text) => setpassport(text)}
                        />
                        {msg9 ? <Text style={globalstyles.msg}>{msg9}</Text> : null} */}


                    </View>

                    <View style={{ marginTop: 50, marginBottom: 20 }}>
                        <TouchableOpacity style={globalstyles.button} onPress={updatedata}>
                            <Text style={globalstyles.buttontxt}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}