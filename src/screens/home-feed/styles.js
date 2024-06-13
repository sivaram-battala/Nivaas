import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
  mainCon:{
    marginTop:window.width*0.06,
    backgroundColor:colors.white,
    height:'100%'
  },
  headerCon:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:window.height*0.06,
    marginHorizontal:window.width*0.08,
  },
  username:{
    color:colors.black,
    fontSize:20,
    fontFamily:'PlayfairDisplay-SemiBold'
  },
  iconsCon:{
    flexDirection:'row',
},
icons:{
    color:colors.black,
    marginLeft:10
},
  subConOne:{
    marginTop:window.height*0.08,
    height:'45%',
    alignItems:'center',
    backgroundColor:colors.yellowOne,
    marginHorizontal:window.width*0.06,
    padding:'6%',
    borderRadius:10,
    elevation:3
  },
  textCon:{
    backgroundColor:colors.white,
    padding:5,
    borderRadius:10,
    height:'68%'
  },
  image:{
    height:80,
    width:170
  },
  discoverMore:{
    fontWeight:'bold',
    fontSize:16,
    color:colors.black,
    marginTop:10,
    marginHorizontal:window.width*0.04,
  },
  subConTwo:{
    height:'28%',
    marginTop:30,
    alignItems:'center',
    backgroundColor:colors.yellowOne,
    marginHorizontal:window.width*0.06,
    padding:'4%',
    borderRadius:10,
    elevation:3,
    overflow:'hidden'
  },
  commentIcon:{
    marginRight:window.width*0.68,
    color:colors.black,
    marginBottom:20
  }
  ,
  description:{
    marginHorizontal:window.width*0.04,
    marginTop:10,
    marginLeft:'10%'
  },
  descriptionTwo:{
    marginHorizontal:window.width*0.04,
    marginTop:10,
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  // modalView: {
  //   marginHorizontal: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   padding: 30,
  //   alignItems: 'left',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   color:colors.black,
  //   fontWeight:'500'
  // },
  // input: {
  //   width: 250,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 10,
  //   marginTop: 20,
  // },
  // errorText: {
  //   color: 'red',
  //   marginBottom: 20,
  // },

})