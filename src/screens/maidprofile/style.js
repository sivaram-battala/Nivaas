import { StyleSheet } from "react-native";
import { window } from "../../common";
 
export const styles = StyleSheet.create({
    maincontainer:{
        width:"100%",
        height:"100%",
        backgroundColor:"white",
       
    },
    subContainerOne: {
        height: 50,
        marginTop: window.height*0.05,
        marginHorizontal:20
    },
    subContainerTwo:{
        backgroundColor:"#E7E7E7",
        margin:20,
        height:window.height*0.18,
        flexDirection:"row",
        paddingHorizontal:20,
        marginHorizontal:30,
       
        elevation:3
       
       
    },
    image:{
          height:90,
          width:90,
          backgroundColor:"#DD9898",
          marginHorizontal:20,
          marginVertical:24
 
 
    },
    subContainerTwoView:{
        marginVertical:18
    },
    subContainerTwoText:{
        fontSize:17,
        paddingVertical:3
    },
    subContainerThree:{
        backgroundColor:"#E7E7E7",
        height:window.height*0.13,
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal:30,
        elevation:5
    },
    subContainerThreeText:{
        fontSize:17,
        paddingVertical:3
    },
    subContainerThreeView:{
        // marginVertical:1,
        marginHorizontal:30
    },
    subContainerFour:{
        backgroundColor:"#E7E7E7",
        margin:20,
        height:window.height*0.27,
        flexDirection:"row",
        paddingHorizontal:30,
        paddingVertical:20,
        marginHorizontal:30,
        elevation:5
 
    },
    subContainerFourViewText:{
        flexDirection:"row",
        marginVertical:20
        },
    subContainerFourText:{
        fontSize:17,
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:10
    },
    subContainerFourTextTwo:{
        fontSize:17,
        // paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:10
    },
    subContainerFive: {
        marginVertical: "20%",
        marginHorizontal: "10%"
    },
})