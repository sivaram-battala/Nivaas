import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import {TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {TouchableOpacity} from 'react-native';
import {allTexts, colors} from '../../common';

const Orders = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Orders'} navigation={navigation} />
      </View>
      <View style={{alignItems: 'center', marginTop: '50%'}}>
        <Text style={{color: colors.black}}>No New Orders From You</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(allTexts.screenNames.services)}>
          <Text style={{color: colors.blue, marginTop: '10%'}}>
            Explore Services
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Orders;
