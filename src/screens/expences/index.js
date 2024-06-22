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
import {
  useDeleteExpancesMutation,
  useLazyGetAllExpancesQuery,
  useLazyGetExpancesByIdQuery,
  useLazyGetExpancesPDFQuery,
} from '../../redux/services/expansesServices';
import RNFS from 'react-native-fs';
import {
  ApprovedApartments,
  SnackbarComponent,
} from '../../common/customFunctions';
import {styles} from './style';

const Expences = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
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
  const months = allTexts.months;
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
    setLoader(true);
    const payload = {
      apartmentID: id,
      year: selectedYear,
      month: selectedMonth?.index,
    };
    console.log(payload);
    getAllExpancesQuery(payload)
      .unwrap()
      .then(responce => {
        // console.log('RESPONCE OF GETALLEXPANCES', responce);
        setExpancesData(responce);
        setLoader(false);
      })
      .catch(error => {
        console.log('ERROR IN GETALLEXPANCES', error);
      });
  };
  const handleExpanceById = () => {
    const payload = {
      id: selectedApartment?.id,
    };
    getExpacesByID(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPOCE OF GET EXPANVES BY ID', responce);
      })
      .catch(error => {
        console.log('ERROR IN GET EXPANCE BY ID', error);
      });
  };

  const handlegetExpancePDF = async () => {
    try {
      const payload = {
        apartmentID: selectedApartment?.id,
        year: selectedYear,
        month: selectedMonth?.index,
      };
      const response = await getExpancesPDF(payload).unwrap();
      const {DownloadDirectoryPath} = RNFS;
      const filePath = `${DownloadDirectoryPath}/expenses_${payload?.year}_${payload?.month}.pdf`;
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        RNFS.writeFile(filePath, base64data, 'base64')
          .then(() => {
            // Alert.alert('Success', 'File downloaded successfully!', [{ text: 'OK' }]);
            SnackbarComponent({
              text: 'PDF Downloaded Successfully',
              backgroundColor: colors.green,
            });
          })
          .catch(err => {
            console.error('Download error:', err);
            // Alert.alert('Error', 'File download failed.', [{ text: 'OK' }]);
            SnackbarComponent({
              text: 'Failed To Download PDF',
              backgroundColor: colors.red1,
            });
          });
      };
    } catch (err) {
      console.error('Download error:', err);
      // Alert.alert('Error', 'File download failed.', [{ text: 'OK' }]);
      SnackbarComponent({
        text: 'Failed To Download PDF',
        backgroundColor: colors.red1,
      });
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
        // console.log('RESPONCE OF DELETE EXPANSIONS', responce);
        SnackbarComponent({
          text: 'Deleted Successfully',
          backgroundColor: colors.red1,
        });
        handlegetAllExpances(selectedApartment?.id);
      })
      .catch(error => {
        console.log('ERROR IN DELETE EXPANSIONS', error);
        SnackbarComponent({
          text: 'Failed to Delete',
          backgroundColor: colors.red1,
        });
      });
  };

  const openEditModal = item => {
    setSelectedItem(item);
    setUpdatedText(item.text);
    setModalVisible(true);
  };
  const handleEdit = item => {
    navigation.navigate(allTexts.screenNames.addNewExpances, {
      id: {itemId: item?.id, aprtmentId: selectedApartment?.id},
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
    ApprovedApartments({customerDetails:customerDetails,setApartmentData:setApartmentData,setSelectedApartment:setSelectedApartment})
  }, [customerDetails]);

  useEffect(() => {
    if (selectedApartment?.id) {
      handlegetAllExpances(selectedApartment?.id);
    }
  }, [selectedApartment]);

  const renderItem = data => (
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
  );
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
      {loader ? (
        <View>
          <Loader color={colors.primaryRedColor} size={'large'} />
        </View>
      ) : selectedApartment?.id ? (
        <View>
          <Text style={styles.SwipeText}>{'<< Swipe Right to delete Expance'}</Text>
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
          {/* <View style={styles.downloadButton}>
                <PrimaryButton text={'DOWNLOAD PDF'} bgColor={colors.primaryRedColor} onPress={handlegetExpancePDF}/>
              </View> */}
          {expancesData?.length === 0 ? (
            <View style={styles.NoexpanceTextCon}><Text style={styles.NoexpanceText}>No Expenses Recorded Here Add Below.</Text></View>
          ) : (
            <View style={styles.downloadButton}>
              <TouchableOpacity onPress={handlegetExpancePDF}>
                <Text style={styles.clickHereText}>CLICK HERE </Text>
              </TouchableOpacity> 
              <Text style={styles.downloadText}>
                To Download Expances In PDF Format
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={{alignItems: 'center', marginVertical: '5%'}}>
          <Text style={styles.errorText}>
            Select Any Apartment To Get Expances
          </Text>
        </View>
      )}
      <View style={styles.addButton}>
        <PrimaryButton
          text={'ADD EXPANCES'}
          bgColor={colors.primaryRedColor}
          onPress={handleNavigation}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      {/* <Modal
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
      </Modal> */}
    </View>
  );
};

export default Expences;
