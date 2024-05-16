import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {styles} from './style';
import {Formik} from 'formik';
import {colors, window} from '../../common';
import {onboardValidationSchema} from '../../common/schemas';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const NewApartmentOnBoard = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };

  const {citiesData} = useSelector(state => state.cityData);
  // setCityData(cityy.citiesData);
  // console.log(cityData,'iudcbibdlskj');
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'On Boarding'} navigation={navigation} />
      </View>
      <View>
        <Formik
          initialValues={{
            city: '',
            apartment: '',
            numBlocks: '',
            numFlatsPerBlock: '',
            addressLine1: '',
            addressLine2: '',
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={onboardValidationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View style={styles.eachFieledCon}>
                <Text style={styles.fieldName}>City</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: colors.orangeColor},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.placeholderStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={citiesData.map(cities => ({
                    cityName: cities.name,
                    id: cities.id,
                  }))}
                  maxHeight={300}
                  labelField="cityName"
                  valueField="id"
                  placeholder={!isFocus ? 'Select city' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.id);
                    handleChange('city')(item.cityName);
                    setIsFocus(false);
                  }}
                />
                {errors.city && touched.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
              </View>
              <Text style={styles.fieldName}>Apartment</Text>
              <View style={styles.eachFieledCon}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('apartment')}
                  onBlur={handleBlur('apartment')}
                  value={values.apartment}
                  //   placeholder="Apartment"
                />
                {errors.apartment && touched.apartment && (
                  <Text style={styles.errorText}>{errors.apartment}</Text>
                )}
              </View>
              <View style={styles.eachFieledCon}>
                <Text style={styles.fieldName}>Number Of Blocks</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('numBlocks')}
                  onBlur={handleBlur('numBlocks')}
                  value={values.numBlocks}
                />
                {errors.numBlocks && touched.numBlocks && (
                  <Text style={styles.errorText}>{errors.numBlocks}</Text>
                )}
              </View>
              <View style={styles.eachFieledCon}>
                <Text style={styles.fieldName}>Number Of Flats Per Block</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('numFlatsPerBlock')}
                  onBlur={handleBlur('numFlatsPerBlock')}
                  value={values.numFlatsPerBlock}
                  //   placeholder="Number Of Flats Per Block"
                />
                {errors.numFlatsPerBlock && touched.numFlatsPerBlock && (
                  <Text style={styles.errorText}>
                    {errors.numFlatsPerBlock}
                  </Text>
                )}
              </View>
              <View style={styles.eachFieledCon}>
                <Text style={styles.fieldName}>Address Line 1</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('addressLine1')}
                  onBlur={handleBlur('addressLine1')}
                  value={values.addressLine1}
                  //   placeholder="Address Line 1"
                />
                {errors.addressLine1 && touched.addressLine1 && (
                  <Text style={styles.errorText}>{errors.addressLine1}</Text>
                )}
              </View>
              <View style={styles.eachFiledCon}>
                <Text style={styles.fieldName}>Address Line 2</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('addressLine2')}
                  onBlur={handleBlur('Address Line 2')}
                  value={values.addressLine2}
                  //   placeholder="Address Line 2"
                />
                {errors.apartment && touched.apartment && (
                  <Text style={styles.errorText}>{errors.apartment}</Text>
                )}
              </View>
              <View style={styles.radioButtonCon}>
                <View style={styles.buttonView}>
                  <FontAwesome
                    name={selectedOption === 'option1' ? 'circle' : 'circle-o'}
                    size={24}
                    color={
                      selectedOption === 'option1'
                        ? colors.orangeColor
                        : colors.gray
                    }
                    style={styles.radioButton}
                    onPress={() => handleOptionSelect('option1')}
                  />
                  <Text style={styles.optionText}>Under Construction</Text>
                </View>
                <View style={styles.buttonView}>
                  <FontAwesome
                    name={selectedOption === 'option2' ? 'circle' : 'circle-o'}
                    size={24}
                    color={
                      selectedOption === 'option2'
                        ? colors.orangeColor
                        : colors.gray
                    }
                    style={styles.radioButton}
                    onPress={() => handleOptionSelect('option2')}
                  />
                  <Text style={styles.optionText}>Positioned</Text>
                </View>
              </View>
              <View style={{marginTop: window.height * 0.04}}>
                <PrimaryButton
                  onPress={handleSubmit}
                  bgColor={colors.orangeColor}
                  radius={5}
                  text={'   On Board    '}
                  shadow={true}
                  textColor={colors.white}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewApartmentOnBoard;
