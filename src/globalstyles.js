// vendor <--------------  
import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({

    flexview: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 5)',
    },
    // flexview2: {
    //     flex: 1,
    //     borderWidth: 1, borderColor: 'red',
    //     // backgroundColor: 'rgba(255, 255, 255, 5)',
    // },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.075)',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        height: '100%',
        width: '100%'
    },
    button: {
        width: '76%',
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
        borderRadius: 30,
        alignSelf: 'center'
    },
    buttontxt: {
        // marginTop: -1,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    Registermainview: {
        // alignSelf: 'flex-end',
        marginTop: -50,
        marginBottom: 20,
        borderWidth: 1,
        width: '94%',
        // height: '56%',
        alignSelf: 'center',
        paddingTop: 22,
        paddingBottom: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AEAEAE',
        elevation: 4
    },

    onforget: {
        alignSelf: 'flex-end',
        // marginTop: 10,
        marginTop: '4%',
        marginRight: '4%',
        // width: '38%',
        // marginBottom: 40,
        marginBottom: '10%',
        // borderWidth: 1,
        paddingHorizontal: '2%'
    },
    titletxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#000000',
        // fontFamily: 'Gilory-BlackItalic',
    },
    // titletxt11: {
    //     fontFamily: 'Gilroy-BlackItalic',
    //     fontSize: 28,
    // },
    // t1: {
    //     fontFamily: 'Gilroy-Heavy'
    // },
    // t111: {
    //     fontFamily: 'Poppins-Thin',

    // },
    titletxt2: {

        fontWeight: '500',
        fontSize: 18,
        color: '#0A0A0A'
    },

    inputmainview: {
        marginTop: 34,
        width: '94%',
        // height: 48,
        alignSelf: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        borderColor: '#BDBCBC',
    },
    inputimgview: {
        // borderWidth: 1,
        alignItems: 'center',
        width: '16%'
    },
    userimg: {
        width: 20,
        height: 20,
    },
    inputtxt: {
        // borderWidth: 1,
        width: '84%',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000'
    },

    inputpasswdtxt: {
        width: '71%',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000'
    },
    passwdhideimg: {
        width: 23,
        height: 19,
    },
    tabview: {
        // borderWidth: 1,
        width: 30,
    },
    activetabline: {
        height: 3.5,
        // marginBottom: 4,
        backgroundColor: '#0066FF',
        borderRadius: 10,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10
    },
    homeimg: {
        marginTop: 8.5,
        marginBottom: 10,
        alignSelf: 'center',
        height: 24,
        width: 22,
    },
    subimg: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        height: 23,
        width: 24,
    },
    historyimg: {
        marginTop: 9,
        marginBottom: 10,
        alignSelf: 'center',
        height: 26,
        width: 23,
    },
    headerone: {
        // borderWidth:1,
        alignItems: 'center',
        marginTop: 22,
        width: '92%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    mfview1: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '4%',
        // paddingBottom: 20
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    headertxt: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        width: '95.5%',
        textAlign: 'center',
        fontFamily: 'Gilroy-Bold',
        // borderWidth: 1
    },
    Backarrowimg: {
        width: 14,
        height: 22
    },

    view1: {
        // borderWidth: 1,
        width: '92%',
        alignSelf: 'center',
        marginTop: 20,
        // paddingBottom: 10
    },
    simg: {
        borderRadius: 20,
        width: '100%',
        height: 220
    },
    view2: {
        marginTop: -34,
        borderWidth: 1,
        width: '96%',
        alignSelf: 'center',
        borderRadius: 10,
        // padding: '4%',
        paddingTop: 10,
        paddingBottom: 18,
        borderColor: '#C9C9C9',
        backgroundColor: '#FCFCFC'
    },
    view3: {
        width: '90%',
        alignSelf: 'center',
        // borderWidth: 1,
        flexDirection: 'row',
        // padding: '4%',
    },
    view4: {
        width: '80%',
        // borderWidth: 1,
    },
    txt1: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500',
    },
    txt2: {
        fontSize: 13,
        color: '#5A5A5A',
        fontWeight: '400',
    },
    s2img: {
        marginLeft: '4%',
        width: 40,
        height: 40
    },
    line: {
        height: 0.8,
        backgroundColor: '#BABABA',
        marginVertical: 8
    },
    view5: {
        width: '86%',
        alignSelf: 'center',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view6: {
        // borderWidth: 1,
        width: '26%',
    },
    txt3: {
        fontSize: 11,
        marginBottom: 4,
        color: '#000000',
        fontWeight: '500',
    },
    txt4: {
        fontSize: 11,
        color: '#636363',
        fontWeight: '400',
    },
    view7: {
        // borderWidth: 1,
        width: '18%',
    },
    ratingview: {
        // borderWidth: 1,
        flexDirection: 'row',
        marginLeft: '10%'
    },
    ratingimg: {
        marginTop: 1,
        width: 12.5,
        height: 11,
    },
    ratingtxt: {
        marginLeft: 4,
        fontWeight: '600',
        fontSize: 11,
        color: '#000000'
    },
    inputitletxt: {
        marginTop: 20,
        fontWeight: '500',
        fontSize: 16,
        color: '#000000'
    },
    inputtxt2: {
        marginTop: 6,
        borderRadius: 10,
        paddingLeft: '6%',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        height: 48,
        fontWeight: '400',
        fontSize: 13,
        color: '#5E5858'
    },
    inputmsgtxt: {
        textAlignVertical: 'top',
        marginTop: 6,
        borderRadius: 10,
        paddingLeft: '6%',
        height: 140,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        fontWeight: '400',
        fontSize: 13,
        color: '#5E5858'
    },

    proBackimg: {
        width: '100%',
        height: 340
    },
    Backarrowview2: {
        zIndex: 1,
        marginTop: 14,
        left: '4%',
        position: 'absolute',
    },
    Backarrowimg2: {
        width: 14,
        height: 22
    },
    Triangleview: {
        position: 'absolute',
        backgroundColor: "transparent",
        // borderWidth: 1,
        // height: 200,
        transform: [{ rotate: '180deg' }],
        borderRightWidth: 430,
        borderTopWidth: 340,
        borderRightColor: "transparent",
        borderTopColor: '#FFFFFF',
    },
    nameimgview: {
        marginTop: 234,
        position: 'absolute',
        alignSelf: 'center',
        // borderWidth: 1,
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    Profileimgview: {
        borderWidth: 6,
        borderRadius: 60,
        borderColor: '#FFFFFF'
    },
    Profileimg: {
        borderRadius: 60,
        width: 100,
        height: 100
    },
    nameview: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
    },
    nametxt: {
        width: '74%',
        fontWeight: '500',
        fontSize: 18,
        color: '#0A0A0A'
    },


    addressview: {
        marginTop: 6,
        width: '100%',
        flexDirection: 'row',
    },
    loctionicon: {
        width: 10,
        height: 14.5,
        marginRight: 5,
        marginLeft: 2
    },
    addresstxt: {
        width: '90%',
        fontWeight: '400',
        fontSize: 12,
        color: '#626262'
    },
    msg: {
        // marginLeft: '4%',
        marginTop: 4,
        color: '#EB1F28',
        fontWeight: '500',
        fontSize: 12
    },
    msgm: {
        // marginLeft: '4%',
        marginTop: 4,
        color: '#EB1F28',
        fontWeight: '500',
        fontSize: 12
    },
    bookingview: {
        // borderWidth: 1,
        // marginBottom:10,
        width: '92%',
        alignSelf: 'center'
    },
    eachbookitem: {
        borderWidth: 1,
        marginTop: 18,
        paddingVertical: 10,
        borderColor: '#CFCFCF',
        borderRadius: 10
    },
    orderidview: {
        // borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: '3%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    orderidtxt: {
        color: '#0B0B0B',
        fontSize: 14,
        fontWeight: 'bold'
    },
    ordertxt2: {
        color: '#0066FF',
        fontSize: 11,
        fontWeight: 'bold'
    },
    orderline: {
        marginVertical: 10,
        // marginTop:10,
        backgroundColor: '#D9D7D7',
        height: 2
    },
    order2view: {
        // width:'100%',
        paddingHorizontal: '3%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    orderimg: {
        width: '33%',
        height: 91,
        borderRadius: 8
    },
    liveview: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: '4%',
        // paddingHorizontal: 1,
        paddingBottom: 1,
        marginTop: 6,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderColor: '#D8D8D8',
        borderRadius: 14
    },
    livedotimg: {
        width: 6,
        height: 6
    },
    livetxt: {
        marginLeft: 3,
        color: '#3A942C',
        fontSize: 8,
        fontWeight: 'bold'
    },
    order3view: {
        width: '63%',
        // borderWidth: 1
    },
    ordertxt3: {
        color: '#000000',
        fontSize: 13,
        fontWeight: 'bold'
    },
    order4view: {
        width: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        justifyContent: 'space-between'
    },
    ordertxt4: {
        width: '59%',
        // borderWidth: 1,
        // lineHeight:20,
        color: '#5A5A5A',
        fontSize: 12,
        fontWeight: '400'
    },
    ordertxt5: {
        marginLeft: '4%',
        width: '38%',
        textAlign: 'center',
        paddingVertical: 4,
        borderRadius: 4,
        // paddingHorizontal: '2%',
        backgroundColor: '#CAFFC1',
        color: '#0C5401',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Bold'
    },
    ordertxt55: {
        marginLeft: '4%',
        width: '38%',
        textAlign: 'center',
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#DAE9FF',
        color: '#0066FF',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Bold'
    },
    ordertxt555: {
        marginLeft: '4%',
        width: '38%',
        textAlign: 'center',
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#FFEEEE',
        color: '#FF0000',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Bold'
    },
    order5view: {
        width: '88%',
        backgroundColor: '#E9E9E9',
        // borderWidth: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        alignItems: 'flex-start',
        marginTop: 6,
        marginBottom: 6,
        // padding: 4,
        paddingVertical: 4,
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    o2img: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginLeft: '4%'
    },
    ordertxt6: {
        color: '#353434',
        fontSize: 11,
        fontWeight: '400'
    },
    ordertxt7: {
        color: '#717171',
        fontSize: 11,
        fontWeight: '400'
    },
    ratview: {
        // borderWidth: 1,
        marginRight: '6%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ordertxt8: {
        // borderWidth:1,
        color: '#000000',
        fontSize: 11,
        fontWeight: '400'
    },
    ratingstar: {
        marginRight: 4,
        width: 12,
        height: 10,
    },
    order6view: {
        marginTop: 16,
        marginBottom: 12,
        paddingHorizontal: '4%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
    },
    dateview: {
        // borderWidth: 1,
        width: '33%'
    },
    datetxt: {
        color: '#000000',
        fontSize: 13,
        fontWeight: 'bold'
    },
    datetxt2: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '400'
    },
    CanaledBookingbtn: {
        // borderWidth: 1,
        marginTop: 16,
        marginBottom: 20,
        paddingHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    Canaledbtn: {
        backgroundColor: '#FFEEEE',
        // borderWidth:1,
        width: '48%',
        paddingVertical: 7,
        // paddingHorizontal: '10%',
        borderRadius: 20
    },
    Canaledbtntxt: {
        textAlign: 'center',
        color: '#FF0000',
        fontSize: 11,
        fontWeight: '500',
    },
    orderlastbtns: {
        // borderWidth: 1,
        marginTop: 16,
        marginBottom: 10,
        paddingHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Modificationbtn: {
        backgroundColor: '#0066FF',
        // borderWidth: 1,
        width: '48%',
        // height:0,
        paddingVertical: 10,
        // paddingHorizontal: '10%',
        borderRadius: 20
    },
    Modificationbtntxt: {
        // color: '#534E4E',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    Modificationbtn2: {
        backgroundColor: '#FFFFFF',
        width: '48%',
        paddingVertical: 10,
        borderRadius: 20
    },
    Modificationbtntxt2: {
        textAlign: 'center',
        color: '#534E4E',
        fontSize: 14,
        fontWeight: 'bold',
    },


    // moditydate - modal
    mview1: {
        paddingHorizontal: '5%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        width: '92%',
        alignSelf: 'center'
    },
    mtxt1: {
        textAlign: 'center',
        fontSize: 19,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 6,
        fontFamily: 'Gilroy-Bold'
    },
    mview2: {
        marginTop: 24,
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mtxt2: {
        textAlign: 'center',
        fontSize: 15,
        color: '#000000',
        fontWeight: '500',
    },
    date2img: {
        width: 18,
        height: 18
    },

    mdateview: {
        marginTop: 10
    },

    mdatearrows: {
        marginTop: 8,
        // borderWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        alignItems: 'center',
    },
    datesContainer: {
        flexDirection: 'row',
    },
    dateContainer: {
        backgroundColor: '#EBEBEB',
        borderRadius: 16,
        width: 40,
        height: 60,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateContainer: {
        backgroundColor: '#0066FF',
    },
    dayName: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 21,
        color: '#000000'
    },
    selecteddateText: {
        color: '#FFFFFF',
        fontSize: 13,
        lineHeight: 21,
        fontWeight: '500',
    },
    meachtime: {
        // borderWidth: 1,
        marginRight: 10,
        paddingVertical: 6,
        // height:34,
        borderRadius: 18,
        // justifyContent: 'center',
        paddingHorizontal: 10
    },
    mtimetxt: {
        fontSize: 13,
        fontWeight: '500',
    },
    cancelbookingbtn: {
        marginTop: 26,
    },
    Canaledbtn2: {
        backgroundColor: '#FFEEEE',
        width: '50%',
        paddingVertical: 10,
        borderRadius: 20
    },
    Canaledbtntxt2: {
        textAlign: 'center',
        color: '#FF0000',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Bold'
    },

    // filtermodal
    mfview2: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        // borderWidth: 1,
        // paddingHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ftxt1: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '500'
    },
    filterimg: {
        width: 18,
        height: 22
    },
    dropdown: {
        marginTop: 20,
        borderWidth: 1,
        height: 48,
        borderRadius: 10,
        borderColor: '#D3D3D3',
        paddingHorizontal: '4%'
    },
    placeholderStyle: {
        color: '#5E5858',
        fontSize: 13,
        fontWeight: '500'
    },
    selectedTextStyle: {
        color: '#5E5858',
        fontSize: 13,
        fontWeight: '500'
    },
    inputstattxt: {
        marginTop: 20,
        borderRadius: 10,
        // paddingLeft:'4%',
        paddingHorizontal: '4%',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        height: 48,
        fontWeight: '500',
        fontSize: 13,
        color: '#5E5858'
    },
    // ------------------------   
    signmainview: {
        flex: 1,
        // borderWidth: 1,
        height: '100%',
        width: '100%'
    },
    inputmainview2: {
        // marginTop: 34,
        marginTop: '10%',
        width: '94%',
        // height:48,
        alignSelf: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        borderColor: '#BDBCBC'
    },
    // -----plus button
    catbtnview: {
        flexDirection: 'row',
        // borderWidth: 1,
        borderColor: 'yellow',
        flex: 1,
        // marginTop:10,
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 44,
        left: 0,
        right: 0,
        justifyContent: 'center',
        // justifyContent:'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 40,
        // zIndex: 999,
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: 'rgba(210, 210, 205, 0.7)',
    },
    blurcat: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderWidth: 1,
        flexDirection: 'row'
    },
    catbuttons: {
        width: 56,
        height: 56,
        backgroundColor: '#FFFFFF',
        // borderWidth: 1,
        // backgroundColor: '#BABABA',
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    cateditimg: {
        // marginTop: 2,
        width: 30,
        height: 30
    },
    catedittxt: {
        textAlign: 'center',
        lineHeight: 22,
        color: '#0066FF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    plusicon2: {
        width: '100%',
        height: '100%'
    },

    txtnot: {
        marginTop: 30,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 17,
        color: '#000000',
    },
    txtnot2: {
        // borderWidth:1,
        alignSelf:'center',
        marginTop: 100,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 17,
        color: '#000000',
    },
})