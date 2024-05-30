import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from 'react-native-elements';
import {window} from '../../common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const DailyHelpCard = ({isDailyHelp}) => {
  return (
    <View style={styles.mainCon}>
      <View style={styles.subCon}>
        <View style={styles.imageCon}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeAvW-coUAdTOQx7Q1flLHltj56lZs2RqYw21KGj8whg&s',
            }}
            height={70}
            width={70}
          />
        </View>
        {
          isDailyHelp ? (
            <View style={styles.textCon}>
              <Text style={styles.texts}>Ramalakshmi</Text>
              <Text style={styles.texts}>10AM - 8PM</Text>
            </View>
          ) : (
            <View style={styles.textCon}>
              <Text style={styles.texts}>Ramalakshmi</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <MaterialIcons name='star-rate' size={25} color={'yellow'}/>
                <Text style={styles.texts}>3.5</Text>
              </View>
            </View>
          )
        }
      </View>
    </View>
  );
};

export default DailyHelpCard;

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
  },
  subCon:{
    flexDirection: 'row',
    paddingVertical:window.height*0.02,
    paddingHorizontal:window.width*0.2,
    // borderTopColor:colors.grey0,
    // borderTopWidth:1,
    borderBottomColor:colors.grey0,
    borderBottomWidth:1
  },
  textCon:{
    justifyContent:'center',
    marginHorizontal:window.width*0.09,
  },
  texts:{
    fontSize:18,
    marginVertical:5
  },
  imageCon: {},
});
