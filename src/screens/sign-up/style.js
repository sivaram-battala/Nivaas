import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyBoardStyle: {
    width: '100%',
    flex: 1,
    marginTop: 10
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    height: 170,
    width: 180,
    borderRadius:50,
    alignItems:'center'
  },
  templeLogo: {height: 200, width: 200, flex: 1,borderRadius:50},
  description: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: fontFamily.PoetsenOneRegular,
    color: colors.red1,
    textTransform: 'capitalize',
    fontSize: 28,
    letterSpacing: 10,
  },
  fieldContainer: {
    width: '90%',
    paddingBottom: 100,
  },
  buttonContainer: {
    marginTop: 5,
    width: '70%',
    alignSelf: 'center',
  },
  alreadyTextContainer: {
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: fontFamily.popinBold,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  isLogin: {
    fontFamily: fontFamily.popinBold,
    color: colors.primaryRedColor,
    paddingLeft: 50,
  },
  alreadyAcc: {
    marginTop: 10,
  },
  signupText: {
    color: colors.black,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontFamily: fontFamily.popinMedium,
    fontSize: 20,
    marginLeft: 20,
  },
  tc: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  checkView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 12,
    marginRight: 5,
  },
 
});
