// ListOfBookings   - History
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Button, ActivityIndicator, } from 'react-native';
import Modal from "react-native-modal";
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListOfBookings({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [selectedbtnone, setselectedbtnone] = useState(0)
    const [vieworder, setvieworder] = useState()
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('isoWeek'));
    const [selectedtime, setselectedtime] = useState('09:00 am')
    const [selectedindex, setselectedindex] = useState(0)
    const [isEnquirylist, setisEnquirylist] = useState(0)
    const [bookingData, setbookingData] = useState([{ id: '1', name: 'Arun cleaning company', service: 'Cleaning service', },
    { id: '2', name: 'Raja painting company', service: 'Painting service', },
    { id: '3', name: 'Arun cleaning company', service: 'Cleaning service', }]);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    const [mybookingData, setmybookingData] = useState([]);
    const [userenquirydata, setuserenquirydata] = useState([]);
    const [paymenthistorydata, setpaymenthistorydata] = useState([]);
    const [canceleddata, setcanceleddata] = useState([]);
    const [completedData, setcompletedData] = useState([]);

    const [mid, setmid] = useState('');
    const [bookuserid, setbookuserid] = useState('');

    const [ModalVisibleservice, setModalVisibleservice] = useState(false);
    const [serviceid, setserviceid] = useState('');
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');

    const scrollViewRef = useRef();

    const getindex = route.params;
    // console.log('getindex', getindex);

    useEffect(() => {
        const checkUserdata = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            if (userDataArray != null) {
                // console.log('userDataArray', userDataArray.id)
                mybookinglist();
                myuserenquiry()
                mypaymenthistory()
            }
        }

        navigation.addListener('focus', () => {
            Toselectedbtnone(getindex || 0);
            checkUserdata()
        })

    }, [getindex]);

    const Toselectedbtnone = async (index) => {
        // console.log('index', index)
        scrollToCenter(index)
        setselectedbtnone(index);
    }

    const buttonslist = [
        { id: '1', name: 'Service Booking' },
        { id: '2', name: 'Enquiry list' },
        { id: '3', name: 'Payment Details' },
        { id: '4', name: 'Cancelation Booking' },
        { id: '5', name: 'Completed Booking' }
    ]



    const bookingtime = [
        { id: '1', time: '09:00 am' },
        { id: '2', time: '09:30 am' },
        { id: '3', time: '10:00 am' },
        { id: '4', time: '10:30 am' },
        { id: '5', time: '11:00 am' },
        { id: '6', time: '11:30 am' },
        { id: '7', time: '12:00 pm' },
        { id: '8', time: '12:30 pm' },
        { id: '9', time: '01:00 pm' },
        { id: '10', time: '01:30 pm' },
        { id: '11', time: '02:00 pm' },
        { id: '12', time: '02:30 pm' },
        { id: '13', time: '03:00 pm' },
        { id: '14', time: '03:30 pm' },
        { id: '15', time: '04:00 pm' },
        { id: '16', time: '04:30 pm' },
        { id: '17', time: '05:00 pm' },
        { id: '18', time: '05:30 pm' },
        { id: '19', time: '06:00 pm' },
    ]



    const scrollToCenter = (index) => {
        if (index !== -1 && scrollViewRef.current) {
            const tabWidth = 140;
            const centerOffset = scrollViewWidth / 2 - tabWidth / 2;
            const offset = Math.max(0, index * tabWidth - centerOffset);
            scrollViewRef.current.scrollTo({ x: offset, animated: true });
        } else {
            // alert('scrollToCenter else')
        }

    };


    // const Toselectedtime = async (index) => {
    //     setselectedtime(index);
    // }

    const ToEnquirylist = async (index) => {
        // setisEnquirylist(index);
        setisEnquirylist(prevIndex => prevIndex === index ? null : index);
    }

    const Tovieworder = async (index) => {
        setvieworder(index);
    }

    const openmodal = (id, userid) => {
        // console.log('id', id, userid)
        setmid(id)
        setbookuserid(userid)
        setModalVisible(true);
    }
    const closemodal = () => {
        // setLoading(false);
        setModalVisible(false);
    }

    const closemodalTap = () => {
        setModalVisible(false);
    }

    // const onDateChange = (date) => {
    //     setselectdate(date);
    // };

    const handleNextWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().add(1, 'week'));
    };

    const handlePreviousWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().subtract(1, 'week'));
    };

    const renderWeekDays = () => {
        const days = [];
        const startOfWeek = currentWeekStart.clone().startOf('isoWeek');
        for (let i = 0; i < 7; i++) {
            days.push(startOfWeek.clone().add(i, 'days'));
        }
        return days;
    };

    const backgroundColors = ['red', 'blue', 'green', 'white'];
    const ToDetailsofService = async (data) => {
        navigation.navigate('DetailsofService', data);
    }

    //     mybooking
    const mybookinglist = async () => {

        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);

        const data = {
            user_id: userDataArray.id,
        }

        const response = await loginPost(global.URL + 'mybooking', data);
        // console.log('mybooking --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setmybookingData(response.data.filter(item => item.status !== 1));
            // setmybookingData(response.data)
            const filteredData = response.data.filter(item => item.status === 3);
            setcanceleddata(filteredData);
            const completData = response.data.filter(item => item.status === 1);
            setcompletedData(completData);

        } else {
            console.log('mybooking false')
        }
    }


    const Toselecteddate = async (date) => {
        // console.log('selectedDate -->', date);
        setSelectedDate(date)
    }
    const Toselectedtime = async (index, time) => {
        // console.log('time', time)
        setselectedindex(index)
        setselectedtime(time);
    }


    const mybookingmodify = async () => {

        if (selectedDate == null) {
            setmsg1('Select Date');
        } else {
            setmsg1('');
        }
        if (selectedtime == '') {
            setmsg2('Select Time');
        } else {
            setmsg2('');
        }
        if (selectedDate != null && selectedtime != '') {

            const data = {
                id: mid,
                service_date: selectedDate,
                service_time: selectedtime
            }
            // console.log('data', data)
            setLoading(true);
            const response = await loginPost(global.URL + 'bookingmodify', data);
            // console.log('bookingmodify --> response ', response);
            // setLoading(false);
            if (response.success == true) {
                // closemodal()
                setModalVisible(false);
                mybookinglist()
                // Tochangebookingstatus()
            } else {
                console.log('bookingmodify false')
            }
        } else {
            console.log('enter details')
        }
    }

    // Tochangebookingstatus
    const Tochangebookingstatus = async () => {

        const data = {
            id: mid,
            user_id: bookuserid,
            status: 2,
        }
        // console.log('data ss', data)

        setLoading(true);
        const response = await loginPost(global.URL + 'changebookingstatus', data);
        // console.log('changebookingstatus --> response ', response);
        setLoading(false);

        if (response.success == true) {
            mybookinglist()
            setmid('');
        } else {
            console.log('changebookingstatus false')
        }
    }

    // cancelbooking
    const mycancelbooking = async (mdid) => {

        const data = {
            id: mdid,
            type: 1
        }
        // console.log('data c', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'cancelbooking', data);
        // console.log('cancelbooking --> response ', response);
        setLoading(false);
        if (response.success == true) {
            mybookinglist()
            setmid('');
        } else {
            console.log('cancelbooking false')
        }
    }

    // userenquiry
    const myuserenquiry = async () => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        setLoading(false);
        const data = {
            user_id: userDataArray.id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'userenquiry', data);
        // console.log('userenquiry --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setuserenquirydata(response.data)

        } else {
            console.log('userenquiry false')
        }
    }

    const openmodaldeleteservice = (id) => {
        setserviceid(id)
        setModalVisibleservice(true);
    }
    const closemodaldeleteservice = () => {
        userdeleteenquiry();
        setModalVisibleservice(false);
    }
    const closemodalTapdeleteservice = () => {
        setModalVisibleservice(false);
    }
    // deleteenquiry
    // id
    const userdeleteenquiry = async () => {
        // console.log('eid', eid)
        const data = {
            id: serviceid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'deleteenquiry', data);
        // console.log('deleteenquiry --> response ', response);
        setLoading(false);
        if (response.success == true) {
            myuserenquiry();
        } else {
            console.log('deleteenquiry false')
        }
    }

    // paymenthistory
    const mypaymenthistory = async () => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        setLoading(false);
        const data = {
            user_id: userDataArray.id,
            type: 1
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'paymenthistory', data);
        // console.log('paymenthistory --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setpaymenthistorydata(response.data)
        } else {
            console.log('userenquiry false')
        }
    }

    const Todeletesubscription = async (value) => {
        // console.log('value plan id U', value)

        const data = {
            id: value,
        }

        // deletesubscription
        const response = await loginPost(global.URL + 'deletesubscription', data);
        // console.log('deletesubscription --> response ', response);
        setLoading(false);
        if (response.success == true) {
            mypaymenthistory()
        } else {
            console.log('deletesubscription false')
        }
    };

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
                    <Text style={globalstyles.headertxt}>History</Text>
                </View>

                <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: '4%', marginTop: 30 }} onLayout={event => setScrollViewWidth(event.nativeEvent.layout.width)}>
                    {buttonslist.map((btn, index) => (
                        <TouchableOpacity key={index} onPress={() => Toselectedbtnone(index)} style={[styles.button1, { backgroundColor: selectedbtnone === index ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.button1txt, { color: selectedbtnone === index ? '#FFFFFF' : '#909090' },]}>{btn.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Booking list  */}
                {selectedbtnone == 0 &&
                    <View style={styles.bookingview}>
                        {mybookingData.length > 0 ?
                            mybookingData.map((bookingdata, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={globalstyles.orderidview}>
                                        <Text style={globalstyles.orderidtxt}>ID : {bookingdata.id}</Text>
                                        <TouchableOpacity onPress={() => ToDetailsofService(bookingdata)}>
                                            <Text style={globalstyles.ordertxt2}>View order</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <Text style={globalstyles.orderline}></Text>
                                        <View style={globalstyles.order2view}>
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + bookingdata.images.split(',')[0] }} style={globalstyles.orderimg} />
                                            {/* <View style={globalstyles.liveview}>
                                                <Image resizeMode='stretch' source={require('../../images/livedot.png')} style={globalstyles.livedotimg} />
                                                <Text style={globalstyles.livetxt}>Live</Text>
                                            </View> */}
                                            <View style={globalstyles.order3view}>
                                                <Text style={globalstyles.ordertxt3}>{bookingdata.vendorname}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{bookingdata.service_name}</Text>
                                                    {bookingdata.status === 4 &&
                                                        <Text style={globalstyles.ordertxt5}>Scheduled</Text>
                                                    }
                                                    {bookingdata.status === 0 &&
                                                        <Text style={globalstyles.ordertxt55}>Pending</Text>
                                                    }
                                                    {bookingdata.status === 3 &&
                                                        <Text style={globalstyles.ordertxt555}>Cancel</Text>
                                                    }

                                                </View>

                                                <View style={globalstyles.order5view}>
                                                    {bookingdata.profile_pic ?
                                                        <Image source={{ uri: global.IMG + bookingdata.profile_pic }} style={globalstyles.o2img} />
                                                        :
                                                        <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={globalstyles.o2img} />
                                                    }
                                                    <View style={{ width: '44%', }}>
                                                        <Text style={globalstyles.ordertxt6}>{bookingdata.vendor_name}</Text>
                                                        <Text style={globalstyles.ordertxt7}>{bookingdata.category_name}</Text>
                                                    </View>
                                                    <View style={globalstyles.ratview}>
                                                        <Image source={require('../../images/rating.png')} style={globalstyles.ratingstar} />
                                                        <Text style={globalstyles.ordertxt8}>{bookingdata.average_review ? bookingdata.average_review : 0}</Text>
                                                    </View>
                                                </View>


                                            </View>
                                        </View>

                                        {/* Date */}
                                        <View style={globalstyles.order6view}>
                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Date :</Text>
                                                <Text style={globalstyles.datetxt2}>{bookingdata.service_date}</Text>
                                            </View>

                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Time :</Text>
                                                <Text style={globalstyles.datetxt2}>{bookingdata.service_time}</Text>
                                            </View>

                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Working hours :</Text>
                                                <Text style={globalstyles.datetxt2}>{bookingdata.workinghours}</Text>
                                            </View>
                                        </View>

                                        {/* CanaledBookingbtn */}
                                        {/* // Modification  & Cancelation Booking */}
                                        {/* {bookingdata.status === 2 || bookingdata.status === 4 &&
                                            <View style={globalstyles.CanaledBookingbtn}>
                                                <TouchableOpacity style={globalstyles.Canaledbtn} onPress={() => mycancelbooking(bookingdata.id)}>
                                                    <Text style={globalstyles.Canaledbtntxt}>Cancel Booking</Text>
                                                </TouchableOpacity>
                                            </View>
                                        } */}

                                        {bookingdata.status === 0 &&
                                            <View style={globalstyles.orderlastbtns}>
                                                <TouchableOpacity style={globalstyles.Modificationbtn} onPress={() => openmodal(bookingdata.id, bookingdata.user_id)}>
                                                    <Text style={globalstyles.Modificationbtntxt}>Modification</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => mycancelbooking(bookingdata.id)}>
                                                    <Text style={globalstyles.Modificationbtntxt2}>Cancelation Booking</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }

                                    </View>
                                </View>
                            ))
                            :
                            <Text style={styles.txtnot}>No data found.</Text>
                        }

                    </View>
                }

                {/* Cancel Booking*/}
                {selectedbtnone == 3 &&

                    <View style={styles.bookingview}>
                        {canceleddata.length > 0 ?
                            canceleddata.map((data, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={globalstyles.orderidview}>
                                        <Text style={globalstyles.orderidtxt}>ID : {data.id}</Text>
                                    </View>

                                    <View>
                                        <Text style={globalstyles.orderline}></Text>
                                        <View style={globalstyles.order2view}>
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={globalstyles.orderimg} />
                                            {/* <Image resizeMode='stretch' source={require('../../images/order.png')} style={globalstyles.orderimg} /> */}
                                            <View style={globalstyles.order3view}>
                                                <Text style={globalstyles.ordertxt3}>{data.vendorname}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{data.service_name}</Text>

                                                    <Text style={globalstyles.ordertxt555}>Canceled</Text>
                                                </View>

                                                <View style={globalstyles.order5view}>
                                                    {data.profile_pic ?
                                                        <Image source={{ uri: global.IMG + data.profile_pic }} style={globalstyles.o2img} />
                                                        :
                                                        <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={globalstyles.o2img} />
                                                    }
                                                    <View style={{ width: '40%' }}>
                                                        <Text style={globalstyles.ordertxt6}>{data.vendorname} </Text>
                                                        <Text style={globalstyles.ordertxt7}>{data.category_name}</Text>
                                                    </View>
                                                    <View style={globalstyles.ratview}>
                                                        <Image source={require('../../images/rating.png')} style={globalstyles.ratingstar} />
                                                        <Text style={globalstyles.ordertxt8}>{data.average_review ? data.average_review : 0}</Text>
                                                    </View>
                                                </View>


                                            </View>
                                        </View>

                                        {/* Date */}
                                        <View style={globalstyles.order6view}>
                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Date :</Text>
                                                <Text style={globalstyles.datetxt2}>{data.service_date}</Text>
                                            </View>

                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Time :</Text>
                                                <Text style={globalstyles.datetxt2}>{data.service_time}</Text>
                                            </View>

                                            <View style={globalstyles.dateview}>
                                                <Text style={globalstyles.datetxt}>Working hours :</Text>
                                                <Text style={globalstyles.datetxt2}>{data.workinghours}</Text>
                                            </View>
                                        </View>


                                    </View>
                                </View>
                            ))
                            :
                            <Text style={styles.txtnot}>No data found.</Text>
                        }

                    </View>
                }

                {/* Completed Booking */}
                {selectedbtnone == 4 &&

                    <View style={styles.bookingview}>
                        {completedData.length > 0 ?
                            completedData.map((data, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={globalstyles.orderidview}>
                                        <Text style={globalstyles.orderidtxt}>Booking ID : {data.id}</Text>
                                    </View>

                                    <View>
                                        <Text style={globalstyles.orderline}></Text>
                                        <View style={globalstyles.order2view}>
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={globalstyles.orderimg} />
                                            <View style={globalstyles.order3view}>
                                                <Text style={globalstyles.ordertxt3}>{data.vendorname}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{data.service_name}</Text>

                                                    <Text style={styles.ordertxtcom}>Completed</Text>
                                                </View>
                                                {/* Date  c - Completed*/}
                                                <View style={styles.completdateview}>
                                                    <View style={styles.cdateview}>
                                                        <Text style={globalstyles.datetxt}>Date :</Text>
                                                        <Text style={globalstyles.datetxt2}>{data.service_date}</Text>
                                                    </View>

                                                    <View style={styles.cdateview}>
                                                        <Text style={globalstyles.datetxt}>Time :</Text>
                                                        <Text style={globalstyles.datetxt2}>{data.service_time}</Text>
                                                    </View>
                                                </View>


                                            </View>
                                        </View>
                                        {/* detail : */}
                                        <View style={styles.cphoneview}>
                                            <Text style={styles.cphonetxt}>Mobile Number : <Text style={styles.cphonetxt2}>{data.mobile_number}</Text></Text>
                                            <Text style={styles.cphonetxt}>E-mail ID : <Text style={styles.cphonetxt2}>{data.email}</Text></Text>
                                            <Text style={styles.cphonetxt}>Address : </Text>
                                            <View style={styles.caddressview}>
                                                <Image resizeMode='contain' source={require('../../images/loctionicon.png')} style={styles.loctionicon} />
                                                <Text style={styles.caddtxt2}>{data.address}</Text>
                                            </View>
                                            <Text style={styles.cphonetxt}>Message :</Text>
                                            <Text style={styles.cmsgtxt}>{data.message}</Text>

                                        </View>

                                    </View>
                                </View>
                            ))
                            :
                            <Text style={styles.txtnot}>No data found.</Text>
                        }

                    </View>
                }

                {/* Enquiry list  e - Enquiry*/}
                {selectedbtnone == 1 &&

                    <View style={styles.bookingview}>
                        {userenquirydata.length > 0 ?
                            userenquirydata.map((enquiry, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={styles.eview1}>
                                        {enquiry.images == null ?
                                            <Image resizeMode='stretch' source={require('../../images/order.png')} style={styles.eimg} />
                                            :
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + enquiry.images.split(',')[0] }} style={styles.eimg} />
                                        }
                                        <View style={styles.esevicename}>
                                            <Text style={globalstyles.ordertxt3}>{enquiry.vendorname}</Text>
                                            <View style={styles.eview2}>
                                                <Text style={[styles.etxt1, { color: isEnquirylist === index ? '#534F4F' : '#000000' }]}>{enquiry.service_name}</Text>
                                                <TouchableOpacity onPress={() => ToEnquirylist(index)} style={styles.eviewmore}>
                                                    <Text style={styles.etxt2}>View more</Text>
                                                    <Image source={require('../../images/redarrow.png')} style={styles.eredarrow} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>

                                    {isEnquirylist === index &&
                                        <View>
                                            <Text style={globalstyles.orderline}></Text>

                                            {/* detail :  */}
                                            <View style={styles.cphoneview}>
                                                <Text style={styles.cphonetxt}>Name : <Text style={styles.cphonetxt2}>{enquiry.name}</Text></Text>
                                                <Text style={styles.cphonetxt}>Mobile Number : <Text style={styles.cphonetxt2}>{enquiry.mobile}</Text></Text>
                                                <Text style={styles.cphonetxt}>E-mail ID : <Text style={styles.cphonetxt2}>{enquiry.email}</Text></Text>

                                                <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                                                    <Text style={styles.cphonetxt}>Date :<Text style={styles.cphonetxt2}> {enquiry.created_date.split(' ')[0]}</Text></Text>
                                                    <Text style={styles.ctimetxt}>Time :<Text style={styles.cphonetxt2}> {enquiry.created_date.split(' ')[1]}</Text></Text>
                                                </View>

                                                <Text style={styles.cphonetxt}>Message : <Text style={styles.emsgtxt}>{enquiry.message}</Text></Text>

                                            </View>
                                            <TouchableOpacity style={styles.edeleticonview} onPress={() => openmodaldeleteservice(enquiry.id)}>
                                                <Image source={require('../../images/deleticon.png')} style={styles.edeleticon} />
                                            </TouchableOpacity>

                                        </View>
                                    }
                                </View>
                            ))

                            :
                            <Text style={styles.txtnot}>No data found.</Text>
                        }

                    </View>
                }


                {/* Payment Details  p - Payment Details*/}
                {selectedbtnone == 2 &&
                    <View style={styles.pview1}>
                        {paymenthistorydata.length > 0 ?
                            <SwipeListView
                                data={paymenthistorydata}
                                renderItem={({ item, index }) => (

                                    <View style={styles.peachview} >
                                        <View style={[
                                            styles.pview2,
                                            index === 0 ? styles.pviewb1 :
                                                index === 1 ? styles.pviewb2 :
                                                    index === 2 ? styles.pviewb3 :
                                                        {}

                                        ]}>
                                            <Text style={styles.ptxt1}>{item.plan_name}</Text>
                                            <View style={styles.pview3}>
                                                <Image source={require('../../images/bigdot.png')} style={styles.pdotimg} />
                                                <Text style={styles.ptxt2}>{item.duration} month</Text>
                                            </View>
                                            <View style={styles.pview3}>
                                                <Image source={require('../../images/bigdot.png')} style={styles.pdotimg} />
                                                <Text style={styles.ptxt2}>{item.description}</Text>
                                            </View>
                                            <View style={styles.pview3}>
                                                <Image source={require('../../images/bigdot.png')} style={styles.pdotimg} />
                                                <Text style={styles.ptxt2}>-</Text>
                                            </View>
                                            <View style={styles.pview3}>
                                                <Image source={require('../../images/bigdot.png')} style={styles.pdotimg} />
                                                <Text style={styles.ptxt2}>-</Text>
                                            </View>

                                            <Text style={styles.planline}></Text>

                                            <Text style={styles.ptxt4}>-</Text>
                                        </View>

                                        <View style={styles.pview4}>
                                            <Text style={styles.ptxt5}>{item.plan_name}</Text>

                                            <View style={styles.pdatemain}>
                                                <View style={styles.pdateview}>
                                                    <Text style={styles.pdatetxt}>Start :</Text>
                                                    <Text style={styles.pdatetxt2}>{moment(item.created_date).format('MMMM D YYYY')}</Text>
                                                </View>
                                                <View style={styles.pdateview}>
                                                    <Text style={styles.pdatetxt}>End :</Text>
                                                    <Text style={styles.pdatetxt2}>{moment(item.end_date).format('MMMM D YYYY')}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.pdatemain}>
                                                <View style={styles.pdateview}>
                                                    <Text style={styles.pdatetxt}>Time :</Text>
                                                    <Text style={styles.pdatetxt2}>{moment(item.created_date).format('hh:mm a')}</Text>
                                                </View>
                                                <View style={styles.pdateview}>
                                                    <Text style={styles.pdatetxt}>Payment :</Text>
                                                    <Text style={styles.pdatetxt2}>Rs : {item.price}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>

                                )}
                                renderHiddenItem={({ item }) => (
                                    <View style={styles.rowBack}>
                                        <TouchableOpacity style={styles.backRightBtn} onPress={() => Todeletesubscription(item.id)}>
                                            <Image source={require('../../images/reddeleticon.png')} style={styles.itemdeletimg} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenValue={-80}
                                keyExtractor={item => item.id}
                            />

                            :
                            <Text style={styles.txtnot}>No data found.</Text>
                        }
                    </View>
                }

            </ScrollView>

            {/* modification - modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                <View style={globalstyles.mview1}>
                    <Text style={globalstyles.mtxt1}>Booking modification</Text>

                    <View style={globalstyles.mview2}>
                        <Text style={globalstyles.mtxt2}>Change Date</Text>
                        <Image resizeMode='contain' source={require('../../images/date2.png')} style={globalstyles.date2img} />
                    </View>


                    {/* date */}
                    <View style={globalstyles.mdateview}>
                        <View style={globalstyles.mdatearrows}>
                            <TouchableOpacity onPress={handlePreviousWeek}>
                                <Image resizeMode='contain' source={require('../../images/lb.png')} style={globalstyles.date2img} />
                            </TouchableOpacity>
                            <Text style={globalstyles.mtxt2}>{currentWeekStart.format('MMMM YYYY')}</Text>
                            <TouchableOpacity onPress={handleNextWeek}>
                                <Image resizeMode='contain' source={require('../../images/all2.png')} style={globalstyles.date2img} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={globalstyles.datesContainer}>
                                {renderWeekDays().map((day) => (
                                    <TouchableOpacity
                                        key={day.format('YYYY-MM-DD')}
                                        onPress={() => Toselecteddate(day.format('YYYY-MM-DD'))}
                                        // onPress={() => setSelectedDate(day.format('YYYY-MM-DD'))}
                                        style={[globalstyles.dateContainer, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selectedDateContainer,]}>

                                        <Text style={[globalstyles.dayName, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selecteddateText,]}
                                        >{day.format('ddd')}</Text>
                                        <Text style={[globalstyles.dayName, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selecteddateText,]}>{day.format('DD')}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        </ScrollView>
                        {msg1 ? <Text style={globalstyles.msgm}>{msg1}</Text> : null}

                    </View>

                    <View style={globalstyles.mview2}>
                        <Text style={globalstyles.mtxt2}>Change Time</Text>
                        <Image resizeMode='contain' source={require('../../images/time2.png')} style={globalstyles.date2img} />
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 18 }}>

                        {bookingtime.map((timedata, index) => (
                            <TouchableOpacity key={index} style={[globalstyles.meachtime, { backgroundColor: selectedindex === index ? '#0066FF' : '#EBEBEB' }]} onPress={() => Toselectedtime(index, timedata.time)}>
                                <Text style={[globalstyles.mtimetxt, { color: selectedindex === index ? '#FFFFFF' : '#3E3E3E' }]}>{timedata.time}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {msg2 ? <Text style={globalstyles.msgm}>{msg2}</Text> : null}


                    <View style={globalstyles.cancelbookingbtn}>
                        <TouchableOpacity style={globalstyles.Canaledbtn2} onPress={() => mycancelbooking(mid)}>
                            <Text style={globalstyles.Canaledbtntxt2}>Cancel the Booking</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 40, marginBottom: 20 }}>
                        <TouchableOpacity style={globalstyles.button} onPress={mybookingmodify}>
                            <Text style={globalstyles.buttontxt}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
        </View>
    )
}