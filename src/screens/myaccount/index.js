import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DpImage, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {colors} from 'react-native-elements';
import UserServices from '../../components/user-services/UserServices';
import {TouchableOpacity} from 'react-native';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import { useLazyGetCurrentCustomerQuery } from '../../redux/services/myAccountService';

const MyAccount = ({navigation,dispatch}) => {
  // const active = false;
  const isFlatAdded = true;
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [active, setActive] = useState(false);
  const [currentCustomer] = useLazyGetCurrentCustomerQuery();
  const handleCurrentCustomerData = () => {
    currentCustomer()
      .unwrap()
      .then(responce => {
        console.log('responce of currentCustoemr', responce);
        setCurrentCustomerData(responce);
        try {
          responce?.apartmentDTOs?.id || responce?.apartmentDTOs?.id && setActive(true)
        } catch (error) {
          console.log('error in currentCustomerData=======>',error);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <View
        style={{height: 50, marginTop: statusBarHeight, flexDirection: 'row'}}>
        <TopBarCard2
          back={true}
          txt={'My Account'}
          navigation={navigation}
          accountType={active ? 'Basic' : ''}
        />
      </View>
      <View style={styles.profie}>
        <DpImage dispatch={dispatch}/>
        <View>
          <Text style={styles.profieText}>Vamsi Chadharam</Text>
          {active && (
            <View
              style={{
                backgroundColor: colors.black,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              {active && (
                <Text style={{color: colors.white, fontWeight: '500'}}>
                  Nivaas ID : 12345
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage flats</Text>
        <View style={styles.manageFlatsSubCon}>
          {!isFlatAdded && (
            <View style={styles.flatCon}>
              <Text style={styles.manageFlatsSubConText1}>+</Text>
              <Text style={styles.manageFlatsSubConText2}>Flat</Text>
            </View>
          )}
          <View>
            <View style={styles.manageFlatsConHome}>
              <Foundation
                name="home"
                size={30}
                color={colors.black}
                style={{marginLeft: 3}}
              />
              <Text style={styles.manageFlatsConHomeTextOne}>
                A-Block 101,Green Hills
              </Text>
              {active ? (
                <Text style={styles.statusactiveText}>Active</Text>
              ) : (
                <Text style={styles.statusPendingText}>Pending</Text>
              )}
            </View>
            <View style={styles.manageFlatsConAdd}>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={colors.black}
              />
              <Text style={styles.manageFlatsConAddText}>
                Add you flat/Villa
              </Text>
            </View>
          </View>
        </View>
      </View>
      {active && <UserServices navigation={navigation} />}
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
