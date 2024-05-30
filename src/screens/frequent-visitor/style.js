import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    containerOne: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },
    subContainerOne: {
        height: 50,
        marginBottom: 20,
        marginTop: 40
    },
    subContainerThree: {
        marginVertical: "6%",
        marginHorizontal: "10%"
    },
    subContainerThreeText: {
        marginBottom: 20,
        fontSize: 17,
        paddingBottom: 20,
        color: "black"
    },
    subContainerThreeTextInput: {
        backgroundColor: "#ECE9E9",
        borderWidth: 1,
        borderColor: "#ECE9E9",
        width: window.width * 0.8,
        height: 40,
    },
    inputContainer: {
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.03
      },
      label: {
        marginBottom: 10,
        color: colors.gray,
        fontSize:15,
        fontWeight:'500'
      },
      input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#333',
        fontSize: 16,
      },
      buttonCon:{
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.03
     }
})