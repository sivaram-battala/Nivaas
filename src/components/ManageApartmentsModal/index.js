import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from '../../screens/myaccount/style';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {allTexts, colors} from '../../common';

const ManageApartmentsModal = ({
  apartmentModalVisible,
  setApartmentModalVisible,
  custDetails,
  navigation,
}) => {
  const renderApartmentItem = ({item}) => (
    <View style={styles.renderCon}>
      <Text style={styles.apartmentModalText}>
        {item?.jtApartmentDTO?.name}
      </Text>
      <Text style={[styles.apartmentModalText, {marginLeft: '7%'}]}>
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
        {(custDetails?.apartmentDTOs?.length > 0 ) && (
          <View style={styles.manageFlatsConHome}>
            <FontAwesome
              name="building-o"
              size={30}
              color={colors.black}
              style={{marginLeft: 3}}
            />
            <View>
              {custDetails?.apartmentDTOs?.length > 1 ? (
                <TouchableOpacity
                  onPress={() => setApartmentModalVisible(true)}
                  style={styles.flatItemCon}>
                  <Text style={styles.flatText}>
                    {
                      custDetails?.apartmentDTOs[0]
                        ?.jtApartmentDTO?.name
                    }
                  </Text>
                  <AntDesign name="right" size={20} color={colors.black} />
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={custDetails?.apartmentDTOs}
                  renderItem={renderApartmentItem}
                  keyExtractor={item => item.id.toString()}
                />
              )}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.newApartmentOnBoard)
          }>
          <View style={styles.manageFlatsConAdd}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={colors.black}
            />
            <Text style={styles.manageFlatsConAddText}>
              {'On Board Your New Apartment'}
            </Text>
          </View>
        </TouchableOpacity>
        {custDetails?.apartmentDTOs?.some(
          apartment => apartment.adminApproved,
        ) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(allTexts.screenNames.coAdmin)}>
            <View style={styles.manageFlatsConAdd}>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={colors.black}
              />
              <Text style={styles.manageFlatsConAddText}>{'Add Co-Admin'}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent={true}
        visible={apartmentModalVisible}
        animationType="fade"
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
              data={custDetails?.apartmentDTOs}
              renderItem={renderApartmentItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ManageApartmentsModal;
