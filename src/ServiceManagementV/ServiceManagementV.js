// ServiceManagementV
// ListOfBookingsV   - History
import React, { useEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Button, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceManagementV({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [myservicedata, setmyservicedata] = useState([]);
    const [categoryname, setcategoryname] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [serviceid, setserviceid] = useState('');

    const routedata = route.params;
    // console.log('routedata id--->', routedata);

    useEffect(() => {

        navigation.addListener('focus', () => {
            Tomyservice();
        })
    });



    // myservice
    const Tomyservice = async () => {

        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);
        // console.log('vendorDataArray.id', vendorDataArray.id)

        const data = {
            vendor_id: vendorDataArray.id,
        }
        const response = await loginPost(global.URL + 'myservice', data);
        // console.log('myservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            const matchedItem = response.data.filter(item => item.category === routedata);
            if (matchedItem.length > 0) {
                // console.log('matchedItem -->', matchedItem)
                setmyservicedata(matchedItem);
                setcategoryname(matchedItem[0].category_name);
            } else {
                setmyservicedata([]);
                // console.log('No matching data found for the given ID');
            }
        } else {
            console.log('get-myservice false')
        }
    }

    const openmodal = (id) => {
        setserviceid(id)
        setModalVisible(true);
    }
    const closemodal = () => {
        Todeleteservice();
        setModalVisible(false);
    }
    const closemodalTap = () => {
        setModalVisible(false);
    }
    // deleteservice
    const Todeleteservice = async () => {
        const data = {
            id: serviceid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'deleteservice', data);
        // console.log('deleteservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            Tomyservice();
        } else {
            console.log('deleteservice false')
        }
    }

    // ServiceUploadV
    const ToServiceUpload = async (data) => {
        navigation.navigate('ServiceUploadV', { from: 'ServiceManagementV', data: data });
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
                    <Text style={globalstyles.headertxt}>{categoryname} Service List</Text>
                </View>

                <View style={styles.bookingview}>
                    {myservicedata.length > 0 ?
                        myservicedata.map((data, index) => (

                            <View key={index} style={globalstyles.eachbookitem}>
                                <View style={globalstyles.order2view}>
                                    <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={globalstyles.orderimg} />

                                    <View style={[globalstyles.liveview, { borderColor: data.service_type == 0 ? '#D8D8D8' : '#FFE9E9' }]} >
                                        {data.service_type == 0 ?
                                            <Image resizeMode='stretch' source={require('../../images/livedot.png')} style={globalstyles.livedotimg} />
                                            :
                                            <Image resizeMode='stretch' source={require('../../images/reddot.png')} style={styles.reddotimg} />
                                        }
                                        <Text style={[globalstyles.livetxt, { color: data.service_type == 0 ? '#3A942C' : '#FF0000' }]}>{data.service_type == 0 ? 'Live' : 'Paid'}</Text>
                                    </View>

                                    <View style={globalstyles.order3view}>
                                        <Text style={globalstyles.ordertxt3}>{data.servicename}</Text>
                                        <Text style={styles.txt1}>Name : {data.vendorname}</Text>
                                        <Text style={styles.txt1}>Cat : {data.category_name}</Text>
                                        <Text style={styles.txt1}>Sub - Cat : {data.subcategory_name}</Text>
                                    </View>
                                </View>

                                <View style={styles.upbtnmainview}>
                                    <TouchableOpacity style={styles.Updatebtnview} onPress={() => ToServiceUpload(data)}>
                                        <Text style={styles.Updatebtntxt}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deletebtnview} onPress={() => openmodal(data.id)}>
                                        <Text style={styles.deletebtntxt}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                        :
                        // null openmodal  onPress={() => Todeleteservice(data.id)}
                        <Text style={globalstyles.txtnot}>The given category data was not found</Text>
                    }

                </View>

            </ScrollView>


            <Modal isVisible={isModalVisible} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                <View style={styles.modalview}>
                    <Text style={styles.mtxt1}>Are you sure delete this service</Text>
                    <View style={styles.modalview2}>
                        <TouchableOpacity style={styles.modalcancelbtn} onPress={closemodalTap}>
                            <Text style={styles.mtxt2}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalokbtn} onPress={closemodal}>
                            <Text style={styles.mtxt3}>OK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </View>
    )
}