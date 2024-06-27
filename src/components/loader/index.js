import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from './../../common/index';
import {styles} from './styles';

export const Loader = ({color, size, dynmicStyle, marginTop}) => {
  return (
    <View style={[styles.container, dynmicStyle ,{marginTop: marginTop ? marginTop : "100%"}]}>
      <ActivityIndicator size={size || 'large'} color={color || colors.primaryColor} />
    </View>
  );
};
