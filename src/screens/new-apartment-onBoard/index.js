import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { styles } from './style';
import { allTexts, colors, window } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { useLazyGetPostalCodeListQuery, useNewApartmentOnboardingMutation } from '../../redux/services/cityServices';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { onBoardNewApartmentSchema } from '../../common/schemas';

const NewApartmentOnBoard = ({ navigation }) => {
  const [cityValue, setCityValue] = useState({ id: null, name: null });
  const [postalCode, setPostalCode] = useState({ id: null, name: null });
  const [apartment, setApartment] = useState('');
  const [numBlocks, setNumBlocks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [errors, setErrors] = useState({});
  const [postalCodesData, SetPostalCodesData] = useState();
  const [postNewApartment] = useNewApartmentOnboardingMutation();
  const [getPostalCodesList] = useLazyGetPostalCodeListQuery();

  const { citiesData } = useSelector(state => state.cityData);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const payload = {
      name: apartment,
      code: 'NA123', 
      description: apartment,
      totalBlocks: numBlocks,
      apartmentType: 'MULTIBLOCK',
      builderName: 'Siva',
      status: selectedOption,
      isUnderConstruction: false,
      availableForRent: false,
      availableForSale: true,
      line1: addressLine1,
      line2: addressLine2,
      line3: 'street',
      postalCode: postalCode?.name,
      locality: cityValue?.name,
      contactNumber: '9391164656',
      defaultAddress: true,
    };

    const errors = onBoardNewApartmentSchema(payload);
    if (Object.keys(errors).length === 0) {
      postNewApartment(payload)
        .unwrap()
        .then(response => {
          console.log('New Apartment onboarding', response);
          SetPostalCodesData(response);
        })
        .catch(error => {
          console.log('Error in New Apartment onboarding', error);
        });
      navigation.navigate(allTexts.screenNames.home);
    } else {
      setErrors(errors);
    }
  };

  const handlePostalCodesData = () => {
    const postalCodePayload = {
      pageNo: 0,
      pageSize: 30,
    };
    getPostalCodesList(postalCodePayload)
      .unwrap()
      .then(response => {
        const processedPostalCodeData = response?.data.map(item => ({
          ...item,
          code: String(item.code),
        }));
        SetPostalCodesData(processedPostalCodeData);
      })
      .catch(error => {
        console.log('ERROR IN POSTALCODES', error);
      });
  };

  const radioButtons = useMemo(
    () => [
      {
        id: 'UnderConstruction',
        label: 'Under Construction',
        value: 'UnderConstruction',
      },
      {
        id: 'Positioned',
        label: 'Positioned',
        value: 'Positioned',
      },
    ],
    [],
  );

  useEffect(() => {
    handlePostalCodesData();
  }, []);

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
            <CustomDropdown
              label="City"
              data={citiesData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({ id, name })}
              labelField="name"
              valueField="id"
            />
            {!citiesData && (
              <Text style={styles.errorText}>{'No Cities Here'}</Text>
            )}
            {errors.locality && (
              <Text style={styles.errorText}>{errors.locality}</Text>
            )}
            <CustomDropdown
              label="PINCode"
              data={postalCodesData}
              value={postalCode.id}
              onChange={(id, name) => setPostalCode({ id, name })}
              labelField="code"
              valueField="id"
            />
            {errors.postalCode && (
              <Text style={styles.errorText}>{errors.postalCode}</Text>
            )}
          </View>
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
              placeholder='Enter Number Of Blocks'
            />
            {errors.totalBlocks && (
              <Text style={styles.errorText}>{errors.totalBlocks}</Text>
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
          <View style={styles.radioButtonCon}>
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
          {errors.status && (
            <Text style={styles.errorText}>{errors.status}</Text>
          )}
          <View style={{ marginTop: window.height * 0.05 }}>
            <PrimaryButton
              onPress={handleSubmit}
              bgColor={colors.primaryRedColor}
              radius={5}
              text={'   On Board    '}
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
