// HomeScreen
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
import Modal from "react-native-modal";
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {

    const swiperRef = useRef(null);
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [serachtxt, setserachtxt] = useState('')

    const [selectedcat, setselectedcat] = useState(0)

    const [selectservicebtn, setselectservicebtn] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setfilterModalVisible] = useState(false);
    const [categories, setcategories] = useState([]);

    const [modalcategories, setmodalcategories] = useState([]);
    const [category, setcategory] = useState('');

    const [modalsubcategories, setmodalsubcategories] = useState([]);
    const [subcategory, setsubcategory] = useState('');

    const [freepaid, setfreepaid] = useState('');

    const [fstate, setfstate] = useState('');
    const [fcity, setfcity] = useState('');
    const [fpincode, setfpincode] = useState('');
    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [msg6, setmsg6] = useState('');
    const { height, width } = Dimensions.get('window');

    const [ModalVisiblemodify, setModalVisiblemodify] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('isoWeek'));
    const [selectedtime, setselectedtime] = useState('')
    const [selectedindex, setselectedindex] = useState(0)
    const [username, setusername] = useState('');
    const [userimg, setuserimg] = useState('');
    const [getsliderdata, setgetsliderdata] = useState([]);
    const [mybookingData, setmybookingData] = useState([]);
    const [trendingservicedata, settrendingservicedata] = useState([]);
    const [popularservicedata, setpopularservicedata] = useState([]);

    const [mid, setmid] = useState('');
    const [bookuserid, setbookuserid] = useState('');

    const [expiredplandata, setexpiredplandata] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [notificationdata, setnotificationdata] = useState([]);
    const [newNotifications, setNewNotifications] = useState([]);
    const [previousNotifications, setPreviousNotifications] = useState([]);
    const [newNotificationCount, setNewNotificationCount] = useState('');

    const currentDate = moment().format('YYYY-MM-DD');


    const servicebtn = [
        { id: '1', name: 'All' },
        { id: '2', name: 'Painting' },
        { id: '3', name: 'Plumbing' },
        { id: '4', name: 'Cleaning' },
    ]

    const populardata = [
        { id: '1', name: 'Cleaning service' },
        { id: '2', name: 'Painting service' },
        { id: '3', name: 'Plumbing service' },
        { id: '4', name: 'Cleaning service' },
    ]

    const notfidata = [
        { id: '1', name: '50% offers on Plumbing service till feb 30' },
        { id: '2', name: '50% offers on home painting till April 30' },
        { id: '3', name: 'We included the new types of service so you can explore now' },
    ]

    const getslides = [
        { id: '1' }, { id: '2' }
    ]

    const data = [
        { label: 'Free', value: '0' },
        { label: 'Paid', value: '1' },
    ];

    useEffect(() => {
        // console.log('home')
        const handleBackButton = () => {
            if (isFocused) { // Check if the Home screen is focused
                BackHandler.exitApp();
                return true;
            }
            return false; // Allow default behavior for other screens
        };

        const setuserdata = async () => {
            // setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            // console.log('userDataArray', userDataArray)
            setLoading(false);
            if (userDataArray != null) {
                mygetlastexpiredplan(userDataArray.id)
                Totrendingservice(userDataArray.id)
                // setuserid(userDataArray.id)
                Togetnotification(userDataArray.id)
                setusername(userDataArray.name)
                setuserimg(userDataArray.profile_pic)
                Topopularservice()
            }
        }

        // navigation.addListener('focus', async () => {
        //     // console.log('global.Type - U', global.Type);
        //     setuserdata();
        //     Togetslider();
        //     Togetcategory();
        //     mybookinglist()
        // });

        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            setuserdata();
            Togetslider();
            Togetcategory();
            mybookinglist();
        }

        const focusListener = navigation.addListener('focus', () => {
            if (isFocused) {
                setuserdata();
                Togetslider();
                Togetcategory();
                mybookinglist();
            }
        });

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            focusListener(); // Clean up the event listener
        };
    }, [isFocused, navigation]);

    // getcategory
    const Togetcategory = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getcategory');
        // console.log('getcategory --> response', response)
        setLoading(false);
        if (response.success == true) {
            setcategories(response.data)
            var count = Object.keys(response.data).length;
            // console.log('count', count);
            var dropDownData = []

            for (var i = 0; i < count; i++) {
                dropDownData.push({ label: response.data[i].name, value: response.data[i].id });
            }
            setmodalcategories(dropDownData)
            // alert('Succesfully getcategory')
        } else {
            // alert('Not getcategory')
        }
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
            console.log('Not getslider')
        }
    }

    //     
    // user_id
    const Totrendingservice = async (userid) => {

        const data = {
            user_id: userid,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'trendingservice', data);
        // console.log('trendingservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            settrendingservicedata(response.data);
        } else {
            console.log('trendingservice false');
        }
    }

    const Toselectservicebtn = async (catid) => {
        // console.log('catid', catid)
        setselectservicebtn(catid);
        Topopularservice(catid)
    }

    const Topopularservice = async (catid) => {
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        const data = {
            user_id: userDataArray.id,
            category: catid
        }
        // console.log('data',data)
        const response = await loginPost(global.URL + 'popularservice', data);
        // console.log('popularservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setpopularservicedata(response.data);
        } else {
            console.log('popularservice false');
        }
    }

    const mygetlastexpiredplan = async (userid) => {

        const data = {
            user_id: userid,
            type: 1
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getlastexpiredplan', data);
        // console.log('getlastexpiredplan --> response ', response);
        setLoading(false);
        if (response.success == true) {

            const plan = response.data;

            // if (moment(plan.end_date).isBefore(currentDate) && plan.type === 1) {
            if (plan && moment(plan.end_date).isBefore(currentDate) && plan.type === 1) {
                setexpiredplandata([plan]); // Wrap in an array
                // console.log('Plan added');
            } else if (plan == null) {
                global.plan = 1
                // console.log(' global.plan null', global.plan)
            }
            else {
                global.plan = 0
                // console.log(' global.plan-->==', global.plan)
                // console.log('Plan does not meet criteria');
            }
        } else {
            console.log('getlastexpiredplan false');
        }
    }

    const onCategoryChange = async (catid, catlable) => {
        // console.log('catid , catlable', catid, catlable);
        setcategory(catid)
        const data = {
            category: catid
        }

        setLoading(true);
        const response = await loginPost(global.URL + 'getsubcategory', data);
        setLoading(false);
        // console.log('getsubcategory --> response', response)
        if (response) {
            var count = Object.keys(response.data).length;
            var dropDownData = []

            for (var i = 0; i < count; i++) {
                dropDownData.push({ label: response.data[i].name, value: response.data[i].id });
            }
            // console.log(' sub dropDownData>>', dropDownData);
            setmodalsubcategories(dropDownData);
        } else {
            // alert('Data sub - Category Not Found')
        }
    }

    const onSubcategoryChange = (subcategoryId, subcatlable) => {
        // console.log('Selected sub-category  -- subcatlable :', subcategoryId, subcatlable);
        setsubcategory(subcategoryId);
    };


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
            // setmybookingData(response.data)
            setmybookingData(response.data.filter(item => item.status !== 1));
        } else {
            console.log('mybooking false')
        }
    }

    // cancelbooking
    const mycancelbooking = async (mdid) => {
        // console.log('mdid', mdid)
        const data = {
            id: mdid,
            type: 1
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'cancelbooking', data);
        // console.log('cancelbooking --> response ', response);
        setLoading(false);
        if (response.success == true) {
            mybookinglist();
            setmid('');
        } else {
            console.log('cancelbooking false')
        }
    }

    const handleNext = () => {
        // console.log("Before Next Scroll - Current Index:", currentIndex);
        swiperRef.current.scrollBy(1, true);
    };

    const handlePrev = () => {
        // console.log("Before Prev Scroll - Current Index:", currentIndex);
        swiperRef.current.scrollBy(-1, true);
    };
    // const onIndexChanged = (index) => {
    //     Alert.alert('onn')
    //     // setCurrentIndex(index);
    //     // console.log("Current Index Updated:", index);
    // };


    const Toselectedcat = async (index, catid) => {
        // console.log('catid-->', catid)
        setselectedcat(index);
        setTimeout(() => {
            navigation.navigate('ListofService', catid);
        }, 500);
    }



    const Togetnotification = async (userid) => {

        const data = {
            user_id: userid,
            type: 1
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getnotification', data);
        // console.log('getnotification --> response ', response);
        setLoading(false);
        if (response.success == true) {

            setnotificationdata(response.data)
            const seenNotifications = await AsyncStorage.getItem('SeenNotifications');
            const seenNotificationsArray = seenNotifications ? JSON.parse(seenNotifications) : [];

            const newNotifs = response.data.filter(notification => !seenNotificationsArray.includes(notification.id));
            const prevNotifs = response.data.filter(notification => seenNotificationsArray.includes(notification.id));

            setNewNotifications(newNotifs);
            setPreviousNotifications(prevNotifs);

            const newNotiCount = newNotifs.length;
            // console.log('newNotiCount', newNotiCount);
            setNewNotificationCount(newNotiCount);

            // Store newly seen notifications
            // const updatedSeenNotifications = [...seenNotificationsArray, ...newNotifs.map(notification => notification.id)];
            // await AsyncStorage.setItem('SeenNotifications', JSON.stringify(updatedSeenNotifications));
        } else {
            console.log('Not notifications else')
        }
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

    const filteropenmodal = () => {
        setfilterModalVisible(true);
    }
    const filterclosemodal = async () => {

        if (category == '') {
            setmsg1('*Select Category')
        } else {
            setmsg1('')
        }
        if (subcategory == '') {
            setmsg2('*Select Sub Category')
        } else {
            setmsg2('')
        }
        if (freepaid == '') {
            setmsg3('*Select Free OR Paid')
        } else {
            setmsg3('')
        }
        // if (fstate == '') {
        //     setmsg4('*Please Enter State')
        // } else {
        //     setmsg4('')
        // }
        // if (fcity == '') {
        //     setmsg5('*Please Enter City')
        // } else {
        //     setmsg5('')
        // }
        // if (fpincode == '') {
        //     setmsg6('*Please Enter Pincode')
        // } else {
        //     setmsg6('')
        // }
        // console.log('free or paid --->', freepaid)

        // if (category != '' && subcategory != '' && freepaid != '' && fstate != '' && fcity != '' && fpincode != '') {

        // filterservice
        setLoading(true);
        const userData = await AsyncStorage.getItem('Userdata');
        const userDataArray = JSON.parse(userData);
        setLoading(false);
        const data = {
            user_id: userDataArray.id,
            category: category,
            subcategory: subcategory,
            service_type: freepaid// (0 for free 1 for paid)
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('filterservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setfilterModalVisible(false);
            navigation.navigate('ListofService', response);
        } else {
            console.log('filterservice false')
        }

        // }
    }

    const filterclosemodalTap = () => {
        setfilterModalVisible(false);
    }

    const ToLogin = async () => {
        await AsyncStorage.removeItem('Userdata');
        await AsyncStorage.removeItem('Vendordata');
        await AsyncStorage.removeItem('SeenNotifications');
        await AsyncStorage.removeItem('SeenNotificationsV');
        setModalVisible(false);
        navigation.navigate('Login');
    }
    // Notification Profile
    const ToNotification = async () => {
        setModalVisible(false);
        navigation.navigate('Notification');
    }

    const ToProfile = async () => {
        setModalVisible(false);
        navigation.navigate('Profile');
    }

    const ToListofService = async (type) => {
        setModalVisible(false);
        navigation.navigate('ListofService', type);
    }

    const ToPopulardata = async () => {

        navigation.navigate('Populardata');
    }

    const ToListOfBookings = async () => {
        setModalVisible(false);
        navigation.navigate('ListOfBookings');
    }

    const ToSubscription = async () => {
        setModalVisible(false);
        navigation.navigate('Subscription');
    }

    const ToCategories = async () => {
        navigation.navigate('Categories');
    }

    const Topaymentdetails = async (index) => {
        navigation.navigate('ListOfBookings', index);
    }

    const ToDetailsofService = async (data) => {
        navigation.navigate('DetailsofService', data);
    }

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

    const mybookingmodify = async () => {

        const data = {
            id: mid,
            service_date: selectedDate,
            service_time: selectedtime
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'bookingmodify', data);
        // console.log('bookingmodify --> response ', response);
        setLoading(false);
        if (response.success == true) {
            closemodalmodify()
            mybookinglist();
        } else {
            console.log('bookingmodify false')
        }
    }

    const openmodalmodify = (id, userid) => {
        // console.log('id', id, userid)
        setmid(id);
        setbookuserid(userid)
        setModalVisiblemodify(true);
    }
    const closemodalmodify = () => {
        setModalVisiblemodify(false);
    }
    const Toselectedtime = async (index, time) => {
        // console.log('time', time)
        setselectedindex(index)
        setselectedtime(time);
    }
    const closemodalTapmodify = () => {
        setModalVisiblemodify(false);
    }

    // Tochangebookingstatus
    const Tochangebookingstatus = async () => {

        const data = {
            id: mid,
            user_id: bookuserid,
            status: 2,
        }
        console.log('data ss', data)

        setLoading(true);
        const response = await loginPost(global.URL + 'changebookingstatus', data);
        // console.log('changebookingstatus --> response ', response);
        setLoading(false);

        if (response.success == true) {
            mybookinglist();
        } else {
            console.log('changebookingstatus false')
        }
    }

    return (
        <View style={global.shadow = 1 ? globalstyles.flexview : globalstyles.flexview2}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >
                {/* <StatusBar backgroundColor="#ffff" /> */}

                <View style={styles.hadingview}>
                    <TouchableOpacity style={{ width: '10%' }} onPress={openmodal}>
                        <Image source={require('../../images/menu.png')} style={styles.menuimg} />
                    </TouchableOpacity>

                    <View style={{ marginLeft: '6%', width: '63.6%' }}>
                        <Text style={styles.txt1}>Welcome</Text>
                        <View style={styles.nameview}>
                            <Image source={require('../../images/clappinghands.png')} style={styles.clappinghands} />
                            <Text style={styles.txt2}>{username}</Text>
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
                    <Swiper style={styles.sliderview} ref={swiperRef} loop={true}
                        dot={<View style={styles.dotstyle} />}
                        activeDot={<View style={styles.dotstyle} />}
                    // index={currentIndex}
                    // onIndexChanged={(index)=>onIndexChanged(index)}
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

                {/* serachbar & filter */}
                <View style={styles.mainserachview}>

                    <View style={styles.serachview}>
                        <Image source={require('../../images/ser.png')} style={styles.serachimg} />
                        <TextInput
                            style={styles.inputtxt}
                            placeholder='Search your service'
                            placeholderTextColor='#696969'
                            value={serachtxt}
                            color='#000000'
                            onChangeText={(text) => setserachtxt(text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.filterimgview} onPress={filteropenmodal}>
                        <Image source={require('../../images/filter.png')} style={styles.filterimg} />
                    </TouchableOpacity>
                </View>

                {/*free or paid buttons */}
                <View style={styles.mainserachview}>
                    <TouchableOpacity style={styles.freebtn} onPress={() => ToListofService('free')}>
                        <Image source={require('../../images/free.png')} style={styles.freeimg} />
                        <Text style={styles.freetxt}>Free</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.freebtn} onPress={() => ToListofService('paid')}>
                        <Image source={require('../../images/paid.png')} style={styles.paidimg} />
                        <Text style={styles.freetxt}>Paid</Text>
                    </TouchableOpacity>
                </View>

                {/* Categories */}

                <View style={styles.secview}>
                    <Text style={styles.titletxt2}>Categories</Text>
                    {categories.length > 6 &&
                        <TouchableOpacity onPress={ToCategories}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                    }
                </View>

                <View style={styles.categoryview}>

                    {categories.slice(0, 6).map((catitem, index) =>

                        <TouchableOpacity style={[styles.eachcatview, { backgroundColor: selectedcat === index ? '#E3E3E3' : '#FFFFFF' },]} onPress={() => Toselectedcat(index, catitem.id)} key={index}>
                            <View style={[styles.catimgtxt, selectedcat === index && styles.selectedCatimgtxt]}>
                                <Image resizeMode='contain' source={{ uri: global.IMG + catitem.icon }} style={styles.catimg} />
                                <Text style={[styles.cattxt, { color: selectedcat === index ? '#FFFFFF' : '#000000' }]}>{catitem.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Subscription plan */}
                {expiredplandata.length > 0 &&
                    expiredplandata.map((plan, index) => (
                        <View style={styles.Subscription} key={index}>
                            <View style={styles.sub1view}>
                                <Text style={styles.subtxt1}>Subscription plan</Text>
                                <TouchableOpacity onPress={() => Topaymentdetails(2)}><Text style={styles.subtxt2}>View more</Text></TouchableOpacity>
                            </View>

                            <View style={styles.sub2view}>
                                <Image source={require('../../images/sub.png')} style={styles.subimg} />

                                <Text style={styles.subtxt3}>Your <Text style={styles.subtxt33}>{plan.plan_name}</Text> subscription plan was expired on <Text style={styles.subtxt33}>{moment(plan.end_date).format('MMMM DD')}</Text></Text>
                            </View>

                            <View style={styles.sub3view}>
                                <Text style={styles.subtxt4}>Starting Date : <Text style={styles.subtxt44}>{moment(plan.created_date).format('MM/DD/YYYY')}</Text></Text>
                                <Text style={styles.subtxt5}>End Date : <Text style={styles.subtxt44}>{moment(plan.end_date).format('MM/DD/YYYY')}</Text></Text>
                            </View>

                            <TouchableOpacity style={styles.subbtn} onPress={ToSubscription}>
                                <Text style={styles.subbtntxt}>Renewal</Text>
                            </TouchableOpacity>

                        </View>
                    ))}




                {/* Your Booking */}
                {mybookingData.length > 0 &&
                    <View style={styles.secview}>
                        <Text style={styles.titletxt2}>Your Booking</Text>
                        {mybookingData.length > 3 &&
                            <TouchableOpacity onPress={ToListOfBookings}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                        }
                    </View>
                }
                {/* .slice(0, 3) */}
                <View style={styles.bookingview}>
                    {mybookingData.slice(0, 3).map((bookingdata, index) => (

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
                                    {/* <View style={globalstyles.liveview}> .split(',')[0]
                                        <Image resizeMode='stretch' source={require('../../images/livedot.png')} style={globalstyles.livedotimg} />
                                        <Text style={globalstyles.livetxt}>Live</Text>
                                    </View> */}
                                    <View style={globalstyles.order3view}>
                                        <Text style={globalstyles.ordertxt3}>{bookingdata.vendorname}</Text>

                                        <View style={globalstyles.order4view}>
                                            <Text style={globalstyles.ordertxt4}>{bookingdata.service_name}</Text>
                                            {/* {bookingdata.status === 2 &&
                                                <Text style={globalstyles.ordertxt5}>Scheduled</Text>} */}
                                            {bookingdata.status === 4 &&
                                                <Text style={globalstyles.ordertxt5}>Scheduled</Text>
                                            }
                                            {bookingdata.status === 0 &&
                                                <Text style={globalstyles.ordertxt55}>Pending</Text>
                                            }
                                            {bookingdata.status === 3 &&
                                                <Text style={globalstyles.ordertxt555}>Cancel</Text>
                                            }
                                            {bookingdata.status === 1 &&

                                                <Text style={styles.ordertxtcom}>Completed</Text>
                                            }
                                        </View>

                                        <View style={globalstyles.order5view}>
                                            {bookingdata.profile_pic ?
                                                <Image source={{ uri: global.IMG + bookingdata.profile_pic }} style={globalstyles.o2img} />
                                                :
                                                <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={globalstyles.o2img} />
                                            }
                                            <View style={{ width: '44%' }}>
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
                                {/* {bookingdata.status === 2 || bookingdata.status === 4 &&
                                    <View style={globalstyles.CanaledBookingbtn}>
                                        <TouchableOpacity style={globalstyles.Canaledbtn} onPress={() => mycancelbooking(bookingdata.id)}>
                                            <Text style={globalstyles.Canaledbtntxt}>Canaled Booking</Text>
                                        </TouchableOpacity>
                                    </View>
                                } */}
                                {/* // Modification  & Cancelation Booking */}
                                {bookingdata.status === 0 &&
                                    <View style={globalstyles.orderlastbtns} >
                                        <TouchableOpacity style={globalstyles.Modificationbtn} onPress={() => openmodalmodify(bookingdata.id, bookingdata.user_id)}>
                                            <Text style={globalstyles.Modificationbtntxt}>Modification</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={globalstyles.Modificationbtn2} onPress={() => mycancelbooking(bookingdata.id)}>
                                            <Text style={globalstyles.Modificationbtntxt2}>Cancelation Booking</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    ))}

                </View>

                {/* Trending Service  Trendingdata*/}
                {trendingservicedata.length > 0 &&
                    <View>
                        <View style={styles.secview}>
                            <Text style={styles.titletxt2}>Trending Service</Text>
                            <TouchableOpacity onPress={ToListofService}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                        </View>

                        <View style={styles.trendingview}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {trendingservicedata.map((trending, index) => (

                                    <View key={index} style={{ width: 120, marginRight: 14, justifyContent: 'flex-end' }}>
                                        <Image resizeMode='contain' source={trending.img} style={styles.Trendingimg} />
                                        <View style={styles.Trendingtxtview}>
                                            <Text style={styles.Trendingtxt}>{trending.name}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                }


                {/* Most popular service*/}

                <View style={styles.secview}>
                    <Text style={styles.titletxt2}>Most popular service</Text>
                    {popularservicedata.length > 4 &&
                        <TouchableOpacity onPress={ToPopulardata}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                    }
                </View>

                <View style={styles.scrollmenu}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: '4%' }}>
                        <TouchableOpacity
                            style={[styles.servicebtn, { backgroundColor: selectservicebtn == null ? '#0066FF' : '#FFFFFF' }]}
                            onPress={() => Toselectservicebtn(null)} // Show all services when 0 is selected
                        >
                            <Text style={[styles.servicebtntxt, { color: selectservicebtn == null ? '#FFFFFF' : '#808080' }]}>
                                All
                            </Text>
                        </TouchableOpacity>
                        {categories.map((servicebtn, index) => (
                            <TouchableOpacity key={index} style={[styles.servicebtn, { backgroundColor: selectservicebtn === servicebtn.id ? '#0066FF' : '#FFFFFF' }]} onPress={() => Toselectservicebtn(servicebtn.id)}>
                                <Text style={[styles.servicebtntxt, { color: selectservicebtn === servicebtn.id ? '#FFFFFF' : '#808080' }]}>{servicebtn.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[styles.servicevie, popularservicedata.length > 0 ? styles.serviceview : styles.servicevie]}>
                    {popularservicedata.length > 0 ?
                        popularservicedata.slice(0, 4).map((popular, index) => (

                            <View key={index} style={styles.eachserviceview}>
                                <Image resizeMode='contain' source={{ uri: global.IMG + popular.images.split(',')[0] }} style={styles.Trendserviceimg} />
                                <Text style={styles.servicepricetxt}>Rs.{popular.amount}</Text>

                                <View style={styles.nameratview}>
                                    <Text style={styles.sertxt1}>{popular.servicename}</Text>
                                    <View style={styles.serratview}>
                                        <Image source={require('../../images/rating.png')} style={globalstyles.ratingstar} />
                                        <Text style={globalstyles.ordertxt8}>{popular.average_review ? popular.average_review : 0}</Text>
                                    </View>
                                </View>

                                <View style={styles.serratview2}>
                                    <View style={styles.serratview3}>
                                        <Image source={require('../../images/v1Copy.png')} style={styles.o2img2} />
                                        <View style={styles.serratview4}>
                                            <Text style={styles.sertxt2}>{popular.vendorname}</Text>
                                            {/* <Text style={styles.sertxt3}>Painter</Text> */}
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.serarrow} onPress={() => ToDetailsofService(popular)}>
                                        <Image source={require('../../images/rra.png')} style={styles.rraimg} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        ))
                        :
                        <Text style={styles.txtnot2}>No service found.</Text>
                    }
                </View>

                {notificationdata.length > 0 &&
                    <View>
                        <View style={styles.secview2}>
                            <Text style={styles.titletxt2}>Notification</Text>
                            {notificationdata.length > 3 &&
                                <TouchableOpacity onPress={ToNotification}><Text style={styles.viewmoretxt}>View more</Text></TouchableOpacity>
                            }
                        </View>

                        <View style={styles.notificationview}>
                            {notificationdata.slice(0, 3).map((notdata, index) => (

                                <View key={index} style={styles.eachnotfication}>
                                    <Image resizeMode='contain' source={require('../../images/bell.png')} style={styles.Notificationimg} />
                                    <Text style={styles.notificationtxt}>{notdata.message}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                }
            </ScrollView>

            {/* menu bar modal */}
            <Modal isVisible={isModalVisible} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', margin: 0, justifyContent: 'center', }}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
            >
                {/* <ScrollView> */}
                <ImageBackground source={require('../../images/menuback1.png')} style={{ width: '92%', height: height - 10, justifyContent: 'center', }} >

                    <ImageBackground source={require('../../images/menuback2.png')} style={{ width: width, height: height - 40, marginRight: 5, }} >

                        <TouchableOpacity onPress={closemodalTap} style={styles.gobackmenu}>
                        </TouchableOpacity>

                        <View style={{ marginLeft: '5%', marginTop: 38, }}>

                            <View style={styles.usernameview}>
                                <View >
                                    {userimg ?
                                        <Image source={{ uri: global.IMG + userimg }} style={styles.userimg} />
                                        :
                                        <Image resizeMode='contain' source={require('../../images/v1Copy.png')} style={styles.userimg} />
                                    }
                                    {/* <Image resizeMode='contain' source={{ uri: global.IMG + userimg }} style={styles.userimg} /> */}
                                </View>
                                <Text style={styles.usernametxt}>{username}</Text>
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

                            <TouchableOpacity style={styles.usernameview} onPress={ToListOfBookings}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/bookserviceicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Booksertxt}>Book Services</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToListOfBookings}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/histryicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.Historytxt}>History</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToNotification}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/Notificationicon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.noticontxt}>Notification</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToProfile}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/usericon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.usericontxt}>My account</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usernameview} onPress={ToLogin}>
                                <View style={styles.iconview}>
                                    <Image resizeMode='contain' source={require('../../images/logouticon.png')} style={styles.dbordimg} />
                                </View>
                                <Text style={styles.signouttxt}>Sign out</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </ImageBackground>
                {/* </ScrollView> */}
            </Modal>

            {/* filter modal */}
            <Modal isVisible={filterModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, justifyContent: 'flex-end' }}
                onBackButtonPress={filterclosemodalTap} onBackdropPress={filterclosemodalTap}>
                {/* <ScrollView> */}
                <View style={globalstyles.mfview1}>

                    <View style={globalstyles.mfview2}>
                        <Text style={globalstyles.ftxt1}>Filter</Text>
                        <Image source={require('../../images/filter.png')} style={globalstyles.filterimg} />
                    </View>

                    {/* <Text style={styles.ftxt2}>Filter</Text> */}

                    <Dropdown
                        style={globalstyles.dropdown}
                        placeholderStyle={globalstyles.placeholderStyle}
                        selectedTextStyle={globalstyles.selectedTextStyle}
                        itemTextStyle={globalstyles.selectedTextStyle}
                        placeholder='Select categories'
                        labelField="label"
                        valueField="value"
                        value={category}
                        onChange={item => {
                            onCategoryChange(item.value, item.label);
                        }}
                        data={modalcategories}
                    />
                    {msg1 ? <Text style={globalstyles.msgm}>{msg1}</Text> : null}

                    <Dropdown
                        style={globalstyles.dropdown}
                        placeholderStyle={globalstyles.placeholderStyle}
                        selectedTextStyle={globalstyles.selectedTextStyle}
                        itemTextStyle={globalstyles.selectedTextStyle}
                        placeholder='Select Sub Categories'
                        labelField="label"
                        valueField="value"
                        value={subcategory}
                        onChange={item => {
                            onSubcategoryChange(item.value, item.label);
                        }}
                        data={modalsubcategories}
                    />
                    {msg2 ? <Text style={globalstyles.msgm}>{msg2}</Text> : null}

                    <Dropdown
                        style={globalstyles.dropdown}
                        placeholderStyle={globalstyles.placeholderStyle}
                        selectedTextStyle={globalstyles.selectedTextStyle}
                        itemTextStyle={globalstyles.selectedTextStyle}
                        placeholder='Select Free or Paid service'
                        labelField="label"
                        valueField="value"
                        value={freepaid}
                        onChange={item => {
                            setfreepaid(item.value);
                        }}
                        data={data}
                    />
                    {msg3 ? <Text style={globalstyles.msgm}>{msg3}</Text> : null}

                    <TextInput
                        style={globalstyles.inputstattxt}
                        placeholder='State'
                        placeholderTextColor='#464444'
                        value={fstate}
                        color='#000000'
                        onChangeText={(text) => setfstate(text)}
                    />
                    {msg4 ? <Text style={globalstyles.msgm}>{msg4}</Text> : null}

                    <TextInput
                        style={globalstyles.inputstattxt}
                        placeholder='City'
                        placeholderTextColor='#464444'
                        value={fcity}
                        color='#000000'
                        onChangeText={(text) => setfcity(text)}
                    />
                    {msg5 ? <Text style={globalstyles.msgm}>{msg5}</Text> : null}

                    <TextInput
                        style={globalstyles.inputstattxt}
                        placeholder='Pincode'
                        placeholderTextColor='#464444'
                        value={fpincode}
                        color='#000000'
                        onChangeText={(text) => setfpincode(text)}
                    />
                    {msg6 ? <Text style={globalstyles.msgm}>{msg6}</Text> : null}

                    <View style={{ marginVertical: 50 }}>
                        <TouchableOpacity style={globalstyles.button} onPress={filterclosemodal}>
                            <Text style={globalstyles.buttontxt}>Save</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                {/* </ScrollView> */}
            </Modal>


            {/* modification - modal */}
            <Modal isVisible={ModalVisiblemodify} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, }} onBackButtonPress={closemodalTapmodify} onBackdropPress={closemodalTapmodify}>
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
                                        onPress={() => setSelectedDate(day.format('YYYY-MM-DD'))}
                                        style={[globalstyles.dateContainer, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selectedDateContainer,]}>

                                        <Text style={[globalstyles.dayName, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selecteddateText,]}
                                        >{day.format('ddd')}</Text>
                                        <Text style={[globalstyles.dayName, selectedDate === day.format('YYYY-MM-DD') && globalstyles.selecteddateText,]}>{day.format('DD')}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

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

        </View>

    )
}