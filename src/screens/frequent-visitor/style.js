import { StyleSheet } from "react-native";
import { window } from "../../common";

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
})