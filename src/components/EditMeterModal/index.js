import React from 'react';
import {Modal, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
import {PrimaryButton} from '../../components';

const EditMeterModal = ({editModalVisible,setEditModalVisible,editedMeter,setEditedMeter,handleUpdatePrepaidMetersDetails}) => {
  return (
    <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setEditModalVisible(false)}>
            <Pressable style={styles.updateModalContainer} onPress={() => {}}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Meter Details</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Meter Name</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter?.name}
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, name: text})
                  }
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter?.description}
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, description: text})
                  }
                />
                <Text style={styles.label}>Cost Per Unit</Text>
                <TextInput
                  style={styles.input}
                  value={editedMeter?.costPerUnit}
                  onChangeText={text =>
                    setEditedMeter({...editedMeter, costPerUnit: text})
                  }
                />
              </View>
              <PrimaryButton
                text={'Save Changes'}
                bgColor={colors.primaryColor}
                onPress={handleUpdatePrepaidMetersDetails}
              />
            </Pressable>
          </Pressable>
        </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  updateModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '5%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default EditMeterModal;
