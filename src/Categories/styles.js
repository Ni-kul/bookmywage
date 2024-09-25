import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    viewone: {
        // borderWidth: 1,
        marginTop: 14,
        marginBottom: 20,
        width: '92%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        width: '49%',
        height: 'auto'
    },
    eachcatview: {
        marginTop: 16,
        // borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 12,
        // flex: 1
    },
    image: {
        width: '100%',
        // height: 100,
        // aspectRatio: 1,
    },
    cattxtviwe: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    cattxt: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // paddingVertical: 10,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: '2%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Gilroy-Bold'
    },



})