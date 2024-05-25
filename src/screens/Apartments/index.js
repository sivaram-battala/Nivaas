import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {allTexts, colors} from '../../common';

const Apartments = ({navigation}) => {
  const isAdmin = true;
  const handleAdmin = () => {
    isAdmin
      ? navigation.navigate(allTexts.screenNames.adminSociety)
      : Alert.alert('Alert', 'Assessed Only For Admins');
  };
  return (
    <View style={styles.mainCon}>
      <View style={styles.topHeader}>
        <Text style={styles.apartmentName}>Green Hills..</Text>
        <View style={styles.iconsCon}>
          <Ionicons name="notifications" size={30} style={styles.icons} />
          <MaterialIcons name="account-circle" size={30} style={styles.icons} />
        </View>
      </View>
      <View>
        <Text style={styles.payText}>Pay..</Text>
        <View style={styles.apartmentServicesCon}>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.societyDues)}>
            <View style={styles.eachService}>
              <Image
                source={require('../../utils/assets/images/OnlinePayment.png')}
              />
              <Text style={styles.eachText}>Society Dues</Text>
              <Text style={styles.eachText}>
                Clear your society dues,deposits & advances
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={handleAdmin}>
            <View style={styles.eachService}>
              <Image
                source={require('../../utils/assets/images/AdminSettingsMale.png')}
              />
              <Text style={styles.eachText}>Manage society</Text>
              <Text style={styles.eachText}>Define society rules and dues</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Apartments;
