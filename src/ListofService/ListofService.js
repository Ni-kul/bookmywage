// List of Service
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, Dimensions, FlatList, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, } from 'react-native';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListofService({ route, navigation }) {

    const [loading, setLoading] = useState(false);
    const [serachtxt, setserachtxt] = useState('')
    const [selectedsubcat, setselectedsubcat] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSubcats, setSelectedSubcats] = useState([]);
    const [filterModalVisible, setfilterModalVisible] = useState(false);
    // const [category, setcategory] = useState('');
    const [subcategories, setsubcategories] = useState([]);
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

    const [modalcategories, setmodalcategories] = useState([]);
    const [modalcategory, setmodalcategory] = useState('');

    const [modalsubcategories, setmodalsubcategories] = useState([]);
    const [modalsubcategory, setmodalsubcategory] = useState('');

    const [userid, setuserid] = useState('');
    const [servicelistdata, setservicelistdata] = useState([]);
    // servicelist

    const data = [
        { label: 'Free', value: '0' },
        { label: 'Paid', value: '1' },
    ];

    const subcatata = [
        { img: require('../../images/subcat.png'), name: 'All' },
        { img: require('../../images/Chimney.png'), name: 'Chimney Repair' },
        { img: require('../../images/ac.png'), name: 'Ac Repair' },
        { img: require('../../images/free.png'), name: 'Television Repair' },
        { img: require('../../images/ser.png'), name: 'Chimney Repair' },
        { img: require('../../images/al.png'), name: 'Ac Repair' },
        { img: require('../../images/free.png'), name: 'Television Repair' },
        { img: require('../../images/pay.png'), name: 'Ac Repair' },
        { img: require('../../images/free2.png'), name: 'Television Repair' },
    ];

    const subcatata2 = [
        { img: require('../../images/Paintingservice.png'), name: 'Raja Painting company' },
        { img: require('../../images/order.png'), name: 'Arun cleaning company' },
        { img: require('../../images/c1.png'), name: 'Television company' },
    ];

    const routedata = route.params;
    // console.log('routedata', routedata);

    useEffect(() => {

        const setuserdata = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);
            setLoading(false);
            if (userDataArray != null) {
                setuserid(userDataArray.id)
                ToALLgetservicelist(userDataArray.id, selectedsubcat)
                // Togetservicelist(userDataArray.id)

                if (routedata == 'free' || routedata == 'paid') {
                    // console.log('free - paid --:', routedata);
                    Toshowsubcatfreeorpaid();
                    Togetservicelisttype(userDataArray.id)
                }
            }
        }
        navigation.addListener('focus', async () => {
            setuserdata();
            Togetcategory();
            if (typeof routedata === 'number') {
                Toshowsubcat();
                // console.log('Single ID:', routedata);
            } else if (routedata.data) {
                setservicelistdata(routedata.data)
                // console.log('routedata object:', routedata.data);
            }

        });
    }, [routedata]);

    const Toselectedsubcat = async (subcatid, index) => {
        setservicelistdata([]);
        // console.log('subcatid', subcatid)
        Togetservicelist(subcatid)
        setselectedsubcat(subcatid);
    }

    // sub-cat modal 
    const openmodal = () => {
        setselectedsubcat()
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
    }
    const closemodalTap = () => {
        setModalVisible(false);
    }

    const ToDetailsofService = async (data) => {
        navigation.navigate('DetailsofService', data);
    }

    const toggleSubcatSelection = (id) => {
        // console.log('id', id)
        setSelectedSubcats((prevSelectedSubcats) => {
            if (prevSelectedSubcats.includes(id)) {
                return prevSelectedSubcats.filter((i) => i !== id);
            } else {
                return [...prevSelectedSubcats, id];
            }
        });
    };

    const ToALLgetservicelist = async (userid, subcatid) => {
        setservicelistdata([])
        // console.log('userid, subcatid ->', userid, subcatid)
        setselectedsubcat(subcatid);

        const data = {
            user_id: userid,
            category: routedata,
            subcategory: subcatid,
            service_type: ''
        }
        // console.log('data -->', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get ALL- service --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setservicelistdata(response.data);

        } else {
            console.log('ALL service listdata false')
        }
    }

    const Togetservicelist = async (subcatid) => {
        const data = {
            user_id: userid,
            category: routedata,
            subcategory: subcatid,
            service_type: ''
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get - service --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setservicelistdata(response.data);

        } else {
            console.log('service listdata false')
        }
    }

    // type free-paid then show 
    const Togetservicelisttwo = async (catid, subcatid) => {
        setservicelistdata([]);
        setselectedsubcat(subcatid);

        const data = {
            user_id: userid,
            category: catid,
            subcategory: subcatid,
            service_type: ''
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get - service type sub-cat --> response ', response);
        setLoading(false);
        if (response.success == true) {
            if (routedata == 'paid') {
                const paidserviceData = response.data.filter(item => item.service_type === 1);
                setservicelistdata(paidserviceData);
                // console.log('get type --- paidserviceData ', paidserviceData);
            } else {
                const freeserviceData = response.data.filter(item => item.service_type === 0);
                setservicelistdata(freeserviceData);
                // console.log('get type --- freeserviceData ', freeserviceData);
            }

        } else {
            console.log('service listdata false')
        }
    }


    const Togetservicelisttype = async (uid) => {
        setservicelistdata([])
        setselectedsubcat(null);

        const data = {
            user_id: uid,
            category: 0,
            subcategory: '',
            service_type: ''
        }
        // console.log('data-', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get type --- service --> response ', response);
        setLoading(false);
        if (response.success == true) {
            if (routedata == 'paid') {
                const paidserviceData = response.data.filter(item => item.service_type === 1);
                setservicelistdata(paidserviceData);
                // console.log('get type --- paidserviceData ', paidserviceData);
            } else {
                const freeserviceData = response.data.filter(item => item.service_type === 0);
                setservicelistdata(freeserviceData);
                // console.log('get type --- freeserviceData ', freeserviceData);
            }

        } else {
            console.log('service listdata false')
        }
    }
    // selectedSubcats.join(',')
    const Togetservicelistmodal = async () => {
        setservicelistdata([]);
        const data = {
            user_id: userid,
            category: routedata,
            subcategory: selectedSubcats.join(','),
            service_type: ''
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get - service list two --> response ', response);
        setLoading(false);
        if (response.success == true) {
            closemodal();
            setservicelistdata(response.data);
        } else {
            closemodal();
            console.log('service listdata false')
        }
    }
    // modalfreepaid
    const Togetservicelistmodalfreepaid = async () => {
        setservicelistdata([]);
        const data = {
            user_id: userid,
            category: routedata,
            subcategory: selectedSubcats.join(','),
            service_type: ''
        }
        // console.log('data', data)
        setLoading(true);
        const response = await loginPost(global.URL + 'filterservice', data);
        // console.log('get - service list two --> response ', response);
        setLoading(false);
        if (response.success == true) {
            closemodal();
            if (routedata == 'paid') {
                const paidserviceData = response.data.filter(item => item.service_type === 1);
                setservicelistdata(paidserviceData);
                // console.log('get type --- paidserviceData ', paidserviceData);
            } else {
                const freeserviceData = response.data.filter(item => item.service_type === 0);
                setservicelistdata(freeserviceData);
                // console.log('get type --- freeserviceData ', freeserviceData);
            }
        } else {
            closemodal();
            console.log('service listdata false')
        }
    }

    const filteropenmodal = () => {
        setfilterModalVisible(true);
    }

    const filterclosemodalTap = () => {
        setfilterModalVisible(false);
    }

    // get - subcategorylist
    const Toshowsubcat = async () => {

        const data = {
            category: routedata
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getsubcategory', data);
        setLoading(false);
        // console.log('getsubcategory --> response', response);
        if (response.success == true) {
            setsubcategories(response.data)
        } else {
            // alert('Data sub - Category Not Found')
        }
    }

    // get - subcategorylist free or paid
    const Toshowsubcatfreeorpaid = async () => {

        const data = {
            category: ''
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getsubcategory', data);
        setLoading(false);
        // console.log('getsubcategory free- paid sub --> response', response);
        if (response.success == true) {
            setsubcategories(response.data)
        } else {
            // alert('Data sub - Category Not Found')
        }
    }


    // getcategory
    const Togetcategory = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getcategory');
        // console.log('getcategory --> response', response)
        setLoading(false);
        if (response.success == true) {
            setmodalcategories(response.data)
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

    const onCategoryChange = async (catid, catlable) => {
        // console.log('catid , catlable', catid, catlable);
        setmodalcategory(catid)
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
        setmodalsubcategory(subcategoryId);
    };


    const filterclosemodal = async () => {
        setservicelistdata([])
        if (modalcategory == '') {
            setmsg1('*Select Category')
        } else {
            setmsg1('')
        }
        if (modalsubcategory == '') {
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
        if (modalcategory != '' && modalsubcategory != '' && freepaid != '') {
            // && fstate != '' && fcity != '' && fpincode != ''
            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            const userDataArray = JSON.parse(userData);

            const data = {
                user_id: userDataArray.id,
                category: modalcategory,
                subcategory: modalsubcategory,
                service_type: freepaid// (0 for free 1 for paid)
            }
            // console.log('data', data)
            const response = await loginPost(global.URL + 'filterservice', data);
            // console.log('filterservice --> response ', response);
            setLoading(false);
            if (response.success == true) {
                setfilterModalVisible(false);
                setservicelistdata(response.data);
            } else {
                setfilterModalVisible(false);
                console.log('filterservice false')
            }
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
                    <Text style={globalstyles.headertxt}>List of Service</Text>
                </View>

                {/* serachbar & filter */}
                <View style={styles.secview}>

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

                {subcategories.length > 0 &&
                    <View style={styles.titletxtview}>
                        <Text style={globalstyles.titletxt2}>Sub - categories</Text>
                        <TouchableOpacity onPress={openmodal}><Text style={styles.titletxt2}>View more</Text></TouchableOpacity>
                    </View>
                }

                {/* sub-category list view */}
                <View style={styles.subcatview}>
                    {routedata == 'free' || routedata == 'paid' ?

                        <TouchableOpacity style={styles.eachsubcat} onPress={() => Togetservicelisttype(userid, null)}>
                            <View style={[styles.subcatimgview, { backgroundColor: selectedsubcat == null ? '#C9DEFF' : '#F5F5F5' },]}>
                                <Image source={require('../../images/subcat.png')} style={styles.subcatimg} />
                            </View>
                            <Text style={[styles.subcattxt, selectedsubcat == null ? styles.subcattxt2 : styles.subcattxt]}>ALL</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.eachsubcat} onPress={() => ToALLgetservicelist(userid, null)}>
                            <View style={[styles.subcatimgview, { backgroundColor: selectedsubcat == null ? '#C9DEFF' : '#F5F5F5' },]}>
                                <Image source={require('../../images/subcat.png')} style={styles.subcatimg} />
                            </View>
                            <Text style={[styles.subcattxt, selectedsubcat == null ? styles.subcattxt2 : styles.subcattxt]}>ALL</Text>
                        </TouchableOpacity>
                    }

                    {routedata == 'free' || routedata == 'paid' ?

                        subcategories.slice(0, 3).map((catitem, index) =>
                            <TouchableOpacity key={index} style={styles.eachsubcat} onPress={() => Togetservicelisttwo(catitem.category, catitem.id,)} >
                                <View style={[styles.subcatimgview, { backgroundColor: selectedsubcat == catitem.id ? '#C9DEFF' : '#F5F5F5' },]}>
                                    <Image resizeMode='contain' source={{ uri: global.IMG + catitem.icon }} style={styles.subcatimg} />
                                </View>
                                <Text style={[styles.subcattxt, selectedsubcat == catitem.id ? styles.subcattxt2 : styles.subcattxt]}>{catitem.name}</Text>

                            </TouchableOpacity>
                        )

                        :

                        subcategories.slice(0, 3).map((catitem, index) =>
                            <TouchableOpacity key={index} style={styles.eachsubcat} onPress={() => Toselectedsubcat(catitem.id, index)} >
                                <View style={[styles.subcatimgview, { backgroundColor: selectedsubcat == catitem.id ? '#C9DEFF' : '#F5F5F5' },]}>
                                    <Image resizeMode='contain' source={{ uri: global.IMG + catitem.icon }} style={styles.subcatimg} />
                                </View>
                                <Text style={[styles.subcattxt, selectedsubcat == catitem.id ? styles.subcattxt2 : styles.subcattxt]}>{catitem.name}</Text>

                            </TouchableOpacity>
                        )

                    }

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
                                    {/* vendorname == company name  , vendor_name == owner vendor name*/}
                                    <View style={styles.itemnameview}>
                                        <Text style={styles.itemnametxt}>{data.vendorname}</Text>
                                        <View style={styles.ratingview}>
                                            <Image source={require('../../images/rating.png')} style={styles.ratingimg} />
                                            <Text style={styles.ratingtxt}>{data.average_review ? data.average_review : 0}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.txt1}>{data.servicename}</Text>
                                    <View style={styles.view3}>
                                        <View style={styles.view4}>
                                            {data.profile_pic ?
                                                <Image source={{ uri: global.IMG + data.profile_pic }} style={styles.o2img2} />
                                                :
                                                <Image source={require('../../images/v1Copy.png')} style={styles.o2img2} />
                                            }
                                            <View style={styles.view5}>
                                                <Text style={styles.txt2}>{data.vendor_name}</Text>
                                                <Text style={styles.txt3}>{data.category_name}</Text>
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


            {/* sub-cat modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, justifyContent: 'flex-end' }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                <View style={globalstyles.mfview1}>
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.modalheader}>
                            <TouchableOpacity onPress={closemodalTap}>
                                <Image source={require('../../images/lb.png')} style={styles.Backarrowimg} />
                            </TouchableOpacity>
                            <Text style={globalstyles.headertxt}>Sub-categories</Text>

                            <TouchableOpacity onPress={() => Togetservicelistmodal()}>
                                <Image source={require('../../images/vr.png')} style={styles.rimg} />
                            </TouchableOpacity>
                        </View>

                        {/* <ScrollView> catitem.id*/}
                        <View style={styles.subcatview2}>
                            {subcategories.map((catitem, index) =>
                                <TouchableOpacity key={index} style={styles.eachsubcat2} onPress={() => toggleSubcatSelection(catitem.id)} >
                                    <View style={[styles.subcatimgview, { backgroundColor: selectedSubcats.includes(catitem.id) ? '#C9DEFF' : '#F5F5F5' },]}>
                                        <Image resizeMode='contain' source={{ uri: global.IMG + catitem.icon }} style={styles.subcatimg} />
                                    </View>
                                    <Text style={[styles.subcattxt, selectedSubcats.includes(catitem.id) ? styles.subcattxt2 : styles.subcattxt]}>{catitem.name}</Text>
                                    {/* style={[styles.subcattxt, selectedSubcats.includes(index) ? styles.subcattxt2 : styles.subcattxt]} */}
                                </TouchableOpacity>
                            )}
                        </View>


                        {/* </ScrollView> */}
                    </View>
                </View>
            </Modal>

            {/* filter modal */}
            <Modal isVisible={filterModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, justifyContent: 'flex-end' }}
                onBackButtonPress={filterclosemodalTap} onBackdropPress={filterclosemodalTap}>
                {/* <ScrollView> */}
                <View style={globalstyles.mfview1}>

                    <View style={globalstyles.mfview2}>
                        <Text style={globalstyles.ftxt1}>Filter</Text>
                        <Image source={require('../../images/filter.png')} style={styles.filterimg} />
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
                        value={modalcategory}
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
                        value={modalsubcategory}
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

        </View>
    )
}

