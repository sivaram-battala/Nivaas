import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors, window} from '../../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AdminFlatSettings = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
      <View style={{height: 70, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Manage Flats'} navigation={navigation} />
      </View>
      <View style={styles.apartmentServicesCon}>
        <Pressable
          onPress={() =>
            navigation.navigate(allTexts.screenNames.flatsOnboarding)
          }>
          <View style={styles.eachService}>
            <Entypo name="squared-plus" size={25} color={colors.primaryColor} />
            <Text style={styles.eachText}>Onboard your Flats</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate(allTexts.screenNames.editOnboardedFlatDetails)
          }>
          <View style={styles.eachService}>
            <MaterialCommunityIcons
              name="table-edit"
              size={25}
              color={colors.primaryColor}
            />
            <Text style={styles.eachText}>Edit Onboarded Flat Details</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminFlatSettings;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  apartmentServicesCon: {
    marginHorizontal: '3%',
    marginVertical: window.height * 0.03,
  },
  eachService: {
    // flexDirection:'row',
    // width:'93%',
    // backgroundColor:colors.gray3,
    // borderColor:colors.primaryColor,
    // borderWidth:1,
    // padding:10,
    // borderRadius:5,
    // marginHorizontal:window.width*0.03,
    // marginVertical:'5%',
    // alignItems:'center'

    flexDirection: 'row',
    width: '93%',
    backgroundColor: colors.yellowOne,
    // borderColor:colors.primaryColor,
    // borderWidth:1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: window.width * 0.03,
    marginVertical: '5%',
    alignItems: 'center',
  },
  eachText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginLeft: 10,
  },
});
