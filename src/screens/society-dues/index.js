import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../common';
import {TopBarCard2, CustomDropdown, PrimaryButton} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {useLazyGetSocietyDuesQuery} from '../../redux/services/maintainenceService';

const SocietyDues = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [flatData, SetFlatData] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState();
  const adminDummyData = [
    {
      flatId: '1',
      flatNo: '109',
      amount: 500,
      status: 'unPaid',
      checked: false,
    },
    {
      flatId: '2',
      flatNo: '110',
      amount: 700,
      status: 'Unpaid',
      checked: false,
    },
    {
      flatId: '3',
      flatNo: '111',
      amount: 600,
      status: 'unPaid',
      checked: false,
    },
  ];
  const [adminData, setAdminData] = useState(adminDummyData);
  const [selectAll, setSelectAll] = useState(false);
  const [societyDuesData, setSocietyDuesData] = useState([
    {
      apartemtnId: 53,
      flatId: 60,
      notifyme: 7,
      cost: 2000.0,
      jsonData:
        '{"fixedCost":1000.0,"prepaidMeters":[{"prepaidMeterId":83,"costPerUnit":1000.0,"unitsConsumed":1.0}]}',
    },
    {
      apartemtnId: 23,
      flatId: 32,
      notifyme: 6,
      cost: 2000.0,
      jsonData:
        '{"fixedCost":1000.0,"prepaidMeters":[{"prepaidMeterId":83,"costPerUnit":1000.0,"unitsConsumed":1.0}]}',
    },
    {
      apartemtnId: 523,
      flatId: 12,
      notifyme: 9,
      cost: 2000.0,
      jsonData:
        '{"fixedCost":1000.0,"prepaidMeters":[{"prepaidMeterId":83,"costPerUnit":1000.0,"unitsConsumed":1.0}]}',
    },
  ]);

  const [selectedFlatDues, setSelectedFlatDues] = useState([]);
  const duedata = selectedFlatDues?.jsonData
    ? JSON.parse(selectedFlatDues?.jsonData)
    : null;
  const [getSocietyDues] = useLazyGetSocietyDuesQuery();

  const handleSocietydues = () => {
    setLoader(true);
    const payload = {
      pageNo: 0,
      pageSize: 20,
    };
    getSocietyDues(payload)
      .unwrap()
      .then(responce => {
        setLoader(false);
        console.log('SOCIETY DUES=====>', responce);
        // setSocietyDuesData(responce?.societies);
      })
      .catch(error => {
        console.log('ERROR IN SOCITY DUES', error);
      });
  };
  useEffect(() => {
    if (societyDuesData.length === 1) {
      // setSelectedFlat(societyDuesData[0]);
    }
  }, [societyDuesData]);

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
      if (approvedApartments.length === 1) {
        setSelectedApartment(approvedApartments[0]);
      }
    }
    if (customerDetails?.currentCustomerData?.flatDTO) {
      const approvedFlats = customerDetails.currentCustomerData.flatDTO
        .filter(flat => flat.ownerApproved == false)
        .map(flat => ({
          id: flat?.jtFlatDTO?.id,
          flatNo: flat?.jtFlatDTO?.flatNo,
        }));
      SetFlatData(approvedFlats);
      // if (approvedApartments.length === 1) {
      //   setSelectedApartment(approvedApartments[0]);
      // }
    }
  }, [customerDetails]);

  useEffect(() => {
    handleSocietydues();
  }, []);

  const handleCheckboxChange = flatId => {
    setAdminData(prevState =>
      prevState.map(flat =>
        flat.flatId === flatId ? {...flat, checked: !flat.checked} : flat,
      ),
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setAdminData(prevState =>
      prevState.map(flat => ({...flat, checked: newSelectAll})),
    );
  };

  const handleUpdate = () => {
    const selectedFlats = adminData.filter(flat => flat.checked);
    console.log('Selected Flats:', selectedFlats);
  };
  return (
    <ScrollView style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Society Dues'} navigation={navigation} />
      </View>
      {customerDetails?.currentCustomerData?.roles?.some(
        role => role === 'ROLE_APARTMENT_ADMIN.',
      ) ? (
        <View>
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
          </View>
          <View style={styles.selectAllContainer}>
            <Text style={styles.selectAllText}>Select All</Text>
            <CheckBox
              checked={selectAll}
              onPress={handleSelectAll}
              checkedColor={colors.primaryRedColor}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerCell}>Flat No</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Status</Text>
              <Text style={styles.selectStyle}>Select</Text>
            </View>
            <FlatList
              data={adminData}
              keyExtractor={item => item.flatId}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.flatNo}</Text>
                  <Text style={styles.cell}>{item.amount}</Text>
                  <Text style={styles.cell}>{item.status}</Text>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={item.checked}
                      onPress={() => handleCheckboxChange(item.flatId)}
                      checkedColor={colors.primaryRedColor}
                    />
                  </View>
                </View>
              )}
            />
            <View style={styles.button}>
              <PrimaryButton
                text={'Update'}
                bgColor={colors.primaryRedColor}
                onPress={handleUpdate}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.dropdownContainer}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{width:'45%'}}>
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
              <View style={{width:'45%',height:100}}>
                <CustomDropdown
                  label="Flat"
                  data={flatData}
                  value={selectedFlat?.flatNo}
                  onChange={(id, flatNo) => {
                    const flat = societyDuesData.find(
                      flat => flat.flatId === id,
                    );
                    setSelectedFlatDues(flat);
                    setSelectedFlat({id, flatNo});
                  }}
                  labelField="flatNo"
                  valueField="id"
                />
              </View>
            </View>
            <Text style={styles.textCon}>{selectedFlat?.flatNo}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerCell}>Prepaid Meters</Text>
              <Text style={styles.headerCell}>Consumption Units</Text>
              <Text style={styles.headerCell}>Cost Per Unit</Text>
              <Text style={styles.headerCell}>Total</Text>
            </View>
            <FlatList
              data={duedata?.prepaidMeters}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item?.prepaidMeterId}</Text>
                  <Text style={styles.cell}>{item?.unitsConsumed}</Text>
                  <Text style={styles.cell}>{item?.costPerUnit}</Text>
                  <Text style={styles.cell}>
                    {item?.unitsConsumed * item?.costPerUnit}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      )}
    </ScrollView>
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
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginLeft: '70%',
    height: 50,
  },
  selectAllText: {
    color: colors.black,
    fontWeight: '500',
  },
  textCon: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
    marginTop: '1%',
    marginHorizontal:'1%'
  },
  container: {
    marginHorizontal: '5%',
    marginBottom: '5%',
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
    color: colors.black,
  },
  selectStyle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: colors.black,
    paddingVertical: 10,
  },
  checkbox: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});
