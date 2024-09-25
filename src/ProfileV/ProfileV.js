// ProfileV
import React, { useEffect, useRef, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import HTMLView from 'react-native-htmlview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getcategory, loginPost } from '../API';

export default function ProfileV({ navigation }) {

    const [profileimg, setprofileimg] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isprivacyModalVisible, setprivacyModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userid, setuserid] = useState('');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phoneno, setphoneno] = useState('');
    const [emailid, setemailid] = useState('');
    const [TandC, setTandC] = useState('');
    const [policy, setpolicy] = useState('');

    useEffect(() => {
        navigation.addListener('focus', async () => {
            userdata();
            Togetconfig();
        });

        const userdata = async () => {
            setLoading(true);
            const vendorData = await AsyncStorage.getItem('Vendordata');
            // console.log('vendorData', vendorData);
            const userDataArray = JSON.parse(vendorData);
            setLoading(false);
            if (userDataArray) {
                setuserid(userDataArray.id);
                setname(userDataArray.name);
                setaddress(userDataArray.location);
                setemailid(userDataArray.email);
                setphoneno(userDataArray.number);
                setprofileimg(userDataArray.profile_pic)
            }
        }
    }, []);


    const Togetconfig = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getconfig');
        setLoading(false);
        if (response.success == true) {
            setpolicy(response.data[0].value)
            setTandC(response.data[1].value)
        }
    }

    const goBack = () => {
        navigation.goBack();
    };

    const ToProfileEdit = async () => {
        navigation.navigate('ProfileEditV');
    }

    const ToNotification = async () => {
        navigation.navigate('NotificationV');
    }

    const ToLoginV = async () => {
        navigation.navigate('LoginV');
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

    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);

    }
    const closemodalTap = () => {
        setModalVisible(false);
    }

    const openmodalprivacy = () => {
        setprivacyModalVisible(true);
    }
    const closemodalprivacy = () => {
        setprivacyModalVisible(false);

    }
    const closemodalprivacyTap = () => {
        setprivacyModalVisible(false);
    }

    const ToLogin = async () => {
        global.Type = 2;
        const finalRes = await AsyncStorage.removeItem('Userdata');
        await AsyncStorage.removeItem('Vendordata');
        console.log('Userdata-Users-LogOut', finalRes)
        await AsyncStorage.removeItem('SeenNotifications');
        await AsyncStorage.removeItem('SeenNotificationsV');
        navigation.navigate('Login');
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

                        <View style={globalstyles.Profileimgview}>
                            {profileimg ?
                                <Image source={{ uri: global.IMG + profileimg }} style={globalstyles.Profileimg} />
                                :
                                <Image source={require('../../images/proimg1.png')} style={globalstyles.Profileimg} />
                            }
                        </View>

                        <View style={{ width: '62%' }}>

                            <View style={globalstyles.nameview}>
                                <Text style={globalstyles.nametxt}>{name}</Text>

                                <TouchableOpacity onPress={select}>
                                    <Image source={require('../../images/editpro.png')} style={styles.editimg} />
                                </TouchableOpacity>
                            </View>

                            <View style={globalstyles.addressview}>
                                <Image source={require('../../images/loctionicon.png')} style={globalstyles.loctionicon} />
                                <Text style={globalstyles.addresstxt}>{address}</Text>

                            </View>

                        </View>

                    </View>

                    <View style={{ width: '92%', alignSelf: 'center', marginTop: 4, marginBottom: 40 }}>

                        <TouchableOpacity style={styles.myProfile} onPress={ToProfileEdit}>
                            <Image source={require('../../images/user2.png')} style={globalstyles.userimg} />
                            <Text style={styles.txt1}>My Profile</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myProfile} onPress={ToNotification}>
                            <Image resizeMode='contain' source={require('../../images/bell2.png')} style={styles.passimg2} />
                            <Text style={styles.txt1}>Notification</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myProfile} onPress={openmodalprivacy}>
                            <Image source={require('../../images/policy.png')} style={styles.passimg} />
                            <Text style={styles.txt1}>Privacy policy</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myProfile} onPress={openmodal}>
                            <Image resizeMode='contain' source={require('../../images/tandc.png')} style={styles.tandcimg} />
                            <Text style={styles.txt1}>Terms and Conditions</Text>
                            <Image source={require('../../images/all2.png')} style={styles.arrowicon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myProfile} onPress={ToLogin}>
                            <Image resizeMode='contain' source={require('../../images/out.png')} style={styles.logoutimg} />
                            <Text style={styles.txt2}>Sign out</Text>
                            {/* <Image source={require('../../images/all2.png')} style={styles.arrowicon} /> */}
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

            {/* Terms & Condition modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                <View style={styles.mview1}>
                    <View style={styles.mview2}>

                        <Text style={styles.mtxt1}>Terms & Condition</Text>
                        <ScrollView style={styles.mscroll}>
                            <HTMLView
                                value={TandC}
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

            {/* Privacy policy modal */}
            <Modal isVisible={isprivacyModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, }} onBackButtonPress={closemodalprivacyTap} onBackdropPress={closemodalprivacyTap}>
                <View style={styles.mview1}>
                    <View style={styles.mview2}>

                        <Text style={styles.mtxt1}>Privacy policy</Text>
                        <ScrollView style={styles.mscroll}>

                            <HTMLView
                                value={policy}
                            />
                            {/* <Text style={styles.mtxt2}>Why do we use it?</Text>
                            <Text style={styles.mtxt3}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                            as opposed to using 'Content here, content here', making it look like readable English. Many desktop
                            publishing packages and web page editors now use Lorem Ipsum as their default model text,
                            and a search for 'lorem ipsum' will uncover many web sites still in their infancy.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text> */}
                        </ScrollView>

                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={globalstyles.button} onPress={closemodalprivacy}>
                                <Text style={globalstyles.buttontxt}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}