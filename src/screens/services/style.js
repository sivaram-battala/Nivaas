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
        marginTop:window.height*0.06,
        backgroundColor:colors.gray3,
        elevation:5,
    },
    eachServiceCon:{
        alignItems:'center',
        marginHorizontal:'auto',
        marginVertical:10,
        height:window.height*0.08,
        width:window.width*0.18,
        justifyContent:'center',
    },
    AutoBikeServicesCon:{
        // marginHorizontal:window.width*0.01,
        marginTop:window.height*0.04,
    },
    headingText:{
        color:colors.gray,
        fontSize:16,
        fontWeight:'500',
        marginHorizontal:window.width*0.1,
    }
})