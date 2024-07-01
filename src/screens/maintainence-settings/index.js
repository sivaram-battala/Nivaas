import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { allTexts, colors } from '../../common';
import { statusBarHeight } from '../../utils/config/config';
import {
  CustomDropdown,
  CustomSelectDropdown,
  Loader,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import { useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { useLazyGetAparmentPrepaidMetersQuery } from '../../redux/services/prepaidMeterService';
import { useNotifyOnMutation } from '../../redux/services/maintainenceService';
import { ApprovedApartments, SnackbarComponent } from '../../common/customFunctions';

const MaintainenceSettings = ({ navigation }) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setloader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [prepaidMetersData, setPrepaidMetersData] = useState([]);
  const [checkedMeters, setCheckedMeters] = useState([]);
  const prepaidIdArray = checkedMeters?.map((item) => item.id);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState('');
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();
  const [maintainenceSave] = useNotifyOnMutation();

  const handleCheckboxToggle = (id) => {
    const updatedData = prepaidMetersData?.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPrepaidMetersData(updatedData);

    const updatedCheckedMeters = updatedData
      ?.filter((item) => item.checked)
      ?.map((item) => ({ id: item.id, name: item.name }));
    setCheckedMeters(updatedCheckedMeters);
  };

  const generateDates = (month, year) => {
    const date = new Date(year, month, 0).getDate();
    return Array.from({ length: date }, (_, i) => ({
      id: i + 1,
      name: (i + 1).toString().padStart(2, '0'),
    }));
  };
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const dropDownData = generateDates(currentMonth, currentYear);

  const renderItem = ({ item }) => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        title={item?.name}
        checked={item?.checked}
        onPress={() => handleCheckboxToggle(item.id)}
        checkedColor={colors.primaryColor}
      />
    </View>
  );

  const handlePrepaidMetersList = (apartmentId) => {
    setloader(true);
    const payload = {
      apartmentId,
      pageNo: 0,
      pageSize: 10,
    };
    getApartmentPrepaidMetersList(payload)
      .unwrap()
      .then((response) => {
        setloader(false);
        setPrepaidMetersData(
          response?.data?.map((meter) => ({
            ...meter,
            checked: false,
          }))
        );
      })
      .catch((error) => {
        console.log('error in Apartment PrepaidMetersList=====>', error);
        SnackbarComponent({text:'Cheak Your NETWORK',backgroundColor:colors.red1})
      });
  };

  const handlesave = () => {
    const maintainencePayload = {
      notifyOn: selectedDate,
      cost: value,
      apartmentId: selectedApartment?.id,
      prepaidId: prepaidIdArray,
    };
    console.log(maintainencePayload);
    maintainenceSave(maintainencePayload)
      .unwrap()
      .then((response) => {
        console.log('RESPONSE OF MAINTAINENCE SAVE====>', response);
        SnackbarComponent({ text: response?.message || 'Saved Successfully', backgroundColor: colors.green });
        navigation.navigate(allTexts.screenNames.adminSociety);
      })
      .catch((error) => {
        console.log('ERROR IN MAINTAINENCE SAVE====>', error);
        SnackbarComponent({ text: error?.data?.error || 'Error In Saving Maintainence', backgroundColor: colors.red1 });
      });
  };

  useEffect(() => {
    if (selectedApartment?.id) {
      handlePrepaidMetersList(selectedApartment?.id);
    }
  }, [selectedApartment]);

  useEffect(() => {
    ApprovedApartments({customerDetails:customerDetails?.customerOnboardReqData,setApartmentData:setApartmentData,setSelectedApartment:setSelectedApartment})
  }, [customerDetails?.customerOnboardReqData]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} navigation={navigation} txt={'Maintenance'} />
      </View>
      <View style={styles.headerCon}>
        <View style={styles.dropDown}>
        {/* <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment?.id}
          onChange={(id, name) => setSelectedApartment({id, name})}
          labelField="name"
          valueField="id"
        /> */}
        {apartmentData?.length >= 1 && (
          <View>
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
        <View style={styles.datePicker}>
          <CustomSelectDropdown
            data={dropDownData}
            onSelect={(selectedItem) => setSelectedDate(selectedItem?.name)}
            selectedItem={{ name: selectedDate }}
            placeholder={'NOTIFY ON'}
          />
        </View>
      </View>
      <View style={styles.flatlistCon}>
        <TextInput
          style={styles.input}
          placeholder="Enter maintenance Charge"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
        {loader ? (
          <View>
            <Loader color={colors.primaryColor} size={'large'} />
          </View>
        ) : (
          <FlatList
            data={prepaidMetersData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>
                No items to display at this time
              </Text>
            )}
          />
        )}
        {loader ? (
          ''
        ) : (
          <View style={styles.buttonCon}>
            <PrimaryButton
              text={'SAVE'}
              bgColor={colors.primaryColor}
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
    marginTop: 30,
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
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  checkboxContainer: {
    marginHorizontal: '2%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: colors.gray3,
    marginHorizontal: '4.5%',
  },
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: colors.primaryColor,
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
    color: colors.red1,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
