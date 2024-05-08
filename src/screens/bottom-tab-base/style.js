import {View, StyleSheet} from 'react-native';
import { colors } from '../../common';

export const styles = StyleSheet.create({
    loadingScreen: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dotsWrapper: {
      display:'flex',
      flexDirection:'row',
      borderWidth:5,
    },
    mainContainer:{
      // borderWidth:10
    },
    container:{
      alignItems:'center',
    },
    focusedContainer: {
      alignItems: 'center',
      borderRadius: 100,
      justifyContent: 'center',
      backgroundColor: 'white', 
      padding: 10,
      marginBottom: 20,
    },
    imageNormal:{
      color:colors.black
    },
    imageFocused:{
      color:colors.orangeColor
    },
    UserFeedFocusedContainer:{
      // borderWidth:1,
      // borderColor:colors.orangeColor
    },
    imageContainer:{
      elevation:2,
      shadowColor: colors.black,
      borderWidth:1,
      borderColor:colors.orangeColor,
    },
  });
