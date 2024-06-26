import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
import {PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddConsumptionUnitsModal = ({unitsConsumed,addModalVisible, setAddModalVisible,flatdata,handleUpdateConsumptionUnits,handleconsumptionUnits}) => {
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item?.flatNo}</Text>
      {/* <NumericTextInput /> */}
      <TextInput
        placeholder="Enter a Value"
        value={unitsConsumed}
        onChangeText={(text) => handleconsumptionUnits(item?.id, text)}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <KeyboardAwareScrollView>
       <Modal
      animationType="fade"
      transparent={true}
      visible={addModalVisible}
      onRequestClose={() => setAddModalVisible(false)}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{height: '60%'}}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAddModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Consumption Units</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Icon name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.container2}>
              <View style={styles.header}>
                <Text style={styles.headerCell}>Flat Number</Text>
                <Text style={styles.headerCell}>Consumption(Units)</Text>
              </View>
              <FlatList
                data={flatdata}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                ListEmptyComponent={() => (
                  <Text style={styles.noDataText}>
                    No items to display at this time
                  </Text>
                )}
              />
              <View style={styles.updateButton}>
                <PrimaryButton
                  text={'Add Consumption'}
                  onPress={handleUpdateConsumptionUnits}
                  bgColor={colors.primaryRedColor}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAwareScrollView>
    </Modal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    marginVertical: '50%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryRedColor,
  },
  container2: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: '15%',
    paddingLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    fontSize: 14,
    color: colors.black,
  },
  updateButton: {
    marginTop: 20,
  },
});

export default AddConsumptionUnitsModal;
