import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
  mainCon:{
    paddingTop:window.height*0.06,
    backgroundColor:colors.white,
    height:'100%'
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCon:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:'5%',
    marginHorizontal:window.width*0.08,
  },
  usernameCon:{
    width:'78%',
    justifyContent:'center',
    height:30,
    overflow:'hidden'
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
    marginTop:'20%',
    height:'50%',
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
    height:'60%'
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
    marginTop:'5%',
    alignItems:'center',
    backgroundColor:colors.yellowOne,
    marginHorizontal:window.width*0.06,
    padding:'4%',
    borderRadius:10,
    elevation:3,
    overflow:'hidden',
  },
  commentIcon:{
    marginRight:window.width*0.68,
    color:colors.black,
    marginBottom:20
  },
  description:{
    marginHorizontal:window.width*0.04,
    marginTop:10,
    marginLeft:'10%'
  },
  descriptionTwo:{
    marginHorizontal:window.width*0.04,
    marginTop:10,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'5%'
  },
  refreshText: {
    marginLeft: 5,
    color: colors.primaryRedColor,
    fontWeight:'bold'
  },
})