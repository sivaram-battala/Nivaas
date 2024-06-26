import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomDropdown,
  EditOnBoarderFlatDetailsModal,
  Loader,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {colors} from '../../common';
import {statusBarHeight} from '../../utils/config/config';
import {useSelector} from 'react-redux';
import {useLazyGetFlatsListQuery} from '../../redux/services/cityServices';
import {useUpdateFlatDetailsMutation} from '../../redux/services/maintainenceService';
import { ApprovedApartments, SnackbarComponent } from '../../common/customFunctions';

const EditOnboardedFlatDetails = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [flatID, setFlatID] = useState();
  const [flatdata, setflatdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({flatNo: '',ownerPhoneNo: '',ownerName: ''});

  const [getflatdata] = useLazyGetFlatsListQuery();
  const [updateOnboardedFlatDetails] = useUpdateFlatDetailsMutation();

  const handleApartmentChange = (id, name) => {
    setSelectedApartment({id, name});
  };

  const handleFlatData = id => {
    setLoader(true);
    const flatPayload = {
      flatId: id,
      pageNo: 0,
      pageSize: 100,
    };
    getflatdata(flatPayload)
      .unwrap()
      .then(response => {
        setLoader(false);
        console.log(response?.data, 'RESPONCE OF FLAT DATA');
        const processedFlatData = response?.data.map(item => ({
          ...item,
          flatNo: String(item.flatNo),
        }));
        setflatdata(processedFlatData);
      })
      .catch(error => {
        console.log('error in flat data==========>', error);
        SnackbarComponent({text:error?.data?.error || 'failed To Load FlatsData',backgroundColor:colors.red1})
      });
  };

  const handleRowPress = item => {
    setFlatID(item?.id);
    setFormData({
      flatNo: item?.flatNo,
      ownerPhoneNo: item?.ownerDTO?.primaryContact,
      ownerName: item?.ownerDTO?.fullName,
    });
    setModalVisible(true);
  };

  const handleFormSubmit = () => {
    console.log('Updated FormData:', formData);
    const flatPayload = {
      apartmentId: selectedApartment?.id,
      flatId: flatID,
      payload: {
        flatNo: formData?.flatNo,
        ownerPhoneNo: formData?.ownerPhoneNo,
        ownerName: formData?.ownerName,
      },
    };
    updateOnboardedFlatDetails(flatPayload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE updateOnboardedFlatDetails', responce);
        SnackbarComponent({text:responce?.message || 'Flats data Updated',backgroundColor:colors.green})
        handleFlatData(selectedApartment?.id);
      })
      .catch(error => {
        console.log('ERROR IN updateOnboardedFlatDetails', error);
        SnackbarComponent({text:error?.data?.error || 'Failed To Update',backgroundColor:colors.red1})
      });
    setModalVisible(false);
  };
  useEffect(() => {
    ApprovedApartments({customerDetails:customerDetails?.customerOnboardReqData,setApartmentData:setApartmentData,setSelectedApartment:setSelectedApartment})
  }, [customerDetails?.customerOnboardReqData]);

  useEffect(() => {
    if (selectedApartment?.id) {
      handleFlatData(selectedApartment?.id);
    }
  }, [selectedApartment?.id]);
  return (
    <View style={styles.mainCon}>
      <View style={{height:70, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Edit Flat Details'}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        {/* <CustomDropdown
          label="Apartment"
          data={apartmentData}
          value={selectedApartment}
          onChange={(id, name) => handleApartmentChange(id, name)}
          labelField="name"
          valueField="id"
        /> */}
        {apartmentData?.length >= 1 && (
          <View>
            <CustomDropdown
              label="Owner"
              data={apartmentData}
              value={selectedApartment}
              onChange={(id, name) => handleApartmentChange(id, name)}
              labelField="name"
              valueField="id"
            />
          </View>
        )}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>Flat No</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Owner Phone No</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Owner Name</Text>
          </View>
          {loader ? (
            <View>
              <Loader color={colors.primaryColor} size={'large'} />
            </View>
          ) : (
            <FlatList
              data={flatdata}
              keyExtractor={(item, index) => index.toString()}
              style={{marginBottom:'30%'}}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => handleRowPress(item)}
                  style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.dataText}>{item?.flatNo}</Text>
                  </View>
                  <View style={styles.verticalLine} />
                  <View style={styles.tableCell}>
                    <Text style={styles.dataText}>
                      {item?.ownerDTO?.primaryContact}
                    </Text>
                  </View>
                  <View style={styles.verticalLine} />
                  <View style={styles.tableCell}>
                    <Text style={styles.dataText}>
                      {item?.ownerDTO?.fullName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text style={styles.noDataText}>
                  No items to display at this time
                </Text>
              )}
            />
          )}
        </View>
      </View>
      <EditOnBoarderFlatDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} setFormData={setFormData} formData={formData} handleFormSubmit={handleFormSubmit}/>
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
    borderBottomColor: colors.gray2,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  dataText: {
    color: colors.black,
    fontSize: 15,
  },
  tableHeader: {
    backgroundColor: colors.gray3,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    color: colors.black,
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: colors.gray2,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: colors.gray2,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: colors.black,
  },
});

export default EditOnboardedFlatDetails;
