
import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({

    viewone: {
        // borderWidth: 1,
        flex: 1,
        height: '100%',
        width: '94%',
        alignSelf: 'center'
    },
    txt1: {
        marginTop: 20,
        fontSize: 28,
        color: '#000000',
        lineHeight: 38,
        width: '95%',
        fontFamily: 'Gilroy-Medium',
        // fontSize: 40,
        // fontWeight: '600',
        // fontFamily: 'Gilroy-Bold',
        // fontFamily: 'Gilroy-Regularitalic',
        // fontFamily:'Gilroy-HeavyItalic'
    },
    txt2: {
        marginTop: 8,
        fontSize: 28,
        color: '#000000',
        lineHeight: 38,
        fontFamily: 'Gilroy-Medium',
    },
    imgmainview: {
        // borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        transform: [{ rotate: '324deg' }],
        // transform: [{ rotate: '340deg' }],
    },
    w1img: {
        borderRadius: 14,
        marginTop: 10,
        width: '42%',
        height: 133,
        marginLeft: '12%'
        // marginRight: '36%',
        // transform: [{ rotate: '-33deg' }],
    },
    rowimageview: {
        width: '88%',
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // transform: [{ rotate: '-33deg' }],
    },
    w2img: {
        borderRadius: 14,
        // borderRadius: 24,
        marginTop: 10,
        // width: '44%',
        // height: 136,
        width: '46%',
        height: 133,
    },
    w4img: {
        marginTop: 10,
        // marginLeft: '36%',
        borderRadius: 14,
        marginRight: '12%',
        width: '42%',
        height: 133,
        // transform: [{ rotate: '-33deg' }],

    },
    signupbtn: {
        marginTop: 22,
        width: '76%',
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 30,
        alignSelf: 'center'
    },
    signupbtntxt: {
        marginTop: -1,
        fontSize: 22,
        color: '#555555',
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Black'
    },
})
