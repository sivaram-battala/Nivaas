import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import {allTexts, colors} from '../../common';
import {TopBarCard2, CustomDropdown, PrimaryButton} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import { styles } from './style';
import { useLazyGetAdminSocietyDuesQuery, useLazyGetUserSocietyDuesQuery } from '../../redux/services/maintainenceService';

const SocietyDues = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  // console.log(apartmentData);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [userApartmentdata, setuserApartmentdata] = useState([]);
  const [selectedUserAparment, setselectedUserAparment] = useState({id: '',flatNo: ''})
  const [flatData, SetFlatData] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState({id: '',flatNo: ''});
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
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
  const [getUserSocietyDues] = useLazyGetUserSocietyDuesQuery();
  const [getAdminSocietyDues] = useLazyGetAdminSocietyDuesQuery();

  const handleUserSocietydues = (id) => {
    setLoader(true);
    const payload = {
      apartmentId:selectedUserAparment?.id,
      flatId:id,
      year:selectedYear,
      month:selectedMonth,
    };
    console.log(payload,'payload');
    getUserSocietyDues(payload)
      .unwrap()
      .then(responce => {
        setLoader(false);
        console.log('USER SOCIETY DUES=====>', responce);
        // setSocietyDuesData(responce?.societies);
      })
      .catch(error => {
        console.log('ERROR IN USER SOCITY DUES', error);
      });
  };

  const handleAdminSocietyDues =(id)=>{
    setLoader(true);
    const payload = {
      apartmentId:id,
      year:selectedYear,
      month:selectedMonth,
      pageNo:0,
      pageSize:20,
    };
    // console.log(payload,'payload');
    getAdminSocietyDues(payload)
      .unwrap()
      .then(responce => {
        setLoader(false);
        console.log('ADMIN SOCIETY DUES=====>', responce);
      })
      .catch(error => {
        console.log('ERROR IN ADMIN SOCITY DUES', error);
      });
  }
  useEffect(() => {
    if (societyDuesData.length === 1) {
      // setSelectedFlat(societyDuesData[0]);
    }
  }, [societyDuesData]);

  useEffect(() => {
    const currentDate = new Date();
    setSelectedMonth(currentDate.getMonth() + 1);
    setSelectedYear(currentDate.getFullYear());
    if (customerDetails?.currentCustomerData?.apartmentDTOs) {
      const approvedApartments =
        customerDetails.currentCustomerData.apartmentDTOs
          .filter(apartment => apartment.adminApproved)
          .map(apartment => ({
            id: apartment.jtApartmentDTO.id,
            name: apartment.jtApartmentDTO.name,
          }));
      setApartmentData(approvedApartments);
      setSelectedApartment(approvedApartments[0]);
    }
    if (customerDetails?.currentCustomerData?.flatDTO) {
      const approvedApartments = customerDetails.currentCustomerData.flatDTO
        .map(flat => ({
          id: flat?.jtFlatDTO?.apartmentDTO?.id,
          flatNo: flat?.jtFlatDTO?.apartmentDTO?.name,
        }));
        setuserApartmentdata(approvedApartments);
        setselectedUserAparment(approvedApartments[0])
    }
    if (customerDetails?.currentCustomerData?.flatDTO) {
      const approvedFlats = customerDetails.currentCustomerData.flatDTO
        .filter(flat => flat.ownerApproved === false)
        .map(flat => ({
          id: flat?.jtFlatDTO?.id,
          flatNo: flat?.jtFlatDTO?.flatNo,
        }));
      SetFlatData(approvedFlats);
      // setSelectedApartment(approvedApartments[0]);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (selectedFlat?.id) {
      handleUserSocietydues(selectedFlat?.id);
    }
    if (selectedApartment?.id) {
      handleAdminSocietyDues(selectedApartment?.id);
    }
  }, [selectedFlat,selectedApartment]);

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
    // console.log('Selected Flats:', selectedFlats);
  };
  return (
    <ScrollView style={styles.mainCon}>
      <View style={{marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Society Dues'} navigation={navigation} />
      </View>
      { 
      customerDetails?.currentCustomerData?.roles?.some(
        role => role === 'ROLE_APARTMENT_ADMIN')
       ? (
        <View>
          <View style={styles.dropdownContainer}>
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
              label="Apartment"
              data={apartmentData}
              value={selectedApartment}
              onChange={(id, name) => setSelectedApartment({id, name})}
              labelField="name"
              valueField="id"
            />
          </View>
        )}
          </View>
          <View style={styles.selectAllContainer}>
            <Text style={styles.selectAllText}>Select All</Text>
            <CheckBox
              checked={selectAll}
              onPress={handleSelectAll}
              checkedColor={colors.primaryColor}
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
                      checkedColor={colors.primaryColor}
                    />
                  </View>
                </View>
              )}
            />
            <View style={styles.button}>
              <PrimaryButton
                text={'Mark As Paid'}
                bgColor={colors.primaryColor}
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
                  data={userApartmentdata}
                  value={selectedUserAparment?.id}
                  onChange={(id, flatNo) => setselectedUserAparment({id, flatNo})}
                  labelField="flatNo"
                  valueField="id"
                />
              </View>
              <View style={{width:'45%'}}>
                <CustomDropdown
                  label="Flat"
                  data={flatData}
                  value={selectedFlat?.id}
                  // onChange={(id, flatNo) => {
                  //   const flat = societyDuesData.find(
                  //     flat => flat.flatId === id,
                  //   );
                  //   setSelectedFlatDues(flat);
                  //   setSelectedFlat({id, flatNo});
                  // }}
                  onChange={(id, flatNo) => setSelectedFlat({id, flatNo})}
                  labelField="flatNo"
                  valueField="id"
                />
              </View>
            </View>
            {/* <Text style={styles.textCon}>{selectedFlat?.flatNo}</Text> */}
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
              ListEmptyComponent={() => (
                <Text style={styles.noDataText}>
                  No items to display at this time
                </Text>
              )}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SocietyDues;
