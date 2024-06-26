import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        height:'100%',
        backgroundColor:colors.white,
    },
    topHeader:{
        marginVertical:window.height*0.04,
        marginTop:window.height*0.06,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:window.width*0.08,
        alignItems:'center'
    },
    apartmentName:{
        color:colors.black,
        fontSize:16,
        fontWeight:'500'
    },
    iconsCon:{
        flexDirection:'row',
    },
    icons:{
        color:colors.black,
        marginLeft:10
    },
    payText:{
        marginHorizontal:window.width*0.08,
        color:colors.black,
        fontSize:16,
        fontWeight:'500'
    },
    apartmentServicesCon:{
        marginHorizontal:window.width*0.05,
        marginVertical:window.height*0.03,
    },
    eachService:{
        // width:'93%',
        // backgroundColor:colors.gray3,
        // padding:10,
        // borderRadius:10,
        // marginHorizontal:window.width*0.03,
        elevation:2,
        // marginVertical:'5%',

        width:'93%',
        backgroundColor:colors.yellowOne,
        // borderColor:colors.primaryColor,
        // borderWidth:1,
        padding:10,
        borderRadius:10,
        marginHorizontal:window.width*0.03,
        marginVertical:'5%',
        // alignItems:'center'

    },
    eachText:{
        fontSize:14,
        marginTop:5,
        marginLeft:5,
        color:colors.black
    }
})