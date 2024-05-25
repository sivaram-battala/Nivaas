import { StyleSheet } from "react-native";
import { colors, window } from "../../common";


export const styles = StyleSheet.create({
    mainCon:{
        height:'100%',
        width:window.width,
        backgroundColor:colors.white
    },
    profie: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal:window.width*0.05,
        marginVertical:20
    },
    profileImage: {
        height: 50,
        width: 50,
        backgroundColor: "#ccc",
        borderRadius: 30,
        marginHorizontal: 20
    },
    profieText: {
        color: "black",
        fontSize: 17
    },
    manageFlatsCon:{
        paddingHorizontal:window.width*0.13,
        borderTopWidth:2,
        borderTopColor:colors.gray2,
        marginTop:20,
        paddingVertical:20
    },
    manageFlatsCon:{
        paddingHorizontal:window.width*0.13,
        borderTopWidth:2,
        borderTopColor:colors.gray2,
        marginTop:10,
        paddingVertical:15
    },
    manageFlatsConHome: {
        flexDirection: "row",
        alignItems:"center",
        marginVertical:8
    },
    manageFlatsConAddText:{
        paddingLeft:window.width*0.07,
        fontSize:17,
        color:colors.gray
    },
    headingText:{
        marginBottom: "2%",
        fontSize: 17,
        fontWeight:'500'
    },
})