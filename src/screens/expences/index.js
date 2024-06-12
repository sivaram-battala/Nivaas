import { StyleSheet, Text, View, ScrollView, Alert, Button, TouchableOpacity, Pressable, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { allTexts, colors, window } from '../../common';
import { CustomDropdown, CustomSelectDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library

const Expences = ({ navigation }) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState({ name: '', index: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [error, setError] = useState();
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

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const years = [];
  for (let year = 2023; year <= currentYear; year++) {
    years.push({ name: year.toString() });
  }

  const months = [
    { name: 'January', index: 1 },
    { name: 'February', index: 2 },
    { name: 'March', index: 3 },
    { name: 'April', index: 4 },
    { name: 'May', index: 5 },
    { name: 'June', index: 6 },
    { name: 'July', index: 7 },
    { name: 'August', index: 8 },
    { name: 'September', index: 9 },
    { name: 'October', index: 10 },
    { name: 'November', index: 11 },
    { name: 'December', index: 12 },
  ];

  const handleNavigation = () => {
    if (selectedApartment?.id) {
      navigation.navigate(allTexts.screenNames.addNewExpances);
      setError(false);
    } else {
      setError('Select One Apartment From The Above Dropdown')
    }
  };

  useEffect(() => {
    setSelectedYear(currentYear.toString());
    setSelectedMonth(months[currentMonthIndex]);
  }, []);

  const initialData = [
    { id: '1', text: 'Card 1' },
    { id: '2', text: 'Card 2' },
    { id: '3', text: 'Card 3' },
  ];

  const [listData, setListData] = useState(
    initialData.map((item, index) => ({
      key: `${index}`,
      ...item,
    })),
  );

  const handleDelete = rowKey => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setUpdatedText(item.text);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    const newData = listData.map(item =>
      item.key === selectedItem.key ? { ...item, text: updatedText } : item
    );
    setListData(newData);
    setModalVisible(false);
  };

  const renderItem = data => (
    <Pressable onPress={() => openEditModal(data.item)} style={styles.rowFront}>
      <Text>{data.item.text}</Text>
    </Pressable>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Button
        title="Delete"
        color="red"
        onPress={() => {
          Alert.alert(
            'Delete Confirmation',
            'Are you sure to delete this card?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: () => handleDelete(data.item.key),
              },
            ],
            { cancelable: true },
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'Expances'} navigation={navigation} />
      </View>
      <View style={styles.dropDown}>
        <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment.id}
          onChange={(id, name) => setSelectedApartment({ id, name })}
          labelField="name"
          valueField="id"
        />
      </View>
      <View style={styles.datePickerContainer}>
        <CustomSelectDropdown
          data={years}
          onSelect={selectedItem => setSelectedYear(selectedItem.name)}
          selectedItem={{ name: selectedYear }}
          placeholder="SELECT YEAR"
        />
        <CustomSelectDropdown
          data={months}
          onSelect={selectedItem => setSelectedMonth(selectedItem)}
          selectedItem={selectedMonth}
          placeholder="SELECT MONTH"
        />
      </View>
      <View>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
      <View style={styles.addButton}>
        <PrimaryButton
          text={'ADD EXPANCES'}
          bgColor={colors.primaryRedColor}
          onPress={handleNavigation}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Edit Card</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUpdatedText}
              value={updatedText}
            />
            <View style={styles.modalButtonContainer}>
              <PrimaryButton text={'UPDATE'} bgColor={colors.primaryRedColor} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Expences;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  dropDown: {
    marginHorizontal: '5%',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginTop: '5%',
  },
  addButton: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: '10%',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '8%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: '5%',
    textAlign: 'center',
    fontSize:16,
    fontWeight:'500',
    color:colors.black
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: window.width*0.6,
    padding: 10,
    marginBottom: '5%',
    borderRadius:5
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: window.width*0.6,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  errorText: {
    color: colors.red1,
    fontSize: 15,
  },
});
