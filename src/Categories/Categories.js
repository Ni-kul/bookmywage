// Categories
import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import Headerone from '../componet/Headerone';
import { getcategory } from '../API';

export default function Categories({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [categories, setcategories] = useState([]);

    const [imageHeights, setImageHeights] = useState({});

    const numColumns = 2;

    const Data = [
        { icon: require('../../images/cat1.png'), name: 'Beauty Service' },
        { icon: require('../../images/cat2.png'), name: 'Repair Service' },
        { icon: require('../../images/cat3.png'), name: 'Washing Service' },
        { icon: require('../../images/cat4.png'), name: 'Plumbing Service' },
        { icon: require('../../images/cat5.png'), name: 'Painting Service' },
        { icon: require('../../images/cat6.png'), name: 'Cleaning Service' },
        { icon: require('../../images/cat2.png'), name: 'Repair Service' },
        { icon: require('../../images/cat7.png'), name: 'Electrical Service' },
        // { img: require('../../images/cat1.png'), name: 'Beauty Service' },
    ];

    useEffect(() => {
        navigation.addListener('focus', async () => {
            Togetcategory();

        });
    }, []);

    // getcategory
    const Togetcategory = async () => {

        setLoading(true);
        const response = await getcategory(global.URL + 'getcategory');
        // console.log('getcategory --> response 1', response);
        setLoading(false);
        if (response.success == true) {
            setcategories(response.data)
            response.data.forEach((item) => {
                const uri = global.IMG + item.image;
                Image.getSize(uri, (width, height) => {
                    const aspectRatio = height / width;
                    // console.log('aspectRatio --> ', aspectRatio);
                    const calculatedHeight = 100 * aspectRatio; // Assuming width is 100% (or 100 units for simplicity)
                    // console.log('calculatedHeight --> ', calculatedHeight);

                    setImageHeights(prevHeights => ({
                        ...prevHeights,
                        [item.image]: calculatedHeight,
                    }));
                });
            });
            // alert('Succesfully getcategory')
        } else {
            // alert('Not getcategory')
        }
    }

    const renderCategoryColumn = (columnIndex) => (
        <View style={styles.column} key={columnIndex}>
            {categories.filter((_, index) => index % numColumns === columnIndex).map((item, index) => (
                <TouchableOpacity key={index} style={styles.eachcatview} onPress={() => ToListofService(item.id)}>
                    <Image
                        source={{ uri: global.IMG + item.image }}
                        style={{ width: '100%', height: imageHeights[item.image] || 100 }} // Fallback height
                    />
                    <View style={styles.cattxtviwe}>
                        <Text style={styles.cattxt}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    const ToListofService = async (catid) => {
        // console.log('catid -->', catid)
        navigation.navigate('ListofService', catid);
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
                    <Text style={globalstyles.headertxt}>Categories</Text>
                </View>

                <View style={styles.viewone}>
                    {Array.from({ length: numColumns }).map((_, columnIndex) => renderCategoryColumn(columnIndex))}
                </View>

                {/* <View style={styles.viewone}>
                    <View style={styles.column}>
                        {categories.filter((_, index) => index % numColumns === 0).map((item, index) => (
                            <TouchableOpacity key={index} style={styles.eachcatview} onPress={() => ToListofService(item.id)} >
                                <Image key={index} source={{ uri: global.IMG + item.image }}
                                    style={{ width: '100%' }} />

                                <View style={styles.cattxtviwe}>
                                    <Text style={styles.cattxt}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.column}>
                        {categories.filter((_, index) => index % numColumns === 1).map((item, index) => (
                            <TouchableOpacity key={index} style={styles.eachcatview} onPress={() => ToListofService(item.id)}>
                                <Image key={index} source={{ uri: global.IMG + item.image }} style={{ width: '100%', }} />

                                <View style={styles.cattxtviwe}>
                                    <Text style={styles.cattxt}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </View>

                </View> */}



                {/* <View style={{ width: '50%', borderWidth: 1, borderColor: 'red' }}>
                    {categories.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.eachcatview} onPress={ToListofService} >
                            <Image source={{ uri: global.IMG + item.image }}
                                // style={{ width: '100%', }}
                                style={{ width: '100%', height: imageHeights[item.image] || 100 }}
                            />

                            <View style={styles.cattxtviwe}>
                                <Text style={styles.cattxt}>{item.name}</Text>
                            </View>

                        </TouchableOpacity>
                    ))}
                </View> */}


                {/* <View style={styles.viewone}>
                    <View style={styles.column}>
                        {Data.filter((_, index) => index % numColumns === 0).map((item, index) => (
                            <TouchableOpacity key={index} style={styles.eachcatview} onPress={ToListofService}>
                                <Image source={item.icon} style={{ width: '100%', }} />

                                <View style={styles.cattxtviwe}>
                                    <Text style={styles.cattxt}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.column}>
                        {Data.filter((_, index) => index % numColumns === 1).map((item, index) => (
                            <TouchableOpacity key={index} style={styles.eachcatview} onPress={ToListofService}>
                                <Image source={item.icon} style={{ width: '100%', }} />

                                <View style={styles.cattxtviwe}>
                                    <Text style={styles.cattxt}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </View>
                </View> */}

            </ScrollView>
        </View>
    )
}
