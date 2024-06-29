import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Modal, TouchableOpacity, Share, Alert, Linking, Image} from 'react-native';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {DpImage, ManageApartmentsModal, ManageflatsModal, TermsAndConditionsModal, TopBarCard2, TopBarcard} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view'
import { handleshare, sendSupportEmail } from '../../common/customFunctions';

const MyAccount = ({navigation, dispatch, route}) => {
  const data = route.params;
  const custDetails = useSelector(state=>state.currentCustomer);
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [flatModalVisible, setFlatModalVisible] = useState(false);
  const [apartmentModalVisible, setApartmentModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const termsAndConditionsModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () =>{
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: async () => {
            await removeLoginSessionDetails();
            setLoginDetails(null);
          }
        }
      ],
      { cancelable: false }
    );
  }
// const apartmentNames = custDetails?.apartmentDTOs?.map(apartment => apartment.jtApartmentDTO.name);
// console.log(apartmentNames,'llllllllllllll');
// const filteredFlats = custDetails?.flatDTO?.filter(flat => {
//   const flatApartmentName = flat?.jtFlatDTO.apartmentDTO.name;
//   return !apartmentNames.includes(flatApartmentName);
// });
// console.log(filteredFlats,'hello');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <View
        style={{marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'My Account'}
          navigation={navigation}
          accountType={data?.isOneFlatOnboarded ? 'Basic' : ''}
        />
      </View>
      <View style={styles.profie}>
        <DpImage dispatch={dispatch} profilePicture={custDetails?.currentCustomerData?.profilePicture}/>
        <View style={{marginHorizontal:-10}}>
          {/* <Text style={styles.profieText}>{custDetails ? (custDetails?.currentCustomerData?.fullName).charAt(0).toUpperCase() + (custDetails?.currentCustomerData?.fullName).slice(1)  : 'Your Name'}</Text> */}
          <Text style={styles.profieText}>{custDetails?.currentCustomerData?.fullName || 'Nivaas User'}</Text>
          {data?.isOneFlatOnboarded && (
            <View
              style={{
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: colors.gray3,
              }}>
              {data?.isOneFlatOnboarded && (
                <Text style={styles.nivaasID}>
                  Nivaas ID : {(custDetails?.currentCustomerData?.primaryContact)?.substring(0, 6)}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage flats</Text>
        <ManageflatsModal flatModalVisible={flatModalVisible} setFlatModalVisible={setFlatModalVisible} custDetails={custDetails} navigation={navigation}/>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage Apartments</Text>
        <ManageApartmentsModal apartmentModalVisible={apartmentModalVisible} setApartmentModalVisible={setApartmentModalVisible} custDetails={custDetails} navigation={navigation}/>
      </View>
      <View style={styles.setting}>
        <Text style={styles.manageFlatsConText}>General settings</Text>
        <View style={styles.manageFlatsSubCon}>
          <TouchableOpacity onPress={sendSupportEmail} style={styles.settingsubConOne}>
            <AntDesign name="mail" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleshare} style={styles.settingsubConOne}>
            <AntDesign name="sharealt" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>
              Help your friend with Nivaas
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={styles.settingsubConOne}>
              <AntDesign name="user" size={25} color={colors.black} />
              <Text style={styles.generalSettingsOptionText}>
                Account information
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.settingsubConOne}>
              <MaterialCommunityIcons name="logout" size={25} color={colors.black} />
              <Text style={styles.generalSettingsOptionText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nivaas}>
        {/* <Text style={styles.nivaasText}>NIVAAS</Text> */}
        <Image source={require('../../utils/assets/images/Nivaas-logo2.png')} style={styles.nivaasLogo}/>
      </View>
      <View style={styles.VersionCon}>
        <Text style={styles.VersionText}>Version : {allTexts.appVersion.version}</Text>
      </View>
      <TouchableOpacity onPress={termsAndConditionsModal} style={styles.footer}>
        <Text style={[styles.footerText,{textDecorationLine:'underline'}]}>Terms&Conditions</Text>
        <Text style={styles.footerText}>|</Text>
        <Text style={[styles.footerText,{textDecorationLine:'underline'}]}>Privacy&policy</Text>
        <TermsAndConditionsModal isVisible={isModalVisible} onClose={termsAndConditionsModal} />
      </TouchableOpacity>
      
    </ScrollView>
  );
};

export default MyAccount;
