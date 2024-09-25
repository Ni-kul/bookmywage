import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Headerone = () => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };
    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.viewone} onPress={goBack}>
                <Image source={require('../../images/lb.png')} style={styles.Backarrowimg} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // borderWidth: 1,
        // width: '100%',

    },
    viewone: {
        // borderWidth: 1,
        borderColor: 'red',
        // width: '100%',
    },
    Backarrowimg: {
        width: 14,
        height: 22
    },
})
export default Headerone;

