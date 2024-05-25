import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components'
import { statusBarHeight } from '../../utils/config/config'
import DailyHelpCard from '../../components/daily-help-card'
import { colors } from 'react-native-elements'
import { allTexts, window } from '../../common'

const Maid = ({navigation}) => {
  return (
    <ScrollView style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Maid'} navigation={navigation} />
      </View>
      <View style={styles.dataCon}>
        <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.maidProfile)}><DailyHelpCard isDailyHelp={true}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.maidProfile)}><DailyHelpCard isDailyHelp={true}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.maidProfile)}><DailyHelpCard isDailyHelp={true}/></TouchableOpacity>
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
    },
    dataCon:{
      marginVertical:window.height*0.02,
      borderTopColor:colors.grey0,
      borderTopWidth:0.8,
    }
})