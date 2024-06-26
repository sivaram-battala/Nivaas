import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    dropdownContainer: {
      marginHorizontal: '5%',
      marginVertical: '5%',
    },
    selectAllContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: '5%',
      marginLeft: '70%',
      height: 60,
    },
    selectAllText: {
      color: colors.black,
      fontWeight: '500',
    },
    textCon: {
      fontSize: 17,
      fontWeight: '500',
      color: colors.black,
      marginTop: '1%',
      marginHorizontal:'1%'
    },
    container: {
      marginHorizontal: '5%',
      marginBottom: '5%',
    },
    header: {
      flexDirection: 'row',
      backgroundColor: colors.gray3,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
    },
    selectStyle: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
      marginRight: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      color: colors.black,
      paddingVertical: 10,
    },
    checkbox: {
      flex: 1,
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: 'red',
    },
    button: {
      marginTop: 20,
    },
  });
  