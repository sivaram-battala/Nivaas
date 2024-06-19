import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../common';

const MeterDetailsModal = ({
  modalVisible,
  setModalVisible,
  handleEditPress,
  selectedMeter,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedMeter?.name}
              {' Details '}
              <Feather
                name="edit"
                size={20}
                color={colors.primaryRedColor}
                onPress={() => handleEditPress(selectedMeter)}
              />
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.metersDetailsText}>
              Meter Name : {selectedMeter?.name}
            </Text>
            <Text style={styles.metersDetailsText}>
              Cost PerUnit : {selectedMeter?.costPerUnit}
            </Text>
          </View>
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
  modalContainer: {
    width: '90%',
    marginVertical: '50%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    color: colors.primaryRedColor,
  },
  metersDetailsText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 5,
  },
});

export default MeterDetailsModal;
