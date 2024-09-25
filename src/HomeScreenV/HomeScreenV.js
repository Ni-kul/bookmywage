// HomeScreen
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { loginPost, getcategory } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

export default function HomeScreenV({ navigation }) {

    const swiperRef = useRef(null);
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [getsliderdata, setgetsliderdata] = useState([]);
    const [vendorname, setvendorname] = useState('');
    const [vendorimg, setvendorimg] = useState('');

    const [isModalVisible, setModalVisible] = useState(false);

    const [isEnquirylist, setisEnquirylist] = useState(0);

    const [vendorbookingdata, setvendorbookingdata] = useState([]);
    const [vendorenquirydata, setvendorenquirydata] = useState([]);
    const [myservicedata, setmyservicedata] = useState([]);
    const [expiredplandata, setexpiredplandata] = useState([]);
    const [ModalVisibleservice, setModalVisibleservice] = useState(false);
    const [serviceid, setserviceid] = useState('');

    const [newNotifications, setNewNotifications] = useState([]);
    const [previousNotifications, setPreviousNotifications] = useState([]);
    const [newNotificationCount, setNewNotificationCount] = useState();

    const currentDate = moment().format('YYYY-MM-DD');

    const { height, width } = Dimensions.get('window');


    useEffect(() => {

        const handleBackButton = () => {
            if (isFocused) { // Check if the screen is focused
                global.Type = 2;
                BackHandler.exitApp();
                return true;
            }
            return false; // Allow default behavior for other screens
        };

        const focusListener = navigation.addListener('focus', async () => {
            // console.log('global.Type - V', global.Type);

            Togetslider();
            Tovendorbooking()
            // setLoading(true);
            const vendorData = await AsyncStorage.getItem('Vendordata');
            // console.log('vendorData HV', vendorData);
            const vendorDataArray = JSON.parse(vendorData);
            if (vendorDataArray != null) {
                setvendorname(vendorDataArray.name)
                setvendorimg(vendorDataArray.profile_pic)
                Tomyservice(vendorDataArray.id)
                Tovendorenquiry()
                mygetlastexpiredplan(vendorDataArray.user_id)
                global.venderid = vendorDataArray.id;
                Togetnotification(vendorDataArray.id)
            }
            setLoading(false);
        });

        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            focusListener(); // Clean up the focus listener
        };
    }, [isFocused, navigation]);

    const ToEnquirylist = async (index) => {
        setisEnquirylist(prevIndex => prevIndex === index ? null : index);
        // setisEnquirylist(index);
    }




    // getslider
    const Togetslider = async () => {
        setLoading(true);
        const response = await getcategory(global.URL + 'getslider');
        // console.log('getslider --> response', response);
        setLoading(false);
        if (response.success == true) {
            setgetsliderdata(response.data)
        } else {
            console.log('getslider false')
        }
    }

    const handleNext = () => {
        swiperRef.current.scrollBy(1);
    };

    const handlePrev = () => {
        swiperRef.current.scrollBy(-1);
    };

    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);

    }
    const closemodalTap = () => {
        setModalVisible(false);
    }

    const ToNotification = async () => {
        navigation.navigate('NotificationV');
    }

    const ToProfile = async () => {
        setModalVisible(false);
        navigation.navigate('ProfileV');
    }

    const ToListOfBookings = (index) => {
        setModalVisible(false);
        navigation.navigate('ListOfBookingsV', index);
    }

    const ToSubscription = async () => {
        setModalVisible(false);
        navigation.navigate('SubscriptionV');
    }

    // vendor_id
    const Tovendorbooking = async () => {
        const vendorData = await AsyncStorage.getItem('Vendordata');
        // console.log('vendorData HV', vendorData);
        const vendorDataArray = JSON.parse(vendorData);
        const data = {
            vendor_id: vendorDataArray.id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'vendorbooking', data);
        // console.log('vendorbooking --> response ', response);
        setLoading(false);
        if (response.success == true) {
            // const bookingData = response.data.filter(item => item.status === 0 || item.status === 2);
            setvendorbookingdata(response.data)
        } else {
            console.log('vendorbooking false')
        }
    }

    const Tochangebookingstatus = async (id, userid, status) => {

        // console.log('---->', id, userid, status)
        const data = {
            id: id,
            user_id: userid,
            status: status,
        }

        setLoading(true);
        const response = await loginPost(global.URL + 'changebookingstatus', data);
        // console.log('changebookingstatus --> response ', response);
        setLoading(false);

        if (response.success == true) {
            Tovendorbooking()
        } else {
            console.log('changebookingstatus false')
        }
    }

    // cancelbooking
    const mycancelbooking = async (mdid) => {

        const data = {
            id: mdid,
            type: 2
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'cancelbooking', data);
        // console.log('cancelbooking --> response V', response);
        setLoading(false);
        if (response.success == true) {
            Tovendorbooking();
        } else {
            console.log('cancelbooking false V')
        }
    }

    // vendorenquiry
    // vendor_id
    const Tovendorenquiry = async () => {
        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        // console.log('vendorData', vendorData);
        const vendorDataArray = JSON.parse(vendorData);

        const data = {
            vendor_id: vendorDataArray.id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'vendorenquiry', data);
        // console.log('vendorenquiry --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setvendorenquirydata(response.data)
        } else {
            console.log('vendorenquiry false')
        }
    }

    const openmodaldeleteservice = (id) => {
        setserviceid(id)
        setModalVisibleservice(true);
    }
    const closemodaldeleteservice = () => {
        Todeleteenquiry();
        setModalVisibleservice(false);
    }
    const closemodalTapdeleteservice = () => {
        setModalVisibleservice(false);
    }

    const Todeleteenquiry = async () => {

        const data = {
            id: serviceid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'deleteenquiry', data);
        // console.log('deleteenquiry --> response ', response);
        setLoading(false);
        if (response.success == true) {
            Tovendorenquiry();
        } else {
            console.log('deleteenquiry false')
        }
    }

    // myservice
    // vendor_id
    const Tomyservice = async (vendorid) => {

        const data = {
            vendor_id: vendorid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'myservice', data);
        // console.log('myservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setmyservicedata(response.data)
        } else {
            console.log('myservice false')
        }
    }

    const mygetlastexpiredplan = async (userid) => {

        const data = {
            user_id: userid,
            type: 2
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getlastexpiredplan', data);
        // console.log('getlastexpiredplan V--> response ', response);
        setLoading(false);
        if (response.success == true) {
            const plan = response.data;

            if (plan && moment(plan.end_date).isBefore(currentDate) && plan.type === 2) {
                // if (moment(plan.end_date).isBefore(currentDate) && plan.type === 2) {
                setexpiredplandata([plan]); // Wrap in an array
                // console.log('Plan added');
            } else if (plan == null) {
                global.planvendor = 1
            }
            else {
                global.planvendor = 0
                console.log('Plan does not meet criteria V');
            }
        } else {
            console.log('getlastexpiredplan false V');
        }
    }

    // getnotification
    const Togetnotification = async (vendor_id) => {

        const data = {
            user_id: vendor_id,
            type: 2
        }

        setLoading(true);
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

            const newNotiCount = newNotifs.length;
            console.log('newNotiCount V', newNotiCount)
            setNewNotificationCount(newNotiCount);

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
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.hadingview}>
                        <TouchableOpacity style={{ width: '10%' }} onPress={openmodal}>
                            <Image source={require('../../images/menu.png')} style={styles.menuimg} />
                        </TouchableOpacity>

                        <View style={{ marginLeft: '6%', width: '63.6%' }}>
                            <Text style={styles.txt1}>Welcome</Text>
                            <View style={styles.nameview}>
                                <Image source={require('../../images/clappinghands.png')} style={styles.clappinghands} />
                                <Text style={styles.txt2}>{vendorname}</Text>
                            </View>
                        </View>

                        <View style={{ width: '14.6%', marginLeft: '6%', }} >
                            <TouchableOpacity style={styles.bellview} onPress={ToNotification}>
                                <Image source={require('../../images/bell.png')} style={styles.bell} />
                            </TouchableOpacity>

                            {newNotificationCount > 0 &&
                                <View style={styles.countview}>
                                    <Text style={styles.counttxt}>{newNotificationCount}</Text>
                                </View>
                            }
                        </View>
                    </View>

                    {/* swiper */}
                    <View style={styles.slidermainview}>
                        <Swiper style={styles.sliderview} loop={true}
                            ref={swiperRef}
                            dot={<View style={styles.dotstyle} />}
                            activeDot={<View style={styles.dotstyle} />}
                        >
                            {getsliderdata.map((result, index) => (
                                <Image resizeMode='stretch' key={index} source={{ uri: global.IMG + result.document }} style={styles.sliderimg} />
                            ))}
                        </Swiper>
                    </View>

                    <TouchableOpacity style={styles.leftarrow} onPress={handlePrev}>
                        <Image resizeMode='stretch' source={require('../../images/al.png')} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightarrow} onPress={handleNext}>
                        <Image resizeMode='stretch' source={require('../../images/ar.png')} style={styles.arrowimg} />
                    </TouchableOpacity>



                    {/* Subscription plan */}
                    {expiredplandata.length > 0 &&
                        expiredplandata.map((plan, index) => (
                            <View style={styles.Subscription} key={index}>
                                <View style={styles.sub1view}>
                                    <Text style={styles.subtxt1}>Subscription plan</Text>
                                    <TouchableOpacity onPress={() => ToListOfBookings(5)}><Text style={styles.subtxt2}>View more</Text></TouchableOpacity>
                                </View>

                                <View style={styles.sub2view}>
                                    <Image source={require('../../images/sub.png')} style={styles.subimg} />

                                    <Text style={styles.subtxt3}>Your <Text style={styles.subtxt33}>Popular</Text> Subscription plan was expired on <Text style={styles.subtxt33}>{moment(plan.end_date).format('MMMM D')}</Text></Text>
                                </View>

                                <View style={styles.sub3view}>
                                    <Text style={styles.subtxt4}>Starting Date : <Text style={styles.subtxt44}>{moment(plan.created_date).format('DD/MM/YYYY')}</Text></Text>
                                    <Text style={styles.subtxt5}>End Date : <Text style={styles.subtxt44}>{moment(plan.end_date).format('DD/MM/YYYY')}</Text></Text>
                                </View>

                                <TouchableOpacity style={styles.subbtn} onPress={ToSubscription}>
                                    <Text style={styles.subbtntxt}>Renewal</Text>
                                </TouchableOpacity>

                            </View>
                        ))
                    }

                    {/* Your Booking  vendorbookingdata*/}
                    {vendorbookingdata.length > 0 ?
                        <View>
                            <View style={styles.secview}>
                                <Text style={styles.titletxt2}>Your Booking</Text>
                                {vendorbookingdata.length > 3 &&
                                    <TouchableOpacity onPress={() => ToListOfBookings(0)}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                                }
                            </View>

                            <View style={styles.bookingview}>
                                {vendorbookingdata.slice(0, 3).map((data, index) => (

                                    <View key={index} style={globalstyles.eachbookitem}>
                                        <View style={globalstyles.orderidview}>
                                            <Text style={globalstyles.orderidtxt}>Booking ID : {data.id}</Text>
                                            {/*  <TouchableOpacity >
                                        <Text style={globalstyles.ordertxt2}>View order</Text>
                                    </TouchableOpacity> */}
                                        </View>
                                        <View>
                                            <Text style={globalstyles.orderline}></Text>
                                            <View style={globalstyles.order2view}>
                                                <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={globalstyles.orderimg} />
                                                {/* <View style={globalstyles.liveview}>
                                                    <Image resizeMode='stretch' source={require('../../images/livedot.png')} style={globalstyles.livedotimg} />
                                                    <Text style={globalstyles.livetxt}>Live</Text>
                                                </View> */}
                                                <View style={globalstyles.order3view}>
                                                    <Text style={globalstyles.ordertxt3}>{data.username}</Text>

                                                    <View style={globalstyles.order4view}>
                                                        <Text style={globalstyles.ordertxt4}>{data.service_name}</Text>

                                                        {data.status === 4 &&
                                                            <Text style={globalstyles.ordertxt5}>Scheduled</Text>
                                                        }
                                                        {data.status === 0 &&
                                                            <Text style={globalstyles.ordertxt55}>Pending</Text>
                                                        }
                                                        {data.status === 3 &&
                                                            <Text style={globalstyles.ordertxt555}>Canceled</Text>
                                                        }
                                                        {data.status === 1 &&
                                                            <Text style={styles.ordertxtcom}>Completed</Text>
                                                        }
                                                    </View>
                                                    {/* Date */}
                                                    <View style={styles.dateview}>
                                                        <View style={{ width: '45%', }}>
                                                            <Text style={globalstyles.datetxt}>Date :</Text>
                                                            <Text style={globalstyles.datetxt2}>{data.service_date}</Text>
                                                        </View>

                                                        <View style={{ width: '44%', }}>
                                                            <Text style={globalstyles.datetxt}>Time :</Text>
                                                            <Text style={globalstyles.datetxt2}>{data.service_time}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                            {/* detail : */}
                                            <View style={styles.detailview}>
                                                <Text style={styles.phonetxt}>Mobile Number : <Text style={styles.phonetxt2}>{data.mobile_number}</Text></Text>
                                                <Text style={styles.phonetxt}>E-mail ID : <Text style={styles.phonetxt2}>{data.email}</Text></Text>
                                                <Text style={styles.phonetxt}>Address : </Text>
                                                <View style={styles.addressview}>
                                                    <Image resizeMode='contain' source={require('../../images/loctionicon.png')} style={styles.loctionicon} />
                                                    <Text style={styles.addtxt2}>{data.address}</Text>
                                                </View>
                                                <Text style={styles.phonetxt}>Message :</Text>
                                                <Text style={styles.msgtxt}>{data.message}</Text>

                                            </View>

                                            {data.status === 0 &&
                                                <View style={globalstyles.orderlastbtns}>
                                                    <TouchableOpacity style={globalstyles.Modificationbtn} onPress={() => Tochangebookingstatus(data.id, data.user_id, 4)}>
                                                        <Text style={globalstyles.Modificationbtntxt}>Confirmed</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => mycancelbooking(data.id)}>
                                                        <Text style={globalstyles.Modificationbtntxt2}>Cancel Booking</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            {data.status == 4 &&
                                                <View style={globalstyles.orderlastbtns}>
                                                    <TouchableOpacity style={globalstyles.Modificationbtn}>
                                                        <Text style={globalstyles.Modificationbtntxt}>Pending</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => Tochangebookingstatus(data.id, data.user_id, 1)}>
                                                        <Text style={globalstyles.Modificationbtntxt2}>Complete</Text>
                                                    </TouchableOpacity>

                                                    {/* <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => mycancelbooking(data.id)}>
                                                        <Text style={globalstyles.Modificationbtntxt2}>Cancel Booking</Text>
                                                    </TouchableOpacity> */}
                                                </View>
                                            }


                                        </View>
                                    </View>
                                ))}

                            </View>
                        </View>
                        :
                        null
                    }

                    {/* // User Enquiry  */}
                    {vendorenquirydata.length > 0 ?
                        <View>
                            <View style={styles.secview}>
                                <Text style={styles.titletxt2}>User Enquiry</Text>
                                {vendorenquirydata.length > 3 &&
                                    <TouchableOpacity onPress={() => ToListOfBookings(4)}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                                }
                            </View>

                            <View style={styles.bookingview}>
                                {vendorenquirydata.slice(0, 3).map((data, index) => (

                                    <View key={index} style={{ marginTop: 18, }}>
                                        <View style={styles.eview1}>
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={styles.eimg} />

                                            <View style={styles.esevicename}>
                                                <Text style={globalstyles.ordertxt3}>{data.vendorname}</Text>
                                                <View style={styles.eview2}>
                                                    <Text style={[styles.etxt1, { color: isEnquirylist === index ? '#534F4F' : '#000000' }]}>{data.service_name}</Text>
                                                    <TouchableOpacity onPress={() => ToEnquirylist(index)} style={styles.eviewmore}>
                                                        <Text style={styles.etxt2}>View more</Text>
                                                        <Image source={require('../../images/redarrow.png')} style={styles.eredarrow} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>


                                        {isEnquirylist === index &&
                                            <View style={styles.emaindetailview}>

                                                <View style={styles.detailview}>
                                                    <Text style={styles.phonetxt}>Name : <Text style={styles.phonetxt2}>{data.name}</Text></Text>
                                                    <Text style={styles.phonetxt}>Mobile Number : <Text style={styles.phonetxt2}>{data.mobile}</Text></Text>
                                                    <Text style={styles.phonetxt}>E-mail ID : <Text style={styles.phonetxt2}>{data.email}</Text></Text>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '82%', marginBottom: 4 }}>
                                                        <Text style={styles.phonetxt}>Date :<Text style={styles.phonetxt2}> {data.created_date.split(' ')[0]}</Text></Text>
                                                        <Text style={styles.phonetxt}>Time :<Text style={styles.phonetxt2}> {data.created_date.split(' ')[1]}</Text></Text>
                                                    </View>

                                                    <Text style={styles.phonetxt}>Message : <Text style={styles.emsgtxt}>{data.message}</Text></Text>

                                                </View>
                                                <TouchableOpacity style={styles.edeleticonview} onPress={() => openmodaldeleteservice(data.id)}>
                                                    <Image source={require('../../images/deleticon.png')} style={styles.edeleticon} />
                                                </TouchableOpacity>

                                            </View>
                                        }
                                    </View>
                                ))}

                            </View>
                        </View>
                        :
                        null
                    }


                    {/* // Your Service */}

                    {myservicedata.length > 0 &&
                        <View style={styles.secview}>
                            <Text style={styles.titletxt2}>Your Service</Text>
                            {myservicedata.length > 6 &&
                                <TouchableOpacity onPress={() => ToListOfBookings(1)}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                            }
                        </View>
                    }

                    <View style={styles.ysview}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {myservicedata.slice(0, 6).map((data, index) => (

                                <TouchableOpacity key={index} onPress={() => ToListOfBookings(1)} style={{ width: 120, marginRight: 14, justifyContent: 'flex-end', borderRadius: 12, }}>
                                    <Image resizeMode='contain' source={{ uri: global.IMG + data.images.split(',')[0] }} style={styles.ysimg} />
                                    {/* <BlurView style={styles.ystxtview} blurType="light" blurAmount={10}> */}
                                    <View style={styles.ystxtview}>
                                        <Text style={styles.ystxt}>{data.servicename}</Text>
                                    </View>
                                    {/* </BlurView> */}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>

            {/* // menu bar modal */}
            <Modal isVisible={isModalVisible} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', margin: 0, justifyContent: 'center' }}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
            // backdropColor={'rgba(255, 255, 255, 0.6)'}
            // backdropOpacity={0.5}
            // useNativeDriver={true}
            >
                {/* <ScrollView> */}
                <ImageBackground source={require('../../images/menuback1.png')} style={{ width: '92%', height: height - 10, justifyContent: 'center' }} >

                    <ImageBackground source={require('../../images/menuback2.png')} style={{ width: width, height: height - 20, marginRight: 5 }} >

                        <TouchableOpacity onPress={closemodalTap} style={styles.gobackmenu}>
                        </TouchableOpacity>

                        <View style={{ marginLeft: '5%', marginTop: 34 }}>

                            <View style={styles.usernameview}>
                                {/* <View style={styles.userimgview}>
                                    <Image resizeMode='contain' source={require('../../images/o2.png')} style={styles.userimg} />
                                </View> */}
                                <View >
                                    {vendorimg ?
                                        <Image source={{ uri: global.IMG + vendorimg }} style={styles.userimg} />
                                        :
                                        <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={styles.userimg} />
                                    }
                                </View>
                                <Text style={styles.usernametxt}>{vendorname}</Text>
                            </View>

                            <TouchableOpacity style={styles.dbordview} onPress={closemodalTap}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/dbord.png')} style={styles.dbordimg} />
                                </View>

                                <Text style={styles.Dashboardtxt}>Dashboard</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToSubscription}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/subicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Packagetxt}>Package/Subscription</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={() => ToListOfBookings(0)}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/bookserviceicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Booksertxt}>Bookings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={() => ToListOfBookings(5)}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/histryicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Paymenttxt}>Payment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={() => ToListOfBookings(1)}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='stretch' source={require('../../images/ser2.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Servicetxt}>Service Management</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={() => ToListOfBookings(4)}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/enq2.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Enquirytxt}>Enquiry Management</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToProfile}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/usericon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.usericontxt}>My account</Text>
                            </TouchableOpacity>



                        </View>

                    </ImageBackground>
                </ImageBackground>
                {/* </ScrollView> */}
            </Modal>

            <Modal isVisible={ModalVisibleservice} onBackButtonPress={closemodalTapdeleteservice} onBackdropPress={closemodalTapdeleteservice}>
                <View style={styles.modalview}>
                    <Text style={styles.mtxt1}>Are you sure delete this Enquiry</Text>
                    <View style={styles.modalview2}>
                        <TouchableOpacity style={styles.modalcancelbtn} onPress={closemodalTapdeleteservice}>
                            <Text style={styles.mtxt2}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalokbtn} onPress={closemodaldeleteservice}>
                            <Text style={styles.mtxt3}>OK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </View >

    )
}