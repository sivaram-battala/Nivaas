import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon:{
        backgroundColor:colors.white,
        height:window.height
    },
    iconsCon:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:window.height*0.05,
    },
    eachIconCon:{
        alignItems:'center',
        backgroundColor:colors.gray0,
        elevation:5,
        padding:10,
        borderRadius:5
    },
    inputContainer: {
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.03
      },
      label: {
        marginBottom: 5,
        color: '#333',
      },
      input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#333',
        fontSize: 16,
      },
    buttonCon:{
       marginHorizontal:window.width*0.1,
       marginVertical:window.height*0.03
    }

})