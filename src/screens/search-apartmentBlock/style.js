import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        marginTop:window.height*0.025,
        backgroundColor:colors.white,
        height:window.height,
        flex:1,
        paddingHorizontal:window.width * 0.04
    },
    nextButton:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primaryColor,
      },
    searchCon:{
        backgroundColor: colors.white,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    topDetails:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    filteredDataCon:{
        marginHorizontal:window.width*0.05
    },
    filteredDataText:{
        fontSize:18,
        color:colors.black,
    },
    onBoardText:{
        color:colors.blue,
        fontSize:15,
        fontWeight:'500'
    },
    suggestedData:{
        fontSize:15,
        color:colors.black,
        marginHorizontal:window.width*0.03
    },
    suggestionCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:window.width*0.05
    },
    onBoard:{
        color:colors.blue
    }
})