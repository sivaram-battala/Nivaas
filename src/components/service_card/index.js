import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { window } from '../../common';

const ServiceCard = ({uri,name}) => {
  console.log(uri,'uri');
  return (
    <View style={styles.eachServiceCon}>
      <Image
        source={uri}
        height={50}
        width={50}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  eachServiceCon:{
    alignItems:'center',
    marginHorizontal:'auto',
    marginVertical:10,
    height:window.height*0.08,
    width:window.width*0.18,
    justifyContent:'center',
}
});
