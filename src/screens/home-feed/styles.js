import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
  mainCon:{
    // paddingTop:window.height*0.02,
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
    paddingHorizontal:window.width*0.08,
    paddingVertical:window.height*0.06,
    backgroundColor:colors.primaryColor,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  usernameCon:{
    width:'78%',
    justifyContent:'center',
    height:30,
    overflow:'hidden'
  },
  username:{
    color:colors.white,
    fontSize:20,
    fontFamily:'PlayfairDisplay-SemiBold'
  },
  iconsCon:{
    flexDirection:'row',
},
profileImage:{
  height:30,
  width:30,
  borderRadius:50,
  marginLeft:10
},
icons:{
    color:colors.white,
    marginLeft:10
},
notificationsCount: {
  borderWidth: 1,
  borderColor: colors.primaryColor,
  backgroundColor: colors.red6,
  borderRadius: 10,
  height: 18,
  width: 18,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: -5,
  left: 22,
},
notificationCountNumber: {
  color: colors.white,
  fontSize: 10,
  fontWeight:'500'
},
  subConOne:{
    marginTop:'13%',
    height:'auto',
    alignItems:'center',
    backgroundColor:colors.yellowOne,
    marginHorizontal:window.width*0.06,
    padding:'6%',
    borderRadius:10,
    elevation:3,
    overflow:'hidden'
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
    marginVertical:'5%',
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
    marginTop:'2%',
    marginLeft:'10%'
  },
  descriptionTwo:{
    marginHorizontal:window.width*0.04,
    marginTop:'2%',
  },
  ImageSlideCon:{
    marginVertical:'10%',
    height: 180,
    marginHorizontal:window.width*0.06,
    elevation:5,
    borderRadius:10,
    overflow:'hidden'
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'10%'
  },
  refreshText: {
    marginLeft: 5,
    color: colors.primaryColor,
    fontWeight:'bold'
  },
})