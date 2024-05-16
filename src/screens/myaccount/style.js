import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainContainer: {
            backgroundColor: colors.white,
            height: window.height,
    },
    headContainerText: {
        paddingLeft: "30%",
        fontSize: 20,
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
    manageFlatsCon: {
        paddingLeft:window.width*0.12,
        borderBottomWidth: 2,
        borderBottomColor: colors.gray2,
        borderTopWidth: 2,
        borderTopColor: colors.gray2,
        marginTop: 10,
        padding: 10,
        // alignItems:"center"
        // paddingLeft: "15%"
    },
    manageFlatsConText: {
        marginBottom: "5%",
        fontSize: 17,
        fontWeight:'500'
    },
    manageFlatsSubCon: {
        // flexDirection: "row"
    },
    flatCon:{
        marginVertical:window.width*0.01,
        flexDirection: "row"
    },
    manageFlatsSubConText1: {
        color: colors.orangeColor,
        fontSize: 17
    },
    manageFlatsSubConText2: {
        fontSize: 17,
        marginLeft: 10
    },
    manageFlatsConHome: {
        flexDirection: "row",
        alignItems:"center"
    },
    manageFlatsConHomeTextOne: {
        paddingLeft:"10%",
        color:colors.gray,
        fontSize:17
    },
    statusPendingText: {
        color: colors.red1,
        paddingLeft:"15%",
        fontSize:16,
        fontWeight:'600'
    },
    statusactiveText:{
        color: colors.green,
        paddingLeft:"18%",
        fontSize:16,
        fontWeight:'600'
    },
    manageFlatsConAdd: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    manageFlatsConAddText:{
        paddingLeft:window.width*0.07,
        fontSize:17,
        color:colors.gray
    },
    householdSubCon:{
        flexDirection:'row',
        marginHorizontal:window.width*0.32,
        alignItems:'center',
    },
    householdCon:{
        flexDirection:'row',
        paddingLeft:window.width*0.12,
        marginVertical:window.height*0.03,
        paddingVertical:10,
        // borderColor:colors.gray2,
        // borderBottomWidth:2
    },
    householdSuperCon:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:window.width*0.25,
        justifyContent:'space-between',
        backgroundColor:colors.gray3,
        padding:10,
        marginRight:10
        
    },
    iconNameCon:{
        alignItems:'center',
       
    },
    setting: {
        paddingLeft:window.width*0.12,
        paddingBottom: '10%',
        borderBottomWidth: 2,
        borderBottomColor: colors.gray2,
        borderTopWidth: 2,
        borderTopColor: colors.gray2
    },
    settingHeader: {
        marginVertical: 20,
        fontSize: 18,
        fontWeight:'500'
    },
    generalSettingsOptions: {
        // marginTop: 10,
    },
    settingContainer: {
        marginTop: 12,
        fontSize: 14,
    },
    settingsubConOne: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15
    },
    generalSettingsOptionText: {
        paddingLeft:window.width*0.07,
        fontSize: 18,
        color:colors.gray
    },
    nivas: {
        marginTop: "15%",
        alignItems: "center"
    },
    nivasText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        marginBottom: "5%"
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom:50
    },
    footerText: {
        color: "black",
    }
})