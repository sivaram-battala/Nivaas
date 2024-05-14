import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {colors, window} from '../../common';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserCityDetailsForm = ({navigation, route}) => {
  const userData = route?.params || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
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
          <Text style={styles.detailText}>{userData.selectedApartment}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <SimpleLineIcons name="location-pin" size={18} color={colors.black} />
          <Text style={styles.detailText}>{userData.selectedCity}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <Foundation name="home" size={25} color={colors.black} />
          <Text style={styles.detailText}>Flat No 12</Text>
        </View>
      </View>
      <View style={styles.mainButtonCon}>
        <View style={styles.radioButtonCon}>
          <Text style={styles.youAreText}>You Are</Text>
          <View style={styles.buttonView}>
            <FontAwesome
              name={selectedOption === 'option1' ? 'circle' : 'circle-o'}
              size={24}
              color={
                selectedOption === 'option1' ? colors.orangeColor : colors.gray
              }
              style={styles.radioButton}
              onPress={() => handleOptionSelect('option1')}
            />
            <Text style={styles.optionText}>Flat Owner</Text>
          </View>
          <View style={styles.buttonView}>
            <FontAwesome
              name={selectedOption === 'option2' ? 'circle' : 'circle-o'}
              size={24}
              color={
                selectedOption === 'option2' ? colors.orangeColor : colors.gray
              }
              style={styles.radioButton}
              onPress={() => handleOptionSelect('option2')}
            />
            <Text style={styles.optionText}>Renting</Text>
          </View>
        </View>
        <View style={{marginTop: window.height * 0.15}}>
          <PrimaryButton
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
