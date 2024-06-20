import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    container: {
      paddingHorizontal: '6%',
      paddingVertical: '5%',
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: 'red',
    },
    dropDownView: {
      width: '100%',
      paddingHorizontal: '6%',
    },
    container2: {
      marginHorizontal: '5%',
      marginVertical: '10%',
    },
    header: {
      flexDirection: 'row',
      backgroundColor: colors.gray3,
      padding: 10,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      color: colors.black,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
      paddingBottom: 5,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.black,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    itemText: {
      fontSize: 15,
      color: colors.black,
      fontWeight: '500',
    },
    buttonCon: {
      marginHorizontal: '6%',
    },
  });
  