import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {allTexts, colors, window} from '../../common';
import {PrimaryButton} from '../../components';
import {getAuthTokenDetails, removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useLazyGetCityListQuery } from '../../redux/services/cityServices';
import { useDispatch, useSelector } from 'react-redux';
import { setcitiesData } from '../../redux/slices/citiesdataSlice';

const Home = ({navigation}) => {
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [data, setData] = useState();
  const [getCityList] = useLazyGetCityListQuery();
  const dispatch = useDispatch();
  const handletoken = async () =>{
   let token = await getAuthTokenDetails();
   console.log('token', token);
  }
  const getData =()=>{
    let payload = {
      page:0,
      pageSize:100
    }
    getCityList(payload).unwrap().then((responce)=>{
      // console.log('resssss===========>>>',responce?.data);
      setData(responce?.data);
      dispatch(setcitiesData(responce?.data))
    }).catch((error)=>{
      console.log('===========>>>error in getcitydata',error);
    })
  }

  useEffect(() => {
    getData();
  }, [])
  

  return (
    <View style={styles.mainCon}>
      {/* <TouchableOpacity
        onPress={()=>handletoken()}>
        <Text>NIVAAS home</Text>
      </TouchableOpacity>
      <View style={{width:'20%'}}>
        <PrimaryButton
          onPress={async () => {
            await removeLoginSessionDetails();
            setLoginDetails(null);
          }}
          bgColor={colors.orangeColor}
          loading={false}
          radius={25}
          text={'Log out'}
          shadow={true}
          textColor={colors.white}
        />
      </View> */}
      <View style={styles.headerCon}>
        <Text style={styles.username}>Hi, User</Text>
        <FontAwesome name="user" size={30} color={colors.black} onPress={()=>navigation.navigate(allTexts.screenNames.myAccount)}/>
      </View>
      <View style={styles.subConOne}>
        <Image
          source={require('../../../assets/images/peopleImg.png')}
          style={styles.image}
        />
        <Text style={styles.discoverMore}>Discover more at Nivaas</Text>
        <Text style={styles.description}>
          Discover Nivaas for buying,selling and renting homes and apartments,
          as well as scheduling apartment visits and accessing household
          services
        </Text>
        <View style={{marginTop: 20}}>
          <PrimaryButton
            onPress={() => navigation.navigate(allTexts.screenNames.searchCity,{data:data})}
            bgColor={colors.orangeColor}
            radius={30}
            text={'    + ADD YOUR HOME    '}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
      <View style={styles.subConTwo}>
        <Fontisto name="commenting" size={25} style={styles.commentIcon}/>
        <View style={styles.textCon}>
          <Text style={styles.discoverMore}>
            Access all importent announcements notices and cirulers here{' '}
          </Text>
          <Text style={styles.description}>
            No item published yet from your society
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
