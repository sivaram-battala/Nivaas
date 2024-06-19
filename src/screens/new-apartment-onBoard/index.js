import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { styles } from './style';
import { allTexts, colors, window } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLazyGetCityListQuery, useNewApartmentOnboardingMutation } from '../../redux/services/cityServices';
import { onBoardNewApartmentSchema } from '../../common/schemas';
import { useSelector } from 'react-redux';
import { SnackbarComponent } from '../../common/customFunctions';


const NewApartmentOnBoard = ({ navigation }) => {
  // const [citiesData, setCitiesData] = useState([]);
  const [cityValue, setCityValue] = useState({ id: null, name: null });
  const [postalCode, setPostalCode] = useState('');
  const [apartment, setApartment] = useState('');
  const [numBlocks, setNumBlocks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState({});
  const [postNewApartment] = useNewApartmentOnboardingMutation();
  // const [getCityList] = useLazyGetCityListQuery();

  const {citiesData} = useSelector(state=>state.cityData);
  // console.log(citiesData);
  const handleSubmit = () => {
    const payload = {
      name:apartment,
      code:"NA123",
      description:"Nivaas",
      totalFlats:numBlocks,
      apartmentType:"MULTIBLOCK",
      builderName:"Siva",
      line1: addressLine1,
      line2: addressLine2,
      line3: "street",
      postalCode:postalCode,
      cityId: cityValue?.id
  };

    const validationErrors = onBoardNewApartmentSchema(payload);
    if (Object.keys(validationErrors).length === 0) {
      postNewApartment(payload)
        .unwrap()
        .then(response => {
          console.log('New Apartment onboarding', response);
          SnackbarComponent({text:response,backgroundColor:colors.green})
        })
        .catch(error => {
          console.log('Error in New Apartment onboarding', error);
          SnackbarComponent({text:error,backgroundColor:colors.red1})
        });
      navigation.navigate(allTexts.screenNames.home);
    } else {
      setErrors(validationErrors);
    }
  };

  // const handleCityData = () => {
  //   const cityPayload = {
  //     page: 0,
  //     pageSize: 200,
  //   };
  //   getCityList(cityPayload)
  //     .unwrap()
  //     .then(response => {
  //       setCitiesData(response?.data);
  //     })
  //     .catch(error => {
  //       console.log('error in getCityData==========>', error);
  //     });
  // };

  // useEffect(() => {
  //   handleCityData();
  // }, []);

  useEffect(() => {
    if (cityValue.id) {
      const selectedCity = citiesData.find(city => city.id === cityValue.id);
      if (selectedCity) {
        setState(selectedCity.region);
      }
    }
  }, [cityValue, citiesData]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2
          back={true}
          txt={'Apartment OnBoarding'}
          navigation={navigation}
        />
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setApartment}
              value={apartment}
              placeholder='Enter Apartment Name'
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setNumBlocks}
              value={numBlocks}
              placeholder='Enter Number Of Flats'
            />
            {errors.totalFlats && (
              <Text style={styles.errorText}>{errors.totalFlats}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine1}
              value={addressLine1}
              placeholder='Enter Address Line 1'
            />
            {errors.line1 && (
              <Text style={styles.errorText}>{errors.line1}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine2}
              value={addressLine2}
              placeholder='Enter Address Line 2'
            />
            {errors.line2 && (
              <Text style={styles.errorText}>{errors.line2}</Text>
            )}
          </View>
          <View style={styles.DropdownFieledCon}>
            <CustomDropdown
              label="City"
              data={citiesData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({ id, name })}
              labelField="name"
              valueField="id"
            />
            {errors.cityId && (
              <Text style={styles.errorText}>{errors.cityId}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setState}
              value={state}
              placeholder='Enter Your State'
              editable={false}
            />
          </View>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setPostalCode}
              value={postalCode}
              keyboardType="numeric"
              maxLength={6}
              placeholder='Enter Your Postal Code'
            />
            {errors.postalCode && (
              <Text style={styles.errorText}>{errors.postalCode}</Text>
            )}
          </View>
          <View style={{ marginTop: window.height * 0.05 }}>
            <PrimaryButton
              onPress={handleSubmit}
              bgColor={colors.primaryRedColor}
              radius={5}
              text={'Send OnBoard Request'}
              shadow={true}
              textColor={colors.white}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewApartmentOnBoard;

