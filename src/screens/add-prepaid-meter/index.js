import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {statusBarHeight} from '../../utils/config/config';
import {PrimaryButton, TopBarCard2} from '../../components';
import {allTexts, colors} from '../../common';
import {FlatList} from 'react-native';

const AddPrepaidMeter = ({navigation}) => {
  const [prepaidMeters, setPrepaidMeters] = useState([]);

  useEffect(() => {
    fetchPrepaidMeters();
  }, []);

  const fetchPrepaidMeters = async () => {
    const fetchedMeters = [
      {id: '001', meterName: 'Meter A'},
      {id: '002', meterName: 'Meter B'},
      {id: '003', meterName: 'Meter C'},
      {id: '004', meterName: 'Meter D'},
    ];
    setPrepaidMeters(fetchedMeters);
  };

  const renderPrepaidMeter = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.meterName}</Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Prepaid Meter'}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        {prepaidMeters.length === 0 ? (
          <Text style={styles.noDataText}>No prepaid meters</Text>
        ) : (
          <FlatList
            data={prepaidMeters}
            renderItem={renderPrepaidMeter}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Meter Name</Text>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.buttonCon}>
        <PrimaryButton
          text={'Add Prepaid Meter'}
          bgColor={colors.primaryRedColor}
          onPress={() => navigation.navigate(allTexts.screenNames.prepaidMeter)}
        />
      </View>
    </ScrollView>
  );
};

export default AddPrepaidMeter;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal:'6%',
    paddingVertical:'5%'
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color:colors.black
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  itemText: {
    fontSize: 14,
    color:colors.black
  },
  buttonCon:{
    marginHorizontal:'6%'
  }
});
