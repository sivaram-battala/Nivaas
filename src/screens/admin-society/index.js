import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import { allTexts, colors } from '../../common'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const AdminSociety = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
       <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Admin Society'} navigation={navigation} />
      </View>
      <View>
        <View style={styles.apartmentServicesCon}>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.prepaidMeter)}>
          <View style={styles.eachService}>
            <MaterialCommunityIcons name='speedometer' size={25} color={colors.primaryRedColor}/>
            <Text style={styles.eachText}>
              Prepaid Meters
            </Text>
          </View>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.maintainenceSettings)}>
            <View style={styles.eachService}>
              <MaterialIcons name='settings-applications' size={25} color={colors.primaryRedColor}/>
              <Text style={styles.eachText}>Maintainence Settings</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.adminFlatSettings)}>
            <View style={styles.eachService}>
              <MaterialCommunityIcons name='office-building-cog' size={25} color={colors.primaryRedColor}/>
              <Text style={styles.eachText}>Manage Flats</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AdminSociety