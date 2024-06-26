import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
import { Alert, Linking, Share } from 'react-native';
import { colors } from './theme';

export const SnackbarComponent = ({text, backgroundColor, height}) => {
  return Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
    height: height,
  });
};

export const ApprovedApartments = ({customerDetails,setApartmentData,setSelectedApartment}) => {
  if (customerDetails?.currentCustomerData?.apartmentDTOs) {
    const approvedApartments = customerDetails.currentCustomerData.apartmentDTOs
      .filter(apartment => apartment?.adminApproved)
      .map(apartment => ({
        id: apartment?.jtApartmentDTO?.id,
        name: apartment?.jtApartmentDTO?.name,
      }));
    setApartmentData(approvedApartments);
    // if (approvedApartments.length === 1) {
      setSelectedApartment(approvedApartments[0]);
    // }
  }
};

export const NetworkInfo = () =>{
    NetInfo.addEventListener(state => {
        const conn = state.isConnected;
        console.log("Connection type", state.type);
        !conn ? alert("No Internet Connection!"):null; 
    });
}

export const truncateString = (str) => {
  if (str.length > 5) {
    return str.substring(0, 5) + '...';
  }
  return str;
};

export const handleshare = async ()=>{
  try {
    const result = await Share.share({
      title: 'Check this out!',
      message: 'Check out this awesome link: https://www.nivaas.com',
      url: 'https://www.nivaas.com'
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type: ', result.activityType);
      } else {
        console.log('Shared successfully');
        // SnackbarComponent({text:'Shared successfully',backgroundColor:colors.green})
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
      SnackbarComponent({text:'error',backgroundColor:colors.red1})
  }
}

export const sendSupportEmail = () => {
  const email = 'nivaas.home@gmail.com';
  const subject = 'Nivaas';
  const body = 'Describe Your Issue Here : ';

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    Linking.openURL(mailtoUrl);
  } catch (error) {
    console.log(error);
  }
}