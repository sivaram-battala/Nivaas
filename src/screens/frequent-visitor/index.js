import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {PrimaryButton, TopBarCard2} from '../../components';
import {styles} from './style';
import {colors} from '../../common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FrequentVisitor = ({navigation}) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  return (
    <View style={styles.containerOne}>
      <View style={styles.subContainerOne}>
        <TopBarCard2
          back={true}
          txt={'Frequent Visitor'}
          navigation={navigation}
        />
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={field1}
              onChangeText={text => setField1(text)}
              placeholder="Enter value for First Name"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={field2}
              onChangeText={text => setField2(text)}
              placeholder="Enter value for Last Name"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              style={styles.input}
              value={field3}
              onChangeText={text => setField3(text)}
              placeholder="Enter value for Aadhar Number"
              placeholderTextColor="#a9a9a9"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.buttonCon}>
            <PrimaryButton
              bgColor={colors.primaryColor}
              radius={5}
              text={'Add Pet'}
              shadow={true}
              textColor={colors.white}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default FrequentVisitor;
