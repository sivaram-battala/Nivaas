import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {PrimaryButton} from '../../components';
import {colors} from '../../common';
import {useUserDetailsMutation} from '../../redux/services/myAccountService';

const CompleteProfileModal = ({modalVisible, setModalVisible, onSave,id}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [postUserDetails] = useUserDetailsMutation();
  const handleSave = () => {
    if (name === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }

    if (name !== '') {
      const payload = {
        id: id,
        fullName: name,
        email:email ,
      };
      postUserDetails(payload)
        .unwrap()
        .then((responce) => {
          console.log("postUserDetails RESPONCE ======>",responce);
        })
        .catch(error => {
          console.log('ERROR In POSTING USERDETAILS===>', error);
        });
      onSave(name, email);
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Complete Your Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            onChangeText={text => setName(text)}
          />
          {nameError !== '' && (
            <Text style={styles.errorText}>{nameError}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email (Optional)"
            onChangeText={text => setEmail(text)}
          />
          {/* {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>} */}
          <View style={{marginTop: 20}}>
            <PrimaryButton
              onPress={handleSave}
              text="Save"
              bgColor={colors.primaryRedColor}
              radius={30}
              shadow={true}
              textColor={colors.white}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompleteProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    alignItems: 'left',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.gray2,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
