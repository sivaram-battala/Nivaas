import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from './style';
import {PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors, window} from '../../common';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useUserOnBoardingMutation} from '../../redux/services/cityServices';
import RadioGroup from 'react-native-radio-buttons-group';

const UserOnBoardingForm = ({navigation, route}) => {
  const userData = route?.params || {};
  // console.log(userData,'routedataa of city details');
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOnboarding] = useUserOnBoardingMutation();
  const handleOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
  const handleOnBoarding = userData => {
    const payload = {
      flatId: userData?.flatId,
      type:"FLAT"
    };
    // console.log(payload, 'payloaddddddddddd');
    userOnboarding(payload)
      .unwrap()
      .then(responce => {
        console.log(responce, 'onboarding responce');
      })
      .catch(error => {
        console.log('error in OnBoarding request', error);
      });
    navigation.navigate(allTexts.screenNames.home,{city:userData?.cityValue,apartment:userData?.apartmentValue,flat:userData?.flatValue,flatId: userData?.flatId});
  };
  const radioButtons = useMemo(
    () => [
      {
        id: 'Renting',
        label: 'Renting',
        value: 'Renting',
      },
      {
        id: 'FlatOwner',
        label: 'Flat Owner',
        value: 'FlatOwner',
      },
    ],
    [],
  );
  return (
    <View style={styles.mainContainer}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'Confirm'} navigation={navigation} />
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
            {radioButtons.map(button => (
              <View key={button.id} style={styles.radioButtonContainer}>
                <RadioGroup
                  radioButtons={[button]}
                  onPress={handleOptionSelect}
                  selectedId={selectedOption}
                  layout="row"
                />
              </View>
            ))}
          </View>
        </View>
        <View style={{marginTop: window.height * 0.15}}>
          <PrimaryButton
            onPress={() => handleOnBoarding(userData)}
            bgColor={colors.primaryRedColor}
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

export default UserOnBoardingForm;
