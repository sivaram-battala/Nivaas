//* eslint-disable no-undef */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import RNRestart from 'react-native-restart';
import {InputField} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {styles} from './styles.js';
import {KovelaIcon} from '../sign-up/index.js';
import ApplicationContext from '../../utils/context-api/Context';
import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
import {loginAction, userDataAction} from '../../redux/slices/authSlice.ts';
import {useNivaastriggerotpMutation} from '../../redux/services/authService.tsx';
import {otpTrigger} from '../../utils/api/index.js';
const Signin = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(' ');
  const [mobNum, setMobNum] = useState('');
  const [timer, setTimer] = useState('00');
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const Ref = useRef(null);
  // const [doTriggerOtp] = useTriggerOtpMutation();
  const [nivaasTriggerOtp] = useNivaastriggerotpMutation();
  var secLeft = 30;
  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = e => {
    let {total, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };
  const startTime = e => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + secLeft);
    return deadline;
  };

  let otpInput = useRef(null);

  const setText = () => {
    otpInput?.current?.setValue('');
  };
  useEffect(() => {
    startTime(getDeadTime());
    setText();
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const NetWorkChecking = () => {
    if (isConnected === false) {
      Snackbar.show({
        text: 'No Internet Connection',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'grey',
        action: {
          text: 'Reload',
          textColor: 'White',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      });
    }
  };

  useEffect(() => {
    NetWorkChecking();
  }, []);

  const OtpTrigger = async () => {
    console.log('1');
    let otpPayload = {
      otpType: 'SIGNIN',
      primaryContact: mobNum,
    };
    console.log('payload', otpPayload);
    if (mobNum?.length !== 10) {
      alert('please enter proper Mobile Number');
    } else if (mobNum?.length === 10) {
      console.log('====')
      nivaasTriggerOtp(otpPayload)
        .unwrap()
        .then(response => {
          console.log('otpRes--->', response);
          if (response) {
            navigation.navigate(allTexts.screenNames.otpScreen, {
              mobNum: mobNum,
              otp: response?.otp,
            });
          }
        })
        .catch(error => console.log('error in trigger otp', error))
    }

    
    // otpTrigger(otpPayload).then((responce)=>{
    //   console.log('res of otp trigger axios',responce);
    // }).catch((error)=>{
    //   console.log('error in axios otp trigger',error);
    // })


    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // const raw = JSON.stringify({
    //   otpType: 'SIGNIN',
    //   primaryContact: '9491839431',
    // });

    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };

    // fetch(
    //   'https://4.240.68.49:8443/nivaascustomer/nivaas/api/auth/jtuserotp/trigger',
    //   requestOptions,
    // )
    //   .then(response => response.json())
    //   .then(result => console.log('fetch results',result))
    //   .catch(error => console.error('error in fetch req',error));
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyboardStyle}
        contentContainerStyle={styles.contentStyle}>
        {/* <KovelaIcon /> */}
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <InputField
              isFlag
              value={mobNum}
              setState={e => setMobNum(e)}
              keyboardType={'numeric'}
              placeholder={'Enter Mobile Number'}
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => OtpTrigger()}>
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {' '}
              TRIGGER OTP
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Signin;
