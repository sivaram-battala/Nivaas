import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    singleApartmentCon: {
      marginHorizontal: '5%',
      marginVertical: '5%',
    },
    apartmentNameTitle: {
      color: colors.black,
      fontSize: 16,
      fontWeight: '500',
    },
    apartmentnameText: {
      color: colors.primaryColor,
      fontSize: 16,
      fontWeight: '500',
    },
    dropdownsCon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '6%',
      marginVertical: '5%',
    },
    eachDropdown: {
      width: '45%',
    },
  });
  