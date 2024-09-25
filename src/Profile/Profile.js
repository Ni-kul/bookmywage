// Profile
import React, { useEffect, useRef, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import HTMLView from 'react-native-htmlview';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { getcategory, loginPost } from '../API';

export default function Profile({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [userid, setuserid] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [profileimg, setprofileimg] = useState(null);
    const [phoneno, setphoneno] = useState('');
    const [emailid, setemailid] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [TandC, setTandC] = useState('');

    useEffect(() => {
        navigation.addListener('focus', async () => {
            userdata();
            Togetconfig();
        });

        const userdata = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            // console.log('userData', userData);
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            if (userDataArray) {
                setuserid(userDataArray.id);
                setname(userDataArray.name);
                setaddress(userDataArray.address);
                setemailid(userDataArray.email);
                setphoneno(userDataArray.number);
                setprofileimg(userDataArray.profile_pic)
            }
        }
    }, []);

    // getconfig
    const Togetconfig = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getconfig');
        setLoading(false);
        if (response.success == true) {
            setTandC(response.data[1].value)
        }
    }

    const goBack = () => {
        navigation.goBack();
    };

    const ToProfileEdit = async () => {
        navigation.navigate('ProfileEdit');
    }

    const ToNotification = async () => {
        navigation.navigate('Notification');
    }
    const ToChangePassword = async () => {
        navigation.navigate('ChangePassword');
    }

    const ToLogin = async () => {
        const finalRes = await AsyncStorage.removeItem('Userdata');
        await AsyncStorage.removeItem('Vendordata');
        await AsyncStorage.removeItem('SeenNotifications');
        await AsyncStorage.removeItem('SeenNotificationsV');

        console.log('Userdata-Users-LogOut', finalRes)
        navigation.navigate('Login');
    }


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
                        if (uploadimg) {
                            const imgpathcut = uploadimg.data.replace('images/', '');
                            // console.log('imgpathcut', imgpathcut)
                            setprofileimg(imgpathcut);

                            const data = {
                                user_id: userid,
                                name: name,
                                mobile: phoneno,
                                address: address,
                                profile_image: imgpathcut,
                                email: emailid,
                            };

                            setLoading(true);
                            const response = await loginPost(global.URL + 'updateuserprofile', data);
                            // console.log('updateuserprofile --> response', response);
                            setLoading(false);
                            const result = await AsyncStorage.getItem('Userdata')
                            // console.log('Data in result Userdata-(3) :', result);

                            const screenData = JSON.parse(result)
                            // console.log('Data in screenData--(4) :', screenData);

                            const newUpdatedUserInfo = {
                                ...screenData,
                                "name": name,
                                "mobile": phoneno,
                                "address": address,
                                "profile_pic": imgpathcut,
                                "email": emailid,
                            };
                            // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

                            AsyncStorage.setItem('Userdata', JSON.stringify(newUpdatedUserInfo))

                            const updateget = await AsyncStorage.getItem('Userdata');
                            // console.log('Data updateget--(6):', updateget);
                            // Alert.alert('Successfully Updated.');

                        } else {
                            console.log('ccccc')
                        }
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
                        if (uploadimg) {
                            const imgpathcut = uploadimg.data.replace('images/', '');
                            // console.log('imgpathcut --> G', imgpathcut)
                            setprofileimg(imgpathcut);

                            const data = {
                                user_id: userid,
                                name: name,
                                mobile: phoneno,
                                address: address,
                                profile_image: imgpathcut,
                                email: emailid,
                            };

                            setLoading(true);
                            const response = await loginPost(global.URL + 'updateuserprofile', data);
                            // console.log('updateuserprofile --> response', response)
                            setLoading(false);
                            const result = await AsyncStorage.getItem('Userdata')
                            // console.log('Data in result Userdata-(3) :', result);

                            const screenData = JSON.parse(result)
                            // console.log('Data in screenData--(4) :', screenData);

                            const newUpdatedUserInfo = {
                                ...screenData,
                                "name": name,
                                "mobile": phoneno,
                                "address": address,
                                "profile_pic": imgpathcut,
                                "email": emailid,
                            };
                            // console.log('newUpdatedUserInfo:--(5)', newUpdatedUserInfo);

                            AsyncStorage.setItem('Userdata', JSON.stringify(newUpdatedUserInfo))

                            const updateget = await AsyncStorage.getItem('Userdata');
                            // console.log('Data updateget--(6):', updateget);
                            // Alert.alert('Successfully Updated.');

                        }
                    } catch (uploadError) {
                        console.error('Error uploading image:', uploadError);
                    }

                } else {
                    console.error('Base64 data not found in response:', response);
                }
            }
        })
    }

    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
    }

    const closemodalTap = () => {
        setModalVisible(false);
    }

    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView showsVerticalScrollIndicator={false}>

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

                    <View style={globalstyles.nameimgview}>

                        {/* <View style={globalstyles.Profileimgview}> */}
                        {/* profileimg */}
                        {/* <Image source={require('../../images/proimg1.png')} style={globalstyles.Profileimg} /> */}
                        {/* </View> */}
                        <View style={globalstyles.Profileimgview}>
                            {profileimg ?
                                <Image source={{ uri: global.IMG + profileimg }} style={globalstyles.Profileimg} />
                                :
                                <Image source={require('../../images/proimg1.png')} style={globalstyles.Profileimg} />
                            }
                        </View>

                        <View style={{ width: '60%', marginLeft: '3%' }}>

                            <View style={globalstyles.nameview}>
                                <Text style={globalstyles.nametxt}>{name}</Text>

                                <TouchableOpacity onPress={select}>
                                    <Image resizeMode='contain' source={require('../../images/editpro.png')} style={styles.editimg} />
                                </TouchableOpacity>
                            </View>

                            <View style={globalstyles.addressview}>
                                <Image resizeMode='contain' source={require('../../images/loctionicon.png')} style={globalstyles.loctionicon} />
                                <Text style={globalstyles.addresstxt}>{address}</Text>

                            </View>

                        </View>

                    </View>

                    <View style={{ width: '92%', alignSelf: 'center', marginTop: 4, marginBottom: 40, }}>

                        <TouchableOpacity style={styles.myprofile} onPress={ToProfileEdit}>
                            <Image resizeMode='contain' source={require('../../images/user2.png')} style={globalstyles.userimg} />
                            <Text style={styles.txt1}>My Profile</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        {/* pass2.png */}
                        <TouchableOpacity style={styles.myprofile} onPress={ToChangePassword}>
                            <Image resizeMode='contain' source={require('../../images/pass22.png')} style={styles.passimg} />
                            <Text style={styles.txt1}>Change Password</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myprofile} onPress={ToNotification}>
                            <Image resizeMode='contain' source={require('../../images/bell2.png')} style={styles.passimg2} />
                            <Text style={styles.txt1}>Notification</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myprofile} onPress={openmodal}>
                            <Image resizeMode='contain' source={require('../../images/tandc.png')} style={styles.tandcimg} />
                            <Text style={styles.txt1}>Terms and Conditions</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myprofile} onPress={ToLogin}>
                            <Image resizeMode='contain' source={require('../../images/out.png')} style={styles.logoutimg} />
                            <Text style={styles.txt1}>Sign out</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

            {/* Terms & Condition modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                <View style={styles.mview1}>
                    <View style={{ marginTop: 20, marginBottom: 20, width: '90%', }}>

                        <Text style={styles.mtxt1}>Terms & Condition</Text>

                        <ScrollView style={{ height: 280, marginVertical: 12 }}>
                            <HTMLView
                                value={TandC}
                            // stylesheet={styles}
                            />
                            {/* <Text style={styles.mtxt2}>Why do we use it?</Text>
                            <Text style={styles.mtxt3}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text> */}
                        </ScrollView>

                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={globalstyles.button} onPress={closemodal}>
                                <Text style={globalstyles.buttontxt}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}