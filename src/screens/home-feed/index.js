import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {allTexts, colors, window} from '../../common';
import {PrimaryButton} from '../../components';
import {
  getAuthTokenDetails,
  removeLoginSessionDetails,
} from '../../utils/preferences/localStorage';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  useLazyGetApartmentListQuery,
  useLazyGetCityListQuery,
  useLazyGetFlatsListQuery,
} from '../../redux/services/cityServices';
import {useDispatch, useSelector} from 'react-redux';
import {setcitiesData} from '../../redux/slices/citiesdataSlice';
import {setapartmentData} from '../../redux/slices/apartmentsSlice';

const Home = ({navigation}) => {
  // const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [cityData, setCityData] = useState();
  const [apartmentData, setapartmentsData] = useState();
  const [flatdata, setflatdata] = useState();
  const [getCityList] = useLazyGetCityListQuery();
  const [getApartmentsList] = useLazyGetApartmentListQuery();
  const [getflatdata] = useLazyGetFlatsListQuery();

  const dispatch = useDispatch();
  const handletoken = async () => {
    let token = await getAuthTokenDetails();
    console.log('token', token);
  };
  const getData = () => {
    let cityPayload = {
      page: 0,
      pageSize: 200,
    };
    getCityList(cityPayload)
      .unwrap()
      .then(responce => {
        console.log('citydata===========>>>', responce?.data);
        setCityData(responce?.data);
        dispatch(setcitiesData(responce?.data));
      })
      .catch(error => {
        console.log('error in getcitydata==========>', error);
      });

    let apartmentPayload = {
      cityId: 15,
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

    const payload = {
      flatId: 29,
      pageNo: 0,
      pageSize: 100,
    };
    getflatdata(payload)
      .unwrap()
      .then(responce => {
        // console.log(responce?.data,'<==============flatdata');
        setflatdata(responce?.data);
      })
      .catch(error => {
        console.log('error in flat data==========>', error);
      });
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.mainCon}>
      <View style={styles.headerCon}>
        <Text style={styles.username}>Hi, User</Text>
        <View style={styles.iconsCon}>
          <Ionicons name="notifications" size={30} style={styles.icons} />
          <MaterialIcons name="account-circle" size={30} style={styles.icons} onPress={()=>navigation.navigate(allTexts.screenNames.myAccount)}/>
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
        <View style={{marginTop: 20}}>
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
