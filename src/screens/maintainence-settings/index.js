import React, {useState, useMemo} from 'react';
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
import {PrimaryButton, TopBarCard2} from '../../components';
import {useSelector} from 'react-redux';
import {Button, CheckBox} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MaintainenceSettings = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [value, setvalue] = useState();
  const backendData = [
    {id: 1, name: 'Water Meter', field1: '555555', field2: '500000'},
    {id: 2, name: 'Apartment Size Meter', field1: '200000', field2: '222222'},
  ];
  // console.log('backenddata', backendData);
  const prepaidMetersList = useSelector(state => state.prepaidMeter);
  const datas = prepaidMetersList?.setPrepaidMetersData;
  console.log(datas, '<==========prepaidmetersList');
  const [data, setData] = useState(
    backendData?.map(item => ({...item, checked: false})),
  );

  const handleCheckboxToggle = id => {
    const updatedData = data.map(item =>
      item.id === id ? {...item, checked: !item.checked} : item,
    );
    setData(updatedData);
    // console.log(updatedData,'updateddataa');
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  const renderItem = ({item}) => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        title={item.name}
        checked={item.checked}
        onPress={() => handleCheckboxToggle(item.id)}
        checkedColor={colors.primaryRedColor}
      />
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} navigation={navigation} txt={'Maintainence'} />
      </View>
      <View>
        <View style={styles.datePicker}>
          <PrimaryButton
            text={'Notify On'}
            bgColor={colors.primaryRedColor}
            onPress={showDatePicker}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          isDarkModeEnabled={true}
        />
      </View>
      <View style={styles.flatlistCon}>
        <TextInput
          style={styles.input}
          placeholder="Enter maintainence Charge"
          value={value}
          onChangeText={setvalue}
          keyboardType="numeric"
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.container}
        />
        <View style={styles.buttonCon}>
          <PrimaryButton text={'SAVE'} bgColor={colors.primaryRedColor} />
        </View>
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
  datePicker:{
    marginHorizontal: '10%',
    marginVertical: '10%',
    width:'20%'
  },
  flatlistCon: {
    marginHorizontal: '5%',
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
});
