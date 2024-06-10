import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { allTexts, colors } from '../../common';
import { CompleteProfileModal, Loader, PrimaryButton } from '../../components';
import { useLazyGetCurrentCustomerQuery } from '../../redux/services/myAccountService';
import { setcurrentCustomerData } from '../../redux/slices/currentCustomerSlice';
import { styles } from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loder, setLoder] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [isOneFlatOnboarded, SetIsOneFlatOnboarded] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCustomer] = useLazyGetCurrentCustomerQuery();

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
        const hasApartment = response?.apartmentDTOs && response.apartmentDTOs.length > 0;
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

  useEffect(() => {
    // requestUserPermission();
    handleCurrentCustomerData();
  }, []);

  const handleSave = (name, email) => {
    console.log('Saving user data:', { name, email });
    setModalVisible(false);
  };

  return (
    <View style={styles.mainCon}>
      <CompleteProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={handleSave}
        id={currentCustomerData?.id}
      />
      {
        loder ? (
          <View>
            <Loader color={colors.primaryRedColor} size={'large'} />
          </View>
        ) : (
          <View>
            <View style={styles.headerCon}>
        <Text style={styles.username}>Hi, {currentCustomerData?.fullName}</Text>
        <View style={styles.iconsCon}>
          <Ionicons name="notifications" size={30} style={styles.icons} onPress={() => navigation.navigate(allTexts.screenNames.notification)} />
          <MaterialIcons name="account-circle" size={30} style={styles.icons} onPress={() => navigation.navigate(allTexts.screenNames.myAccount, { isOneFlatOnboarded: isOneFlatOnboarded })} />
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
            onPress={() => navigation.navigate(allTexts.screenNames.selectCityOptions)}
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
        )
      }
    </View>
  );
};

export default Home;
