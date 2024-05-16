import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { colors, window } from '../../common'

const ServiceCard = ({path,text}) => {
  return (
    <View style={styles.servicesCon}>
      <View style={styles.eachServiceCon}>
            <Image
              source={require('../../utils/assets/images/Electrician.png')}
              height={50}
              width={50}
            />
            <Text>Electrician</Text>
          </View>
    </View>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
    servicesCon:{
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.08,
        flexDirection:"row",
        // flexWrap:'wrap',
        backgroundColor:colors.gray3,
        elevation:5
    },
    eachServiceCon:{
        alignItems:'center',
        marginHorizontal:20,
        marginVertical:20
    }
})