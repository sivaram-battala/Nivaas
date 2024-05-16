import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      backgroundColor: colors.white,
      height:window.height
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
      marginTop: 20,
    },
  });