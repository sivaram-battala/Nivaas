import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity, Alert,ScrollView,RefreshControl,SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {allTexts, colors} from '../../common';
import {CompleteProfileModal, Loader, PrimaryButton} from '../../components';
import {useLazyGetCurrentCustomerQuery} from '../../redux/services/myAccountService';
import {setcurrentCustomerData} from '../../redux/slices/currentCustomerSlice';
import {styles} from './styles';
import Carousel from 'react-native-reanimated-carousel';
import { useFocusEffect } from '@react-navigation/native';
import { setcitiesData } from '../../redux/slices/citiesdataSlice';
import { useLazyGetCityListQuery } from '../../redux/services/cityServices';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [loder, setLoder] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [isOneFlatOnboarded, SetIsOneFlatOnboarded] = useState(false);
  const [cityData, setCityData] = useState();
  const [isNewUser, setIsNewUser] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCustomer] = useLazyGetCurrentCustomerQuery();
  const [getCityList] = useLazyGetCityListQuery();


  const handleCurrentCustomerData = () => {
    setLoder(true);
    currentCustomer()
      .unwrap()
      .then(response => {
        // console.log("CURRENT CUSTOMER ===>",response);
        setLoder(false);
        setCurrentCustomerData(response);
        dispatch(setcurrentCustomerData(response));
        const hasFlat = response?.flatDTO && response.flatDTO.length > 0;
        const hasApartment =
          response?.apartmentDTOs && response.apartmentDTOs.length > 0;
        if (hasFlat || hasApartment) {
          SetIsOneFlatOnboarded(true);
        } else {
          SetIsOneFlatOnboarded(false);
        }
        if (response?.newUser) {
          setIsNewUser(true);
          setModalVisible(true);
        }
      })
      .catch(error => {
        console.log('error in currentCustomer===>', error);
      });
  };

  const handleCityData = () => {
    let cityPayload = {
      page: 0,
      pageSize: 200,
    };
    getCityList(cityPayload)
      .unwrap()
      .then(response => {
        setCityData(response?.data);
        dispatch(setcitiesData(response?.data));
      })
      .catch(error => {
        console.log('error in getcitydata==========>', error);
      });
  };


  const handleRefresh = () => {
    setRefresh(false);
    handleCurrentCustomerData();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSave = (name, email) => {
    console.log('Saving user data:', {name, email});
    setModalVisible(false);
    handleCurrentCustomerData();
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     handleCurrentCustomerData();
  //     handleCityData();
  //   }, []),
  // );
  useEffect(() => {
    handleCurrentCustomerData();
    handleCityData();
  }, [])
  
  useEffect(() => {
    let timer;
    if (loder) {
      timer = setTimeout(() => {
        setRefresh(true);
        setLoder(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [loder]);

  return (
    <SafeAreaView style={styles.mainCon}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <CompleteProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={handleSave}
        id={currentCustomerData?.id}
      />
      {loder || refresh ? (
        <View>
          {loder && <Loader color={colors.primaryRedColor} size={'large'} />}
          {refresh && (
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}>
              <FontAwesome
                name="refresh"
                size={20}
                color={colors.primaryRedColor}
              />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.headerCon}>
            <View style={styles.usernameCon}>
              <Text style={styles.username}>
                Hi, {currentCustomerData?.fullName}
              </Text>
            </View>
            <View style={styles.iconsCon}>
              <Ionicons
                name="notifications"
                size={30}
                style={styles.icons}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.notification)
                }
              />
              <MaterialIcons
                name="account-circle"
                size={30}
                style={styles.icons}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.myAccount, {
                    isOneFlatOnboarded: isOneFlatOnboarded,
                  })
                }
              />
            </View>
          </View>
          {/* <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={'90%'}
                height={'40%'}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={3000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View> */}
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
            <View style={{marginTop: 20}}>
              <PrimaryButton
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.selectCityOptions)
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
            <Fontisto name="commenting" size={25} style={styles.commentIcon} />
            <View style={styles.textCon}>
              <Text style={styles.discoverMore}>
                {allTexts.paragraphs.accessAll}
              </Text>
              <Text style={styles.descriptionTwo}>
                {allTexts.paragraphs.itemPublished}
              </Text>
            </View>
          </View>
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
