// DetailsofService
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, FlatList, ActivityIndicator, Linking, Alert } from 'react-native';
import Video from 'react-native-video';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
// import VideoPlayer from 'react-native-video-controls';
import Modal from "react-native-modal";
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { getcategory, loginPost } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

export default function DetailsofService({ route, navigation }) {

    const scrollViewRef = useRef();
    const [loading, setLoading] = useState(false);
    const [selectedbtnone, setselectedbtnone] = useState(1)
    const [selectedbtn, setselectedbtn] = useState(1)
    const [isModalVisible, setModalVisible] = useState(false);
    const [ename, setename] = useState('');
    const [ephoneno, setephoneno] = useState('');
    const [eemailid, seteemailid] = useState('');
    const [emsg, setemsg] = useState('');
    const [imgModalVisible, setimgModalVisible] = useState(false);
    const [selectedimage, setselectedimage] = useState(0);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const [videoModalVisible, setvideoModalVisible] = useState(false);
    const [selectedvideo, setselectedvideo] = useState('');
    const [selectedvideosize, setselectedvideosize] = useState(0);

    const [msg1, setmsg1] = useState('');
    const [msg2, setmsg2] = useState('');
    const [msg3, setmsg3] = useState('');
    const [msg4, setmsg4] = useState('');

    const [ratingdata, setratingdata] = useState([]);
    const [relevantservicedata, setrelevantservicedata] = useState([]);
    // 
    const routedata = route.params;
    // console.log('routedata D', routedata);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            Togetreview();
            setselectedvideo(videoIds.length > 0 ? videoIds[0] : null)
            if (routedata != null) {
                Topopularservice()
            }
        });
    }, []);

    const Toselectedbtnone = async (index) => {
        setselectedbtnone(index);
    }

    const Toselectedbtn = async (index) => {

        if (index == 1) {
            openmodal()
            setselectedbtn(index);
        } else {
            setselectedbtn(index);
            navigation.navigate('ServiceBooking', routedata);
        }
    }

    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = async () => {
        if (ename == '') {
            setmsg1('*Please Enter Name')
        } else {
            setmsg1('')
        }
        if (ephoneno == '') {
            setmsg2('*Please Enter Mobile Number')
        } else {
            setmsg2('')
        }
        if (eemailid == '') {
            setmsg3('*Please Enter E-Mail Id')
        } else {
            setmsg3('')
        }
        if (emsg == '') {
            setmsg4('*Please Enter Message')
        } else {
            setmsg4('')
        }
        if (ename != '' && ephoneno != '' && eemailid != '' && emsg != '') {

            setLoading(true);
            const userData = await AsyncStorage.getItem('Userdata');
            // console.log('userData', userData);
            const userDataArray = JSON.parse(userData);
            setLoading(false);

            const data = {
                user_id: userDataArray.id,
                name: ename,
                mobile: ephoneno,
                service_id: routedata.id,
                message: emsg,
                email: eemailid,
            }
            setLoading(true);
            const response = await loginPost(global.URL + 'enquiry', data);
            // console.log('enquiry --> response ', response)
            setLoading(false);
            if (response.success == true) {
                setModalVisible(false);
                Alert.alert('successfully sent');
            } else {
                console.log('enquiry false')
            }
        }

    }

    const closemodalTap = () => {
        setModalVisible(false);
    }

    const openmodalimg = () => {
        setimgModalVisible(true);
    }
    const closemodalimg = () => {
        setimgModalVisible(false);

    }


    const handleImagePress = (index) => {
        setselectedimage(index);
        const tabWidth = 148;
        const centerOffset = scrollViewWidth / 2 - tabWidth / 2;
        const offset = Math.max(0, index * tabWidth - centerOffset);
        scrollViewRef.current.scrollTo({ x: offset, animated: false });
    };

    const openmodalvideo = () => {
        setvideoModalVisible(true);
    }
    const closemodalvideo = () => {
        setvideoModalVisible(false);
    }

    const handlevideoPress = (index, videoId) => {
        // console.log('vv -->', index, videoId)
        setselectedvideosize(index)
        setselectedvideo(videoId);
        const tabWidth = 148;
        const centerOffset = scrollViewWidth / 2 - tabWidth / 2;
        const offset = Math.max(0, index * tabWidth - centerOffset);
        scrollViewRef.current.scrollTo({ x: offset, animated: false });
    };

    // ServiceBooking 
    const ToServiceBooking = async () => {
        navigation.navigate('ServiceBooking');
    }

    const ToDetailsofService = async (data) => {
        navigation.navigate('DetailsofService', data);
    }

    const serimg = [
        { id: '1', src: require('../../images/Paintingservice.png') },
        { id: '2', src: require('../../images/c2.png') },
        { id: '3', src: require('../../images/c3.png') },
        { id: '4', src: require('../../images/c4.png') },
        { id: '5', src: require('../../images/c1.png') },
    ];
    const videos = [
        { id: '1', src: require('../../images/vedios.mp4') },
        { id: '2', src: require('../../images/vedios.mp4') },
        { id: '3', src: require('../../images/vedios.mp4') },
        { id: '4', src: require('../../images/vedios.mp4') },
        { id: '5', src: require('../../images/vedios.mp4') },
    ];
    const populardata = [
        { id: '1', name: 'Painting service' },
        { id: '2', name: 'Cleaning service' },
        { id: '3', name: 'Plumbing service' },
        { id: '4', name: 'Cleaning service' },
    ]

    const ratingdataa = [
        { id: '1', name: 'Max', rat: '4' },
        { id: '2', name: 'Sony', rat: '2' },
        { id: '3', name: 'Pogo', rat: '3' },
        { id: '4', name: 'CN', rat: '2' },
        { id: '5', name: 'Jac', rat: '5' },
        { id: '6', name: 'Tom', rat: '3' },
        { id: '7', name: 'oggy', rat: '2' },
        { id: '8', name: 'cen', rat: '4' },
    ]

    const Topopularservice = async (catid) => {
        setLoading(true);

        const data = {
            user_id: routedata.id,
            category: routedata.category
        }
        // console.log('data',data)
        const response = await loginPost(global.URL + 'popularservice', data);
        // console.log('popularservice --> response ', response);
        setLoading(false);
        if (response.success == true) {
            setrelevantservicedata(response.data);
        } else {
            console.log('popularservice false');
        }
    }

    //     getreview
    // 
    const Togetreview = async () => {

        const data = {
            service_id: routedata.id,
        }
        setLoading(true);
        const response = await loginPost(global.URL + 'getreview', data);
        setLoading(false);
        // console.log('getreview --> response', response);
        if (response.success == true) {
            setratingdata(response.data);
            // alert('Succesfully getreview')
        } else {
            // alert('Not getreview')
        }
    }

    const getVideoIds = (urls) => {
        // console.log('urls', urls)
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|[^\/\n\s]+\/\S+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
        const videoIds = [];
        let match;

        while ((match = regex.exec(urls)) !== null) {
            videoIds.push(match[1]);
        }

        return videoIds;
    };

    // // Ensure videos is an array. If not, make it an array
    // const videoUrls = Array.isArray(routedata.videos) ? routedata.videos : [routedata.videos];
    const videoUrls = routedata && routedata.videos ? Array.isArray(routedata.videos) ? routedata.videos : [routedata.videos] : [];
    // console.log('videoUrls', videoUrls)

    const videoIds = getVideoIds(videoUrls.join(' '));
    // console.log('videoIds', videoIds)

    // const getVideoId = (url) => {
    //     // console.log('url', url);
    //     const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|[^\/\n\s]+\/\S+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    //     const matches = url.match(regex);
    //     // console.log('matches', matches);
    //     return matches ? matches[1] : null;
    // };

    // const videoId = getVideoId(routedata.videos);
    // console.log('videoId', videoId);

    const handlePhoneCall = () => {
        Linking.openURL(`tel:+${routedata.phone_number}`);
    };
    const openMap = () => {
        // console.log('-->',routedata.location)
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(routedata.location)}`;
        Linking.openURL(url)
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
                    <Text style={globalstyles.headertxt}>Details of Service</Text>
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

                        <Text style={styles.line}></Text>

                        <View style={globalstyles.view5}>

                            <View style={globalstyles.view6}>
                                <Text style={globalstyles.txt3}>Payment :</Text>
                                <Text style={globalstyles.txt4}>Rs : {routedata.amount}</Text>
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

                    {/*owner name view */}

                    <View style={styles.view8}>
                        {routedata.profile_pic ?
                            <Image source={{ uri: global.IMG + routedata.profile_pic }} style={styles.ownerimg} />
                            :
                            <Image source={require('../../images/v1Copy.png')} style={styles.ownerimg} />
                        }
                        <View style={{ width: '56%' }}>
                            <Text style={styles.txt5}>{routedata.vendor_name}</Text>
                            <Text style={styles.txt6}>{routedata.category_name}</Text>

                        </View>
                        <View style={styles.ratingview2}>
                            <Image source={require('../../images/rating.png')} style={styles.ratingimg2} />
                            <Text style={styles.ratingtxt2}>{routedata.average_review ? routedata.average_review : 0}</Text>
                        </View>
                    </View>

                    {/*buttonview Description & Review */}
                    <View style={styles.view9}>
                        <TouchableOpacity onPress={() => Toselectedbtnone(1)} style={[styles.desbtn, { backgroundColor: selectedbtnone === 1 ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.desbtntxt, { color: selectedbtnone === 1 ? '#FFFFFF' : '#909090' },]}>Description</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Toselectedbtnone(2)} style={[styles.desbtn, { backgroundColor: selectedbtnone === 2 ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.desbtntxt, { color: selectedbtnone === 2 ? '#FFFFFF' : '#909090' },]}>Review</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Message & reviewshow*/}
                    <View style={styles.msgview}>
                        {selectedbtnone == 1 ?
                            <Text style={styles.msgtxt}>
                                <Text style={{ fontWeight: 'bold', fontFamily: 'Gilroy-Bold', }}>Message : </Text>{routedata.description}
                            </Text>
                            :
                            // <View style={styles.reviewview}>
                            <ScrollView style={styles.ratscroll} nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 10 }}>
                                {ratingdata.length > 0 ?
                                    ratingdata.map((ratdata, index) => (
                                        <View key={index} style={styles.eachrat}>
                                            {ratdata.profile_pic ?
                                                <Image source={{ uri: global.IMG + ratdata.profile_pic }} style={styles.ratuserimg} />
                                                :
                                                <Image source={require('../../images/v1Copy.png')} style={styles.ratuserimg} />
                                            }
                                            <Text style={styles.ratusername}> {ratdata.user_name}</Text>
                                            <StarRatingDisplay
                                                rating={ratdata.review}
                                                starSize={22}
                                                color='#F55B03'
                                                emptyColor='#000000'
                                            />
                                        </View>

                                    ))
                                    :
                                    <Text style={globalstyles.txtnot}>Review Not Found</Text>
                                }
                            </ScrollView>

                            // </View>
                        }
                    </View>

                    {/* icon view*/}
                    <View style={styles.iconsview}>
                        <TouchableOpacity onPress={handlePhoneCall}>
                            <Image source={require('../../images/phone.png')} style={styles.phoneimg} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openMap}>
                            <Image source={require('../../images/map.png')} style={styles.phoneimg} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../images/share.png')} style={styles.shareimg} />
                        </TouchableOpacity>
                    </View>


                </View>

                {/* Image view */}
                <View style={styles.titletxtview}>
                    <Text style={globalstyles.titletxt2}>Image :</Text>
                    <TouchableOpacity onPress={openmodalimg}><Text style={styles.titletxt1}>View all</Text></TouchableOpacity>
                </View>

                <ScrollView style={styles.imgshowview} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {routedata.images.split(',').map((imgurl, index) => (
                        <TouchableOpacity key={index} onPress={openmodalimg}>
                            <Image resizeMode='stretch' source={{ uri: global.IMG + imgurl }} style={styles.serimgs} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Video  view */}
                <View style={styles.titletxtview}>
                    <Text style={globalstyles.titletxt2}>Video :</Text>
                    {/* <TouchableOpacity onPress={openmodalvideo}><Text style={styles.titletxt1}>View all</Text></TouchableOpacity> */}
                </View>

                <ScrollView style={styles.imgshowview} horizontal={true} showsHorizontalScrollIndicator={false}>

                    {routedata.videos != null ?

                        videoIds.map((videoId, index) => (
                            <View key={index} >
                                {/* <Text>ID---{videoId}</Text> */}
                                <WebView
                                    source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                                    style={styles.serimgs}
                                />
                            </View>
                        ))

                        :
                        null
                    }
                    {/* <Text>dsdds</Text> */}
                </ScrollView>

                {/* Relevant Service */}
                <View style={styles.relevantserview}>

                    <Text style={globalstyles.titletxt2}>Relevant Service :</Text>

                    <ScrollView style={{ marginTop: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>

                        {relevantservicedata.slice(0, 6).map((data, index) => (

                            <View key={index} style={styles.eachserviceview}>
                                <Image resizeMode='contain' source={{ uri: global.IMG + data.images.split(',')[0] }} style={styles.relevantimg} />
                                <Text style={styles.servicepricetxt}>Rs.{data.amount}</Text>

                                <View style={styles.nameratview}>
                                    <Text style={styles.sertxt1}>{data.servicename}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={require('../../images/rating.png')} style={globalstyles.ratingimg} />
                                        <Text style={globalstyles.ratingtxt}>{data.average_review}</Text>
                                    </View>
                                </View>

                                <View style={styles.serratview2}>
                                    <View style={styles.serratview3}>
                                        <Image source={require('../../images/v1Copy.png')} style={styles.o2img2} />
                                        <View style={styles.serratview4}>
                                            <Text style={styles.sertxt2}>{data.vendor_name}</Text>
                                            <Text style={styles.sertxt3}>{data.category_name}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.serarrow} onPress={() => ToDetailsofService(data)}>
                                        <Image source={require('../../images/rra.png')} style={styles.rraimg} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        ))}
                    </ScrollView>

                </View>

                {/* Enquiry btns */}

                <View style={{ marginBottom: 20 }}>
                    <View style={styles.view9}>
                        <TouchableOpacity onPress={() => Toselectedbtn(1)} style={[styles.booknowbtn, { backgroundColor: selectedbtn === 1 ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.enqbtntxt, { color: selectedbtn === 1 ? '#FFFFFF' : '#292929' },]}>Enquiry</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Toselectedbtn(2)} style={[styles.booknowbtn, { backgroundColor: selectedbtn === 2 ? '#0066FF' : '#FFFFFF' },]}>
                            <Text style={[styles.enqbtntxt, { color: selectedbtn === 2 ? '#FFFFFF' : '#292929' },]}>Book now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Enquiry - modal */}
            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 0, justifyContent: 'flex-end' }} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap}>
                {/* <ScrollView> */}
                <View style={globalstyles.mfview1}>

                    <View style={styles.headerone}>
                        <TouchableOpacity onPress={closemodalTap}>
                            <Image source={require('../../images/lb.png')} style={globalstyles.Backarrowimg} />
                        </TouchableOpacity>
                        <Text style={globalstyles.headertxt}>Enquiry</Text>
                    </View>

                    <Text style={globalstyles.inputitletxt}>Name</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Name'
                        placeholderTextColor='#878787'
                        value={ename}
                        color='#000000'
                        onChangeText={(text) => setename(text)}
                    />
                    {msg1 ? <Text style={globalstyles.msgm}>{msg1}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>Mobile Number</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your Mobile Number'
                        placeholderTextColor='#878787'
                        keyboardType='numeric'
                        maxLength={10}
                        value={ephoneno}
                        color='#000000'
                        onChangeText={(text) => setephoneno(text)}
                    />
                    {msg2 ? <Text style={globalstyles.msgm}>{msg2}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>E-mail Id</Text>
                    <TextInput
                        style={globalstyles.inputtxt2}
                        placeholder='Enter Your E-Mail Id'
                        placeholderTextColor='#878787'
                        value={eemailid}
                        color='#000000'
                        onChangeText={(text) => seteemailid(text)}
                    />
                    {msg3 ? <Text style={globalstyles.msgm}>{msg3}</Text> : null}

                    <Text style={globalstyles.inputitletxt}>Message</Text>
                    <TextInput
                        style={globalstyles.inputmsgtxt}
                        placeholder='Enter Enquiry Message'
                        placeholderTextColor='#878787'
                        value={emsg}
                        color='#000000'
                        onChangeText={(text) => setemsg(text)}
                    />
                    {msg4 ? <Text style={globalstyles.msgm}>{msg4}</Text> : null}

                    <View style={{ marginTop: 30, marginBottom: 10 }}>
                        <TouchableOpacity style={globalstyles.button} onPress={closemodal}>
                            <Text style={globalstyles.buttontxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </ScrollView> */}
            </Modal>

            {/* image modal */}

            <Modal isVisible={imgModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', margin: 0, }} onBackButtonPress={closemodalimg} onBackdropPress={closemodalimg} onLayout={event => setScrollViewWidth(event.nativeEvent.layout.width)}>
                <View style={{ flex: 1, }}>

                    <View style={globalstyles.headerone}>
                        <TouchableOpacity onPress={closemodalimg}>
                            <Image source={require('../../images/lb.png')} style={globalstyles.Backarrowimg} />
                        </TouchableOpacity>
                        <Text style={globalstyles.headertxt}>Service Image</Text>
                    </View>


                    <View style={styles.selectedImageview}>
                        <Image resizeMode='stretch' source={{ uri: global.IMG + routedata.images.split(',')[selectedimage] }} style={styles.selectedbigImage} />
                    </View>

                    <ScrollView ref={scrollViewRef} horizontal={true} contentContainerStyle={{ marginTop: 30, }}>
                        {routedata.images.split(',').map((imgurl, index) => (
                            <TouchableOpacity key={index} onPress={() => handleImagePress(index)} style={styles.eachsimg}>
                                <Image resizeMode='stretch'
                                    source={{ uri: global.IMG + imgurl }}
                                    style={selectedimage === index ? styles.selectedsmallimg : styles.smallimg}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>
            </Modal>

            {/* video modal */}

            <Modal isVisible={videoModalVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', margin: 0, }} onBackButtonPress={closemodalvideo} onBackdropPress={closemodalvideo} onLayout={event => setScrollViewWidth(event.nativeEvent.layout.width)}>
                <View style={{ flex: 1, }}>

                    <View style={globalstyles.headerone}>
                        <TouchableOpacity onPress={closemodalvideo}>
                            <Image source={require('../../images/lb.png')} style={globalstyles.Backarrowimg} />
                        </TouchableOpacity>
                        <Text style={globalstyles.headertxt}>Service Videos</Text>
                    </View>


                    <View style={styles.selectedImageview}>

                        <WebView
                            source={{ uri: `https://www.youtube.com/embed/${selectedvideo}` }}
                            style={styles.selectedbigImage}
                        />
                    </View>

                    <ScrollView ref={scrollViewRef} horizontal={true} contentContainerStyle={{ marginTop: 30, borderWidth: 1 }}>


                        {videoIds.map((videoId, index) => (
                            <TouchableOpacity key={index} onPress={() => handlevideoPress(index, videoId)} style={styles.eachsimg}>
                                <View >
                                    <WebView
                                        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                                        style={selectedvideosize == index ? styles.selectedsmallvideo : styles.smallvideo}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>

                </View>
            </Modal>
        </View >
    )
}