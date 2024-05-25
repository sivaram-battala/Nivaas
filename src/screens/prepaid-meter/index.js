import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NumericTextInput, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {colors, window} from '../../common';
import {useDispatch} from 'react-redux';
const PrepaidMeter = ({navigation}) => {
  const dispatch = useDispatch();
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const data = [
    {id: '1', flatNo: '100', units: 28},
    {id: '2', flatNo: '200', units: 22},
    {id: '3', flatNo: '207', units: 32},
    // Add more data as needed
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.flatNo}</Text>
      <NumericTextInput />
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Prepaid Meters'}
          navigation={navigation}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>Meter Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value for field 1"
              value={field1}
              onChangeText={setField1}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value for field 2"
              value={field2}
              onChangeText={setField2}
            />

            <Text style={styles.label}>Cost Per Unit:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value for field 3"
              value={field3}
              onChangeText={setField3}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.header}>
            <Text style={styles.headerCell}>Flat Number</Text>
            <Text style={styles.headerCell}>Consumption(Units)</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity style={styles.buttonCon}>
          <PrimaryButton text={'SAVE'} bgColor={colors.primaryRedColor} />
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
    color:colors.black
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
    color:colors.black
  },
  buttonCon: {
    marginHorizontal: '5%',
  },
});

export default PrepaidMeter;
