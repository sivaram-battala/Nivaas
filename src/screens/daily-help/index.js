import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TopBarCard2} from '../../components';
import {styles} from './style';
import { allTexts } from '../../common';

const Dailyhelp = ({navigation}) => {
  return (
    <View style={styles.containerOne}>
      <View style={styles.subContainerOne}>
        <TopBarCard2 back={true} txt={'Daily help'} navigation={navigation} />
      </View>
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.maid)}>
        <View style={styles.containerTwo}>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>Maid</Text>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>10</Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={styles.containerTwo}>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>Driver</Text>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>1</Text>
          </View>
        </View>
        <View style={styles.containerTwo}>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>Cook</Text>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>10</Text>
          </View>
        </View>
        <View style={styles.containerTwo}>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>Tutor</Text>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>1</Text>
          </View>
        </View>
        <View style={styles.containerTwo}>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>Doctor</Text>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.eachText}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dailyhelp;
