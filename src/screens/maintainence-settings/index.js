import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, FlatList,TextInput, ScrollView} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {colors} from '../../common';
import {statusBarHeight} from '../../utils/config/config';
import {PrimaryButton, TopBarCard2} from '../../components';
import {useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';

const MaintainenceSettings = ({navigation}) => {
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
  const [value, setvalue] = useState();
  const handleCheckboxToggle = id => {
    const updatedData = data.map(item =>
      item.id === id ? {...item, checked: !item.checked} : item,
    );
    setData(updatedData);
    // console.log(updatedData,'updateddataa');
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
  // const radioButtons = useMemo(
  //   () => [
  //     {
  //       id: '1',
  //       label: 'Static',
  //       value: 'static',
  //     },
  //     {
  //       id: '2',
  //       label: 'Dynamic',
  //       value: 'dynamic',
  //     },
  //   ],
  //   [],
  // );

  const [selectedId, setSelectedId] = useState();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} navigation={navigation} txt={'Maintainence'} />
      </View>
      {/* <View style={styles.radioContainer}>
        {radioButtons.map(button => (
          <View key={button.id} style={styles.radioButtonContainer}>
            <RadioGroup
              radioButtons={[button]}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
            />
            {selectedId === button.id && (
              <View style={styles.viewContainer}>
                <Text style={styles.viewText}>
                  {button.label === 'Static' ? (
                    <View>
                      <Text>static</Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.container}
                      />
                    </View>
                  )}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View> */}
      <View style={styles.flatlistCon}>
        <TextInput
          style={styles.input}
          placeholder="Enter maintainence Charge"
          value={value}
          onChangeText={setvalue}
          keyboardType='numeric'
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
  radioContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  radioButtonContainer: {
    marginBottom: 20,
  },
  viewContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  viewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  flatlistCon: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  buttonCon: {
    marginHorizontal: '3%',
    marginVertical: '10%',
  },
  checkboxContainer:{
    marginHorizontal:'2%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    marginHorizontal:'4.5%',
    marginVertical:'5%'
  },
});
