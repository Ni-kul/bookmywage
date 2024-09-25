// NotificationV
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationV({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [notificationdata, setnotificationdata] = useState([]);
    const [newNotifications, setNewNotifications] = useState([]);
    const [previousNotifications, setPreviousNotifications] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            Togetnotification();

        });

    }, []);



    // getnotification
    const Togetnotification = async () => {

        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);

        const data = {
            user_id: vendorDataArray.id,
            type: 2
        }

        const response = await loginPost(global.URL + 'getnotification', data);
        // console.log('getnotification --> response Vs', response)
        setLoading(false);
        if (response.success == true) {
            // setnotificationdata(response.data)
            const seenNotifications = await AsyncStorage.getItem('SeenNotificationsV');
            const seenNotificationsArray = seenNotifications ? JSON.parse(seenNotifications) : [];

            const newNotifs = response.data.filter(notification => !seenNotificationsArray.includes(notification.id));
            const prevNotifs = response.data.filter(notification => seenNotificationsArray.includes(notification.id));

            setNewNotifications(newNotifs);
            setPreviousNotifications(prevNotifs);

            // Store newly seen notifications
            const updatedSeenNotifications = [...seenNotificationsArray, ...newNotifs.map(notification => notification.id)];
            await AsyncStorage.setItem('SeenNotificationsV', JSON.stringify(updatedSeenNotifications));
        } else {
            // console.log('Not getcategory')
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
                    <Text style={globalstyles.headertxt}>Notification</Text>
                </View>

                {/* <View style={styles.firstview}> */}
                {/* <Text style={styles.txt1}>New</Text>
                    {Notificationdata.slice(0, 2).map((newdata, index) => (

                        <View key={index} style={styles.eachnewview} >
                            <View style={styles.imgview}>
                                <Image resizeMode='stretch' source={require('../../images/paint.png')} style={styles.oneimg} />
                            </View>
                            <Text style={styles.msgtxt}>{newdata.msg}</Text>
                        </View>
                    ))}

                    <Text style={styles.txt1}>Previous</Text> */}


                {/* {notificationdata.length > 0 ?
                        notificationdata.map((newdata, index) => (

                            <View key={index} style={styles.eachnewview} >
                                <View style={styles.imgview}>
                                    <Image resizeMode='stretch' source={require('../../images/bell.png')} style={styles.oneimg} />
                                </View>
                                <Text style={styles.msgtxt2}>{newdata.message}</Text>
                            </View>
                        ))
                        :
                        // null
                        <Text style={globalstyles.txtnot}>Notification Not Found</Text>
                    }
                </View> */}
                <View style={styles.firstview}>
                    {newNotifications.length > 0 && (
                        <>
                            <Text style={styles.txt1}>New</Text>
                            {newNotifications.map((newdata, index) => (
                                <View key={index} style={styles.eachnewview} >
                                    <View style={styles.imgview}>
                                        <Image resizeMode='stretch' source={require('../../images/bell.png')} style={styles.oneimg} />
                                    </View>
                                    <Text style={styles.msgtxt2}>{newdata.message}</Text>
                                </View>
                            ))}
                        </>
                    )}

                    {previousNotifications.length > 0 && (
                        <>
                            <Text style={styles.txt1}>Previous</Text>
                            {previousNotifications.map((prevdata, index) => (
                                <View key={index} style={styles.eachnewview} >
                                    <View style={styles.imgview}>
                                        <Image resizeMode='stretch' source={require('../../images/bell.png')} style={styles.oneimg} />
                                    </View>
                                    <Text style={styles.msgtxt2}>{prevdata.message}</Text>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

        </View>
    )
}