import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import DailyHelpCard from '../../components/daily-help-card'
import { colors } from 'react-native-elements'
import { window } from '../../common'

const EachService = ({navigation}) => {
  return (
    <ScrollView style={styles.mainCon}>
      <View style={{marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'EachService'} navigation={navigation} />
      </View>
      <View style={styles.dataCon}>
        <DailyHelpCard isDailyHelp={false}/>
        <DailyHelpCard isDailyHelp={false}/>
        <DailyHelpCard isDailyHelp={false}/>
      </View>
    </ScrollView>
  )
}

export default EachService

const styles = StyleSheet.create({
    mainCon:{
        marginTop:10,
        backgroundColor:colors.white,
        height:window.height
    },
    dataCon:{
      marginVertical:window.height*0.02,
      borderTopColor:colors.grey0,
      borderTopWidth:0.8,
    }
})