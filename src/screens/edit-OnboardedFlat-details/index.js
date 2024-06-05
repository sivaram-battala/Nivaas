import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  FlatList,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { colors } from '../../common';
import { statusBarHeight } from '../../utils/config/config';
import { useSelector } from 'react-redux';

// Sample flat data for different apartments
const sampleFlatData = {
  126: [
    { flatNo: 101, ownerPhoneNo: '0123456789', ownerName: 'Ravali' },
    { flatNo: 102, ownerPhoneNo: '0987654321', ownerName: 'Sai' },
  ],
  145: [
    { flatNo: 201, ownerPhoneNo: '1123456789', ownerName: 'John' },
    { flatNo: 202, ownerPhoneNo: '1987654321', ownerName: 'Doe' },
  ],
  3: [
    { flatNo: 301, ownerPhoneNo: '2123456789', ownerName: 'Jane' },
    { flatNo: 302, ownerPhoneNo: '2987654321', ownerName: 'Smith' },
  ],
};

const EditOnboardedFlatDetails = ({ navigation }) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({ id: '', name: '' });
  const [flatData, setFlatData] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleApartmentChange = (id) => {
    setSelectedApartment(id);
    setFlatData(sampleFlatData[id] || []);
  };

  const handleUpdate = () => {
    const newFlatData = [...flatData];
    newFlatData[selectedFlat.index] = selectedFlat;
    setFlatData(newFlatData);
    setModalVisible(false);
  };

  const openModal = (index) => {
    setSelectedFlat({ ...flatData[index], index });
    setModalVisible(true);
  };

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

  const renderFlatItem = ({ item, index }) => (
    <View style={styles.tableRow}>
      <TouchableOpacity style={styles.tableCell} onPress={() => openModal(index)}>
        <Text style={styles.dataText}>{item.flatNo}</Text>
      </TouchableOpacity>
      <View style={styles.verticalLine} />
      <TouchableOpacity style={styles.tableCell} onPress={() => openModal(index)}>
        <Text style={styles.dataText}>{item.ownerPhoneNo}</Text>
      </TouchableOpacity>
      <View style={styles.verticalLine} />
      <TouchableOpacity style={styles.tableCell} onPress={() => openModal(index)}>
        <Text style={styles.dataText}>{item.ownerName}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{ height: 50, marginTop: statusBarHeight }}>
        <TopBarCard2
          back={true}
          txt={'Edit Flat Details'}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <CustomDropdown
          label="Apartment"
          data={apartmentData}
          value={selectedApartment}
          onChange={(id) => handleApartmentChange(id)}
          labelField="name"
          valueField="id"
        />
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>Flat No</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Owner Phone No</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Owner Name</Text>
          </View>
          <FlatList
            data={flatData}
            renderItem={renderFlatItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={colors.black} />
            </TouchableOpacity>
            {selectedFlat && (
              <>
                <TextInput
                  style={styles.modalTextInput}
                  value={selectedFlat.flatNo.toString()}
                  onChangeText={(text) => setSelectedFlat({ ...selectedFlat, flatNo: text })}
                  placeholder="Flat No"
                />
                <TextInput
                  style={styles.modalTextInput}
                  value={selectedFlat.ownerPhoneNo}
                  onChangeText={(text) => setSelectedFlat({ ...selectedFlat, ownerPhoneNo: text })}
                  placeholder="Owner Phone No"
                />
                <TextInput
                  style={styles.modalTextInput}
                  value={selectedFlat.ownerName}
                  onChangeText={(text) => setSelectedFlat({ ...selectedFlat, ownerName: text })}
                  placeholder="Owner Name"
                />
                <PrimaryButton text={'UPDATE'} bgColor={colors.primaryRedColor} onPress={handleUpdate} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  table: {
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor:colors.gray2,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  dataText:{
    color:colors.black,
    fontSize:15
  },
  tableHeader: {
    backgroundColor: colors.gray3,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    color:colors.black
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: colors.gray2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTextInput: {
    width: '100%',
    padding: 10,
    fontSize:15,
    backgroundColor: colors.gray3,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default EditOnboardedFlatDetails;
