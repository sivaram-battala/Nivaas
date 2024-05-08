import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        marginTop:window.height*0.025,
        backgroundColor:colors.white,
        height:window.height,
        flex:1
    },
    filteredDataCon:{
        marginHorizontal:window.width*0.03
    },
    filteredDataText:{
        fontSize:15,
        color:colors.black,
    },
    onBoardText:{
        color:colors.blue,
    },
    suggestedData:{
        fontSize:15,
        color:colors.black,
        marginHorizontal:window.width*0.03
    },
    suggestionCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:window.width*0.03
    },
    onBoard:{
        color:colors.blue
    }
})