import { StyleSheet } from "react-native";
import { colors } from "react-native-elements";

export const styles = StyleSheet.create({
    mainCon: {
        height: '100%',
        backgroundColor: colors.white,
      },
      dropDown: {
        marginHorizontal: '5%',
      },
      datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '4%',
        marginTop: '5%',
      },
      addButton: {
        marginHorizontal: '5%',
        marginBottom: '5%',
      },
      rowFront: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderBottomColor: colors.gray2,
        borderBottomWidth: 1,
        alignItems: 'center',
        // paddingHorizontal: '10%',
        marginHorizontal: '5%',
      },
      header: {
        flexDirection: 'row',
        backgroundColor: colors.gray3,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        marginHorizontal: '5%',
        marginTop: '5%',
      },
      downloadButton:{
        marginHorizontal:'5%',
        marginTop:'2%'
      },
      eachHeader: {
        width: '31%',
        height: 40,
        paddingVertical: 10,
        marginHorizontal: '1%',
        alignItems: 'center',
        overflow: 'hidden',
      },
      headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
      },
      dataCell: {
        flex: 1,
        alignItems: 'flex-start',
        color: colors.black,
      },
      rowBack: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: '6%',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: '8%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
      },
      input: {
        height: 40,
        borderColor: colors.gray3,
        borderWidth: 1,
        width: window.width * 0.6,
        padding: 10,
        marginBottom: '5%',
        borderRadius: 5,
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: window.width * 0.6,
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      errorText: {
        color: colors.red1,
        fontSize: 15,
      },
})