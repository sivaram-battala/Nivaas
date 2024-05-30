import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { allTexts, window } from '../../common';

const ServiceCard = ({uri,name,navigation}) => {
  console.log(uri,'uri');
  return (
    <TouchableOpacity style={styles.eachServiceCon} onPress={()=>navigation.navigate(allTexts.screenNames.eachService)}>
      <Image
        source={uri}
        height={50}
        width={50}
      />
      <Text>{name}</Text>
    </TouchableOpacity>
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
