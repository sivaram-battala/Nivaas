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
    focusedContainer: {
      alignItems: 'center',
      borderRadius: 100,
      justifyContent: 'center',
      backgroundColor:colors.white, 
      padding: 10,
      marginBottom: 20,
    },
    imageNormal:{
      color:colors.gray,
      marginBottom:5
    },
    imageFocused:{
      color:colors.primaryColor,
      marginBottom:5
    },
    iconTextCon:{
      alignItems:'center'
    },
    textNormal:{
      color:colors.gray,
    },
    textFocused:{
      color:colors.primaryColor,
    },
    imageContainer:{
      elevation:2,
      shadowColor: colors.black,
      borderWidth:1,
      borderColor:colors.primaryColor,
    },
  });
