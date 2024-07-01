import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {statusBarHeight} from '../../utils/config/config';
import {CustomDropdown, PrimaryButton, TopBarCard2} from '../../components';
import {allTexts, colors} from '../../common';
import {useSelector} from 'react-redux';
import {useCreateFlatByaptOwnMutation} from '../../redux/services/maintainenceService';
import { ApprovedApartments, SnackbarComponent } from '../../common/customFunctions';

const PrepaidMeter = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({
    id: '',
    name: '',
  });
  // console.log(selectedApartment);
  const [numFlats, setNumFlats] = useState('');
  const [flatsDetails, setFlatsDetails] = useState([]);
  const [currentFlatIndex, setCurrentFlatIndex] = useState(0);
  const [flatDetails, setFlatDetails] = useState({
    flatNo: '',
    ownerPhoneNo: '',
    ownerName: '',
  });
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // const [isTextFieldEnabled, setIsTextFieldEnabled] = useState(false);
  const [apartmentError, setApartmentError] = useState(false);
  const [createFlatByAptOwn] = useCreateFlatByaptOwnMutation();

  const handleNumFlatsChange = value => {
    setNumFlats(value)
    if (numFlats !== 1) {
      const newFlatsDetails = Array.from({length: Number(value)}, () => ({
      flatNo: null,
      ownerPhoneNo: '',
      ownerName: '',
    }));
    setFlatsDetails(newFlatsDetails);
    } else {
      SnackbarComponent({text:'Number Of Flats Must GraterThan 1',backgroundColor:colors.red1})
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!flatDetails.flatNo) {
      newErrors.flatNo = 'Flat number is required';
    }
    if (!flatDetails.ownerPhoneNo) {
      newErrors.ownerPhoneNo = 'Owner phone number is required';
    } else if (flatDetails.ownerPhoneNo.length !== 10) {
      newErrors.ownerPhoneNo = 'Owner phone number must be 10 digits';
    }
    if (!flatDetails.ownerName) {
      newErrors.ownerName = 'Owner name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextFlat = () => {
    if (validateFields()) {
      const updatedFlatsDetails = [...flatsDetails];
      updatedFlatsDetails[currentFlatIndex] = flatDetails;
      setFlatsDetails(updatedFlatsDetails);
      setFlatDetails(
        updatedFlatsDetails[currentFlatIndex + 1] || {
          flatNo: '',
          ownerPhoneNo: '',
          ownerName: '',
        },
      );
      setCurrentFlatIndex(prevIndex => prevIndex + 1);
      setErrors({});
    }
    setHasSubmitted(true);
  };

  const handlePreviousFlat = () => {
    const updatedFlatsDetails = [...flatsDetails];
    updatedFlatsDetails[currentFlatIndex] = flatDetails;
    setFlatsDetails(updatedFlatsDetails);
    setFlatDetails(
      updatedFlatsDetails[currentFlatIndex - 1] || {
        flatNo: null,
        ownerPhoneNo: '',
        ownerName: '',
      },
    );
    setCurrentFlatIndex(prevIndex => prevIndex - 1);
    setErrors({});
  };

  const handleEditText = () => {
    if (selectedApartment?.id) {
      console.log(apartmentError);
    } else {
      setApartmentError(true);
      console.log(apartmentError);
    }
  };

  const handleSubmit = () => {
    if (validateFields()) {
      const updatedFlatsDetails = [...flatsDetails];
      updatedFlatsDetails[currentFlatIndex] = flatDetails;
      const payload = {
        apartmentId: selectedApartment?.id,
        flats: updatedFlatsDetails,
      };
      console.log(payload);
      createFlatByAptOwn(payload)
        .unwrap()
        .then(responce => {
          console.log('RESPONCE OF NEW FLAT CREATION======>', responce);
          SnackbarComponent({text:'New Flats Created Successfully',backgroundColor:colors.green})
          navigation.navigate(allTexts.screenNames.adminFlatSettings);
        })
        .catch(error => {
          console.log('ERROR IN NEW FLAT CREATION=====>', error);
          SnackbarComponent({text:'Error In Flats Creation',backgroundColor:colors.red1})

        });
      setHasSubmitted(true);
    }
  };

  useEffect(() => {
    ApprovedApartments({customerDetails:customerDetails?.customerOnboardReqData,setApartmentData:setApartmentData,setSelectedApartment:setSelectedApartment})
  }, [customerDetails?.customerOnboardReqData]);

  // useEffect(() => {
  //   if (selectedApartment?.id) {
  //     setIsTextFieldEnabled(true);
  //   }
  // }, [selectedApartment?.id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'OnBoard Your New Flats'}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        {currentFlatIndex === 0 ? (
          <View style={styles.fieldsCon}>
            <View style={styles.dropdown}>
              {/* <CustomDropdown
                label="Apartment"
                showLabel={false}
                data={apartmentData}
                value={selectedApartment.id}
                onChange={(id, name) => setSelectedApartment({id, name})}
                labelField="name"
                valueField="id"
              /> */}
              {apartmentData?.length >= 1 && (
          <View>
            <CustomDropdown
              label="Owner"
              data={apartmentData}
              value={selectedApartment}
              onChange={(id, name) => setSelectedApartment({id, name})}
              labelField="name"
              valueField="id"
            />
          </View>
        )}
              {apartmentError && (
                <Text style={styles.errorText}>
                 Select Any Apartment Here
                </Text>
              )}
            </View>
            {/* <Pressable
              onPress={handleEditText}
              style={styles.inputContainerOne}>
              <TextInput
                style={styles.input}
                value={numFlats}
                onChangeText={handleNumFlatsChange}
                keyboardType="numeric"
                placeholder="Enter Number Of Flats"
                editable={isTextFieldEnabled}
              />
            </Pressable> */}
            <View style={styles.inputContainerOne}>
            <TextInput
                style={styles.input}
                value={numFlats}
                onChangeText={handleNumFlatsChange}
                keyboardType="numeric"
                placeholder="Enter Number Of Flats"
              />
          </View>
            </View>
        ) : null}
        {currentFlatIndex < numFlats && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Enter Details For Flat {currentFlatIndex + 1}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Flat Number"
              value={flatDetails.flatNo}
              onChangeText={text =>
                setFlatDetails({...flatDetails, flatNo: text})
              }
            />
            {hasSubmitted && errors.flatNo && (
              <Text style={styles.errorText}>{errors.flatNo}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Owner Phone Number"
              value={flatDetails.ownerPhoneNo}
              onChangeText={text =>
                setFlatDetails({
                  ...flatDetails,
                  ownerPhoneNo: text.replace(/[^0-9]/g, '').slice(0, 10),
                })
              }
              keyboardType="phone-pad"
              maxLength={10}
            />
            {hasSubmitted && errors.ownerPhoneNo && (
              <Text style={styles.errorText}>{errors.ownerPhoneNo}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              value={flatDetails.ownerName}
              onChangeText={text =>
                setFlatDetails({...flatDetails, ownerName: text})
              }
            />
            {hasSubmitted && errors.ownerName && (
              <Text style={styles.errorText}>{errors.ownerName}</Text>
            )}
            <View style={styles.buttonContainer}>
              {currentFlatIndex > 0 && (
                <View style={{width: '45%'}}>
                  <PrimaryButton
                    text={'Previous'}
                    bgColor={colors.primaryColor}
                    onPress={handlePreviousFlat}
                  />
                </View>
              )}
              <View
                style={currentFlatIndex < 1 ? {width: '100%'} : {width: '45%'}}>
                <PrimaryButton
                  text={
                    currentFlatIndex === numFlats - 1 ? (
                      'Submit'
                    ) : (
                      <Text>OnBoard Flat {currentFlatIndex + 2}</Text>
                    )
                  }
                  bgColor={colors.primaryColor}
                  onPress={
                    currentFlatIndex === numFlats - 1
                      ? handleSubmit
                      : handleNextFlat
                  }
                />
              </View>
            </View>
          </View>
        )}

        {currentFlatIndex >= numFlats && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary of Flats Details</Text>
            {flatsDetails.map((flat, index) => (
              <View key={index} style={styles.flatDetailsContainer}>
                <Text style={styles.summaryText}>
                  Flat Number: {flat.flatNo}
                </Text>
                <Text style={styles.summaryText}>
                  Owner Phone Number: {flat.ownerPhoneNo}
                </Text>
                <Text style={styles.summaryText}>
                  Owner Name: {flat.ownerName}
                </Text>
              </View>
            ))}
            <PrimaryButton
              text={'Submit'}
              bgColor={colors.primaryColor}
              onPress={handleSubmit}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PrepaidMeter;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '5%',
    justifyContent: 'space-around',
  },
  fieldsCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  dropdown: {
    width: '45%',
  },
  inputContainerOne: {
    width: '45%',
    marginTop: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  flatDetailsContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  summaryText: {
    fontSize: 14,
    color: colors.black,
  },
});
