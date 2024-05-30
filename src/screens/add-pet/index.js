import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {statusBarHeight} from '../../utils/config/config';
import {PrimaryButton, TopBarCard2} from '../../components';
import {styles} from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../common';
import {TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddPets = ({navigation}) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  return (
    <View style={styles.mainCon}>
      <View style={{height: 50, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Add Pet'} navigation={navigation} />
      </View>
      <KeyboardAwareScrollView>
      <View style={styles.iconsCon}>
        <View style={styles.eachIconCon}>
          <FontAwesome5 name="dog" size={25} />
          <Text>Dog</Text>
        </View>
        <View style={styles.eachIconCon}>
          <FontAwesome5 name="cat" size={25} />
          <Text>Cat</Text>
        </View>
        <View style={styles.eachIconCon}>
          <FontAwesome5 name="kiwi-bird" size={25} />
          <Text>Birds</Text>
        </View>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Breed name</Text>
          <TextInput
            style={styles.input}
            value={field1}
            onChangeText={text => setField1(text)}
            placeholder="Enter value for Breed name"
            placeholderTextColor="#a9a9a9"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nick Name</Text>
          <TextInput
            style={styles.input}
            value={field2}
            onChangeText={text => setField2(text)}
            placeholder="Enter value for Nick name"
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
      <View style={styles.buttonCon}>
        <PrimaryButton
          bgColor={colors.primaryRedColor}
          radius={5}
          text={'Add Pet'}
          shadow={true}
          textColor={colors.white}
        />
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddPets;
