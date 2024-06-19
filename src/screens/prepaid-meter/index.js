import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MeterDetailsModal from '../../components/MeterDetailsModal';
import EditMeterModal from '../../components/EditMeterModal';
import AddConsumptionUnitsModal from '../../components/AddConsumptionModal';
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
    navigation.navigate(allTexts.screenNames.prepaidMeter);
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
        const processedFlatData = response?.data.map(item => ({
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
          bgColor={colors.primaryRedColor}
          onPress={() => handleAddPress(item)}
        />
      </View>
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
        {loader ? (
          <View>
            <Loader color={colors.primaryRedColor} size={'large'} />
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
                Select Apartment From DropDown
              </Text>
            )}
          />
        )}
      </View>
        <View style={styles.buttonCon}>
          <PrimaryButton
            text={'Add Prepaid Meter'}
            bgColor={colors.primaryRedColor}
            onPress={() =>
              selectedApartment?.id
                ? navigation.navigate(allTexts.screenNames.addPrepaidMeter, {
                    selectedApartmentId: selectedApartment?.id,
                  })
                : ''
            }
          />
        </View>
      {selectedMeter && (
        <MeterDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} handleEditPress={handleEditPress} selectedMeter={selectedMeter}/>
      )}
      {editedMeter && (
        <EditMeterModal editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} editedMeter={editedMeter} setEditedMeter={setEditedMeter} handleUpdatePrepaidMetersDetails={handleUpdatePrepaidMetersDetails}/>
      )}
      <AddConsumptionUnitsModal unitsConsumed={unitsConsumed} addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible} handleconsumptionUnits={handleconsumptionUnits} flatdata={flatdata} handleUpdateConsumptionUnits={handleUpdateConsumptionUnits}/>
    </ScrollView>
  );
};

export default PrepaidMeter;