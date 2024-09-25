// Populardata
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, Dimensions, FlatList, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Populardata({ route, navigation }) {

    const [loading, setLoading] = useState(false);


    const [servicelistdata, setservicelistdata] = useState([]);

    useEffect(() => {

        const setuserdata = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            if (userDataArray != null) {
                Topopularservice(userDataArray.id)
            }
        }
        navigation.addListener('focus', async () => {
            setuserdata();
        });
    }, []);


    const Topopularservice = async (userid) => {
        setLoading(true);

        const data = {
            user_id: userid,
            category: null
        }
        // console.log('data',data)
        const response = await loginPost(global.URL + 'popularservice', data);
        console.log('popularservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setservicelistdata(response.data);
        } else {
            console.log('popularservice false');
        }
    }



    const ToDetailsofService = async (data) => {
        navigation.navigate('DetailsofService', data);
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
                    <Text style={globalstyles.headertxt}>Popular Service</Text>
                </View>

                <View style={styles.view2}>
                    {servicelistdata.length > 0 ?
                        servicelistdata.map((data, index) => (

                            <TouchableOpacity style={styles.eachitem} key={index} onPress={() => ToDetailsofService(data)}>
                                <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={styles.eachitemimg} />

                                <View style={[styles.payview, { backgroundColor: data.service_type == 0 ? '#E9FFEF' : '#FFE9E9' },]}>
                                    <Image resizeMode='stretch' source={data.service_type == 0 ? require('../../images/free2.png') : require('../../images/pay.png')} style={styles.payimg} />
                                    <Text style={[styles.paidtxt, { color: data.service_type == 0 ? '#3A942C' : '#FF0000' },]}>{data.service_type == 0 ? 'Free' : 'Paid'}</Text>
                                </View >

                                <View style={{ marginHorizontal: '4%' }}>

                                    <View style={styles.itemnameview}>
                                        <Text style={styles.itemnametxt}>{data.vendorname}</Text>
                                        <View style={styles.ratingview}>
                                            <Image source={require('../../images/rating.png')} style={styles.ratingimg} />
                                            <Text style={styles.ratingtxt}>{data.average_review ? data.average_review : 0}</Text>
                                        </View>
                                    </View>

                                    {/* <Text style={styles.txt1}>Painting service</Text> */}
                                    <View style={styles.view3}>
                                        <View style={styles.view4}>
                                            {data.profile_pic ?
                                                <Image source={{ uri: global.IMG + data.profile_pic }} style={styles.o2img2} />
                                                :
                                                <Image source={require('../../images/v1Copy.png')} style={styles.o2img2} />
                                            }
                                            <View style={styles.view5}>
                                                <Text style={styles.txt2}>{data.vendor_name}</Text>
                                                <Text style={styles.txt3}>{data.servicename}</Text>
                                            </View>

                                            <View style={styles.ratingview2}>
                                                <Image source={require('../../images/rating.png')} style={styles.ratingimg2} />
                                                <Text style={styles.ratingtxt2}>{data.average_review ? data.average_review : 0}</Text>
                                            </View>

                                        </View>
                                        <Text style={styles.servicepricetxt}>Rs.{data.amount}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        ))

                        :
                        <Text style={globalstyles.txtnot}>No service found.</Text>
                    }

                </View>

            </ScrollView>





        </View>
    )
}

