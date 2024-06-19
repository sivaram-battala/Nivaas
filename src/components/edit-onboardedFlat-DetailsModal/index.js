import { Modal, TextInput,TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton } from '../primary-button'
import { styles } from './styles'
import { colors } from '../../common'
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditOnBoarderFlatDetailsModal = ({modalVisible,setModalVisible,setFormData,formData,handleFormSubmit}) => {
  return (
    <View>
         <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.black} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Update Flat Details</Text>
            <TextInput
              style={styles.input}
              value={formData?.flatNo}
              onChangeText={text => setFormData({...formData, flatNo: text})}
              placeholder="Flat No"
            />
            <TextInput
              style={styles.input}
              value={formData?.ownerPhoneNo}
              onChangeText={text =>
                setFormData({...formData, ownerPhoneNo: text})
              }
              placeholder="Owner Phone No"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={formData?.ownerName}
              onChangeText={text => setFormData({...formData, ownerName: text})}
              placeholder="Owner Name"
            />
            <View>
              <PrimaryButton
                text={'UPDATE'}
                bgColor={colors.primaryRedColor}
                onPress={handleFormSubmit}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default EditOnBoarderFlatDetailsModal