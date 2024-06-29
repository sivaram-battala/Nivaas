import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomDropdown, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors} from '../../common';
import {useSelector} from 'react-redux';
import {
  ApprovedApartments,
  SnackbarComponent,
} from '../../common/customFunctions';
import {useAddCoadminMutation, useLazyGetFlatOwnersQuery} from '../../redux/services/myAccountService';
import { styles } from './style';

const CoAdmin = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);
  const [apartmentData, setApartmentData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState({id: '',name: ''})
  const [ownerdata, setOwnerdata] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState({id:'',name:''});
  //RTK
  const [addCoAdmin] = useAddCoadminMutation();
  const [getFlatOwners] = useLazyGetFlatOwnersQuery();

  const handleApartmentChange = (id, name) => {
    setSelectedApartment({id, name});
  };
  const handleCoadmin = () => {
    const payload = {
      apartmentId:selectedApartment?.id,
      userId: selectedOwner?.id,
      userRole: 'ROLE_APARTMENT_ADMIN',
    };
    addCoAdmin(payload)
      .unwrap()
      .then(responce => {
        console.log('RESPONCE OF ADD_COADMIN', responce);
        navigation.navigate(allTexts.screenNames.myAccount);
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
  const handleflatowners = (id) =>{
    const payload = {
      apartmentID:id,
      pageNo:0,
      pageSize:20
    }
    console.log(payload);
    getFlatOwners(payload)
      .unwrap()
      .then((responce)=>{
        // console.log('RESPONCE OF FLAT OWNERS',responce);
        setOwnerdata(responce?.data)
      }).catch((error)=>{
        console.log('ERROR IN FLAT OWNERS',error);
      })
  }
  useEffect(() => {
    ApprovedApartments({
      customerDetails: customerDetails,
      setApartmentData: setApartmentData,
      setSelectedApartment:setSelectedApartment
    });
  }, [customerDetails]);
  useEffect(() => {
   if (selectedApartment?.id) {
    handleflatowners(selectedApartment?.id)
   }
  }, [selectedApartment])
  
  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'CO-ADMIN'} navigation={navigation} />
      </View>
      <View>
        {apartmentData?.length >= 1 && (
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
              data={ownerdata}
              value={selectedOwner}
              onChange={(id, name) => setSelectedOwner({id, name})}
              labelField="fullName"
              valueField="id"
            />
            </View>
          </View>
        )}
      </View>
      <View style={styles.singleApartmentCon}>
        <PrimaryButton
          text={'SUBMIT'}
          bgColor={colors.primaryColor}
          onPress={handleCoadmin}
        />
      </View>
    </View>
  );
};

export default CoAdmin;