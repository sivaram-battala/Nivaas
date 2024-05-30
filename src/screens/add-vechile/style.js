import { StyleSheet } from "react-native";
import { colors, window } from "../../common";
 
export const styles = StyleSheet.create({
    containerOne: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },  
    subContainerOne: {  
        height:50,
        marginBottom:20,
        marginTop:40    
    },
    containerTwo:{
        borderTopWidth:1,
        borderTopColor:"#6A6868",
         borderBottomWidth:1,
         borderBottomColor:"#6A6868",  
    },
    subContainerTwo: {  
        flexDirection:"row" ,
        alignItems:"center" ,
        marginHorizontal:"10%",
        justifyContent:"space-between"  ,    
    },
    subContainerTwoText: {
        color:"black",
    },
    subContainerTwoAuto: {  
        flexDirection:"row" ,
        alignItems:"center" ,
        marginHorizontal:"10%",
        justifyContent:"space-between"  ,
        paddingBottom:"3%",      
    },
    imageOne:{
        height:70,
        width:70
    },
    imageTwo:{
        height:40,
        width:40
    },
    containerThree:{
 
    },
    inputContainer: {
        marginHorizontal:window.width*0.1,
        marginVertical:window.height*0.03
      },
      label: {
        marginBottom: 10,
        color: colors.gray,
        fontSize:15,
        fontWeight:'500'
      },
      input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#333',
        fontSize: 16,
      },
    subContainerThree:{
       
        marginVertical:"6%",
        marginHorizontal:"10%"
    },
})