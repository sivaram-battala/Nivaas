import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {allTexts, colors, window} from '../../common';
import {
  CustomDropdown,
  CustomSelectDropdown,
  Loader,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library
import {
  useDeleteExpancesMutation,
  useLazyGetAllExpancesQuery,
  useLazyGetExpancesByIdQuery,
  useLazyGetExpancesPDFQuery,
} from '../../redux/services/expansesServices';
import RNFS from 'react-native-fs';

const Expences = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader,setLoader] = useState(false);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''});
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState({name: '', index: null});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [error, setError] = useState();
  const [expancesData, setExpancesData] = useState([]);

  //rtk
  const [getAllExpancesQuery] = useLazyGetAllExpancesQuery();
  const [getExpacesByID] = useLazyGetExpancesByIdQuery();
  const [getExpancesPDF] = useLazyGetExpancesPDFQuery();
  const [deleteExpances] = useDeleteExpancesMutation();

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const years = [];
  for (let year = 2023; year <= currentYear; year++) {
    years.push({name: year});
  }

  const months = [
    {name: 'January', index: 0},
    {name: 'February', index: 1},
    {name: 'March', index: 2},
    {name: 'April', index: 3},
    {name: 'May', index: 4},
    {name: 'June', index: 5},
    {name: 'July', index: 6},
    {name: 'August', index: 7},
    {name: 'September', index: 8},
    {name: 'October', index: 9},
    {name: 'November', index: 10},
    {name: 'December', index: 11},
  ];

  const handleNavigation = () => {
    if (selectedApartment?.id) {
      navigation.navigate(allTexts.screenNames.addNewExpances, {
        id: selectedApartment?.id,
        mode: 'ADD',
      });
      setError(false);
    } else {
      setError('Select One Apartment From The Above Dropdown');
    }
  };

  const handlegetAllExpances = id => {
    setLoader(true)
    const payload = {
      apartmentID: id,
      year: selectedYear,
      month: selectedMonth?.index,
    };
    console.log(payload);
    getAllExpancesQuery(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF GETALLEXPANCES', responce);
        setExpancesData(responce);
        setLoader(false)
      })
      .catch(error => {
        console.log('ERROR IN GETALLEXPANCES', error);
      });
  };
  const handleExpanceById =()=>{
    const payload={
      id:selectedApartment?.id
    }
    getExpacesByID(payload)
      .unwrap()
      .then((responce)=>{
        console.log('RESPOCE OF GET EXPANVES BY ID',responce);
      }).catch((error)=>{
        console.log('ERROR IN GET EXPANCE BY ID',error);
      })
  }

  const handlegetExpancePDF = async () => {
    try {
      const payload = {
        apartmentID: selectedApartment?.id,
        year: selectedYear,
        month: selectedMonth?.index,
      }
      const response = await getExpancesPDF(payload).unwrap();
      const { DownloadDirectoryPath } = RNFS;
      const filePath = `${DownloadDirectoryPath}/expenses_${payload?.year}_${payload?.month}.pdf`;
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        RNFS.writeFile(filePath, base64data, 'base64')
          .then(() => {
            Alert.alert('Success', 'File downloaded successfully!', [{ text: 'OK' }]);
          })
          .catch((err) => {
            console.error('Download error:', err);
            Alert.alert('Error', 'File download failed.', [{ text: 'OK' }]);
          });
      };
    } catch (err) {
      console.error('Download error:', err);
      Alert.alert('Error', 'File download failed.', [{ text: 'OK' }]);
    }
  };
  

  const handleDelete = id => {
    const payload = {
      apartmentID: selectedApartment?.id,
      id: id,
    };
    console.log(payload);
    deleteExpances(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF DELETE EXPANSIONS', responce);
        handlegetAllExpances(selectedApartment?.id);
      })
      .catch(error => {
        console.log('ERROR IN DELETE EXPANSIONS', error);
      });
  };

  const openEditModal = item => {
    setSelectedItem(item);
    setUpdatedText(item.text);
    setModalVisible(true);
  };
  const handleEdit = item => {
    navigation.navigate(allTexts.screenNames.addNewExpances, {
      id: {itemId:item?.id,aprtmentId:selectedApartment?.id},
      mode: 'UPDATE',
    });
  };

  const handleUpdate = () => {
    const newData = listData.map(item =>
      item.key === selectedItem.key ? {...item, text: updatedText} : item,
    );
    setListData(newData);
    setModalVisible(false);
  };

  useEffect(() => {
    setSelectedYear(currentYear);
    setSelectedMonth(months[currentMonthIndex]);
  }, []);

  useEffect(() => {
    if (customerDetails?.currentCustomerData?.apartmentDTOs) {
      const approvedApartments =
        customerDetails?.currentCustomerData?.apartmentDTOs
          .filter(apartment => apartment.adminApproved)
          .map(apartment => ({
            id: apartment.jtApartmentDTO.id,
            name: apartment.jtApartmentDTO.name,
          }));
      setApartmentData(approvedApartments);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (selectedApartment?.id) {
      handlegetAllExpances(selectedApartment?.id);
    }
  }, [selectedApartment]);

  const renderItem = data =>
      <Pressable onPress={() => handleEdit(data.item)} style={styles.rowFront}>
        <View style={styles.eachHeader}>
          <Text style={styles.dataCell}>{data?.item?.type}</Text>
        </View>
        <View style={styles.eachHeader}>
          <Text style={styles.dataCell}>{data?.item?.description}</Text>
        </View>
        <View style={styles.eachHeader}>
          <Text style={styles.dataCell}>{data?.item?.amount}</Text>
        </View>
      </Pressable>
  
    // (data) ? (
    //   <Pressable onPress={() => handleEdit(data.item)} style={styles.rowFront}>
    //     <View style={styles.eachHeader}>
    //       <Text style={styles.dataCell}>{data?.item?.type}</Text>
    //     </View>
    //     <View style={styles.eachHeader}>
    //       <Text style={styles.dataCell}>{data?.item?.description}</Text>
    //     </View>
    //     <View style={styles.eachHeader}>
    //       <Text style={styles.dataCell}>{data?.item?.amount}</Text>
    //     </View>
    //   </Pressable>
    // ) : (
    //   <View style={{alignItems: 'center', marginVertical: '5%'}}>
    //     <Text style={styles.errorText}>
    //       Expances Data Not Available Add Your Expances Below
    //     </Text> 
    //   </View>
    // );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Button
        title="Delete"
        color={colors.red1}
        onPress={() => {
          Alert.alert(
            'Delete Confirmation',
            'Are you sure to delete',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'OK',
                onPress: () => handleDelete(data.item.id),
              },
            ],
            {cancelable: true},
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Expances'} navigation={navigation} />
      </View>
      <View style={styles.dropDown}>
        <CustomDropdown
          label="Apartment"
          showLabel={false}
          data={apartmentData}
          value={selectedApartment.id}
          onChange={(id, name) => setSelectedApartment({id, name})}
          labelField="name"
          valueField="id"
        />
      </View>
      <View style={styles.datePickerContainer}>
        <CustomSelectDropdown
          data={years}
          onSelect={selectedItem => setSelectedYear(selectedItem.name)}
          selectedItem={{name: selectedYear}}
          placeholder="SELECT YEAR"
        />
        <CustomSelectDropdown
          data={months}
          onSelect={selectedItem => setSelectedMonth(selectedItem)}
          selectedItem={selectedMonth}
          placeholder="SELECT MONTH"
        />
      </View>
      {
        loader ? (
          <View>
            <Loader color={colors.primaryRedColor} size={'large'} />
          </View>
        ) : (
          selectedApartment?.id ? (
            <View>
              <View style={styles.header}>
                <View style={styles.eachHeader}>
                  <Text style={styles.headerCell}>Transaction Date</Text>
                </View>
                <View style={styles.eachHeader}>
                  <Text style={styles.headerCell}>Transaction Type</Text>
                </View>
                <View style={styles.eachHeader}>
                  <Text style={styles.headerCell}>Amount</Text>
                </View>
              </View>
              <SwipeListView
                data={expancesData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
              <View style={{marginHorizontal:'5%'}}>
                <PrimaryButton text={'DOWNLOAD'} bgColor={colors.primaryRedColor} onPress={handlegetExpancePDF}/>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center', marginVertical: '5%'}}>
              <Text style={styles.errorText}>
                Select Any Apartment To Get Expances
              </Text>
            </View>
          )
        )
      }
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
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}>
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
    marginBottom: '5%',
  },
  rowFront: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomColor: colors.gray2,
    borderBottomWidth: 1,
    alignItems: 'center',
    // paddingHorizontal: '10%',
    marginHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  eachHeader: {
    width: '31%',
    height: 40,
    paddingVertical: 10,
    marginHorizontal: '1%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  dataCell: {
    flex: 1,
    alignItems: 'flex-start',
    color: colors.black,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '6%',
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: window.width * 0.6,
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: window.width * 0.6,
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
