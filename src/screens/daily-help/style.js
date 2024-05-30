import { StyleSheet } from "react-native";
import { window } from "../../common";
import { statusBarHeight } from "../../utils/config/config";
 
export const styles = StyleSheet.create({
    containerOne: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },  
    subContainerOne: {
        height: 50, 
        marginTop: statusBarHeight, 
        flexDirection: 'row'
    },
    containerTwo:{
       flexDirection:"row" ,
       borderTopWidth:1,
       borderTopColor:"#6A6868",
       paddingTop:"5%",
       paddingBottom:"5%",    
       justifyContent:'space-between',
       alignItems:'center',
       paddingLeft:window.width*0.2   
    },
    eachContainer:{
        height:20,
        width:100
    },
    eachText:{
        fontSize:16,
        fontWeight:'500'
    }
})