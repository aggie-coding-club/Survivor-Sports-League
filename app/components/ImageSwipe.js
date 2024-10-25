import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, FlatList, Animated } from 'react-native';

import SwipeItem from './SwipeItem';
import Slides from './Slides';
import SwipeIndicator from './SwipeIndicator';

const ImageSwipe = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
    return (
        <View style={styles.container}>
            <View style={{ flex: 3}}>
                <FlatList
                    //getting data from Slides.js
                    data={Slides}
                    renderItem={({ item }) => <SwipeItem item={item} />}
                    //scroll horizontally instead of vertically 
                    horizontal
                    //don't show horizontal scroll indicator
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled 
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            
            {/*Swipe Indicator component underneath scrolling images*/}
            <SwipeIndicator data={Slides} scrollX={scrollX}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default ImageSwipe;