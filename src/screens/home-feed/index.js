import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { allTexts, colors } from '../../common';
import { PrimaryButton } from '../../components';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useLazyGetApartmentListQuery, useLazyGetCityListQuery, useLazyGetFlatsListQuery } from '../../redux/services/cityServices';
import { useDispatch } from 'react-redux';
import { useLazyGetCurrentCustomerQuery } from '../../redux/services/myAccountService';
import { setcurrentCustomerData } from '../../redux/slices/currentCustomerSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [isOneFlatOnboarded, SetIsOneFlatOnboarded] = useState(false);
  const [currentCustomer] = useLazyGetCurrentCustomerQuery();

  const handleCurrentCustomerData = () => {
    currentCustomer()
      .unwrap()
      .then(response => {
        // console.log('response of currentCustomer=======>>>>>>', response);
        setCurrentCustomerData(response);
        dispatch(setcurrentCustomerData(response));
        const hasFlat = response?.flatDTO && response.flatDTO.length > 0;
        const hasApartment = response?.apartmentDTOs && response.apartmentDTOs.length > 0;

        if (hasFlat || hasApartment) {
          SetIsOneFlatOnboarded(true);
        } else {
          SetIsOneFlatOnboarded(false);
        }
      })
      .catch(error => {
        console.log('error in currentCustomer===>', error);
      });
  };

  useEffect(() => {
    handleCurrentCustomerData();
  }, []);

  return (
    <View style={styles.mainCon}>
      <View style={styles.headerCon}>
        <Text style={styles.username}>Hi, User</Text>
        <View style={styles.iconsCon}>
          <Ionicons name="notifications" size={30} style={styles.icons} />
          <MaterialIcons name="account-circle" size={30} style={styles.icons} onPress={() => navigation.navigate(allTexts.screenNames.myAccount, { isOneFlatOnboarded: isOneFlatOnboarded})} />
        </View>
      </View>
      <View style={styles.subConOne}>
        <Image
          source={require('../../../assets/images/peopleImg.png')}
          style={styles.image}
        />
        <Text style={styles.discoverMore}>
          {allTexts.headings.discoverMore}
        </Text>
        <Text style={styles.description}>
          {allTexts.paragraphs.discoverNivaas}
        </Text>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            onPress={() =>
              navigation.navigate(allTexts.screenNames.selectCityOptions, {
                // cityData: cityData,
                // apartmentData:apartmentData,
                // flatdata:flatdata
              })
            }
            bgColor={colors.primaryRedColor}
            radius={30}
            text={'    + ADD YOUR HOME    '}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
      <View style={styles.subConTwo}>
        <TouchableOpacity>
          <Fontisto name="commenting" size={25} style={styles.commentIcon} />
          {/* <Image source={require('../../utils/assets/images/Notice.png')} style={styles.commentIcon}/> */}
        </TouchableOpacity>
        <View style={styles.textCon}>
          <Text style={styles.discoverMore}>
            {allTexts.paragraphs.accessAll}
          </Text>
          <Text style={styles.description}>
            {allTexts.paragraphs.itemPublished}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
