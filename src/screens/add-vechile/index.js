import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {PrimaryButton, TopBarCard2} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native';
import {colors, window} from '../../common';
import {styles} from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AddVehicle = ({navigation}) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  return (
    <View style={styles.containerOne}>
      <View style={styles.subContainerOne}>
        <TopBarCard2 back={true} txt={'Add Vehicle'} navigation={navigation} />
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerTwo}>
        <View style={styles.subContainerTwo}>
          <Entypo name="circle" size={20} color="black" />
          <Image
            style={styles.imageOne}
            source={{
              uri: 'https://t3.ftcdn.net/jpg/01/34/56/28/360_F_134562852_R05hXLbKA2P8lOk53dS0CCNZYFxOZsUq.jpg',
            }}
          />
          <View>
            <Text style={styles.subContainerTwoText}>Two Wheeler </Text>
          </View>
        </View>
        <View style={styles.subContainerTwoAuto}>
          <Entypo name="circle" size={20} color="black" />
          <Image
            style={styles.imageTwo}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUbJnLrhy28_s6h1pm-ZRW8ZLvGQhgz2RyrBPPvmspy_XGO8BqDZ3k6TU-g6vO0aV9Q8&usqp=CAU',
            }}
          />
          <View>
            <Text style={styles.subContainerTwoText}>Three Wheeler</Text>
          </View>
        </View>

        <View style={styles.subContainerTwo}>
          <Entypo name="circle" size={20} color="black" />
          <Ionicons name="car-sport" size={40} color="black" />
          <View>
            <Text style={styles.subContainerTwoText}>Four Wheeler </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerThree}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={styles.input}
              value={field1}
              onChangeText={text => setField1(text)}
              placeholder="Enter value for Brand"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vechile Number</Text>
            <TextInput
              style={styles.input}
              value={field2}
              onChangeText={text => setField2(text)}
              placeholder="Enter value for Vechile Number"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              value={field3}
              onChangeText={text => setField3(text)}
              placeholder="Enter value for Color"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={styles.subContainerThree}>
          <PrimaryButton
            bgColor={colors.primaryRedColor}
            text={'Add Vehicle'}
            shadow={true}
            textColor={'white'}
          />
        </View>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
