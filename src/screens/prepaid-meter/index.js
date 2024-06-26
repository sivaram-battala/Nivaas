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
import {
  CustomDropdown,
  Loader,
  NumericTextInput,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {allTexts, colors} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {
  useLazyGetAparmentPrepaidMetersQuery,
  useUpdateConsumedUnitsMutation,
  useUpdatePrepaidMeterMutation,
} from '../../redux/services/prepaidMeterService';
import {setapartmentPrepaidMeters} from '../../redux/slices/apartmentPrepaidMetersList';
import {useLazyGetFlatsListQuery} from '../../redux/services/cityServices';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ApprovedApartments, SnackbarComponent } from '../../common/customFunctions';
import { styles } from './style';
 
const PrepaidMeter = ({navigation}) => {
  const dispatch = useDispatch();
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [prepaidMetersData, setprepaidMetersData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [editedMeter, setEditedMeter] = useState(null);
  const [flatdata, setflatdata] = useState();
  const [unitsConsumed, setUnitsConsumed] = useState();
  const [textInputData, setTextInputData] = useState([]);
  // console.log(textInputData);
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();
  const [updatePrepaidMeterDetails] = useUpdatePrepaidMeterMutation();
  const [updateConsumtionUnits] = useUpdateConsumedUnitsMutation();
  const [getflatdata] = useLazyGetFlatsListQuery();
 
  const handleprepaidmetersList = () => {
    setLoader(true);
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
          setLoader(false);
          setprepaidMetersData(response?.data);
          dispatch(setapartmentPrepaidMeters(response?.data));
        })
        .catch(error => {
          console.log('error in Apartment PrepaidMetersList=====>', error);
          SnackbarComponent({text:'Cheak Your Internet And TRY AGAIN',backgroundColor:colors.red1})
        });
    }
  };
  const handleUpdatePrepaidMetersDetails = () => {
    const payload = {
      id: editedMeter?.id,
      apartmentId:selectedApartment?.id,
      description: editedMeter?.description,
      costPerUnit: editedMeter?.costPerUnit,
      name: editedMeter?.name,
    };
    console.log(payload);
    updatePrepaidMeterDetails(payload)
      .unwrap()
      .then(response => {
        console.log('update prepaid meter responce =====>', response);
        handleprepaidmetersList();
        setEditModalVisible(false);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('error in updating prepaid meter details:', error);
      });
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
    setSelectedMeter(item);
    setAddModalVisible(true);
  };
  const handleconsumptionUnits = (flatId, unitsConsumed) => {
    const updatedData = [...textInputData];
    const index = updatedData.findIndex(item => item.flatId === flatId);
    if (index !== -1) {
      updatedData[index] = {flatId, unitsConsumed};
    } else {
      updatedData.push({flatId, unitsConsumed});
    }
    setTextInputData(updatedData);
  };
 
  const handleFlatData = id => {
    const flatPayload = {
      flatId: id,
      pageNo: 0,
      pageSize: 100,
    };
    getflatdata(flatPayload)
      .unwrap()
      .then(response => {
        const processedFlatData = response?.data?.map(item => ({
          ...item,
          flatNo: String(item.flatNo),
        }));
        setflatdata(processedFlatData);
      })
      .catch(error => {
        console.log('error in flat data==========>', error);
      });
  };
 
  const handleUpdateConsumptionUnits = () => {
    const payload = {
      prepaidId: selectedMeter?.id,
      apartmentId: selectedApartment?.id,
      flatConsumption: textInputData
    };
    console.log(payload);
    updateConsumtionUnits(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF UPDATE CONSUMTION UNITS==>', responce);
        setAddModalVisible(false);
      })
      .catch(error => {
        console.log('ERROR IN UPDATE CONSUMTION UNITS==>', error);
      });
  };

 
  useFocusEffect(
    useCallback(() => {
      if (selectedApartment?.id) {
        handleprepaidmetersList();
      }
    }, [selectedApartment]),
  );
  
  useEffect(() => {
    ApprovedApartments({customerDetails:customerDetails?.customerOnboardReqData,setApartmentData:setApartmentData,setSelectedApartment:setSelectedApartment})
  }, [customerDetails?.customerOnboardReqData]);
 
  useEffect(() => {
    if (selectedApartment.id) {
      handleFlatData(selectedApartment.id);
    }
  }, [selectedApartment.id]);
 
  const renderPrepaidMeter = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleMeterPress(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      <View>
        <PrimaryButton
          text={'Add'}
          bgColor={colors.primaryColor}
          onPress={() => handleAddPress(item)}
        />
      </View>
    </View>
  );
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.flatNo}</Text>
      {/* <NumericTextInput /> */}
      <TextInput
        placeholder="Enter a Value"
        value={unitsConsumed}
        onChangeText={text => handleconsumptionUnits(item.id, text)}
        keyboardType="numeric"
      />
    </View>
  );
 
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Prepaid Meter'}
          navigation={navigation}
        />
      </View>
      <View style={styles.dropDownView}>
        {/* <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment.id}
          onChange={(id, name) => setSelectedApartment({id, name})}
          labelField="name"
          valueField="id"
        /> */}
        {apartmentData?.length >= 1 && (
          <View style={styles.singleApartmentCon}>
           <CustomDropdown
              label="Owner"
              data={apartmentData}
              value={selectedApartment}
              onChange={(id, name) => setSelectedApartment({id, name})}
              labelField="name"
              valueField="id"
            />
          </View>
        )}
      </View>
      <View style={styles.container}>
        {loader ? (
          <View>
            <Loader color={colors.primaryColor} size={'large'} />
          </View>
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
              <Text style={styles.noDataText}>
                No items to display at this time
              </Text>
            )}
          />
        )}
      </View>
      {loader ? ('') : (
          prepaidMetersData?.length === 5 ? ('') : (
            <View style={styles.buttonCon}>
            <PrimaryButton
              text={'Add Prepaid Meter'}
              bgColor={colors.primaryColor}
              onPress={() =>
                selectedApartment?.id
                  ? navigation.navigate(allTexts.screenNames.addPrepaidMeter, {
                      selectedApartmentId: selectedApartment?.id,
                    })
                  : ''
              }
            />
          </View>
          ) 
         
      )}
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
                  {selectedMeter?.name}
                  {' Details '}
                  <Feather
                    name="edit"
                    size={20}
                    color={colors.primaryColor}
                    onPress={() => handleEditPress(selectedMeter)}
                  />
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.metersDetailsText}>
                  Meter Name : {selectedMeter?.name}
                </Text>
                <Text style={styles.metersDetailsText}>
                  Cost PerUnit : {selectedMeter?.costPerUnit}
                </Text>
              </View>
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
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, name: text})
                  }
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter.description}
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, description: text})
                  }
                />
                <Text style={styles.label}>Cost Per Unit</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter.costPerUnit}
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, costPerUnit: text})
                  }
                />
              </View>
              <PrimaryButton
                text={'Save Changes'}
                bgColor={colors.primaryColor}
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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{height: '40%'}}>
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
                  data={flatdata}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
                <View style={styles.updateButton}>
                  <PrimaryButton
                    text={'Add Consumption'}
                    onPress={handleUpdateConsumptionUnits}
                    bgColor={colors.primaryColor}
                  />
                </View>
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAwareScrollView>
      </Modal>
    </ScrollView>
  );
};
 
export default PrepaidMeter;