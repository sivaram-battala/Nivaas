import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import DailyHelpCard from '../../components/daily-help-card'
import { colors } from 'react-native-elements'
import { window } from '../../common'

const Maid = ({navigation}) => {
  return (
    <ScrollView style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Maid'} navigation={navigation} />
      </View>
      <View>
        <DailyHelpCard />
        <DailyHelpCard />
      </View>
    </ScrollView>
  )
}

export default Maid

const styles = StyleSheet.create({
    mainCon:{
        marginTop:10,
        backgroundColor:colors.white,
        height:window.height
    }
})