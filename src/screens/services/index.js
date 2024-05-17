import { ScrollView, Text, View} from 'react-native';
import React from 'react';
import {ServiceCard, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {styles} from './style';

const Services = ({navigation}) => {
  return (
    <ScrollView style={styles.mainCon} showsVerticalScrollIndicator={false}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 txt={'Services'} navigation={navigation} />
      </View>
      <View style={styles.servicesCon}>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard uri={require('../../utils/assets/images/Electrician.png')} name='Electrician'/>
          <ServiceCard uri={require('../../utils/assets/images/Plumber.png')} name='Plumber'/>
          <ServiceCard uri={require('../../utils/assets/images/Carpenter.png')} name='Carpenter'/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard uri={require('../../utils/assets/images/Cleaner.png')} name='Cleaner'/>
          <ServiceCard uri={require('../../utils/assets/images/Chef.png')} name='Chef'/>
          <ServiceCard uri={require('../../utils/assets/images/Maid.png')} name='Maid'/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard uri={require('../../utils/assets/images/BloodTest.png')} name='BloodTest'/>
          <ServiceCard uri={require('../../utils/assets/images/Doctor.png')} name='Doctor'/>
          <ServiceCard uri={require('../../utils/assets/images/Cab.png')} name='Cab'/>
        </View>
        <View style={{flexDirection:'row'}}>
        <ServiceCard uri={require('../../utils/assets/images/Hairdresser.png')} name='Hairdresser'/>
        <ServiceCard uri={require('../../utils/assets/images/Hospitals.png')} name='Hospitals'/>
        <ServiceCard uri={require('../../utils/assets/images/AcRepair.png')} name='AcRepair'/>
        </View>
      </View>
      <View style={styles.AutoBikeServicesCon}>
        <Text style={styles.headingText}>Car & Bike Services</Text>
        <View style={styles.servicesCon}>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard uri={require('../../utils/assets/images/Car.png')} name='Car Mechanic'/>
          <ServiceCard uri={require('../../utils/assets/images/Bike.png')} name='Bike Mechanic'/>
          <ServiceCard uri={require('../../utils/assets/images/CarCleaning.png')} name='Car Bike Wash'/>
        </View>
        </View>
      </View>
      <View style={styles.AutoBikeServicesCon}>
        <Text style={styles.headingText}>Insurence Service</Text>
        <View style={styles.servicesCon}>
        <View style={{flexDirection: 'row'}}>
          <ServiceCard uri={require('../../utils/assets/images/Protect.png')} name='Life Insurence'/>
          <ServiceCard uri={require('../../utils/assets/images/CarInsurance.png')} name='Car Insurence'/>
          <ServiceCard uri={require('../../utils/assets/images/BikePath.png')} name='Bike Insurence'/>
          <ServiceCard uri={require('../../utils/assets/images/MentalHealth.png')} name='Health Insurence'/>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Services;
