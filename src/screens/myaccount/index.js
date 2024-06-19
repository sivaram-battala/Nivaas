import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View, Modal, TouchableOpacity} from 'react-native';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DpImage, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
import { useSelector } from 'react-redux';

const MyAccount = ({navigation, dispatch, route}) => {
  const data = route.params;
  const custDetails = useSelector(state=>state.currentCustomer);
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [flatModalVisible, setFlatModalVisible] = useState(false);
  const [apartmentModalVisible, setApartmentModalVisible] = useState(false);

  const renderFlatItem = ({item}) => (
    <View style={styles.renderCon}>
      <View style={styles.flatModalCon}>
        <Text style={styles.flatModalText}>{item?.jtFlatDTO?.flatNo},</Text>
        <Text style={styles.flatModalText}>{item?.jtFlatDTO?.apartmentDTO?.name}</Text>
      </View>
      <Text style={[styles.flatModalText, {marginLeft: 20}]}>
        {item?.adminApproved ? (
          <Text style={styles.statusactiveText}>Active</Text>
        ) : (
          <Text style={styles.statusPendingText}>Pending</Text>
        )}
      </Text>
    </View>
  );

  const renderApartmentItem = ({item}) => (
    <View style={styles.renderCon}>
      <Text style={styles.apartmentModalText}>{item?.jtApartmentDTO?.name}</Text>
      <Text style={[styles.apartmentModalText, {marginLeft: 20}]}>
        {item?.adminApproved ? (
          <Text style={styles.statusactiveText}>Active</Text>
        ) : (
          <Text style={styles.statusPendingText}>Pending</Text>
        )}
      </Text>
    </View>
  );

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
          accountType={data?.isOneFlatOnboarded ? 'Basic' : ''}
        />
      </View>
      <View style={styles.profie}>
        <DpImage dispatch={dispatch} />
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
                  Nivaas ID : {(custDetails?.currentCustomerData?.primaryContact).substring(0, 6)}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage flats</Text>
        <View style={styles.manageFlatsSubCon}>
          <View>
            {(custDetails?.currentCustomerData?.flatDTO != [] || custDetails?.currentCustomerData?.flatDTO) && (
              <View style={styles.manageFlatsConHome}>
                <Foundation
                  name="home"
                  size={28}
                  color={colors.black}
                  style={{marginLeft: 3}}
                />
                <View>
                  {custDetails?.currentCustomerData?.flatDTO?.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => setFlatModalVisible(true)}
                      style={styles.flatItemCon}>
                      <Text style={styles.flatText}>
                        {custDetails?.currentCustomerData?.flatDTO[0]?.jtFlatDTO?.flatNo},
                        {custDetails?.currentCustomerData?.flatDTO[0]?.jtFlatDTO?.apartmentDTO?.name}
                      </Text>
                      <AntDesign name="right" size={20} color={colors.black} />
                    </TouchableOpacity>
                  ) : (
                    <FlatList
                      data={custDetails?.currentCustomerData?.flatDTO}
                      renderItem={renderFlatItem}
                      keyExtractor={item => item.id.toString()}
                    />
                  )}
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.selectCityOptions)}>
              <View style={styles.manageFlatsConAdd}>
                <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color={colors.black}
                />
                <Text style={styles.manageFlatsConAddText}>{'Add you flat/Villa'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage Apartments</Text>
        <View style={styles.manageFlatsSubCon}>
          <View>
            {(custDetails?.currentCustomerData?.apartmentDTOs) && (
              <View style={styles.manageFlatsConHome}>
                <FontAwesome
                  name="building-o"
                  size={30}
                  color={colors.black}
                  style={{marginLeft: 3}}
                />
                <View>
                  {custDetails?.currentCustomerData?.apartmentDTOs?.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => setApartmentModalVisible(true)}
                      style={styles.flatItemCon}>
                      <Text style={styles.flatText}>
                        {custDetails?.currentCustomerData?.apartmentDTOs[0]?.jtApartmentDTO?.name}
                      </Text>
                      <AntDesign name="right" size={20} color={colors.black} />
                    </TouchableOpacity>
                  ) : (
                    <FlatList
                      data={custDetails?.currentCustomerData?.apartmentDTOs}
                      renderItem={renderApartmentItem}
                      keyExtractor={item => item.id.toString()}
                    />
                  )}
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.newApartmentOnBoard)}>
              <View style={styles.manageFlatsConAdd}>
                <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color={colors.black}
                />
                <Text style={styles.manageFlatsConAddText}>{'On Board Your New Apartment'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
      {/* Flats Modal  */}
      <Modal
        transparent={true}
        visible={flatModalVisible}
        animationType='fade'
        onRequestClose={() => setFlatModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setFlatModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setFlatModalVisible(false)}
              style={styles.modalCloseIcon}>
              <AntDesign name="close" size={25} color={colors.black} />
            </TouchableOpacity>
            <FlatList
              data={custDetails?.currentCustomerData?.flatDTO}
              renderItem={renderFlatItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Apartments Modal */}
      <Modal
        transparent={true}
        visible={apartmentModalVisible}
        animationType='fade'
        onRequestClose={() => setApartmentModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setApartmentModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setApartmentModalVisible(false)}
              style={styles.modalCloseIcon}>
              <AntDesign name="close" size={25} color={colors.black} />
            </TouchableOpacity>
            <FlatList
              data={custDetails?.currentCustomerData?.apartmentDTOs}
              renderItem={renderApartmentItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default MyAccount;
