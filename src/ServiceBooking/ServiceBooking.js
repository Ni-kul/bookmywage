// ServiceBooking
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground, ActivityIndicator, Alert, } from 'react-native';
import DatePicker from 'react-native-date-picker';
import StarRating from 'react-native-star-rating-widget';
import Modal from "react-native-modal";
import moment from 'moment';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceBooking({ route, navigation }) {

    const [loading, setLoading] = useState(false);
    const [name, setname] = useState('');
    const [phoneno, setphoneno] = useState('');
    const [emailid, setemailid] = useState('');
    const [address, setaddress] = useState('');
    const [msg, setmsg] = useState('');
    const [date, setdate] = useState(null);
    const [open, setopen] = useState(false);
    const [time, settime] = useState('');
    const [open2, setopen2] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [rating, setrating] = useState(0);
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [msg6, setmsg6] = useState('');
    const [msg7, setmsg7] = useState('');
    const [msg8, setmsg8] = useState('');

    const routedata = route.params;
    // console.log('routedata -->', routedata);

    const openmodal = async () => {
        if (name == '') {
            setmsg1('*Please Enter Name')
        } else {
            setmsg1('')
        }
        if (phoneno == '') {
            setmsg2('*Please Enter Mobile Number')
        } else {
            setmsg2('')
        }
        if (emailid == '') {
            setmsg3('*Please Enter E-Mail Id')
        } else {
            setmsg3('')
        }
        if (address == '') {
            setmsg4('*Please Enter Address')
        } else {
            setmsg4('')
        }
        if (date == null) {
            setmsg5('*Please Enter Date')
        } else {
            setmsg5('')
        }
        if (time == '') {
            setmsg6('*Please Enter Time')
        } else {
            setmsg6('')
        }
        if (msg == '') {
            setmsg7('*Please Enter Message')
        } else {
            setmsg7('')
        }
        // openmodalrating()
        // console.log('time.toLocaleTimeString()', time.toLocaleTimeString())

        // console.log('time---', time.toLocaleTimeString('en-US', options));

        if (name != '' && phoneno != '' && emailid != '' && address != '' && msg != '' && date != null && time != '') {

            const isdate = new Date(date);
            const year = isdate.getFullYear();
            const month = String(isdate.getMonth() + 1).padStart(2, '0');
            const day = String(isdate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const formattedTime = moment(time).format('hh:mm A');
            // console.log('formattedTime --', formattedTime)

            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);

            const data = {
                service_id: routedata.id,
                user_id: userDataArray.id,
                name: name,
                mobile_number: phoneno,
                email: emailid,
                address: address,
                message: msg,
                service_date: formattedDate,
                service_time: formattedTime,
            }
            console.log('data', data)

            if (global.plan === 0) {

                setLoading(true);
                const response = await loginPost(global.URL + 'bookservice', data);
                // console.log('bookservice --> response ', response);
                setLoading(false);
                if (response.success == true) {
                    Topendingads();
                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                        openmodalrating()
                    }, 2000);
                }
                else {
                    console.log('Not bookservice');
                }
            }
            else {
                // Alert.alert('Please subscribe to a plan before booking any service')
                // console.log(' global.plan-->', global.plan)
                Alert.alert(
                    'Subscription Required',
                    'Please subscribe to a plan before booking any service',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Subscription');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    }

    const openmodalrating = () => {
        setModalVisible2(true);
    }

    const closemodalrating = async () => {
        if (rating == '') {
            setmsg8('*Please Fill Rating Star');
        } else {
            setmsg8('')
            setModalVisible2(false);

            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);

            const data = {
                user_id: userDataArray.id,
                service_id: routedata.id,
                review: rating,
            }
            setLoading(true);
            const response = await loginPost(global.URL + 'addreview', data);
            // console.log('addreview --> response ', response);
            setLoading(false);
            if (response.success == true) {
                navigation.navigate('ListofService');
            }
        }

    }
    const closemodalTaprating = () => {
        setModalVisible2(false);
    }

    // const opendate = () => {
    //     console.log('ewe')
    //     setopen(true)
    // }

    // pendingads
    const Topendingads = async () => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);

        const data = {
            user_id: userDataArray.id,
            type: 1
        }

        const response = await loginPost(global.URL + 'pendingads', data);
        // console.log('pendingads --> response U', response);
        setLoading(false);
        // if (response.success == true) {
        //     console.log('pendingads true U')
        // } else {
        //     console.log('pendingads false U')
        // }
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
                    <Text style={globalstyles.headertxt}>Service Booking</Text>
                </View>

                <View style={globalstyles.view1}>
                    <Image resizeMode='stretch' source={{ uri: global.IMG + routedata.images.split(',')[0] }} style={globalstyles.simg} />
                    {/*service name view */}
                    <View style={globalstyles.view2}>
                        <View style={globalstyles.view3}>
                            <View style={globalstyles.view4}>
                                <Text style={globalstyles.txt1}>{routedata.vendorname}</Text>
                                <Text style={globalstyles.txt2}>{routedata.servicename}</Text>
                            </View>
                            {/* <Image resizeMode='stretch' source={require('../../images/paint.png')} style={globalstyles.s2img} /> */}
                        </View>

                        <Text style={globalstyles.line}></Text>

                        <View style={globalstyles.view5}>

                            <View style={globalstyles.view6}>
                                <Text style={globalstyles.txt3}>Payment :</Text>
                                <Text style={globalstyles.txt4}>{routedata.amount}</Text>
                            </View>

                            <View style={globalstyles.view6}>
                                <Text style={globalstyles.txt3}>Duration :</Text>
                                <Text style={globalstyles.txt4}>{routedata.workingduration} Hrs</Text>
                            </View>
                            <View style={globalstyles.view7}>
                                <Text style={globalstyles.txt3}>Rating : </Text>
                                <View style={globalstyles.ratingview}>
                                    <Image source={require('../../images/rating.png')} style={globalstyles.ratingimg} />
                                    <Text style={globalstyles.ratingtxt}>{routedata.average_review ? routedata.average_review : 0}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* input view */}
                <View style={{ width: '92%', alignSelf: 'center', marginTop: 14, }}>

                    <Text style={globalstyles.inputitletxt}>Name</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Name'
                        placeholderTextColor='#878787'
                        value={name}
                        color='#000000'
                        onChangeText={(text) => setname(text)}
                    />
                    {msg1 ? <Text style={globalstyles.msgm}>{msg1}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>Mobile Number</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Mobile Number'
                        placeholderTextColor='#878787'
                        keyboardType='numeric'
                        value={phoneno}
                        maxLength={10}
                        color='#000000'
                        onChangeText={(text) => setphoneno(text)}
                    />
                    {msg2 ? <Text style={globalstyles.msgm}>{msg2}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>E-mail Id</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your E-Mail Id '
                        placeholderTextColor='#878787'
                        value={emailid}
                        color='#000000'
                        onChangeText={(text) => setemailid(text)}
                    />
                    {msg3 ? <Text style={globalstyles.msgm}>{msg3}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>Address</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Address'
                        placeholderTextColor='#878787'
                        value={address}
                        color='#000000'
                        onChangeText={(text) => setaddress(text)}
                    />
                    {msg4 ? <Text style={globalstyles.msgm}>{msg4}</Text> : null}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={styles.datemainview}>
                            <Text style={globalstyles.inputitletxt}>Date</Text>
                            <TouchableOpacity style={styles.dateview} onPress={() => setopen(true)}>
                                {date ? (
                                    <Text style={styles.datetxt}>{date.toDateString()}</Text>
                                ) : (
                                    <Text style={styles.dateplaceholder}>Choose Your Date</Text>
                                )}
                                <DatePicker
                                    modal
                                    mode={'date'}
                                    open={open}
                                    date={date || new Date()}
                                    onConfirm={(date) => {
                                        setopen(false)
                                        setdate(date)
                                    }}
                                    onCancel={() => {
                                        setopen(false)
                                    }}
                                />
                                <Image source={require('../../images/date.png')} style={styles.dateimg} />
                            </TouchableOpacity>
                            {msg5 ? <Text style={globalstyles.msgm}>{msg5}</Text> : null}

                        </View>

                        <View style={styles.datemainview}>
                            <Text style={globalstyles.inputitletxt}>Time</Text>
                            <TouchableOpacity style={styles.dateview} onPress={() => setopen2(true)}>
                                {time ? (
                                    <Text style={styles.datetxt}>{moment(time).format('hh:mm A')}</Text>
                                ) : (
                                    <Text style={styles.dateplaceholder}>Choose Your Time</Text>
                                )}
                                <DatePicker
                                    modal
                                    mode='time'
                                    open={open2}
                                    date={time || new Date()}
                                    onConfirm={(time) => {
                                        setopen2(false)
                                        settime(time)
                                    }}
                                    onCancel={() => {
                                        setopen2(false)
                                    }}
                                />
                                <Image source={require('../../images/time.png')} style={styles.dateimg} />
                            </TouchableOpacity>

                            {msg6 ? <Text style={globalstyles.msgm}>{msg6}</Text> : null}
                        </View>
                    </View>

                    <Text style={globalstyles.inputitletxt}>Message</Text>
                    <TextInput
                        style={globalstyles.inputmsgtxt}
                        placeholder='Enter Enquiry Message'
                        placeholderTextColor='#878787'
                        value={msg}
                        color='#000000'
                        onChangeText={(text) => setmsg(text)}
                    />
                    {msg7 ? <Text style={globalstyles.msgm}>{msg7}</Text> : null}
                </View>


                <View style={{ marginTop: 50, marginBottom: 40 }}>
                    <TouchableOpacity style={globalstyles.button} onPress={openmodal}>
                        <Text style={globalstyles.buttontxt}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Successful screen - modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, flex: 1 }} >
                {/* <View style={styles.mview1}> */}
                <Image source={require('../../images/Success.png')} style={styles.modalimg} />

                {/* <Image resizeMode='stretch' source={require('../../images/sss2.png')} style={styles.modalimg2} /> */}
                {/* <Text style={styles.mtxt}>Successful Your Booking</Text> */}
                {/* </View> */}
            </Modal>

            {/* Rating - modal */}
            <Modal isVisible={isModalVisible2} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, flex: 1 }} onBackButtonPress={closemodalTaprating} onBackdropPress={closemodalTaprating} >
                <View style={styles.mview2}>

                    <Text style={styles.mtxt2}>Share Your Feedback</Text>
                    <StarRating
                        style={{ marginTop: 14, marginBottom: 20, alignSelf: 'center' }}
                        starSize={40}
                        color='#F55B03'
                        emptyColor='#000000'
                        rating={rating}
                        onChange={setrating}
                        enableHalfStar={false}
                    />
                    {msg8 ? <Text style={styles.msg}>{msg8}</Text> : null}
                    <TouchableOpacity style={styles.mbutton} onPress={closemodalrating}>
                        <Text style={styles.mbuttontxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
