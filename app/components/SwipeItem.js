import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SwipeItem = ({ item }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain' }]}/>

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 1.5,
        justifyContent: 'center',
    },

    title: {
        fontWeight: '800',
        fontSize: width * .06,
        marginBottom: 10,
        color: '#333333',
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },

    description: {
        fontWeight: '300',
        color: '#333333',
        textAlign: 'center',
        paddingHorizontal: 50,
        fontFamily: 'sans-serif',
    },
});

export default SwipeItem;