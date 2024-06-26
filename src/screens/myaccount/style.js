// style.js

import {StyleSheet} from 'react-native';
import {colors, window} from '../../common';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: window.height * 0.02,
    marginHorizontal: window.width * 0.04,
  },
  profieText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  nivaasID: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    padding: 5,
  },
  manageFlatsCon: {
    marginVertical: window.height * 0.01,
    paddingHorizontal: window.width * 0.12,
    paddingTop: '3%',
    borderTopColor: colors.gray3,
    borderTopWidth: 7,
  },
  manageFlatsConText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  manageFlatsSubCon: {
    marginTop: 10,
  },
  manageFlatsConHome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  flatItemCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatText: {
    fontSize: 16,
    marginLeft: 20,
    color: colors.black,
  },
  apartmentModalText: {
    fontSize: 17,
    marginLeft: 5,
    color: colors.black,
    width:'55%',
  },
  flatModalCon:{
    width:'67%',
    flexDirection:'row',
    overflow:'hidden'
  },
  flatModalText:{
    fontSize: 17,
    marginLeft: 5,
    color: colors.black,
  },
  renderCon: {
    flexDirection: 'row',
    marginLeft:'5%',
  },
  statusactiveText: {
    color: colors.green,
    fontsize: 17,
    fontWeight: '500',
  },
  statusPendingText: {
    color: colors.red1,
    fontsize: 17,
    fontWeight: '500',
  },
  manageFlatsConAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  manageFlatsConAddText: {
    fontSize: 16,
    marginLeft: 13,
    color: colors.black,
  },
  setting: {
    marginVertical: window.height * 0.01,
    paddingVertical:10,
    paddingHorizontal: window.width * 0.13,
    borderTopColor: colors.gray3,
    borderTopWidth: 7,
    borderBottomColor: colors.gray3,
    borderBottomWidth: 7,
  },
  settingHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    // marginVertical: 10,
  },
  settingsubConOne: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  generalSettingsOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nivaas: {
    alignItems: 'center',
    marginTop: '2%',
  },
  nivaasLogo:{
    height:55,
    width:'50%'
  },
  nivaasText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginRight:'16%',
    backgroundColor:colors.gray4,
    padding:'2%',
    borderRadius:5,
    // marginTop: '4%',
  },
  footerText: {
    fontSize: 16,
    marginHorizontal: 5,
    color: colors.black,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseIcon: {
    alignSelf: 'flex-end',
  },
  VersionCon:{
    marginVertical:'1%',
    alignItems:'center'
  },
  VersionText:{
    fontsize:16,
    fontWeight:'500',
    color:colors.black
  }
});
