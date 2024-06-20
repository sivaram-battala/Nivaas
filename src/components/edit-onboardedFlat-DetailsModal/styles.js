import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
      },
      closeButton: {
        alignSelf: 'flex-end',
      },
      modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: colors.black,
        fontWeight: '500',
      },
      input: {
        height: 40,
        borderColor: colors.gray2,
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        color: colors.black,
      },
})