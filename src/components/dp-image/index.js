import React, {useState} from 'react';
import {Image, StyleSheet, Alert, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../common';
import {SnackbarComponent} from '../../common/customFunctions';
import {usePostProfilePicMutation} from '../../redux/services/myAccountService';
import {setprofilePic} from '../../redux/slices/currentCustomerSlice';
import { Loader } from '../loader';

const DpImage = ({customerId}) => {
  const [loader, setLoader] = useState(false);
  const [uploadImage] = usePostProfilePicMutation();
  const dispatch = useDispatch();
  const profilePic = useSelector(state => state.currentCustomer.profilePicture);

  const getImageObj = img => {
    let newUri = Platform.OS === 'ios' ? img : img?.replace('file://', 'file:');
    let imageObj = {
      uri: newUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    return imageObj;
  };
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
        handleUpload(image.path);
      })
      .catch(error => {
        console.log('Error cropping image: ', error);
        SnackbarComponent({
          text: 'Failed To Crop Image',
          backgroundColor: colors.red1,
        });
      });
  };

  const handleUpload = async uri => {
    let img = getImageObj(uri);
    const formdata = new FormData();
    formdata.append('profilePicture', img);
    console.log(formdata._parts);
    setLoader(true);
    uploadImage(formdata)
      .unwrap()
      .then(responce => {
        setLoader(false);
        console.log('Image uploaded successfully', responce?.url);
        SnackbarComponent({
          text: responce?.message || 'Image Uploaded Successfully',
          backgroundColor: colors.green,
        });
        dispatch(setprofilePic(responce?.url));
      })
      .catch(error => {
        console.error('Error uploading image', error);
        SnackbarComponent({
          text: 'Image Not Uploaded',
          backgroundColor: colors.red1,
        });
      });
  };

  return (
    <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
      {
        loader ? (
          <View style={styles.loader}>
            <Loader marginTop={"20%"} color={colors.primaryRedColor} size={'small'} />
          </View>
        ) : (
          <Image source={{uri: profilePic || ''}} style={styles.image} />
        )
      }
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
  loader:{    
    alignItems:'center',
    justifyContent:"center"
  }
});

export default DpImage;
