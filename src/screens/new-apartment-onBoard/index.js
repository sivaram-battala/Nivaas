import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { styles } from './style';
import { colors, window } from '../../common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { validateForm } from './validation'; // Import the validation function
import { onBoardNewApartmentSchema } from '../../common/schemas';
import { useNewApartmentOnboardingMutation } from '../../redux/services/cityServices';

const NewApartmentOnBoard = ({ navigation }) => {
  const [cityValue, setCityValue] = useState({ id: null, name: null });
  const [apartment, setApartment] = useState('');
  const [numBlocks, setNumBlocks] = useState('');
  const [numFlatsPerBlock, setNumFlatsPerBlock] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [postNewApartment] = useNewApartmentOnboardingMutation();

  const { citiesData } = useSelector(state => state.cityData);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const payload = {
      city: cityValue,
      apartment,
      numBlocks,
      numFlatsPerBlock,
      addressLine1,
      addressLine2,
      selectedOption,
    };
    console.log();
    const { valid, errors } = onBoardNewApartmentSchema(payload);
    if (valid) {
      console.log(payload);
      postNewApartment(payload)
        .unwrap()
        .then((responce)=>{
          console.log('New Apartment onboarding',responce);
        }).catch((error)=>{
          console.log('Error in New Apartment onboarding',error);
        })
    } else {
      setErrors(errors);
    }
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'New Apartment OnBoard'} navigation={navigation} />
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
          </View>
          <Text style={styles.fieldName}>Apartment</Text>
          <View style={styles.eachFieledCon}>
            <TextInput
              style={styles.input}
              onChangeText={setApartment}
              value={apartment}
            />
            {errors.apartment && (
              <Text style={styles.errorText}>{errors.apartment}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <Text style={styles.fieldName}>Number Of Blocks</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNumBlocks}
              value={numBlocks}
            />
            {errors.numBlocks && (
              <Text style={styles.errorText}>{errors.numBlocks}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <Text style={styles.fieldName}>Number Of Flats Per Block</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNumFlatsPerBlock}
              value={numFlatsPerBlock}
            />
            {errors.numFlatsPerBlock && (
              <Text style={styles.errorText}>{errors.numFlatsPerBlock}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <Text style={styles.fieldName}>Address Line 1</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine1}
              value={addressLine1}
            />
            {errors.addressLine1 && (
              <Text style={styles.errorText}>{errors.addressLine1}</Text>
            )}
          </View>
          <View style={styles.eachFieledCon}>
            <Text style={styles.fieldName}>Address Line 2</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddressLine2}
              value={addressLine2}
            />
          </View>
          <View style={styles.radioButtonCon}>
            <View style={styles.buttonView}>
              <FontAwesome
                name={selectedOption === 'option1' ? 'circle' : 'circle-o'}
                size={24}
                color={selectedOption === 'option1' ? colors.primaryRedColor : colors.gray}
                style={styles.radioButton}
                onPress={() => handleOptionSelect('option1')}
              />
              <Text style={styles.optionText}>Under Construction</Text>
            </View>
            <View style={styles.buttonView}>
              <FontAwesome
                name={selectedOption === 'option2' ? 'circle' : 'circle-o'}
                size={24}
                color={selectedOption === 'option2' ? colors.primaryRedColor : colors.gray}
                style={styles.radioButton}
                onPress={() => handleOptionSelect('option2')}
              />
              <Text style={styles.optionText}>Positioned</Text>
            </View>
          </View>
          {errors.selectedOption && (
            <Text style={styles.errorText}>{errors.selectedOption}</Text>
          )}
          <View style={{ marginTop: window.height * 0.04 }}>
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