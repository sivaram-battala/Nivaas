import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {allTexts, colors} from '../../common';
import {
  CustomSelectDropdown,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ExpancesValidation} from '../../common/schemas';
import { useAddDebitHistoryMutation, useUpdateDebitHistoryMutation } from '../../redux/services/expansesServices';

const AddNewExpances = ({navigation,route}) => {
  const {id,mode}=route?.params;
  console.log(id);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [transactionType, setTransactionType] = useState();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const [errors, setErrors] = useState({});
  const [addDebitHistory] = useAddDebitHistoryMutation();
  const [updateHistory] = useUpdateDebitHistoryMutation();
  const TypeOfTransactions = [
    {name: 'UTILITIES'},
    {name: 'SERVICES'},
    {name: 'REPAIRS'},
    {name: 'SALARY'},
    {name: 'OTHER'},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const minDate = moment(new Date(2023, 0, 1));
    const maxDate = moment();

    if (moment(date).isBetween(minDate, maxDate, 'day', '[]')) {
      setSelectedDate(formattedDate);
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        date: 'Please select a date between January 1, 2023 and today.',
      }));
    }
    hideDatePicker();
  };

  const handleSave = () => {
    if (mode === 'ADD') {
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        const payload = {
          transactionDate:selectedDate,
          type:transactionType?.name,
          description:description,
          amount:amount,
          apartmentId:id,
        }
        console.log(payload);
        addDebitHistory(payload)
          .unwrap()
          .then((responce)=>{
            console.log('ADD DEBIT HISTORY RESPONCE',responce);
          }).catch((error)=>{
            console.log('ERROR in adding History',error);
          })
      }
    } else {
      console.log('update');
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const updatepayload = {
          id:id?.itemId,
          payload :{
            transactionDate:selectedDate,
            type:transactionType?.name,
            description:description,
            amount:amount,
            apartmentId:id?.aprtmentId,
          }
        }
        console.log(updatepayload);
        updateHistory(updatepayload)
        .unwrap()
        .then((responce)=>{
          console.log('RESPONCE OF UPDATE HISTORY',responce);
          navigation.navigate(allTexts.screenNames.expences)
        }).catch((error)=>{
          console.log('ERROR IN UPDATING DEBIT HISTORY',error);
        })
      }
    }
  };

  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Add Expances'} navigation={navigation} />
      </View>
      <View style={styles.dateDropDownCon}>
        <View style={{width:'47%'}}>
          <View style={styles.dateModalIconCon}>
            <AntDesign
              name="calendar"
              size={30}
              style={{color: colors.primaryRedColor, marginLeft: 5}}
              onPress={showDatePicker}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Enter date"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />
          </View>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date(2023, 0, 1)}
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          buttonTextColorIOS="purple"
        />
        <View  style={{width:'47%'}}>
          <View style={styles.selectDropdown}>
            <CustomSelectDropdown
              data={TypeOfTransactions}
              onSelect={item => setTransactionType(item)}
              selectedItem={transactionType}
              placeholder="Select Type"
            />
          </View>
          {errors.transactionType && (
            <Text style={styles.errorText}>{errors.transactionType}</Text>
          )}
        </View>
      </View>
      <View style={styles.textFieldsCon}>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        <View style={styles.button}>
          <PrimaryButton
            text={(mode ==='ADD') ? 'ADD' : 'UPDATE'}
            bgColor={colors.primaryRedColor}
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewExpances;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.gray4,
    color: colors.black,
    marginTop: '5%',
    fontSize: 16,
  },
  dateDropDownCon: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  dateModalIconCon: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray2,
    backgroundColor: colors.gray4,
    borderRadius: 5,
  },
  dateInput: {
    borderRadius: 5,
    padding: 10,
    color: colors.black,
  },
  selectDropdown: {
    height: 40,
    width: '100%',
  },
  textFieldsCon: {
    marginHorizontal: '5%',
  },
  button: {
    marginVertical: '5%',
  },
  errorText: {
    color: colors.red1,
    fontSize: 15,
  },
});
