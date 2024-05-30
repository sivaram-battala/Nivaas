import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CustomDropdown, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import {Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {useLazyGetApartmentListQuery,useLazyGetCityListQuery,useLazyGetFlatsListQuery} from '../../redux/services/cityServices';
import {setcitiesData} from '../../redux/slices/citiesdataSlice';
import {setapartmentData} from '../../redux/slices/apartmentsSlice';

const SelectCityOptions = ({navigation, route}) => {
  // const data = route?.params || '';
  // console.log('route data in city details form ============>', data);
  const [cityValue, setCityValue] = useState({id: null, name: null});
  const [apartmentValue, setApartmentValue] = useState({id: null, name: null});
  const [flatValue, setFlatValue] = useState({id: null, name: null});

  const [cityData, setCityData] = useState();
  const [apartmentData, setapartmentsData] = useState();
  const [flatdata, setflatdata] = useState();
  // const dataWithStringIDs = flatdata.map(item => ({
  //   ...item,
  //   flatNo: String(item.flatNo),  // or id: item.id.toString()
  // }));
  const [getCityList] = useLazyGetCityListQuery();
  const [getApartmentsList] = useLazyGetApartmentListQuery();
  const [getflatdata] = useLazyGetFlatsListQuery();
  
  const dispatch = useDispatch();
  const handletoken = async () => {
    let token = await getAuthTokenDetails();
    console.log('token', token);
  };
  const handleCityData = () => {
    let cityPayload = {
      page: 0,
      pageSize: 200,
    };
    getCityList(cityPayload)
      .unwrap()
      .then(responce => {
        // console.log('citydata===========>>>', responce?.data);
        setCityData(responce?.data);
        dispatch(setcitiesData(responce?.data));
      })
      .catch(error => {
        console.log('error in getcitydata==========>', error);
      });
  };

  const handleApartmentData =(id)=>{
    // console.log(id,'APARTMENTDATA');
    let apartmentPayload = {
      cityId:id,
    };
    getApartmentsList(apartmentPayload)
      .unwrap()
      .then(responce => {
        // console.log('apartments data===========>',responce?.data);
        setapartmentsData(responce?.data);
        dispatch(setapartmentData(responce?.data));
      })
      .catch(error => {
        console.log('error in apartments data========>', error);
      });
  }

  const handleFlatData =(id)=>{
    // console.log(id,'FLATDATAAA');
    const flatPayload = {
      flatId:85,
      pageNo: 0,
      pageSize: 100,
    };
    getflatdata(flatPayload)
      .unwrap()
      .then(responce => {
        // console.log('flatData=============>',responce?.data);
        const processedFlatData = responce?.data.map(item => ({
          ...item,
          flatNo: String(item.flatNo),
        }));
        setflatdata(processedFlatData);
        // setflatdata(responce?.data);
      })
      .catch(error => {
        console.log('error in flat data==========>', error);
      });
  }

  useEffect(() => {
    handleCityData();
  }, []);
  useEffect(() => {
    if (cityValue.id) {
      handleApartmentData(cityValue.id);
    }
  }, [cityValue.id]);
  useEffect(() => {
    if (apartmentValue.id) {
      handleFlatData(apartmentValue.id);
    }
  }, [apartmentValue.id]);

  const flatNumbersData = [
    {flatNo: '3897', id: '36'},
    {flatNo: '4536', id: '37'},
  ];

  const handleData = () => {
    // console.log({ cityValue, apartmentValue, flatValue });
    // if (!cityValue.id) {
    //   Alert.alert('Validation Error', 'Please select a city.');
    //   return;
    // }
    // if (!apartmentValue.id) {
    //   Alert.alert('Validation Error', 'Please select an apartment.');
    //   return;
    // }
    // if (!flatValue.id) {
    //   Alert.alert('Validation Error', 'Please select a flat number.');
    //   return;
    // }
    navigation.navigate(allTexts.screenNames.userOnBoardingForm, {
      cityValue: cityValue?.name,
      apartmentValue: apartmentValue?.name,
      flatValue: flatValue?.name,
      flatId: flatValue?.id,
    });
  };

  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'On Boarding'} navigation={navigation} />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.eachDropdownCon}>
            <CustomDropdown
              label="City"
              data={cityData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({id, name})}
              labelField="name"
              valueField="id"
            />
            {/* {!cityData && (
              <View>
                <Text style={styles.errorMessage}>{'No Cities Here'}</Text>
              </View>
            )} */}
          </View>
          {cityValue?.id && (
            <View style={styles.eachDropdownCon}>
              <CustomDropdown
                label="Apartment"
                data={apartmentData}
                value={apartmentValue.id}
                onChange={(id, name) => setApartmentValue({id, name})}
                labelField="name"
                valueField="id"
              />
              {apartmentData && (
                <View style={styles.apartmentsErrorHandlerCon}>
                  {/* <Text style={styles.errorMessage}>
                    {'No Apartments Here'}
                  </Text> */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        allTexts.screenNames.newApartmentOnBoard,
                      )
                    }>
                    <Text style={{color: colors.blue, fontWeight: '500'}}>
                      +On Board
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          {apartmentValue?.id && (
            <View style={styles.eachDropdownCon}>
              <CustomDropdown
                label="Flat Number"
                data={flatdata}
                value={flatValue}
                onChange={(id, name) => setFlatValue({id, name})}
                labelField="flatNo"
                valueField="id"
              />
              {!flatdata ||
                (flatdata.length === 0 && (
                  <View>
                    <Text style={styles.errorMessage}>{'No Flats Here'}</Text>
                  </View>
                ))}
            </View>
          )}
          {flatValue?.id && (
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPress={() => handleData()}
                bgColor={colors.primaryRedColor}
                radius={5}
                text={'Next'}
                shadow={true}
                textColor={colors.white}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SelectCityOptions;
