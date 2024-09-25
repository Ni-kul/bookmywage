// Subscription
import React, { useEffect, useRef, useState } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Subscription({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [plandata, setplandata] = useState([]);

    const plandataa = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ]

    // plan
    useEffect(() => {
        navigation.addListener('focus', async () => {
            Toplan();
        });
    }, []);


    const Toplan = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getplan');

        console.log('plan --> response', response);
        setLoading(false);
        if (response.success == true) {
            const userplanData = response.data.filter(item => item.type === 1);
            setplandata(userplanData)
        } else {
            // alert('Not getplan');
            console.log('Not getplan')
        }
    }


    const handlePayment = (planprice, planid, planduration) => {
        // console.log('planprice', planprice)
        var options = {
            description: 'Test Payment',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_TREPWNGhQCTA0t', // Your Razorpay Key ID
            amount: planprice, // Amount in paise, so 5000 = 50 INR
            name: 'Test Corp',
            prefill: {
                email: 'test@example.com',
                contact: '9191919191',
                name: 'Test User'
            },
            theme: { color: '#F37254' }
        };

        console.log('options', options);

        RazorpayCheckout.open(options)
            .then((data) => {
                // handle success
                // console.log(`Success: ${data.razorpay_payment_id} \n --> Full Response: ${JSON.stringify(data)}`);
                Tosubscription(planid, planduration)
            })
            .catch((error) => {
                console.log('Entered catch block:', error); // Log to confirm entering the catch block

                const errorDetails = JSON.parse(error.description || '{}');
                if (errorDetails.error && errorDetails.error.reason === 'payment_cancelled') {
                    // console.log("Payment was cancelled by the user.");
                    Alert.alert("Payment Cancelled", "You have cancelled the payment process.");
                } else {
                    // handle other errors
                    // console.log(`Error: ${error.code} | ${error.description} \n --> Full Response: ${JSON.stringify(error)}`);
                    Alert.alert("Payment Failed");
                }
            });

    };

    const Tosubscription = async (planid, planduration) => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        const data = {
            user_id: userDataArray.id,
            plan_id: planid,
            duration: planduration,
            type: 1
        }
        // console.log('data', data)
        const response = await loginPost(global.URL + 'subscription', data);
        // console.log('subscription --> response ', response);
        setLoading(false);
        if (response.success == true) {
            global.plan = 0
            Alert.alert("Subscription Successful");
        } else {
            Alert.alert("Subscription Failed");
        }
    }

    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ImageBackground resizeMode='stretch' source={require('../../images/subscriptionback.png')} style={styles.backimg}>
                <ScrollView >


                    <View style={globalstyles.headerone}>
                        <Headerone />
                        <Text style={globalstyles.headertxt}>Subscription Plan</Text>
                    </View>

                    <Image resizeMode='contain' source={require('../../images/subscriptionto.png')} style={styles.sub1img} />

                    <View style={styles.sview1}>
                        <Text style={styles.stxt1}>Choose your right plan</Text>
                        <Text style={styles.stxt2}>Make upgrade your plan and get more advantages of services</Text>
                    </View>


                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 24, marginBottom: 30, marginLeft: '4%' }} contentContainerStyle={{ alignItems: 'flex-end' }}>

                        {plandata.map((plantxt, index) => (

                            <View style={[
                                styles.planview1,
                                index == 0 ? styles.pviewb1 :
                                    index == 1 ? styles.pviewb2 :
                                        index == 2 ? styles.pviewb3 :
                                            {}

                            ]} key={index} >
                                <Text style={styles.plantxt1}>{plantxt.name}</Text>
                                <View style={styles.planview2}>
                                    <Image source={require('../../images/bigdot.png')} style={styles.bigdotimg} />
                                    <Text style={styles.plantxt2}>{plantxt.description}</Text>
                                </View>
                                <View style={styles.planview2}>
                                    <Image source={require('../../images/bigdot.png')} style={styles.bigdotimg} />
                                    <Text style={styles.plantxt2}>{plantxt.duration} month</Text>
                                </View>
                                <View style={styles.planview2}>
                                    <Image source={require('../../images/bigdot.png')} style={styles.bigdotimg} />
                                    <Text style={styles.plantxt2}>{plantxt.no_of_service} Book services</Text>
                                </View>
                                {/* <View style={styles.planview2}>
                                    <Image source={require('../../images/bigdot.png')} style={styles.bigdotimg} />
                                    <Text style={styles.plantxt2}>-</Text>
                                </View> */}

                                <Text style={styles.planline}></Text>

                                <View style={styles.planview3}>
                                    <Text style={styles.plantxt3}>{plantxt.price}</Text>
                                    <TouchableOpacity onPress={() => handlePayment(plantxt.price, plantxt.id, plantxt.duration)}>
                                        <Image source={require('../../images/plango.png')} style={styles.plangoimg} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ))}
                    </ScrollView>


                </ScrollView>
            </ImageBackground>
        </View>
    )
}