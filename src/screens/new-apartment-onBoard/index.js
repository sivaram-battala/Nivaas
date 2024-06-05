import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {CustomDropdown, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {styles} from './style';
import {allTexts, colors, window} from '../../common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {validateForm} from './validation'; // Import the validation function
import {onBoardNewApartmentSchema} from '../../common/schemas';
import {useLazyGetPostalCodeListQuery, useNewApartmentOnboardingMutation} from '../../redux/services/cityServices';
import { RadioGroup } from 'react-native-radio-buttons-group';

const NewApartmentOnBoard = ({navigation}) => {
  const [cityValue, setCityValue] = useState({id: null, name: null});
  const [apartment, setApartment] = useState('');
  const [numBlocks, setNumBlocks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [postalCodesData,SetPostalCodesData] = useState();
  const [postNewApartment] = useNewApartmentOnboardingMutation();
  const [getPostalCodesList] = useLazyGetPostalCodeListQuery();

  const {citiesData} = useSelector(state => state.cityData);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const payload = {
      name: 'Saradhaa Nivaas',
      code: 'NA123',
      description: apartment,
      totalBlocks: numBlocks,
      apartmentType: 'MULTIBLOCK',
      builderName: 'Siva',
      status: selectedOption,
      isUnderConstruction: 'false',
      availableForRent: 'false',
      availableForSale: 'true',
      line1: addressLine1,
      line2: addressLine2,
      line3: 'street',
      postalCode: '531002',
      locality: cityValue?.name,
      contactNumber: '9391164656',
      defaultAddress: true,
    };
    postNewApartment(payload)
      .unwrap()
      .then(responce => {
        console.log('New Apartment onboarding', responce);
      })
      .catch(error => {
        console.log('Error in New Apartment onboarding', error);
      });
    const { valid, errors } = onBoardNewApartmentSchema(payload);
    if (valid) {
      console.log(payload);
      postNewApartment(payload)
        .unwrap()
        .then((responce)=>{
          console.log('New Apartment onboarding',responce);
          SetPostalCodesData(responce);
        }).catch((error)=>{
          console.log('Error in New Apartment onboarding',error);
        })
        navigation.navigate(allTexts.screenNames.home);
    } else {
      setErrors(errors);
    }
  };

  const handlePostalCodesData=()=>{
    const postalCodePayload = {
      pageNo:0,
      pageSize:30
    }
    getPostalCodesList(postalCodePayload)
      .unwrap()
      .then((responce)=>{
        const processedPostalCodeData = responce?.data.map(item => ({
          ...item,
          code: String(item.code),
        }));
        SetPostalCodesData(processedPostalCodeData)
      }).catch((error)=>{
        console.log('ERRPR IN POSTALCODES',error);
      })
  }

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
  }, [])
  
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
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
              onChange={(id, name) => setCityValue({id, name})}
              labelField="name"
              valueField="id"
            />
            {!citiesData && (
              <Text style={styles.errorText}>{'No Cities Here'}</Text>
            )}
            <CustomDropdown
              label="PINCode"
              data={postalCodesData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({id, name})}
              labelField="code"
              valueField="id"
            />
          </View>
          {/* <Text style={styles.fieldName}>Apartment</Text> */}
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setApartment}
              value={apartment}
              placeholder='Enter Apartment Name'
            />
            {errors.apartment && (
              <Text style={styles.errorText}>{errors.apartment}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            {/* <Text style={styles.fieldName}>Number Of Blocks</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={setNumBlocks}
              value={numBlocks}
              placeholder='Enter Number Of Blocks'
            />
            {errors.numBlocks && (
              <Text style={styles.errorText}>{errors.numBlocks}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            {/* <Text style={styles.fieldName}>Address Line 1</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine1}
              value={addressLine1}
              placeholder='Enter Address Line 1'
            />
            {errors.addressLine1 && (
              <Text style={styles.errorText}>{errors.addressLine1}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            {/* <Text style={styles.fieldName}>Address Line 2</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine2}
              value={addressLine2}
              placeholder='Enter Address Line 2'
            />
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
          {errors.selectedOption && (
            <Text style={styles.errorText}>{errors.selectedOption}</Text>
          )}
          <View style={{marginTop: window.height * 0.05}}>
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
