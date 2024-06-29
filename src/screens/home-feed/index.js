import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity, Alert,ScrollView,RefreshControl,SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {allTexts, colors} from '../../common';
import {CompleteProfileModal, CustomSneakBar, HomeComponent, Loader, PrimaryButton} from '../../components';
import {useLazyGetCurrentCustomerQuery, useUserDetailsMutation} from '../../redux/services/myAccountService';
import {setcurrentCustomerData, setprofilePic} from '../../redux/slices/currentCustomerSlice';
import {styles} from './styles';
import { setcitiesData } from '../../redux/slices/citiesdataSlice';
import { useLazyGetCityListQuery } from '../../redux/services/cityServices';
import { NetworkInfo, SnackbarComponent } from '../../common/customFunctions';
import messaging from '@react-native-firebase/messaging';
import RNRestart from 'react-native-restart';

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
  const [fcmToken, setFcmToken] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState();
  const [currentCustomer] = useLazyGetCurrentCustomerQuery();
  const [getCityList] = useLazyGetCityListQuery();
  const [postUserDetails] = useUserDetailsMutation();

  const handleCurrentCustomerData = () => {
    setLoder(true);
    currentCustomer()
      .unwrap()
      .then(response => {
        // console.log("CURRENT CUSTOMER ===>",response);
        setLoder(false);
        setCurrentCustomerData(response);
        dispatch(setcurrentCustomerData(response));
        dispatch(setprofilePic(response?.profilePicture))
        const hasFlat = response?.flatDTO && response?.flatDTO?.length > 0;
        const hasApartment =
          response?.apartmentDTOs && response?.apartmentDTOs?.length > 0;
        if (hasFlat || hasApartment) {
          SetIsOneFlatOnboarded(true);
        } else {
          SetIsOneFlatOnboarded(false);
        }
        if (response?.newUser) {
          setIsNewUser(true);
          setModalVisible(true);
        }else{
          setModalVisible(false);
        }
      })
      .catch(error => {
        console.log('error in currentCustomer===>', error);
        SnackbarComponent({text:'Cheak Your Internet',backgroundColor:colors.red1})
      });
  };

  const handlefcmCall = () => {
      if (currentCustomerData?.newUser === true) {
        console.log('function called');
        const payload = {
        id: currentCustomerData?.id,
        fullName: currentCustomerData?.fullName || null,
        email:currentCustomerData?.email || null,
        token:fcmToken
      };
      postUserDetails(payload)
        .unwrap()
        .then((responce) => {
          console.log("postUserDetails RESPONCE ======>",responce);
        })
        .catch(error => {
          console.log('ERROR In POSTING USERDETAILS===>', error);
        });
      }
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

  const checkToken = async () => {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    setFcmToken(token);
    // console.log('Device Token:', token);
  }
  checkToken();

  const handleRefresh = () => {
    setRefresh(false);
    handleCurrentCustomerData();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    RNRestart.Restart();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSave = (name, email) => {
    console.log('Saving user data:', {name, email});
    setModalVisible(false);
    handleCurrentCustomerData();
  };

  useEffect(() => {
    handleCurrentCustomerData();
    handleCityData();
    NetworkInfo();
    SnackbarComponent({text:'Refresh the page to get the latest updates',backgroundColor:colors.primaryColor})
  }, [])
  
  useEffect(() => {
    if (isInitialRender) {
      handlefcmCall();
    } else {
      setIsInitialRender(false);
    }
  }, [fcmToken])
  
  useEffect(() => {
    let timer=null;
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
      showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primaryColor]}/>
        }>
      <CompleteProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={handleSave}
        id={currentCustomerData?.id}
        fcmToken={fcmToken}
      />
      {/* {loder || refresh ? ( */}
        <View>
          {/* {loder && <Loader color={colors.primaryColor} size={'large'} />} */}
          {/* {refresh && ( */}
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}>
              <FontAwesome
                name="refresh"
                size={20}
                color={colors.primaryColor}
              />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          {/* )} */}
        </View>
       {/* ) : ( */}
        <HomeComponent currentCustomerData={currentCustomerData} navigation={navigation} isOneFlatOnboarded={isOneFlatOnboarded}/>
       {/* )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
