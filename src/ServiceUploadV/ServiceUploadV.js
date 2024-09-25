// ServiceUploadV
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert, alert, ActivityIndicator, } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { addpost, getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceUploadV({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [isedit, setisedit] = useState(0)

    // const gettt = route.params;

    const [name, setname] = useState('');
    const [servicename, setservicename] = useState('');
    const [categories, setcategories] = useState([]);
    const [category, setcategory] = useState('');
    const [subcategory, setsubcategory] = useState('');
    const [subcategories, setsubcategories] = useState([]);
    const [workinghours, setworkinghours] = useState('');
    const [isWH, setisWH] = useState('');
    // workingduration servicedescription 
    const [workingduration, setworkingduration] = useState('');
    const [isWD, setisWD] = useState('');
    const [freeorpaid, setfreeorpaid] = useState('');
    const [serviceamount, setserviceamount] = useState('');
    const [servicedetails, setservicedetails] = useState('');
    const [location, setlocation] = useState('');
    const [servicedescription, setservicedescription] = useState('');
    const [uploadimage, setuploadimage] = useState([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState('');
    const [uploadvideo, setuploadvideo] = useState('');

    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');
    const [msg5, setmsg5] = useState('');
    const [msg6, setmsg6] = useState('');
    const [msg7, setmsg7] = useState('');
    const [msg8, setmsg8] = useState('');
    const [msg9, setmsg9] = useState('');
    const [msg10, setmsg10] = useState('');
    const [msg11, setmsg11] = useState('');
    const [msg12, setmsg12] = useState('');
    const [msg13, setmsg13] = useState('');

    const [serviceid, setserviceid] = useState('');


    useEffect(() => {
        navigation.addListener('focus', () => {
            if (route.params?.from === 'ServiceManagementV') {
                setisedit(1);
                // console.log('route.params', route.params.data);
                setserviceid(route.params.data.id)
                setname(route.params.data.vendorname)
                onCategoryChange(route.params.data.category)
                setservicename(route.params.data.servicename)
                setcategory(route.params.data.category)
                setsubcategory(route.params.data.subcategory)
                setworkinghours(route.params.data.workinghours)
                setisWH(route.params.data.workinghours)
                setworkingduration(route.params.data.workingduration)
                // setisWD(route.params.data.workingduration)
                setfreeorpaid(route.params.data.service_type.toString())
                // setfreeorpaid(route.params.data.service_type)
                setserviceamount(route.params.data.amount)
                setservicedetails(route.params.data.details)
                setlocation(route.params.data.location)
                setservicedescription(route.params.data.description)
                setuploadimage(route.params.data.images)
                setUploadedImageUrls(route.params.data.images)
                setuploadvideo(route.params.data.videos)

            } else {
                setisedit(0);
                // console.log('00');
            }
            Togetcategory();
            // console.log('global.venderid ---', global.venderid)

        });

    }, [route.params]);

    const data = [
        { label: 'category 1', value: '1' },
        { label: 'category 2', value: '2' },
    ];

    const hourdata = [
        { label: '01:00 hours', value: '01:00 hours' },
        { label: '02:00 hours', value: '02:00 hours' },
        { label: '03:00 hours', value: '03:00 hours' },
        { label: '04:00 hours', value: '04:00 hours' },
        { label: '05:00 hours', value: '05:00 hours' },
        { label: '06:00 hours', value: '06:00 hours' },
    ];

    const selecttime = [
        { label: '09:00 am', value: '09:00 am' },
        { label: '09:30 am', value: '09:30 am' },
        { label: '10:00 am', value: '10:00 am' },
        { label: '10:30 am', value: '10:30 am' },
        { label: '11:00 am', value: '11:00 am' },
        { label: '11:30 am', value: '11:30 am' },
        { label: '12:00 pm', value: '12:00 pm' },
        { label: '12:30 pm', value: '12:30 pm' },
        { label: '01:00 pm', value: '01:00 pm' },
        { label: '01:30 pm', value: '01:30 pm' },
        { label: '02:00 pm', value: '02:00 pm' },
        { label: '02:30 pm', value: '02:30 pm' },
        { label: '03:00 pm', value: '03:00 pm' },
        { label: '03:30 pm', value: '03:30 pm' },
        { label: '04:00 pm', value: '04:00 pm' },
        { label: '04:30 pm', value: '04:30 pm' },
        { label: '05:00 pm', value: '05:00 pm' },
        { label: '05:30 pm', value: '05:30 pm' },
        { label: '06:00 pm', value: '06:00 pm' },
    ]

    const freeorpaiddata = [
        { label: 'Free Service', value: '0' },
        { label: 'Paid Service', value: '1' },
    ];

    function select() {
        // Alert.alert('alert ! , ok')
        Alert.alert("", "Choos a Option", [
            {
                text: 'Back',
                onPress: () => { }
            },
            {
                text: 'Gallery',
                onPress: () => openLibrary(),
            },
            {
                text: 'Camera',
                onPress: () => openCamera(),
            },
        ]);
    }
    const openCamera = () => {
        // console.log('camera')
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        launchCamera(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const base64data = response.assets[0].base64;
                if (base64data) {
                    const imgdata = {
                        base64: 'data:image/jpeg;base64,' + base64data,
                    };
                    setLoading(true);
                    const uploadimg = await loginPost(global.URL + 'uploadimage', imgdata);
                    // console.log('uploadimg C', uploadimg);
                    setLoading(false);
                    if (uploadimg) {
                        const imgpathcut = uploadimg.data.replace('images/', '');
                        // setuploadimage(imgpathcut);
                        setuploadimage([...uploadimage, imgpathcut]);
                        setUploadedImageUrls(prev => prev ? `${prev},${imgpathcut}` : imgpathcut);
                    } else {
                        console.error('Base64 data not found in response:', response);
                    }
                }
            }
        });
    }

    const openLibrary = () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 0
        }
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // const base64data = response.assets[0].base64;
                // if (base64data) {
                //     const imgdata = {
                //         base64: 'data:image/jpeg;base64,' + base64data,
                //     };
                //     setLoading(true);
                //     const uploadimg = await loginPost(global.URL + 'uploadimage', imgdata);
                //     // console.log('uploadimg G', uploadimg);
                //     setLoading(false);
                //     if (uploadimg) {
                //         const imgpathcut = uploadimg.data.replace('images/', '');
                //         console.log('imgpathcut G', imgpathcut);
                //         // setuploadimage(imgpathcut);
                //         setuploadimage([...uploadimage, imgpathcut]);
                //         setUploadedImageUrls(prev => prev ? `${prev},${imgpathcut}` : imgpathcut);
                //     } else {
                //         console.error('Base64 data not found in response:', response);
                //     }

                // }
                setLoading(true);
                const newImages = [];

                for (let i = 0; i < response.assets.length; i++) {
                    const asset = response.assets[i];
                    const data = {
                        base64: 'data:image/jpeg;base64,' + asset.base64,
                    };
                    const uploadimg = await loginPost(global.URL + 'uploadimage', data);
                    const imgpathcut = uploadimg.data.replace('images/', '');
                    if (imgpathcut) {
                        newImages.push(imgpathcut);
                        // console.log(`Image ${i + 1} uploaded successfully, path:`, imgpathcut);
                    } else {
                        console.error('Base64 data not found in response:', response);
                    }
                }

                setLoading(false);
                setuploadimage(prev => [...prev, ...newImages]);
                setUploadedImageUrls(prev => prev ? `${prev},${newImages.join(',')}` : newImages.join(','));
            }
        })
    }

    // getcategory
    const Togetcategory = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getcategory');
        // console.log('getcategory --> response 1', response)
        setLoading(false);
        if (response.success == true) {
            var count = Object.keys(response.data).length;
            // console.log('count', count);
            var dropDownData = []

            for (var i = 0; i < count; i++) {
                dropDownData.push({ label: response.data[i].name, value: response.data[i].id });
            }
            setcategories(dropDownData)
            // console.log('dropDownData >>', dropDownData);
        } else {
            console.log('Not get category');
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
            setsubcategories(dropDownData);
        } else {
            // alert('Data sub - Category Not Found')
        }
    }

    const onSubcategoryChange = (subcategoryId, subcatlable) => {
        // console.log('Selected sub-category  -- subcatlable :', subcategoryId, subcatlable);
        setsubcategory(subcategoryId);
    };

    // pendingads
    const Topendingads = async () => {
        setLoading(true);
        const vendorData = await AsyncStorage.getItem('Vendordata');
        const vendorDataArray = JSON.parse(vendorData);
        // console.log('vendorDataArray', vendorDataArray);

        const data = {
            user_id: vendorDataArray.user_id,
            type: 2
        }

        const response = await loginPost(global.URL + 'pendingads', data);
        // console.log('pendingads --> response V', response);
        setLoading(false);
        // if (response.success == true) {
        //     console.log('pendingads true V')
        // } else {
        //     console.log('pendingads false V')
        // }
    };

    // ServiceUploadV
    const ToServiceadd = async () => {
        console.log('ewe')
        // try {
        if (name == '') {
            setmsg1('*Please Enter Name')
        } else {
            setmsg1('')
        }
        if (servicename == '') {
            setmsg2('*Please Enter Service Name')
        } else {
            setmsg2('')
        }
        if (category == '') {
            setmsg3('*Select Category')
        } else {
            setmsg3('')
        }
        if (subcategory == '') {
            setmsg4('*Select Sub Category')
        } else {
            setmsg4('')
        }
        if (workinghours == '') {
            setmsg5('*Select Working Hours')
        } else {
            setmsg5('')
        }
        if (workingduration == '') {
            setmsg6('*Select Working Duration')
        } else {
            setmsg6('')
        }
        // 
        if (freeorpaid == '') {
            setmsg13('*Select Service Free or Paid')
        } else {
            setmsg13('')
        }
        if (freeorpaid == 1 && serviceamount == '') {
            setmsg7('*Please Enter Service Amount')
        } else {
            setmsg7('')
        }
        if (servicedetails == '') {
            setmsg8('*Please Enter Service Details')
        } else {
            setmsg8('')
        }
        if (location == '') {
            setmsg9('*Please Enter location')
        } else {
            setmsg9('')
        }
        if (servicedescription == '') {
            setmsg10('*Please Enter Description')
        } else {
            setmsg10('')
        }
        if (uploadimage == '') {
            setmsg11('*Please Upload Image')
        } else {
            setmsg11('')
        }
        if (uploadvideo == '') {
            setmsg12('*Please Upload Youtube Video Link')
        } else if (!/^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(uploadvideo)) {
            setmsg12('*Please enter a valid Youtube Video Link');
        }
        else {
            setmsg12('')
        }
        console.log('freeorpaid', freeorpaid)
        if (name != '' && servicename != '' && category != '' && subcategory != '' && workinghours != '' && workingduration != '' && ((freeorpaid == 1 && serviceamount != '') || (freeorpaid == 0)) && servicedetails != '' && freeorpaid != '' && location != '' && servicedescription != '' && uploadimage != '' && uploadvideo != '' && /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(uploadvideo)) {
            // navigation.navigate('HomeScreenV');  && uploadvideo != '' freeorpaid != '' &&
            // setLoading(true);
            // const userData = await AsyncStorage.getItem('Userdata');
            // // console.log('userData', userData);
            // const userDataArray = JSON.parse(userData);
            // // console.log('userDataArray add -->', userDataArray);
            // setLoading(false);
            // console.log('global.venderid', global.venderid)

            // console.log('data', data)
            if (global.planvendor === 0) {
                console.log(' global.planvendor-->', global.planvendor);

                if (isedit === 1) {

                    const data = {
                        id: serviceid,
                        vendorname: name,
                        servicename: servicename,
                        category: category,
                        subcategory: subcategory,
                        workinghours: workinghours,
                        workingduration: workingduration,
                        service_type: freeorpaid,
                        amount: serviceamount || 0,
                        details: servicedetails,
                        location: location,
                        description: servicedescription,
                        images: uploadedImageUrls,
                        videos: uploadvideo, //uploadvideo
                    }
                    // console.log('data edit -->', data)
                    // Alert.alert('data edit -->', JSON.stringify(data, null, 2));

                    try {
                        setLoading(true);
                        const response = await addpost(global.URL + 'updateservice', data);
                        // console.log('updateservice --> response ', response);
                        setLoading(false);
                        if (response.success == true) {
                            Alert.alert(
                                'Successfully updated',
                                '',
                                [{ text: 'OK', onPress: () => { navigation.navigate('HomeScreenV'); }, },],
                                { cancelable: false }
                            );
                        } else {
                            // console.log('service not update')
                            Alert.alert('service not update');
                        }
                    } catch (error) {
                        setLoading(false);
                        // console.error('An error occurred while updating the service:', error);
                        Alert.alert('Failed to update service. Please try again later.', error);
                    }
                } else {
                    console.log('check isedit == 1')
                }

                if (isedit === 0) {
                    // const data = {
                    //     vendor_id: userDataArray.vendor_id,
                    //     vendorname: 'vn',
                    //     servicename: 'kooo',
                    //     category: 61,
                    //     subcategory: 3,
                    //     workinghours: '09:30',
                    //     workingduration: '02:00',
                    //     service_type: 0,
                    //     amount: '546',
                    //     details: 'det',
                    //     location: 'lok',
                    //     description: 'gdfgd',
                    //     images: '66c47c707c3cd.jpeg',
                    //     videos: 'https://youtu.be/hzzCveeczSQ?feature=shared', //uploadvideo
                    // }

                    let data = '';
                    if (freeorpaid == 0) {
                        data = {
                            vendor_id: global.venderid,
                            vendorname: name,
                            servicename: servicename,
                            category: category,
                            subcategory: subcategory,
                            workinghours: workinghours,
                            workingduration: workingduration,
                            service_type: 0,
                            amount: serviceamount || 0,
                            details: servicedetails,
                            location: location,
                            description: servicedescription,
                            images: uploadedImageUrls,
                            videos: uploadvideo, //uploadvideo
                        }
                    } else {
                        data = {
                            vendor_id: global.venderid,
                            vendorname: name,
                            servicename: servicename,
                            category: category,
                            subcategory: subcategory,
                            workinghours: workinghours,
                            workingduration: workingduration,
                            service_type: 1,
                            amount: serviceamount || 0,
                            details: servicedetails,
                            location: location,
                            description: servicedescription,
                            images: uploadedImageUrls,
                            videos: uploadvideo, //uploadvideo
                        }

                    }

                    // console.log('data add -->', data);

                    try {
                        setLoading(true);
                        const response = await addpost(global.URL + 'addservice', data);
                        // console.log('addservice --> response ', response)
                        setLoading(false);
                        if (response.success == true) {
                            Topendingads()
                            Alert.alert(
                                'Successfully Added',
                                '',
                                [{ text: 'OK', onPress: () => { navigation.navigate('HomeScreenV'); }, },],
                                { cancelable: false }
                            );
                        } else {
                            // console.log('service not add')
                            Alert.alert('service not Add');
                        }
                    } catch (error) {
                        setLoading(false);
                        // console.error('An error occurred while updating the service:', error);
                        Alert.alert('Failed to Add service. Please try again later.', error);
                    }
                } else {
                    console.log('check isedit == 0')
                }

            } else {
                console.log(' global.planvendor-->', global.planvendor);
                Alert.alert(
                    'Subscription Required',
                    'Please subscribe to a plan before upload any service',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('SubscriptionV');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        } else {
            console.log('fill the all field')
        }
        // } catch (error) {
        //     console.error('An error occurred while updating the service:', error);
        //     Alert.alert('Failed to add service. Please try again later.');
        // } finally {
        //     setLoading(false); // Ensure loading state is reset regardless of success or failure
        // }
    }

    const ToService = async () => {
        const data = {
            vendor_id: 26,
            vendorname: 'vn',
            servicename: servicename,
            category: 61,
            subcategory: 3,
            workinghours: '09:30',
            workingduration: '02:00',
            service_type: 0,
            amount: '546',
            details: 'det',
            location: 'lok',
            description: 'gdfgd',
            images: '66c47c707c3cd.jpeg',
            videos: 'https://youtu.be/hzzCveeczSQ?feature=shared', //uploadvideo
        }
        Alert.alert('data add -->', JSON.stringify(data, null, 2));
        console.log('data add -->', data);

        try {
            setLoading(true);
            const response = await addpost(global.URL + 'addservice', data);
            console.log('addservice --> response ', response)
            setLoading(false);
            if (response.success == true) {
                Alert.alert('Successfully Added');
            } else {
                console.log('service not add')
                Alert.alert('service not add');
            }
        } catch (error) {
            setLoading(false);
            // console.error('An error occurred while updating the service:', error);
            Alert.alert('Failed to Add service. Please try again later.', error);
        }

    }

    return (
        <View style={globalstyles.flexview}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView>
                <View>
                    <Image source={require('../../images/sup.png')} style={styles.vendorRimg} />
                </View>

                <View style={globalstyles.Registermainview}>

                    <View style={styles.headerone}>
                        <Headerone />
                        <Text style={globalstyles.headertxt}>{isedit == 1 ? 'Edit' : null} Service Upload</Text>
                    </View>

                    <View style={{ marginBottom: 40 }}>

                        {/* name */}
                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/v1Copy.png')} style={globalstyles.userimg} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter your name'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={name}
                                onChangeText={(text) => setname(text)}
                            />
                        </View>
                        {msg1 ? <Text style={globalstyles.msg}>{msg1}</Text> : null}

                        {/*  Service name */}
                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image source={require('../../images/service.png')} style={styles.serviceicon} />
                            </View>

                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Service Name'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={servicename}
                                onChangeText={(text) => setservicename(text)}
                            />
                        </View>
                        {msg2 ? <Text style={globalstyles.msg}>{msg2}</Text> : null}


                        {/*  Select categories */}
                        <View style={globalstyles.inputmainview}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                placeholder='Select categories'
                                labelField="label"
                                valueField="value"
                                value={category}
                                onChange={item => {
                                    // setcategory(item.value);
                                    onCategoryChange(item.value, item.label)
                                }}
                                data={categories}
                                renderLeftIcon={() => (
                                    <View style={styles.dropdownview}>
                                        <Image resizeMode='stretch' source={require('../../images/cat.png')} style={styles.serviceicon} />
                                    </View>
                                )}
                            />
                        </View>
                        {msg3 ? <Text style={globalstyles.msg}>{msg3}</Text> : null}

                        {/* Select sub-Categories */}
                        <View style={globalstyles.inputmainview}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                placeholder='Select Sub-categories'
                                labelField="label"
                                valueField="value"
                                value={subcategory}
                                onChange={item => {
                                    // setsubcategory(item.value);
                                    onSubcategoryChange(item.value, item.label)
                                }}
                                data={subcategories}
                                renderLeftIcon={() => (
                                    <View style={styles.dropdownview}>
                                        <Image resizeMode='stretch' source={require('../../images/subacticon.png')} style={styles.serviceicon} />

                                    </View>
                                )}
                            />
                        </View>
                        {msg4 ? <Text style={globalstyles.msg}>{msg4}</Text> : null}

                        {/* Select Working Hours */}
                        <View style={globalstyles.inputmainview}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                placeholder='Select Working Hours'
                                labelField="label"
                                valueField="value"
                                value={workinghours}
                                onChange={item => {
                                    setworkinghours(item.value);
                                    // setisWH(item.label);
                                }}
                                data={selecttime}
                                renderLeftIcon={() => (
                                    <View style={styles.dropdownview}>
                                        <Image resizeMode='stretch' source={require('../../images/hour.png')} style={styles.serviceicon} />

                                    </View>
                                )}
                            />
                        </View>
                        {msg5 ? <Text style={globalstyles.msg}>{msg5}</Text> : null}

                        {/* Select Working Duration*/}
                        <View style={globalstyles.inputmainview}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                placeholder='Select Working Duration'
                                labelField="label"
                                valueField="value"
                                value={workingduration}
                                onChange={item => {
                                    setworkingduration(item.value);
                                    // setisWD(item.label);
                                }}
                                data={hourdata}
                                renderLeftIcon={() => (
                                    <View style={styles.dropdownview}>
                                        <Image resizeMode='stretch' source={require('../../images/due.png')} style={styles.serviceicon} />

                                    </View>
                                )}
                            />
                        </View>
                        {msg6 ? <Text style={globalstyles.msg}>{msg6}</Text> : null}

                        {/* freepaid */}
                        <View style={globalstyles.inputmainview}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                placeholder='Service Free or Paid'
                                labelField="label"
                                valueField="value"
                                value={freeorpaid}
                                onChange={item => {
                                    setfreeorpaid(item.value);
                                    // console.log('item.value', item.value)
                                }}
                                data={freeorpaiddata}
                                renderLeftIcon={() => (
                                    <View style={styles.dropdownview}>
                                        <Image resizeMode='stretch' source={require('../../images/freepaid.png')} style={styles.serviceicon} />

                                    </View>
                                )}
                            />
                        </View>
                        {msg13 ? <Text style={globalstyles.msg}>{msg13}</Text> : null}

                        {/* Service Amount*/}
                        {freeorpaid == 1 &&
                            <View style={globalstyles.inputmainview}>
                                <View style={globalstyles.inputimgview}>
                                    <Image resizeMode='stretch' source={require('../../images/rup.png')} style={styles.serviceicon} />
                                </View>
                                <TextInput
                                    style={globalstyles.inputtxt}
                                    placeholder='Enter Service Amount'
                                    placeholderTextColor='#464444'
                                    color='#000000'
                                    keyboardType='numeric'
                                    value={serviceamount}
                                    onChangeText={(text) => setserviceamount(text)}
                                />
                            </View>
                        }
                        {msg7 ? <Text style={globalstyles.msg}>{msg7}</Text> : null}

                        {/* Service Details*/}
                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image resizeMode='stretch' source={require('../../images/deat.png')} style={styles.serviceicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Service Details'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={servicedetails}
                                onChangeText={(text) => setservicedetails(text)}
                            />
                        </View>
                        {msg8 ? <Text style={globalstyles.msg}>{msg8}</Text> : null}

                        {/* Location */}
                        <View style={globalstyles.inputmainview}>
                            <View style={globalstyles.inputimgview}>
                                <Image resizeMode='stretch' source={require('../../images/location.png')} style={styles.locationicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Enter Location'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={location}
                                onChangeText={(text) => setlocation(text)}
                            />
                        </View>
                        {msg9 ? <Text style={globalstyles.msg}>{msg9}</Text> : null}

                        {/* Description */}
                        <View style={styles.inputmainview}>
                            <View style={styles.inputimgview}>
                                <Image resizeMode='stretch' source={require('../../images/description.png')} style={styles.serviceicon} />
                            </View>
                            <TextInput
                                style={styles.desinputtxt}
                                placeholder='Enter Description'
                                placeholderTextColor='#464444'
                                color='#000000'
                                multiline={true}
                                value={servicedescription}
                                onChangeText={(text) => setservicedescription(text)}
                            />
                        </View>
                        {msg10 ? <Text style={globalstyles.msg}>{msg10}</Text> : null}

                        {/* Upload Image */}
                        {/* <Text>----{uploadedImageUrls}</Text> */}
                        <TouchableOpacity style={styles.inputmainview2} onPress={select}>
                            <View style={globalstyles.inputimgview}>
                                <Image resizeMode='stretch' source={require('../../images/imageicon.png')} style={styles.imgicon} />
                            </View>
                            <Text style={styles.imgtxt}>Upload your Image</Text>
                        </TouchableOpacity>
                        {msg11 ? <Text style={globalstyles.msg}>{msg11}</Text> : null}

                        {/* Upload Video */}
                        <View style={styles.inputmainview2}>
                            <View style={globalstyles.inputimgview}>
                                <Image resizeMode='stretch' source={require('../../images/videoicon.png')} style={styles.videoicon} />
                            </View>
                            <TextInput
                                style={globalstyles.inputtxt}
                                placeholder='Upload Your Youtube Video Link'
                                placeholderTextColor='#464444'
                                color='#000000'
                                value={uploadvideo}
                                onChangeText={(text) => setuploadvideo(text)}
                            />
                        </View>

                        {msg12 ? <Text style={globalstyles.msg}>{msg12}</Text> : null}

                        <View style={{ marginTop: 60 }}>
                            <TouchableOpacity style={globalstyles.button} onPress={ToServiceadd}>
                                <Text style={globalstyles.buttontxt}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </ScrollView>


        </View>
    )
}