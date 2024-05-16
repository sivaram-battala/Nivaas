import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        height:window.height,
        width:window.width,
        backgroundColor:colors.white
    },
    servicesCon:{
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.08,
        flexDirection:"row",
        // flexWrap:'wrap',
        backgroundColor:colors.gray3,
        elevation:5
    },
    eachServiceCon:{
        alignItems:'center',
        marginHorizontal:20,
        marginVertical:20
    }
})