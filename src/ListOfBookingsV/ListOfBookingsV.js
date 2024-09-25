// ListOfBookingsV   - History
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Button, ActivityIndicator, } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function ListOfBookingsV({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [selectedbtnone, setselectedbtnone] = useState(0)
    const [isEnquirylist, setisEnquirylist] = useState(0)
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const [myservicedata, setmyservicedata] = useState([]);
    const [vendorenquirydata, setvendorenquirydata] = useState([]);
    const [categories, setcategories] = useState([]);
    const [imageHeights, setImageHeights] = useState({});
    const [vendorbookingdata, setvendorbookingdata] = useState([]);
    const [canceledbooking, setcanceledbooking] = useState([]);
    const [completedData, setcompletedData] = useState([]);
    const [ModalVisibleservice, setModalVisibleservice] = useState(false);
    const [serviceid, setserviceid] = useState('');
    const [paymenthistorydata, setpaymenthistorydata] = useState([]);
    const [ModalVisibleservice2, setModalVisibleservice2] = useState(false);
    const [cat_id, setcat_id] = useState('');

    const scrollViewRef = useRef();

    const getindex = route.params;
    // console.log('getindex', getindex);

    useEffect(() => {
        navigation.addListener('focus', () => {
            Toselectedbtnone(getindex || 0);
            setuserdata();
            Tocategoryvendor();
            mypaymenthistory()
        })
    }, [getindex]);

    const setuserdata = async () => {
        // console.log('------------>  setuserdata');
        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);
        // console.log('vendorDataArray',vendorDataArray)
        setLoading(false);
        if (vendorDataArray != null) {
            Tovendorenquiry(vendorDataArray.id)
            Tovendorbooking()
        }
    }

    const Toselectedbtnone = async (index) => {
        // console.log('index', index)
        scrollToCenter(index)
        setselectedbtnone(index);
    }

    const scrollToCenter = (index) => {
        if (index !== -1 && scrollViewRef.current) {
            const tabWidth = 150;
            const centerOffset = scrollViewWidth / 2 - tabWidth / 2;
            const offset = Math.max(0, index * tabWidth - centerOffset);
            scrollViewRef.current.scrollTo({ x: offset, animated: true });
        } else {
            // alert('scrollToCenter else')
        }

    };
    const buttonslist = [
        { id: '1', name: 'Booking list' },
        { id: '2', name: 'Category Management' },
        { id: '3', name: 'Cancelation Booking' },
        { id: '4', name: 'Completed Booking' },
        { id: '5', name: 'Enquiry list' },
        { id: '6', name: 'Payment Details' },
    ]


    const numColumns = 2;


    const ToEnquirylist = async (index) => {
        // setisEnquirylist(index);
        setisEnquirylist(prevIndex => prevIndex === index ? null : index);
    }

    const handlePress = (index) => {
        // console.log('index', index)
        setSelectedItemIndex(index === selectedItemIndex ? null : index);
    };

    const Tovendorbooking = async () => {

        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);

        const data = {
            vendor_id: vendorDataArray.id,
        }
        // console.log('data -- ',data)
        const response = await loginPost(global.URL + 'vendorbooking', data);
        // console.log('vendorbooking --> response ', response);
        setLoading(false);
        if (response.success == true) {
            // console.log('------------>  Tovendorbooking');

            // const bookingData = response.data.filter(item => item.status === 0 || item.status === 2);
            setvendorbookingdata(response.data)
            const filteredData = response.data.filter(item => item.status === 3);
            setcanceledbooking(filteredData);
            const completData = response.data.filter(item => item.status === 1);
            setcompletedData(completData);

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
            setuserdata();
            // setvendorbookingdata(response.data)
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

    const Tovendorenquiry = async (vendorid) => {

        const data = {
            vendor_id: vendorid,
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
        // console.log('eid', eid)
        const data = {
            id: serviceid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'deleteenquiry', data);
        // console.log('deleteenquiry --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setuserdata();
        } else {
            console.log('deleteenquiry false')
        }
    }

    const Tocategoryvendor = async () => {

        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        // console.log('vendorData', vendorData);
        const vendorDataArray = JSON.parse(vendorData);

        const data = {
            vendor_id: vendorDataArray.id,
        }
        // console.log('data', data)
        const response = await loginPost(global.URL + 'getcategoryvendor', data);
        // console.log('getcategoryvendor --> response', response)
        setLoading(false);
        if (response.success == true) {
            // console.log('------------>  Tocategoryvendor');
            const catData = response.data.filter(item => item.no_of_service !== 0);
            setcategories(catData)
            // response.data.forEach((item) => {
            catData.forEach((item) => {
                const uri = global.IMG + item.image;
                Image.getSize(uri, (width, height) => {
                    const aspectRatio = height / width;
                    const calculatedHeight = 100 * aspectRatio; // Assuming width is 100% (or 100 units for simplicity)
                    setImageHeights(prevHeights => ({
                        ...prevHeights,
                        [item.image]: calculatedHeight,
                    }));
                });
            });
        }
    }


    const renderItems = (columnIndex) => {
        return categories.filter((_, index) => index % numColumns === columnIndex).map((item, index) => {
            // console.log('---->',columnIndex, index , numColumns)
            const actualIndex = columnIndex + index * numColumns;
            // console.log('<-------------------->',actualIndex)

            return (
                <TouchableOpacity key={actualIndex} style={styles.eachcatview} onPress={() => handlePress(actualIndex)} >

                    <Image resizeMode="stretch" source={{ uri: global.IMG + item.image }}
                        // style={styles.image} 
                        style={[styles.image, { height: imageHeights[item.image] || 100 }]}
                    />

                    {/* <Image resizeMode="stretch" source={item.icon} style={styles.image} /> */}
                    <BlurView style={styles.cattxtviwe} blurType="light" blurAmount={1}>
                        <Text style={styles.cattxt}>{item.name}</Text>
                    </BlurView>

                    {selectedItemIndex === actualIndex && (
                        <BlurView style={styles.absolute} blurType="light" blurAmount={2} >
                            <View style={styles.catbuttonsContainer}>
                                <TouchableOpacity style={styles.catbuttons} onPress={() => ToServiceManagementV(item.id)}>
                                    <Image resizeMode="contain" source={require('../../images/catedit.png')} style={styles.cateditimg} />
                                    <Text style={styles.catedittxt}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.catbuttons} onPress={() => openmodaldeleteservice2(item.id)}>
                                    <Image resizeMode="contain" source={require('../../images/reddeleticon.png')} style={styles.cateditimg} />
                                    <Text style={styles.catdeletetxt}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </BlurView>
                    )}
                </TouchableOpacity>
            );
        });
    };

    // ServiceManagementV
    const ToServiceManagementV = async (catid) => {
        navigation.navigate('ServiceManagementV', catid);
    }

    const mypaymenthistory = async () => {
        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);
        setLoading(false);
        const data = {
            user_id: vendorDataArray.user_id,
            type: 2
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'paymenthistory', data);
        // console.log('paymenthistory --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setpaymenthistorydata(response.data)
        } else {
            console.log('paymenthistory false')
        }
    }


    const Todeletesubscription = async (value) => {
        // console.log('value V', value)
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

    const openmodaldeleteservice2 = (id) => {
        console.log('id', id)
        setcat_id(id)
        setModalVisibleservice2(true);
    }
    const closemodaldeleteservice2 = () => {
        Todeletecategory();
        setModalVisibleservice2(false);
    }
    const closemodalTapdeleteservice2 = () => {
        setModalVisibleservice2(false);
    }

    const Todeletecategory = async () => {

        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);

        const data = {
            vendor_id: vendorDataArray.id,
            category: cat_id
        }

        // console.log('data', data)
        const response = await loginPost(global.URL + 'deletecategory', data);
        // console.log('deletecategory --> response ', response);
        setLoading(false);
        if (response.success == true) {
            Tocategoryvendor()
            // console.log('deletecategory true')
        }
        // else {
        //     console.log('deletecategory false')
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

                <View style={globalstyles.headerone}>
                    <Headerone />
                    <Text style={globalstyles.headertxt}>History</Text>
                </View>

                <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: '4%', marginTop: 30 }} onLayout={event => setScrollViewWidth(event.nativeEvent.layout.width)}>
                    {buttonslist.map((btn, index) => (
                        <TouchableOpacity key={index} onPress={() => Toselectedbtnone(index)} style={[styles.button1, { backgroundColor: selectedbtnone === index ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.button1txt, { color: selectedbtnone === index ? '#FFFFFF' : '#606060' },]}>{btn.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* {myservicedata.map((item,index)=>(
                        <Text>{item.servicename}</Text>
                    ))} */}

                {/* Booking list */}
                {selectedbtnone == 0 &&

                    <View style={styles.bookingview}>
                        {vendorbookingdata.length > 0 ?
                            vendorbookingdata.map((data, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={globalstyles.orderidview}>
                                        <Text style={globalstyles.orderidtxt}>Booking ID : {data.id}</Text>
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
                                                <Text style={globalstyles.ordertxt3}>{data.service_name}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{data.category_name}</Text>

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
                                        {/* // Confirmed  & Cancel Booking */}
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

                                        {/* // Pending  & Cancel Booking */}
                                        {data.status == 4 &&
                                            <View style={globalstyles.orderlastbtns}>

                                                <TouchableOpacity style={globalstyles.Modificationbtn}>
                                                    <Text style={globalstyles.Modificationbtntxt}>Pending</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => Tochangebookingstatus(data.id, data.user_id, 1)}>
                                                    <Text style={globalstyles.Modificationbtntxt2}>Completed</Text>
                                                </TouchableOpacity>

                                                {/* <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => mycancelbooking(data.id)}>
                                                    <Text style={globalstyles.Modificationbtntxt2}>Cancel Booking</Text>
                                                </TouchableOpacity> */}
                                            </View>
                                        }

                                    </View>
                                </View>
                            ))
                            :
                            <Text style={globalstyles.txtnot}>Booking Not Found</Text>

                        }

                    </View>
                }
                {/* Category Management*/}
                {selectedbtnone == 1 &&

                    <View style={styles.viewone}>
                        <View style={styles.column}>
                            {renderItems(0)}
                        </View>
                        <View style={styles.column}>
                            {renderItems(1)}
                        </View>
                    </View>

                }


                {/* Payment Details  p - Payment Details*/}
                {selectedbtnone == 5 &&
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
                                        <TouchableOpacity style={styles.backRightBtn} onPress={() => Todeletesubscription(item.plan_id)}>
                                            <Image source={require('../../images/reddeleticon.png')} style={styles.itemdeletimg} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                rightOpenValue={-80}
                                keyExtractor={item => item.id}
                            />
                            :
                            <Text style={globalstyles.txtnot}>No data found.</Text>
                        }
                    </View>
                }

                {/* Cancelation Booking*/}
                {selectedbtnone == 2 &&

                    <View style={styles.bookingview}>
                        {canceledbooking.length > 0 ?
                            canceledbooking.map((data, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
                                    <View style={globalstyles.orderidview}>
                                        <Text style={globalstyles.orderidtxt}>ID : {data.id}</Text>
                                        {data.type == 1 &&
                                            <Text style={styles.cancelbytxt}>( By user )</Text>}
                                        {data.type == 2 &&
                                            <Text style={styles.cancelbytxt}>( By vendor )</Text>}
                                    </View>

                                    <View>
                                        <Text style={globalstyles.orderline}></Text>
                                        <View style={globalstyles.order2view}>
                                            <Image resizeMode='stretch' source={{ uri: global.IMG + data.images.split(',')[0] }} style={globalstyles.orderimg} />
                                            <View style={globalstyles.order3view}>
                                                <Text style={globalstyles.ordertxt3}>{data.service_name}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{data.category_name}</Text>

                                                    <Text style={globalstyles.ordertxt555}>Canceled</Text>
                                                </View>

                                                <View style={styles.order5view}>
                                                    {data.profile_pic ?
                                                        <Image source={{ uri: global.IMG + bookingdata.profile_pic }} style={globalstyles.o2img} />
                                                        :
                                                        <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={globalstyles.o2img} />
                                                        // <Image resizeMode='stretch' source={require('../../images/o2.png')} style={globalstyles.o2img} />
                                                    }
                                                    <View style={{ width: '60%', marginLeft: '6%', }}>
                                                        <Text style={globalstyles.ordertxt6}>{data.username} </Text>
                                                        <Text style={globalstyles.ordertxt7}>Client</Text>
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

                            <Text style={globalstyles.txtnot}>Cancelation Not Found</Text>
                        }

                    </View>
                }

                {/* Completed Booking */}
                {selectedbtnone == 3 &&

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
                                                <Text style={globalstyles.ordertxt3}>{data.service_name}</Text>

                                                <View style={globalstyles.order4view}>
                                                    <Text style={globalstyles.ordertxt4}>{data.category_name}</Text>

                                                    <Text style={styles.ordertxtcom}>Completed</Text>

                                                </View>
                                                {/* Date */}
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
                            <Text style={globalstyles.txtnot}>Data Not Found</Text>
                        }

                    </View>
                }

                {/* Enquiry list */}

                {selectedbtnone == 4 &&

                    <View style={styles.bookingview}>
                        {vendorenquirydata.length > 0 ?
                            vendorenquirydata.map((data, index) => (

                                <View key={index} style={globalstyles.eachbookitem}>
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
                                        <View>
                                            <Text style={globalstyles.orderline}></Text>

                                            {/* detail :  */}
                                            <View style={styles.cphoneview}>
                                                <Text style={styles.cphonetxt}>Name : <Text style={styles.cphonetxt2}>{data.name}</Text></Text>
                                                <Text style={styles.cphonetxt}>Mobile Number : <Text style={styles.cphonetxt2}>{data.mobile}</Text></Text>
                                                <Text style={styles.cphonetxt}>E-mail ID : <Text style={styles.cphonetxt2}>{data.email}</Text></Text>

                                                <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                                                    <Text style={styles.cphonetxt}>Date : <Text style={styles.cphonetxt2}>{data.created_date.split(' ')[0]}</Text></Text>
                                                    <Text style={styles.ctimetxt}>Time : <Text style={styles.cphonetxt2}>{data.created_date.split(' ')[1]}</Text></Text>
                                                </View>

                                                <Text style={styles.cphonetxt}>Message : <Text style={styles.emsgtxt}>{data.message}</Text></Text>

                                            </View>
                                            <TouchableOpacity style={styles.edeleticonview} onPress={() => openmodaldeleteservice(data.id)}>
                                                <Image source={require('../../images/deleticon.png')} style={styles.edeleticon} />
                                            </TouchableOpacity>

                                        </View>
                                    }
                                </View>
                            ))
                            :
                            <Text style={globalstyles.txtnot}>data Not Found</Text>
                        }

                    </View>
                }



            </ScrollView>

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
            {/* deletecategory */}
            <Modal isVisible={ModalVisibleservice2} onBackButtonPress={closemodalTapdeleteservice2} onBackdropPress={closemodalTapdeleteservice2}>
                <View style={styles.modalview}>
                    <Text style={styles.mtxt1}>Are you sure delete this Category</Text>
                    <View style={styles.modalview2}>
                        <TouchableOpacity style={styles.modalcancelbtn} onPress={closemodalTapdeleteservice2}>
                            <Text style={styles.mtxt2}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalokbtn} onPress={closemodaldeleteservice2}>
                            <Text style={styles.mtxt3}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    )
}