import {Image, Text, View} from 'react-native';
import React from 'react';
import {TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {styles} from './style';

const Services = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 txt={'Services'} navigation={navigation} />
      </View>
      <View style={styles.servicesCon}>
        <View >
          <View style={styles.eachServiceCon}>
            <Image
              source={require('../../utils/assets/images/Electrician.png')}
              height={50}
              width={50}
            />
            <Text>Electrician</Text>
          </View>
          <View style={styles.eachServiceCon}>
            <Image
              source={require('../../utils/assets/images/Plumber.png')}
              height={50}
              width={50}
            />
            <Text>Plumber</Text>
          </View>
          <View style={styles.eachServiceCon}>
            <Image
              source={require('../../utils/assets/images/Carpenter.png')}
              height={50}
              width={50}
            />
            <Text>Carpenter</Text>
          </View>
        </View>
        {/* <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Cleaner.png')} height={50} width={50}/>
          <Text>Cleaner</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Chef.png')} height={50} width={50}/>
          <Text>Chef</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Maid.png')} height={50} width={50}/>
          <Text>Maid</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/BloodTest.png')} height={50} width={50}/>
          <Text>BloodTest</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Doctor.png')} height={50} width={50}/>
          <Text>Doctor</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Cab.png')} height={50} width={50}/>
          <Text>Cab</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Hairdresser.png')} height={50} width={50}/>
          <Text>Hairdresser</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/Hospitals.png')} height={50} width={50}/>
          <Text>Hospitals</Text>
        </View>
        <View style={styles.eachServiceCon}>
          <Image source={require('../../utils/assets/images/AcRepair.png')} height={50} width={50}/>
          <Text>AcRepair</Text>
        </View> */}
      </View>
    </View>
  );
};

export default Services;
