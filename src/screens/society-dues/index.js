import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { colors } from '../../common';
import { TopBarCard2, CustomDropdown } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { useSelector } from 'react-redux';

const SocietyDues = ({ navigation }) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const dummyData = [
    {
      flatId: '1',
      flatNo: 'Flat 109',
      data: [
        {
          id: '1',
          prepaidMeters: 'Meter 1',
          consumptionUnits: 120,
          consumptionPerUnit: 1.5,
          total: 180,
        },
        {
          id: '2',
          prepaidMeters: 'Meter 2',
          consumptionUnits: 200,
          consumptionPerUnit: 1.2,
          total: 240,
        },
        {
          id: '3',
          prepaidMeters: 'Meter 3',
          consumptionUnits: 150,
          consumptionPerUnit: 1.3,
          total: 195,
        },
      ],
    },
    {
      flatId: '2',
      flatNo: 'Flat 110',
      data: [
        {
          id: '1',
          prepaidMeters: 'Meter 1',
          consumptionUnits: 100,
          consumptionPerUnit: 1.6,
          total: 160,
        },
        {
          id: '2',
          prepaidMeters: 'Meter 2',
          consumptionUnits: 180,
          consumptionPerUnit: 1.4,
          total: 252,
        },
        {
          id: '3',
          prepaidMeters: 'Meter 3',
          consumptionUnits: 130,
          consumptionPerUnit: 1.5,
          total: 195,
        },
      ],
    },
  ];
  const [selectedFlat, setSelectedFlat] = useState(dummyData[0]);
  useEffect(() => {
    if (dummyData.length === 1) {
      setSelectedFlat(dummyData);
    }
  }, [dummyData]);

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
      if (apartmentData.length === 1) {
        setSelectedFlat(approvedApartments[0]);
      }
    }
  }, [customerDetails]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.prepaidMeters}</Text>
      <Text style={styles.cell}>{item.consumptionUnits}</Text>
      <Text style={styles.cell}>{item.consumptionPerUnit}</Text>
      <Text style={styles.cell}>{item.total}</Text>
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'Society Dues'} navigation={navigation} />
      </View>
      <View style={styles.dropdownContainer}>
        <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment.id}
          onChange={(id, name) => setSelectedApartment({id, name})}
          labelField="name"
          valueField="id"
        />
        {dummyData.length > 1 && (
          <CustomDropdown
            label="Select Flat"
            data={dummyData}
            value={selectedFlat.flatId}
            onChange={(id) => {
              const flat = dummyData.find(flat => flat.flatId === id);
              setSelectedFlat(flat);
            }}
            labelField="flatNo"
            valueField="flatId"
          />
        )}
        <Text style={styles.textCon}>{selectedFlat.flatNo} :</Text>
        <Text style={styles.textCon}>Status : </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Prepaid Meters</Text>
          <Text style={styles.headerCell}>Consumption Units</Text>
          <Text style={styles.headerCell}>Consumption Per Unit</Text>
          <Text style={styles.headerCell}>Total</Text>
        </View>
        <FlatList
          data={selectedFlat.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default SocietyDues;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  dropdownContainer: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  textCon: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
    marginVertical: '2%',
  },
  container: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:colors.black
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color:colors.black
  },
});
