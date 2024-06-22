import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Modal, TouchableOpacity} from 'react-native';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DpImage, ManageApartmentsModal, ManageflatsModal, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-virtualized-view'

const MyAccount = ({navigation, dispatch, route}) => {
  const data = route.params;
  const custDetails = useSelector(state=>state.currentCustomer);
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [flatModalVisible, setFlatModalVisible] = useState(false);
  const [apartmentModalVisible, setApartmentModalVisible] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <View
        style={{height: 50, marginTop: statusBarHeight}}>
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
          <Text style={styles.profieText}>{custDetails?.currentCustomerData?.fullName}</Text>
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
        <Text style={styles.settingHeader}>General settings</Text>
        <View style={styles.generalSettingsOptions}>
          <View style={styles.settingsubConOne}>
            <AntDesign name="mail" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>support</Text>
          </View>
          <View style={styles.settingsubConOne}>
            <AntDesign name="sharealt" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>
              Help your friend with Nivas
            </Text>
          </View>
          <TouchableOpacity>
            <View style={styles.settingsubConOne}>
              <AntDesign name="user" size={25} color={colors.black} />
              <Text style={styles.generalSettingsOptionText}>
                Account information
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await removeLoginSessionDetails();
              setLoginDetails(null);
            }}>
            <View style={styles.settingsubConOne}>
              <AntDesign name="poweroff" size={23} color={colors.black} />
              <Text style={styles.generalSettingsOptionText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nivas}>
        <Text style={styles.nivasText}>NIVAAS</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms&Conditions</Text>
        <Text style={styles.footerText}>|</Text>
        <Text style={styles.footerText}>Privacy&policy</Text>
      </View>
    </ScrollView>
  );
};

export default MyAccount;
