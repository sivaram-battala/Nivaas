import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import { Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { allTexts, colors } from '../../common'

const HouseHold = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
      <View
        style={{height: 50, marginTop: statusBarHeight, flexDirection: 'row'}}>
        <TopBarCard2 back={true} txt={'HouseHold'} navigation={navigation} />
      </View>
      <View style={styles.profie}>
        <Image style={styles.profileImage} />
        <Text style={styles.profieText}>Vamsi Chadharam</Text>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>Purchages</Text>
        <View style={styles.manageFlatsConHome}>
          <MaterialCommunityIcons name="car-hatchback" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>Add vechile</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.maid)}>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>Daily Help</Text>
        <View style={styles.manageFlatsConHome}>
            <View>
            <MaterialCommunityIcons name="car-hatchback" size={30} color={colors.black} />
            <Text>Maid</Text>
            </View>
          <Text style={styles.manageFlatsConAddText}>Add Your Maid or Driver etc</Text>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.addPets)}>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>My Pets</Text>
        <View style={styles.manageFlatsConHome}>
          <View style={{alignItems:'center'}}>
            <MaterialCommunityIcons name="dog" size={25} color={colors.black} />
            <Text>Pets</Text>
          </View>
          <Text style={styles.manageFlatsConAddText}>Add Your Maid or Driver etc</Text>
        </View>
      </View>
      </TouchableOpacity>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>Frequent Visitors</Text>
        <View style={styles.manageFlatsConHome}>        
          <View style={{alignItems:'center'}}>
            <FontAwesome6 name="user-gear" size={25} color={colors.black} />
            <Text>Visitors</Text>
          </View>
          <Text style={styles.manageFlatsConAddText}>Add Your Maid or Driver etc</Text>
        </View>
      </View>
    </View>
  )
}

export default HouseHold

