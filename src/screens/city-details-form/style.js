import { StyleSheet } from "react-native";
import { colors, window } from "../../common";
import { color } from "react-native-elements/dist/helpers";
import { windowHeight } from "../../utils/config/config";


export const styles = StyleSheet.create({
    mainContainer:{
        width:window.width,
        height:window.height,
        backgroundColor:colors.white,
        paddingTop:window.height * 0.0001
    },
    detailsCon:{
        backgroundColor:colors.gray0,
        margin:window.width*0.1,
        marginTop:window.height*0.1,
        padding:30,
        borderRadius:5
    },
    eachDetailsCon:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:30,
    },
    detailText:{
        color:colors.black,
        fontWeight:'500',
        marginHorizontal:20,
        fontSize:16
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    radioButton: {
        marginRight: 20,
    },
    mainButtonCon:{
        marginHorizontal:window.width*0.11
    },
    radioButtonCon:{
        marginHorizontal:window.width*0.05
    },
    youAreText:{
        color:colors.black,
        fontWeight:'500',
        fontSize:17,
        marginVertical:13
    },
    optionText:{
        color:colors.black,
        fontSize:16
    },
    buttonView:{
        flexDirection:'row',
        marginVertical:13,
    }
})