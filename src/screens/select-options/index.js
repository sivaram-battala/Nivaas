import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { allTexts, colors } from '../../common';
import { styles } from './style';

const SelectCityOptions = ({ navigation, route }) => {
  const data = route?.params || {};
  console.log('route data in city details form ============>',data);
  const [cityValue, setCityValue] = useState({ id: null, name: null }); 
  const [apartmentValue, setApartmentValue] = useState({ id: null, name: null }); 
  const [flatValue, setFlatValue] = useState({ id: null, name: null });

  const flatNumbersData = [
    { flatNo: '3897', id: '36' },
    { flatNo: '3899', id: '37' },
  ];

  const handleData = () => {
    // console.log({ cityValue, apartmentValue, flatValue });
    navigation.navigate(allTexts.screenNames.userCityDetailsForm, {
      cityValue: cityValue?.name, 
      apartmentValue: apartmentValue?.name, 
      flatValue: flatValue?.name,
      flatId:flatValue?.id
    });
  };

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'On Boarding'} navigation={navigation} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.eachDropdownCon}>
            <CustomDropdown
              label="City"
              data={data?.cityData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({ id, name })} // Set both id and name
              labelField="name"
              valueField="id"
            />
          </View>
          <View style={styles.eachDropdownCon}>
            <CustomDropdown
              label="Apartment"
              data={data?.apartmentData}
              value={apartmentValue.id}
              onChange={(id, name) => setApartmentValue({ id, name })} // Set both id and name
              labelField="name"
              valueField="id"
            />
          </View>
          <View style={styles.eachDropdownCon}>
            <CustomDropdown
              label="Flat Number"
              data={flatNumbersData}
              value={flatValue}
              onChange={(id, name) => setFlatValue({ id, name })}
              labelField="flatNo"
              valueField="id"
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => handleData()}
              bgColor={colors.orangeColor}
              radius={5}
              text={'   Next    '}
              shadow={true}
              textColor={colors.white}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectCityOptions;
