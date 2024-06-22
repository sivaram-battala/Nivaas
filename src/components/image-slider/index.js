import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import { colors, window } from '../../common';

const carouselItems = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../utils/assets/images/ImageOne.jpg'),
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../utils/assets/images/ImageTwo.jpeg'),
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../utils/assets/images/ImageSlider.png'),
  },
];

const ImageSlider = () => {
  return (
      <Swiper
        style={styles.wrapper}
        autoplay
        autoplayTimeout={3}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {carouselItems.map(item => (
          <View key={item.key} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Swiper>
  );
};
const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: window.width,
    height: 180,
    borderRadius:10,
    resizeMode:'cover'
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor:colors.primaryRedColor,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default ImageSlider;
