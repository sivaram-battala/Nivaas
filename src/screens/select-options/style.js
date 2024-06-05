import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      backgroundColor: colors.white,
      height:'100%'
    },
    container: {
      flex: 1,
      paddingHorizontal: '5%',
      marginVertical:20
    },
    eachDropdownCon:{
       marginVertical:20
    },
    buttonContainer: {
      marginTop: '90%',
    },
    apartmentsErrorHandlerCon:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:2
    },
    errorMessage: {
      fontSize: 13,
      color: colors.red1
    },
  });