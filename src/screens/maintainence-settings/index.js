import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {colors} from '../../common';
import {statusBarHeight} from '../../utils/config/config';
import {
  CustomDropdown,
  Loader,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {useLazyGetAparmentPrepaidMetersQuery} from '../../redux/services/prepaidMeterService';
import SelectDropdown from 'react-native-select-dropdown';
import {useNotifyOnMutation} from '../../redux/services/maintainenceService';

const MaintainenceSettings = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setloader] = useState();
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [prepaidMetersData, setPrepaidMetersData] = useState([]);
  const [checkedMeters, setCheckedMeters] = useState([]);
  const prepaidIdArray = checkedMeters.map(item => item.id);
  console.log(checkedMeters);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState('');
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();
  const [maintainenceSave] = useNotifyOnMutation();

  const handleCheckboxToggle = id => {
    const updatedData = prepaidMetersData.map(item =>
      item.id === id ? {...item, checked: !item.checked} : item,
    );
    setPrepaidMetersData(updatedData);

    const updatedCheckedMeters = updatedData
      .filter(item => item.checked)
      .map(item => ({id: item.id, name: item.name}));
    setCheckedMeters(updatedCheckedMeters);
  };

  const generateDates = (month, year) => {
    const date = new Date(year, month, 0).getDate();
    return Array.from({length: date}, (_, i) => ({
      id: i + 1,
      date: (i + 1).toString().padStart(2, '0'),
    }));
  };
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const dropDownData = generateDates(currentMonth, currentYear);

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
    if (selectedApartment?.id) {
      handlePrepaidMetersList(selectedApartment?.id);
    }
  }, [selectedApartment?.id]);

  const renderItem = ({item}) => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        title={item?.name}
        checked={item?.checked}
        onPress={() => handleCheckboxToggle(item.id)}
        checkedColor={colors.primaryRedColor}
      />
    </View>
  );

  const handlePrepaidMetersList = apartmentId => {
    setloader(true);
    const payload = {
      apartmentId,
      pageNo: 0,
      pageSize: 10,
    };
    getApartmentPrepaidMetersList(payload)
      .unwrap()
      .then(response => {
        setloader(false);
        setPrepaidMetersData(
          response?.data.map(meter => ({
            ...meter,
            checked: false,
          })),
        );
      })
      .catch(error => {
        console.log('error in Apartment PrepaidMetersList=====>', error);
      });
  };

  const handlesave = () => {
    const maintainencePayload = {
      notifyOn: selectedDate?.date,
      cost: value,
      apartmentId: selectedApartment?.id,
      prepaidId: prepaidIdArray,
    };
    // console.log(maintainencePayload);
    maintainenceSave(maintainencePayload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF MAINTAINENCE SAVE====>', responce);
      })
      .catch(error => {
        console.log('ERROR IN MAINTAINENCE SAVE====>', error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} navigation={navigation} txt={'Maintainence'} />
      </View>
      <View style={styles.headerCon}>
        <View style={styles.dropDown}>
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
        <View style={styles.datePicker}>
          <SelectDropdown
            data={dropDownData}
            onSelect={(selectedItem, index) => {
              setSelectedDate(selectedItem);
            }}
            renderButton={selectedItem => {
              return (
                <ScrollView style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.date) || 'NOTIFY ON'}
                  </Text>
                </ScrollView>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {
                      backgroundColor: colors.primaryRedColor,
                    }),
                  }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.date}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      </View>
      <View style={styles.flatlistCon}>
        <TextInput
          style={styles.input}
          placeholder="Enter maintainence Charge"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
        {loader ? (
          <View>
            <Loader color={colors.primaryRedColor} size={'large'} />
          </View>
        ) : (
          <FlatList
            data={prepaidMetersData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.container}
          />
        )}
        {loader ? ('') : (
          <View style={styles.buttonCon}>
            <PrimaryButton
              text={'SAVE'}
              bgColor={colors.primaryRedColor}
              onPress={handlesave}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MaintainenceSettings;

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: '100%',
  },
  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  datePicker: {
    marginTop: 25,
    width: '30%',
  },
  dropDown: {
    width: '50%',
    height: 100,
  },
  flatlistCon: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  buttonCon: {
    marginHorizontal: '3%',
    marginVertical: '10%',
  },
  checkboxContainer: {
    marginHorizontal: '2%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    marginHorizontal: '4.5%',
  },
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: colors.primaryRedColor,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
    marginHorizontal: '15%',
  },
  dropdownMenuStyle: {
    backgroundColor: colors.gray3,
    borderRadius: 5,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
