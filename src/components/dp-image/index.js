import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {setProfilePicture} from '../../redux/slices/profileSlice';
import {useDispatch, useSelector} from 'react-redux';
import { usePostProfilePicMutation } from '../../redux/services/myAccountService';

const DpImage = () => {
  const [uploadImage] = usePostProfilePicMutation();
  const dispatch = useDispatch();
  const picture = useSelector(state => state.profilepicture);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        cropImage(response.assets[0].uri);
      }
    });
  };

  const cropImage = uri => {
    ImageCropPicker.openCropper({
      path: uri,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        dispatch(setProfilePicture(image.path));
        handleUpload(image.path);
      })
      .catch(error => {
        console.log('Error cropping image: ', error);
        Alert.alert('Error', 'Failed to crop image');
      });
  };

  const handleUpload = async (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    try {
      const response = await uploadImage(formData).unwrap();
      console.log('Image uploaded successfully', response);
      dispatch(setProfilePicture(response.imageUrl));
    } catch (error) {
      console.error('Error uploading image', error);
      Alert.alert('Upload Error', 'There was an error uploading the image.');
    }
  };

  // const handleUpdate = async (uri) => {
  //   const formData = new FormData();
  //   formData.append('image', {
  //     uri,
  //     name: 'profile.jpg',
  //     type: 'image/jpeg',
  //   });

  //   try {
  //     const response = await updateImage({ id: picture.id, formData }).unwrap();
  //     console.log('Image updated successfully', response);
  //     dispatch(setProfilePicture(response.imageUrl));
  //   } catch (error) {
  //     console.error('Error updating image', error);
  //     Alert.alert('Update Error', 'There was an error updating the image.');
  //   }
  // };

  return (
    <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
      <Image source={{uri: picture?.setProfilePicture}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default DpImage;
