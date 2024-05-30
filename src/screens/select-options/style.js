import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      backgroundColor: colors.white,
      height:'100%'
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginVertical:50
    },
    eachDropdownCon:{
       marginVertical:10
    },
    buttonContainer: {
      marginTop: '60%',
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