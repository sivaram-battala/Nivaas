import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import { allTexts } from '../../common'

const AdminSociety = ({navigation}) => {
  return (
    <View style={styles.mainCon}>
       <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Admin Society'} navigation={navigation} />
      </View>
      <View>
        <View style={styles.apartmentServicesCon}>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.addPrepaidMeter)}>
          <View style={styles.eachService}>
            <Text style={styles.eachText}>
              Prepaid Meter
            </Text>
          </View>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate(allTexts.screenNames.maintainenceSettings)}>
            <View style={styles.eachService}>
              <Text style={styles.eachText}>Maintainence Settings</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AdminSociety