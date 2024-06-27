import {Modal, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {styles} from '../../screens/myaccount/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {allTexts, colors} from '../../common';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageflatsModal = ({
  flatModalVisible,
  setFlatModalVisible,
  custDetails,
  navigation,
}) => {

  const renderFlatItem = ({item}) => (
    <View style={styles.renderCon}>
      <View style={styles.flatModalCon}>
        <Text style={styles.flatModalText}>{item?.jtFlatDTO?.flatNo},</Text>
        <Text style={styles.flatModalText}>
          {item?.jtFlatDTO?.apartmentDTO?.name}
        </Text>
      </View>
      <Text style={[styles.flatModalText, {marginLeft: '7%'}]}>
        {item?.adminApproved ? (
          <Text style={styles.statusactiveText}>Active</Text>
        ) : (
          <Text style={styles.statusPendingText}>Pending</Text>
        )}
      </Text>
    </View>
  );

  
  return (
    <View style={styles.manageFlatsSubCon}>
      <View>
        {(custDetails?.currentCustomerData?.flatDTO?.length > 0) && (
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
                    {
                      custDetails?.currentCustomerData?.flatDTO[0]?.jtFlatDTO
                        ?.flatNo
                    }
                    ,
                    {
                      custDetails?.currentCustomerData?.flatDTO[0]?.jtFlatDTO
                        ?.apartmentDTO?.name
                    }
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.selectCityOptions)
          }>
          <View style={styles.manageFlatsConAdd}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={colors.black}
            />
            <Text style={styles.manageFlatsConAddText}>
              {'Add your flat/Villa'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={flatModalVisible}
        animationType="fade"
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
    </View>
  );
};

export default ManageflatsModal;
