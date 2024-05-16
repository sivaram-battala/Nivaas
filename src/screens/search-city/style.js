import { StyleSheet } from "react-native";
import { fontFamily, window } from "../../common";
import { colors } from "react-native-elements";

export const styles = StyleSheet.create({
    mainCon:{
        paddingTop:window.height*0.05,
        backgroundColor:colors.white,
        height:window.height,
        flex:1,
        paddingHorizontal:window.width * 0.04
    },
    filteredDataCon:{
        zIndex: 1,
    },
    filteredDataText:{
        fontSize:18,
        color:colors.black,
        marginHorizontal:window.width*0.04,
        marginVertical:3,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        marginTop:'30%'
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust opacity (0.5 for 50% opacity)
      },
      content: {
         // Ensure content is above the overlay
        // Other styles for your content
      },
})