import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { allTexts, colors } from '../../common';
import { styles } from './style';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetApartmentListQuery, useLazyGetCityListQuery, useLazyGetFlatsListQuery } from '../../redux/services/cityServices';
import { setcitiesData } from '../../redux/slices/citiesdataSlice';
import { setapartmentData } from '../../redux/slices/apartmentsSlice';

const SelectCityOptions = ({ navigation }) => {
  const [cityValue, setCityValue] = useState({ id: null, name: null });
  const [apartmentValue, setApartmentValue] = useState({ id: null, name: null });
  const [flatValue, setFlatValue] = useState({ id: null, name: null });

  // const [cityData, setCityData] = useState();
  const [apartmentData, setapartmentsData] = useState();
  const [flatdata, setflatdata] = useState();

  const [getCityList] = useLazyGetCityListQuery();
  const [getApartmentsList] = useLazyGetApartmentListQuery();
  const [getflatdata] = useLazyGetFlatsListQuery();

  const dispatch = useDispatch();

  const cityOpacity = useRef(new Animated.Value(0)).current;
  const apartmentOpacity = useRef(new Animated.Value(0)).current;
  const flatOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const {citiesData} = useSelector(state=>state.cityData);
    Animated.timing(cityOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
    }).start();

  const handleApartmentData = (id) => {
    let apartmentPayload = {
      cityId: id,
    };
    Animated.timing(apartmentOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    getApartmentsList(apartmentPayload)
      .unwrap()
      .then(response => {
        setapartmentsData(response?.data);
        dispatch(setapartmentData(response?.data));
      })
      .catch(error => {
        console.log('error in apartments data========>', error);
      });
  }

  const handleFlatData = (id) => {
    const flatPayload = {
      flatId: id,
      pageNo: 0,
      pageSize: 100,
    };
    Animated.timing(flatOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    getflatdata(flatPayload)
      .unwrap()
      .then(response => {
        const processedFlatData = response?.data.map(item => ({
          ...item,
          flatNo: String(item.flatNo),
        }));
        setflatdata(processedFlatData);
      })
      .catch(error => {
        console.log('error in flat data==========>', error);
      });
  }

  const handleData = () => {
    navigation.navigate(allTexts.screenNames.userOnBoardingForm, {
      cityValue: cityValue?.name,
      apartmentValue: apartmentValue?.name,
      flatValue: flatValue?.name,
      flatId: flatValue?.id,
    });
  };

  // useEffect(() => {
  //   handleCityData();
  // }, []);

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

  useEffect(() => {
    if (flatValue.id) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [flatValue.id]);

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'Add Your Home'} navigation={navigation} />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Animated.View style={{ ...styles.eachDropdownCon, opacity: cityOpacity }}>
            <CustomDropdown
              label="City"
              showLabel={true}
              data={citiesData}
              value={cityValue.id}
              onChange={(id, name) => setCityValue({ id, name })}
              labelField="name"
              valueField="id"
            />
          </Animated.View>
          {cityValue?.id && (
            <Animated.View style={{ ...styles.eachDropdownCon, opacity: apartmentOpacity }}>
              <CustomDropdown
                label="Apartment"
                showLabel={true}
                data={apartmentData}
                value={apartmentValue.id}
                onChange={(id, name) => setApartmentValue({ id, name })}
                labelField="name"
                valueField="id"
              />
              {(apartmentData || !apartmentData) && (
                <View style={styles.apartmentsErrorHandlerCon}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(allTexts.screenNames.newApartmentOnBoard)
                    }>
                    <Text style={{ color: colors.primaryRedColor, fontWeight: '500' }}>
                      +On Board
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          )}
          {apartmentValue?.id && (
            <Animated.View style={{ ...styles.eachDropdownCon, opacity: flatOpacity }}>
              <CustomDropdown
                label="Flat Number"
                showLabel={true}
                data={flatdata}
                value={flatValue}
                onChange={(id, name) => setFlatValue({ id, name })}
                labelField="flatNo"
                valueField="id"
              />
              {!flatdata || (flatdata.length === 0 && (
                <View>
                  <Text style={styles.errorMessage}>{'No Flats Here'}</Text>
                </View>
              ))}
            </Animated.View>
          )}
          {flatValue?.id && (
            <Animated.View style={{ ...styles.buttonContainer, opacity: buttonOpacity }}>
              <PrimaryButton
                onPress={() => handleData()}
                bgColor={colors.primaryRedColor}
                radius={5}
                text={'Next'}
                shadow={true}
                textColor={colors.white}
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SelectCityOptions;
