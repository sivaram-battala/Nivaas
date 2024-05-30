import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { CustomDropdown, NumericTextInput, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { allTexts, colors } from '../../common';
import { useSelector } from 'react-redux';
import { useAddPrepaidMeterMutation } from '../../redux/services/maintainenceService';

const AddPrepaidMeter = ({ navigation }) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({ id: '', name: '' });
  const [meterName, setMeterName] = useState('');
  const [description, setDescription] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [addPrepaidMeter] = useAddPrepaidMeterMutation();

  useEffect(() => {
    if (customerDetails?.currentCustomerData?.apartmentDTOs) {
      const approvedApartments = customerDetails.currentCustomerData.apartmentDTOs
        .filter(apartment => apartment.adminApproved)
        .map(apartment => ({
          id: apartment.jtApartmentDTO.id,
          name: apartment.jtApartmentDTO.name,
        }));
      setApartmentData(approvedApartments);
    }
  }, [customerDetails]);

  const handleAddPrepaidMeter = () => {
    const prepaidMeterPayload = {
      apartmentId: selectedApartment.id,
      name: meterName,
      description: description,
      costPerUnit: costPerUnit,
    };
    addPrepaidMeter(prepaidMeterPayload)
      .unwrap()
      .then(response => {
        console.log('ADD PREPAID METER RESPONSE======>', response);
        navigation.navigate(allTexts.screenNames.apartment)
      }).catch((error)=>{
        console.log('ERROR IN add Prepaid Meter',error);
      })
  };

  const data = [
    { id: '1', flatNo: '100', units: 28 },
    { id: '2', flatNo: '200', units: 22 },
    { id: '3', flatNo: '207', units: 32 },
    // Add more data as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.flatNo}</Text>
      <NumericTextInput />
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2
          back={true}
          txt={'Add Prepaid Meters'}
          navigation={navigation}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputCard}>
            <CustomDropdown
              label="Apartment"
              data={apartmentData}
              value={selectedApartment.id}
              onChange={(id, name) => setSelectedApartment({ id, name })}
              labelField="name"
              valueField="id"
            />
            <Text style={styles.label}>Meter Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter meter name"
              value={meterName}
              onChangeText={setMeterName}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.label}>Cost Per Unit:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cost per unit"
              value={costPerUnit}
              onChangeText={setCostPerUnit}
            />
          </View>
        </View>
        {/* <View style={styles.container2}>
          <View style={styles.header}>
            <Text style={styles.headerCell}>Flat Number</Text>
            <Text style={styles.headerCell}>Consumption(Units)</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View> */}
        <TouchableOpacity style={styles.buttonCon}>
          <PrimaryButton text={'SAVE'} bgColor={colors.primaryRedColor} onPress={handleAddPrepaidMeter}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: '100%',
  },
  container: {
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '5%',
    backgroundColor: '#fff',
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: '2%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    color: colors.black,
  },
  error: {
    color: 'red',
    marginBottom: 10,
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
  row: {
    flexDirection: 'row',
    padding: 10,
    paddingRight: 80,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    flex: 1,
    color: colors.black,
  },
  buttonCon: {
    marginHorizontal: '5%',
    marginVertical:'40%'
  },
});

export default AddPrepaidMeter;
