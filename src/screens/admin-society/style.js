import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        height:'100%',
        backgroundColor:colors.white,
    },
    topHeader:{
        marginVertical:window.height*0.04,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:window.width*0.08,
        alignItems:'center'
    },
    apartmentName:{
        color:colors.gray,
        fontSize:16,
        fontWeight:'500'
    },
    iconsCon:{
        flexDirection:'row',
    },
    icons:{
        color:colors.blue,
        marginLeft:10
    },
    payText:{
        marginHorizontal:window.width*0.08,
        color:colors.gray,
        fontSize:16,
        fontWeight:'500'
    },
    apartmentServicesCon:{
        marginHorizontal:'3%',
        marginVertical:window.height*0.03,
    },
    eachService:{
        flexDirection:'row',
        width:'93%',
        backgroundColor:colors.yellowOne,
        // borderColor:colors.primaryColor,
        // borderWidth:1,
        padding:10,
        borderRadius:5,
        marginHorizontal:window.width*0.03,
        marginVertical:'5%',
        alignItems:'center'
    },
    eachText:{
        fontSize:16,
        fontWeight:'500',
        color:colors.black,
        marginLeft:10
    }
})