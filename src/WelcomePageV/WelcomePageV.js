// WelcomePageV
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import Modal from "react-native-modal";
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function WelcomePageV({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [vendorstatus, setvendorstatus] = useState('');
    const isFocused = useIsFocused();

    // useEffect(() => {
    //     const handleBackButton = () => {
    //         if (isModalVisible) {
    //             // Navigate to HomeScreen when back button is pressed while modal is visible
    //             global.Type = 2
    //             setModalVisible(false);
    //             navigation.navigate('HomeScreen');
    //             return true; // Prevent default back button behavior
    //         }
    //         return false; // Allow default back button behavior for other cases
    //     };

    //     const focusListener = navigation.addListener('focus', () => {
    //         // console.log('global.Type - V W', global.Type);
    //         getuserprofile();
    //     });
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    //         focusListener(); // Clean up the focus listener
    //     };
    // }, [isModalVisible, navigation]);

    useEffect(() => {
        const handleBackButton = () => {
            if (isModalVisible) {
                global.Type = 2;
                setModalVisible(false);
                navigation.navigate('FlashScreen'); // Navigate to HomeScreen if the modal is visible
                // console.log('1111')
                return true; // Prevent default back button behavior
            } else {
                // console.log('2222')
                // Ensure back button consistently navigates to HomeScreen
                navigation.navigate('FlashScreen');
                return true;
            }
        };

        const focusListener = navigation.addListener('focus', () => {
            getuserprofile(); // Fetch user profile when the screen is focused
        });

        // Add the back button listener
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            // Clean up the back button listener and focus listener
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            focusListener(); // Remove focus listener
        };
    }, [isModalVisible, navigation]);



    const openmodal = () => {
        global.Type = 2
        setModalVisible(true);
        // console.log('global.Type open', global.Type)
    }

    const closemodal = () => {
        // navigation.goBack();
        setModalVisible(false);
        // console.log('global.Type close', global.Type)
        navigation.navigate('FlashScreen');
        // if (vendorstatus != 0) {
        //     navigation.navigate('HomeScreen');
        // }
    }

    const closemodalTap = () => {
        setModalVisible(false);
    }


    const getuserprofile = async () => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        setLoading(false);

        const data = {
            user_id: userDataArray.id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getuserprofile', data);
        // console.log('getuserprofile --> response ', response);
        setLoading(false);
        if (response.success == true) {
            // setvendorstatus(response.data[0].vendor_status);
            if (response.data[0].vendor_status == 0) {
                setvendorstatus(response.data[0].vendor_status);
                setTimeout(() => {
                    openmodal()
                }, 2000);
            } else if (response.data[0].vendor_status == 1) {
                Togetvendorprofile(response.data[0].vendor_id)
                // navigation.navigate('HomeScreenV');
            } else {
                setTimeout(() => {
                    navigation.navigate('VendorRegistration');
                }, 2000);
            }
        } else {
            console.log('getuserprofile false')
        }
    }


    //     
    // vendor_id
    const Togetvendorprofile = async (id) => {
        const data = {
            vendor_id: id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getvendorprofile', data);
        // console.log('getvendorprofile --> response ', response);
        setLoading(false);
        if (response.success == true) {
            try {
                await AsyncStorage.setItem('Vendordata', JSON.stringify(response.data[0]));
                // console.log('Vendor data saved successfully.');
                navigation.navigate('HomeScreenV');
            } catch (error) {
                console.error('Error saving vendor data:', error);
            }
        } else {
            console.log('getvendorprofile false');
        }
    }
    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>

                <View style={styles.viewone}>
                    <Text style={styles.txt1}>Welcome Back</Text>
                    <Text style={styles.txt2}>To <Text style={styles.txt22}>VENDOR LOGIN</Text></Text>

                    <View style={styles.imgmainview}>
                        <View style={styles.rowimageview1}>
                            <Image source={require('../../images/w5.png')} style={styles.w1img} />
                            <Image source={require('../../images/w66.png')} style={styles.w1img} />
                        </View>
                        <View style={styles.rowimageview2}>
                            <Image source={require('../../images/w2.png')} style={styles.w1img} />
                            <Image source={require('../../images/w4.png')} style={styles.w1img} />
                        </View>
                        <View style={styles.rowimageview3}>
                            <Image source={require('../../images/w11.png')} style={styles.w1img} />
                            <Image source={require('../../images/w3.png')} style={styles.w1img} />
                        </View>

                    </View>

                </View>

            </ScrollView>

            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, flex: 1 }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap} >

                <View style={styles.mview1}>

                    <Text style={styles.mtxt1}>Verification</Text>

                    <Text style={styles.mtxt2}>Still your account will not verify by Admin so please wait with us</Text>

                    <View style={{ marginTop: 30, marginBottom: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={closemodal}>
                            <Text style={styles.buttontxt}>Ok</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </View>
    );
};
