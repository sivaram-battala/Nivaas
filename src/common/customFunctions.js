import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';

export const SnackbarComponent = ({text, backgroundColor, height}) => {
  return Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
    height: height,
  });
};

export const ApprovedApartments = ({customerDetails,setApartmentData}) => {
  if (customerDetails?.currentCustomerData?.apartmentDTOs) {
    const approvedApartments = customerDetails.currentCustomerData.apartmentDTOs
      .filter(apartment => apartment?.adminApproved)
      .map(apartment => ({
        id: apartment?.jtApartmentDTO?.id,
        name: apartment?.jtApartmentDTO?.name,
      }));
    setApartmentData(approvedApartments);
  }
};

export const NetworkInfo = () =>{
    NetInfo.addEventListener(state => {
        const conn = state.isConnected;
        console.log("Connection type", state.type);
        !conn ? alert("No Internet Connection!"):null; 
    });
}