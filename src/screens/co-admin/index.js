import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomDropdown, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {colors} from '../../common';
import {useSelector} from 'react-redux';
import {
  ApprovedApartments,
  SnackbarComponent,
} from '../../common/customFunctions';
import {useAddCoadminMutation} from '../../redux/services/myAccountService';

const CoAdmin = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({
    id: '',
    name: '',
  });
  //RTK
  const [addCoAdmin] = useAddCoadminMutation();

  const handleApartmentChange = (id, name) => {
    setSelectedApartment({id, name});
  };
  const handleCoadmin = () => {
    const payload = {
      apartmentId:
        apartmentData?.length === 1
          ? apartmentData[0]?.id
          : selectedApartment?.id,
      userId: 7,
      userRole: 'ROLE_APARTMENT_ADMIN',
    };
    addCoAdmin(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF ADD_COADMIN', responce);
        SnackbarComponent({
          text: responce?.message || 'Co-Admin Request Sent To Owner',
          backgroundColor: colors.green,
        });
      })
      .catch(error => {
        console.log('ERROR IN ADDING CO_ADMIN', error);
        SnackbarComponent({
          text: error?.data?.message || 'Error In Co-Admin Request',
          backgroundColor: colors.red1,
        });
      });
  };
  useEffect(() => {
    ApprovedApartments({
      customerDetails: customerDetails,
      setApartmentData: setApartmentData,
    });
  }, [customerDetails]);
  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'CO_ADMIN'} navigation={navigation} />
      </View>
      <View>
        {apartmentData?.length === 1 ? (
          <View style={styles.singleApartmentCon}>
            <Text style={styles.apartmentNameTitle}>
              Apartment Name :{' '}
              <Text style={styles.apartmentnameText}>
                {apartmentData[0]?.name}
              </Text>
            </Text>
            <CustomDropdown
              label="Owner"
              data={apartmentData}
              value={selectedApartment}
              onChange={(id, name) => handleApartmentChange(id, name)}
              labelField="name"
              valueField="id"
            />
          </View>
        ) : (
          <View style={styles.dropdownsCon}>
            <View style={styles.eachDropdown}>
              <CustomDropdown
                label="Apartment"
                data={apartmentData}
                value={selectedApartment}
                onChange={(id, name) => handleApartmentChange(id, name)}
                labelField="name"
                valueField="id"
              />
            </View>
            <View style={styles.eachDropdown}>
              <CustomDropdown
                label="Owner"
                data={apartmentData}
                value={selectedApartment}
                onChange={(id, name) => handleApartmentChange(id, name)}
                labelField="name"
                valueField="id"
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.singleApartmentCon}>
        <PrimaryButton
          text={'SUBMIT'}
          bgColor={colors.primaryRedColor}
          onPress={handleCoadmin}
        />
      </View>
    </View>
  );
};

export default CoAdmin;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  singleApartmentCon: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  apartmentNameTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
  apartmentnameText: {
    color: colors.primaryRedColor,
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownsCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    marginVertical: '5%',
  },
  eachDropdown: {
    width: '45%',
  },
});
