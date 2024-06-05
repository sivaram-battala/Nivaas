import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {statusBarHeight} from '../../utils/config/config';
import {CustomDropdown, NumericTextInput, PrimaryButton, TopBarCard2} from '../../components';
import {allTexts, colors} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyGetAparmentPrepaidMetersQuery, useUpdatePrepaidMeterMutation} from '../../redux/services/prepaidMeterService';
import { setapartmentPrepaidMeters } from '../../redux/slices/apartmentPrepaidMetersList';
import { useLazyGetFlatsListQuery } from '../../redux/services/cityServices';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

const PrepaidMeter = ({navigation}) => {
  const dispatch = useDispatch();
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [prepaidMetersData, setprepaidMetersData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [editedMeter, setEditedMeter] = useState(null);
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();
  const [updatePrepaidMeterDetails] = useUpdatePrepaidMeterMutation();

  const handleprepaidmetersList = () => {
    if (selectedApartment?.id) {
      const payload = {
        apartmentId: selectedApartment?.id,
        pageNo: 0,
        pageSize: 10,
      };
      console.log(payload);
      getApartmentPrepaidMetersList(payload)
        .unwrap()
        .then(response => {
          setprepaidMetersData(response?.data);
          dispatch(setapartmentPrepaidMeters(response?.data));
        })
        .catch(error => {
          console.log('error in Apartment PrepaidMetersList=====>', error);
        });
    }
  };

  const handleUpdatePrepaidMetersDetails = () => {
    const payload = {
      id: editedMeter.id,
      description: editedMeter.description,
      costPerUnit: editedMeter.costPerUnit,
      name: editedMeter.name,
    };
    updatePrepaidMeterDetails(payload)
      .unwrap()
      .then((response) => {
        console.log('update prepaid meter responce =====>',response);
        handleprepaidmetersList();
        setEditModalVisible(false);
      })
      .catch(error => {
        console.log('error in updating prepaid meter details:', error);
      });
    navigation.navigate(allTexts.screenNames.prepaidMeter)
  };

  const handleMeterPress = item => {
    setSelectedMeter(item);
    setModalVisible(true);
  };

  const handleEditPress = item => {
    setEditedMeter(item);
    setEditModalVisible(true);
  };

  const handleAddPress = item => {
    setAddModalVisible(true);
  };

  // useEffect(() => {
  //   if (selectedApartment?.id) {
  //     handleprepaidmetersList();
  //   }
  // }, [selectedApartment]);

  useFocusEffect(
    useCallback(() => {
      if (selectedApartment?.id) {
        handleprepaidmetersList();
      }
    }, [selectedApartment]),
  );
  useEffect(() => {
    if (customerDetails?.currentCustomerData?.apartmentDTOs) {
      const approvedApartments =
        customerDetails.currentCustomerData.apartmentDTOs
          .filter(apartment => apartment.adminApproved)
          .map(apartment => ({
            id: apartment.jtApartmentDTO.id,
            name: apartment.jtApartmentDTO.name,
          }));
      setApartmentData(approvedApartments);
    }
  }, [customerDetails]);

  const renderPrepaidMeter = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleMeterPress(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      <View>
        <PrimaryButton
          text={'Add'}
          bgColor={colors.primaryRedColor}
          onPress={() => handleAddPress(item)}
        />
      </View>
    </View>
  );

  const renderFlatItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.flatNo}</Text>
      <Text style={styles.cell}>{item.units}</Text>
    </View>
  );

  const data = [
    { id: '1', flatNo: '100', units: 28 },
    { id: '2', flatNo: '200', units: 22 },
    { id: '3', flatNo: '207', units: 32 },
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.flatNo}</Text>
      <NumericTextInput />
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Prepaid Meter'}
          navigation={navigation}
        />
      </View>
      <View style={styles.dropDownView}>
        <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment.id}
          onChange={(id, name) => setSelectedApartment({id, name})}
          labelField="name"
          valueField="id"
        />
      </View>
      <View style={styles.container}>
        {prepaidMetersData?.length === 0 ? (
          <Text style={styles.noDataText}>No prepaid meters available</Text>
        ) : (
          <FlatList
            data={prepaidMetersData}
            renderItem={renderPrepaidMeter}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Meter Name</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No prepaid meters available</Text>
            )}
          />
        )}
      </View>
      <View style={styles.buttonCon}>
        <PrimaryButton
          text={'Add Prepaid Meter'}
          bgColor={colors.primaryRedColor}
          onPress={() =>
            navigation.navigate(allTexts.screenNames.addPrepaidMeter,{selectedApartmentId:selectedApartment?.id})
          }
        />
      </View>
      {selectedMeter && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}>
            <Pressable style={styles.modalContainer} onPress={() => {}}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedMeter?.name} {'Details '}
                  <Feather
                    name="edit"
                    size={20}
                    color={colors.primaryRedColor}
                    onPress={() => handleEditPress(selectedMeter)}
                  />
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Flat No</Text>
                <Text style={styles.tableHeaderText}>Consumption Units</Text>
              </View>
              <FlatList
                data={selectedMeter.flats}
                renderItem={renderFlatItem}
                keyExtractor={item => item.flatNo}
                contentContainerStyle={styles.flatListContainer}
                ListEmptyComponent={() => (
                  <Text style={styles.noDataText}>No data available</Text>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
      {editedMeter && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setEditModalVisible(false)}>
            <Pressable style={styles.updateModalContainer} onPress={() => {}}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Meter Details</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Meter Name</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter.name}
                  onChangeText={text => setEditedMeter({...editedMeter, name: text})}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter.description}
                  onChangeText={text => setEditedMeter({...editedMeter, description: text})}
                />
                <Text style={styles.label}>Cost Per Unit</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter.costPerUnit}
                  onChangeText={text => setEditedMeter({...editedMeter, costPerUnit: text})}
                />
              </View>
              <PrimaryButton
                text={'Save Changes'}
                bgColor={colors.primaryRedColor}
                onPress={handleUpdatePrepaidMetersDetails}
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAddModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Consumption Units</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Icon name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.container2}>
              <View style={styles.header}>
                <Text style={styles.headerCell}>Flat Number</Text>
                <Text style={styles.headerCell}>Consumption(Units)</Text>
              </View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default PrepaidMeter;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '5%',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  dropDownView: {
    width: '100%',
    paddingHorizontal: '6%',
  },
  container2: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  itemText: {
    fontSize: 15,
    color: colors.black,
    fontWeight:'500'
  },
  buttonCon: {
    marginHorizontal: '6%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  updateModalContainer:{
    width: '100%',
    height:'100%',
    backgroundColor: 'white',
    padding:'5%'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: '15%',
    paddingLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    fontSize: 14,
    color: colors.black,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
