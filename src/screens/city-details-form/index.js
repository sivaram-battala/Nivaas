import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors, window} from '../../common';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useUserOnBoardingMutation } from '../../redux/services/cityServices';

const UserCityDetailsForm = ({navigation, route}) => {
  const userData = route?.params || {};
  // console.log(userData,'routedataa of city details');
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOnboarding] = useUserOnBoardingMutation();
  const handleOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
  const handleOnBoarding =(id)=>{
    const payload={
      id:id
    }
    console.log(payload,'payloaddddddddddd');
    userOnboarding(payload).unwrap().then((responce)=>{
      console.log(responce,'onboarding responce');
    }).catch((error)=>{
      console.log('error in post req',error);
    })
    navigation.navigate(allTexts.screenNames.myAccount)
  }
  return (
    <View style={styles.mainContainer}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'On Boarding'} navigation={navigation} />
      </View>
      <View style={styles.detailsCon}>
        <Text style={{color: colors.gray, fontSize: 16, fontWeight: '500'}}>
          Apartment
        </Text>
        <View style={styles.eachDetailsCon}>
          <Foundation name="home" size={25} color={colors.black} />
          <Text style={styles.detailText}>{userData.cityValue}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <SimpleLineIcons name="location-pin" size={18} color={colors.black} />
          <Text style={styles.detailText}>{userData.apartmentValue}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <Foundation name="home" size={25} color={colors.black} />
          <Text style={styles.detailText}>Flat No : {userData.flatValue}</Text>
        </View>
      </View>
      <View style={styles.mainButtonCon}>
        <View style={styles.radioButtonCon}>
          <Text style={styles.youAreText}>You Are</Text>
          <View style={styles.buttonView}>
            <FontAwesome
              name={selectedOption === 'Flat Owner' ? 'circle' : 'circle-o'}
              size={24}
              color={
                selectedOption === 'Flat Owner' ? colors.orangeColor : colors.gray
              }
              style={styles.radioButton}
              onPress={() => handleOptionSelect('Flat Owner')}
            />
            <Text style={styles.optionText}>Flat Owner</Text>
          </View>
          <View style={styles.buttonView}>
            <FontAwesome
              name={selectedOption === 'Renting' ? 'circle' : 'circle-o'}
              size={24}
              color={
                selectedOption === 'Renting' ? colors.orangeColor : colors.gray
              }
              style={styles.radioButton}
              onPress={() => handleOptionSelect('Renting')}
            />
            <Text style={styles.optionText}>Renting</Text>
          </View>
        </View>
        <View style={{marginTop: window.height * 0.15}}>
          <PrimaryButton
            onPress={()=>handleOnBoarding(userData?.flatId)}
            bgColor={colors.orangeColor}
            radius={30}
            text={'   On Board     '}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default UserCityDetailsForm;
