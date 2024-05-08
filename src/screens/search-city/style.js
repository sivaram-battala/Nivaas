import { StyleSheet } from "react-native";
import { window } from "../../common";
import { colors } from "react-native-elements";

export const styles = StyleSheet.create({
    mainCon:{
        paddingTop:window.height*0.05,
        backgroundColor:colors.white,
        height:window.height,
        flex:1
    },
    filteredDataText:{
        fontSize:18,
        color:colors.black,
        marginHorizontal:window.width*0.03
    }
})